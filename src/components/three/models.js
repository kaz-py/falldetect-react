import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'

function roundedBox(width, height, depth, radius, material) {
  return new THREE.Mesh(new RoundedBoxGeometry(width, height, depth, 5, radius), material)
}

function segment(start, end, radius, material) {
  const a = new THREE.Vector3(...start)
  const b = new THREE.Vector3(...end)
  const direction = b.clone().sub(a)
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, direction.length(), 20), material)
  mesh.position.copy(a.add(b).multiplyScalar(0.5))
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize())
  return mesh
}

function engravedLabel() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 128
  const context = canvas.getContext('2d')
  context.fillStyle = '#e8eeed'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = '#244450'
  context.font = 'bold 43px Arial'
  context.fillText('FALLDETECT', 24, 58)
  context.font = '26px Arial'
  context.fillStyle = '#557580'
  context.fillText('VISION SYSTEM  /  4K', 24, 99)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(0.85, 0.21), new THREE.MeshBasicMaterial({ map: texture }))
  plane.position.set(-0.32, 0.02, 0.52)
  return plane
}

export function createCameraModel() {
  const ivory = new THREE.MeshPhysicalMaterial({ color: 0xe8eeee, metalness: 0.56, roughness: 0.27, clearcoat: 0.4 })
  const graphite = new THREE.MeshStandardMaterial({ color: 0x172a33, metalness: 0.72, roughness: 0.28 })
  const rubber = new THREE.MeshStandardMaterial({ color: 0x071820, metalness: 0.16, roughness: 0.63 })
  const chrome = new THREE.MeshStandardMaterial({ color: 0xbcced0, metalness: 0.88, roughness: 0.17 })
  const glass = new THREE.MeshPhysicalMaterial({ color: 0x0b2944, metalness: 0.28, roughness: 0.05, clearcoat: 1, clearcoatRoughness: 0.04 })
  const light = new THREE.MeshStandardMaterial({ color: 0x76ead6, emissive: 0x23a89b, emissiveIntensity: 0.8 })
  const root = new THREE.Group()
  root.scale.setScalar(1.58)
  const camera = new THREE.Group()
  camera.rotation.y = -0.78
  camera.rotation.z = -0.06
  root.add(camera)

  const housing = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.5, 2.65, 64), ivory)
  housing.rotation.z = -Math.PI / 2
  camera.add(housing)
  const rearCap = new THREE.Mesh(new THREE.CylinderGeometry(0.51, 0.51, 0.11, 64), graphite)
  rearCap.rotation.z = -Math.PI / 2
  rearCap.position.x = -1.35
  camera.add(rearCap)
  const rearSeal = new THREE.Mesh(new THREE.TorusGeometry(0.41, 0.022, 12, 64), rubber)
  rearSeal.rotation.y = Math.PI / 2
  rearSeal.position.x = -1.43
  camera.add(rearSeal)

  const hood = roundedBox(2.9, 0.09, 1.25, 0.045, ivory)
  hood.position.set(0.18, 0.54, -0.07)
  camera.add(hood)
  const hoodEdge = roundedBox(0.11, 0.13, 1.26, 0.03, graphite)
  hoodEdge.position.set(1.58, 0.52, -0.07)
  camera.add(hoodEdge)
  const sideTrim = roundedBox(2.27, 0.04, 0.06, 0.02, chrome)
  sideTrim.position.set(-0.05, -0.34, 0.41)
  camera.add(sideTrim)
  camera.add(engravedLabel())

  for (let i = 0; i < 5; i += 1) {
    const vent = roundedBox(0.09, 0.028, 0.012, 0.006, graphite)
    vent.position.set(-0.78 + i * 0.13, -0.19, 0.487)
    camera.add(vent)
  }

  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.51, 0.45, 0.46, 64), graphite)
  neck.rotation.z = -Math.PI / 2
  neck.position.x = 1.43
  camera.add(neck)
  const frontPlate = new THREE.Mesh(new THREE.CylinderGeometry(0.43, 0.43, 0.04, 64), rubber)
  frontPlate.rotation.z = -Math.PI / 2
  frontPlate.position.x = 1.7
  camera.add(frontPlate)
  const outerRing = new THREE.Mesh(new THREE.TorusGeometry(0.33, 0.045, 20, 80), chrome)
  outerRing.rotation.y = Math.PI / 2
  outerRing.position.x = 1.735
  camera.add(outerRing)
  const innerRing = new THREE.Mesh(new THREE.TorusGeometry(0.21, 0.019, 16, 80), graphite)
  innerRing.rotation.y = Math.PI / 2
  innerRing.position.x = 1.758
  camera.add(innerRing)
  const lens = new THREE.Mesh(new THREE.SphereGeometry(0.195, 48, 32), glass)
  lens.scale.x = 0.28
  lens.position.x = 1.76
  camera.add(lens)
  const aperture = new THREE.Mesh(new THREE.SphereGeometry(0.075, 24, 18), rubber)
  aperture.scale.x = 0.28
  aperture.position.x = 1.82
  camera.add(aperture)
  for (let i = 0; i < 8; i += 1) {
    const angle = (i / 8) * Math.PI * 2
    const led = new THREE.Mesh(new THREE.SphereGeometry(0.026, 12, 12), light)
    led.position.set(1.73, Math.cos(angle) * 0.275, Math.sin(angle) * 0.275)
    camera.add(led)
  }

  const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.15, 32), chrome)
  collar.position.set(-0.55, -0.58, 0)
  camera.add(collar)
  camera.add(segment([-0.55, -0.6, 0], [-0.73, -1.04, 0], 0.115, graphite))
  const joint = new THREE.Mesh(new THREE.SphereGeometry(0.17, 24, 20), chrome)
  joint.position.set(-0.73, -1.04, 0)
  camera.add(joint)
  const bracket = roundedBox(0.86, 0.13, 0.65, 0.06, ivory)
  bracket.position.set(-0.73, -1.23, 0)
  camera.add(bracket)
  for (const x of [-1.02, -0.44]) {
    const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.037, 0.037, 0.01, 16), graphite)
    screw.position.set(x, -1.156, 0)
    camera.add(screw)
  }
  const status = new THREE.Mesh(new THREE.SphereGeometry(0.032, 16, 12), light)
  status.position.set(0.76, -0.12, 0.5)
  camera.add(status)

  return {
    root,
    update(time) {
      camera.rotation.y = -0.78 + Math.sin(time * 0.24) * 0.32
      camera.rotation.z = -0.06 + Math.sin(time * 0.32) * 0.025
      root.position.y = Math.sin(time * 0.65) * 0.025
      light.emissiveIntensity = 0.65 + Math.sin(time * 2.1) * 0.2
    },
  }
}

export { createAnalysisModel } from './fallModel.js'
export { createHandsModel } from './handModel.js'
