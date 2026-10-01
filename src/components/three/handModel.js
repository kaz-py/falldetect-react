import * as THREE from 'three'

export function createHandsModel() {
  const root = new THREE.Group()
  root.scale.x = -1
  let joints = []
  let previousTime

  return {
    root,
    assetPath: '/models/anatomical-hand.glb',
    attachGltf(gltf) {
      const hand = gltf.scene
      const bones = []
      hand.traverse((object) => {
        if (object.isBone) bones.push(object)
        if (!object.isMesh) return
        object.geometry.computeVertexNormals()
        object.frustumCulled = false
        const materials = Array.isArray(object.material) ? object.material : [object.material]
        materials.forEach((material) => {
          // The exported normal/roughness maps produce dark seams and sharp
          // facets on the knuckles. Use the mesh normals and skin color map.
          material.normalScale?.set(0, 0)
          new Set([material.roughnessMap, material.metalnessMap]).forEach((texture) => texture?.dispose())
          material.roughnessMap = null
          material.metalnessMap = null
          material.roughness = 0.82
          material.metalness = 0
        })
      })

      const mixer = new THREE.AnimationMixer(hand)
      const clip = gltf.animations.find((animation) => animation.name === 'RigAction')
      mixer.clipAction(clip).play()
      const sample = (time) => {
        mixer.setTime(time)
        return bones.map((bone) => bone.quaternion.clone())
      }
      const open = sample(0)
      const closed = sample(9)
      mixer.setTime(0)
      hand.updateMatrixWorld(true)
      // Fold the thumb across the palm, behind the closing fingers. Solve
      // each joint direction in model space instead of assuming a local axis.
      for (const [name, direction] of [
        ['thumb_meta', new THREE.Vector3(0.65, 0.68, 0.33)],
        ['thumb_prox', new THREE.Vector3(0.97, -0.13, 0.15)],
        ['thumb_dist', new THREE.Vector3(0.92, -0.38, 0.1)],
      ]) {
        const bone = hand.getObjectByName(name)
        const world = bone.getWorldQuaternion(new THREE.Quaternion())
        const current = new THREE.Vector3(0, 1, 0).applyQuaternion(world)
        const swing = new THREE.Quaternion().setFromUnitVectors(current.normalize(), direction.normalize())
        const parentInverse = bone.parent.getWorldQuaternion(new THREE.Quaternion()).invert()
        bone.quaternion.copy(parentInverse.multiply(swing.multiply(world)))
        hand.updateMatrixWorld(true)
      }
      const thumb = bones.map((bone) => bone.quaternion.clone())
      mixer.stopAllAction()
      mixer.uncacheRoot(hand)

      joints = bones.map((bone, index) => {
        // Keep the thumb's metacarpal close to its resting angle so the
        // connection to the palm does not fold into a sharp lump.
        const foldAmount = bone.name === 'thumb_meta' || bone.name === 'thumb_prox' ? 0.7 : 1
        const tucked = open[index].clone().slerp(thumb[index], foldAmount)
        bone.quaternion.copy(open[index])
        return { bone, open: open[index], closed: closed[index], tucked }
      })
      hand.updateMatrixWorld(true)
      const bounds = new THREE.Box3().setFromObject(hand, true)
      const size = bounds.getSize(new THREE.Vector3())
      const center = bounds.getCenter(new THREE.Vector3())
      const scale = 3.45 / size.y
      const normalized = new THREE.Group()
      normalized.scale.setScalar(scale)
      hand.position.sub(center)
      normalized.add(hand)
      root.add(normalized)
    },
    update(time, phase = 0) {
      const delta = previousTime === undefined ? 1 / 60 : Math.min(Math.max(time - previousTime, 1 / 120), 0.05)
      previousTime = time
      const blend = 1 - Math.exp(-12 * delta)
      const thumbFolded = phase >= 1
      const fingersFolded = phase >= 2 && (phase % 2 === 0 || phase === 11)
      for (const { bone, open, closed, tucked } of joints) {
        const target = bone.name.startsWith('thumb_')
          ? (thumbFolded ? tucked : open)
          : (fingersFolded ? closed : open)
        bone.quaternion.slerp(target, blend)
      }
      // Fixed frontal palm view throughout the three gesture steps.
      root.rotation.set(0, 0, 0)
    },
  }
}
