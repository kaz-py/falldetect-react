import * as THREE from 'three'

const FLOOR_Y = -1.35

export function createAnalysisModel() {
  const root = new THREE.Group()
  const fallPivot = new THREE.Group()
  root.add(fallPivot)
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(5.5, 5.2),
    new THREE.MeshBasicMaterial({ color: 0x82c9c2, transparent: true, opacity: 0.09, depthWrite: false, side: THREE.DoubleSide }),
  )
  floor.rotation.x = -Math.PI / 2
  floor.position.set(0, FLOOR_Y, 0.2)
  root.add(floor)
  const grid = new THREE.GridHelper(5.2, 12, 0x477a83, 0x244e5d)
  grid.position.set(0, FLOOR_Y + 0.005, 0.2)
  grid.material.transparent = true
  grid.material.opacity = 0.35
  root.add(grid)

  let mixer
  let duration
  let loadedAt
  let restingLegs = []
  const bounds = new THREE.Box3()
  return {
    root,
    assetPath: '/models/human.glb',
    attachGltf(gltf) {
      const person = gltf.scene
      const clip = gltf.animations.find((animation) => animation.name.endsWith('|Death'))
      duration = clip.duration
      mixer = new THREE.AnimationMixer(person)
      const action = mixer.clipAction(clip)
      action.setLoop(THREE.LoopOnce, 1)
      action.clampWhenFinished = true
      action.play()
      mixer.setTime(0)
      restingLegs = ['LeftUpLeg', 'LeftLeg', 'LeftFoot', 'RightUpLeg', 'RightLeg', 'RightFoot'].map((name) => {
        const bone = person.getObjectByName(name)
        return { bone, rotation: bone.quaternion.clone() }
      })
      person.updateMatrixWorld(true)
      bounds.setFromObject(person, true)
      const size = bounds.getSize(new THREE.Vector3())
      const center = bounds.getCenter(new THREE.Vector3())
      person.position.add(new THREE.Vector3(-center.x, -bounds.min.y, -center.z))
      const normalized = new THREE.Group()
      normalized.scale.setScalar(2.8 / size.y)
      normalized.add(person)
      fallPivot.add(normalized)
      person.traverse((object) => {
        if (!object.isMesh) return
        object.geometry.computeVertexNormals()
        object.frustumCulled = false
      })
    },
    update(time) {
      if (!mixer) return
      loadedAt ??= time
      const elapsed = Math.max(0, time - loadedAt)
      // Play the complete authored skeletal motion. Root translation,
      // knees, torso and bracing arms all retain their original timing.
      // Stop just before the endpoint so repeated sampling holds the pose
      // without resetting a clamped AnimationAction.
      const clipTime = Math.min(Math.max(0, elapsed - 0.8) * 1.35, duration - 0.0001)
      mixer.setTime(clipTime)
      const settle = THREE.MathUtils.smoothstep(clipTime, 2.35, 3.45)
      for (const { bone, rotation } of restingLegs) bone.quaternion.slerp(rotation, settle * 0.65)
      fallPivot.position.set(0, 0, -1.3)
      root.updateMatrixWorld(true)
      bounds.setFromObject(fallPivot, true)
      // Correct the small ground penetration in the source clip without
      // changing its rotation or stretching the limbs.
      fallPivot.position.y = FLOOR_Y - bounds.min.y + 0.025
    },
  }
}
