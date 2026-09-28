import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { createAnalysisModel, createCameraModel, createHandsModel } from './models.js'

const builders = {
  camera: createCameraModel,
  analysis: createAnalysisModel,
  hands: createHandsModel,
}

export default function ThreeStage({ variant, label, gesturePhase = 0 }) {
  const hostRef = useRef(null)
  const phaseRef = useRef(gesturePhase)
  const [failed, setFailed] = useState(false)
  const [loading, setLoading] = useState(false)

  phaseRef.current = gesturePhase

  useEffect(() => {
    const host = hostRef.current
    if (!host) return undefined
    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    } catch {
      setFailed(true)
      return undefined
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = variant === 'hands' ? 1.05 : 1.35
    host.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    scene.add(new THREE.HemisphereLight(variant === 'hands' ? 0xffffff : 0xdff7f2, variant === 'hands' ? 0x706260 : 0x224252, 2.1))
    const key = new THREE.DirectionalLight(variant === 'hands' ? 0xffeee5 : 0xffffff, variant === 'hands' ? 2 : 3.2)
    key.position.set(-3, 5, 7)
    scene.add(key)
    const rim = new THREE.DirectionalLight(variant === 'hands' ? 0xd6e3ef : 0x60dfd0, variant === 'hands' ? 0.7 : 2.2)
    rim.position.set(4, 1, -3)
    scene.add(rim)

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 50)
    camera.position.set(0, variant === 'hands' ? 0.2 : 0.1, variant === 'hands' ? 6 : 6.4)
    camera.lookAt(0, -0.1, 0)
    if (variant === 'analysis') {
      camera.position.set(2.8, 2.3, 6.4)
      camera.lookAt(0, -0.25, -0.45)
    }
    const model = builders[variant]()
    scene.add(model.root)
    let disposed = false
    if (model.assetPath) {
      setLoading(true)
      new GLTFLoader().load(
        model.assetPath,
        (gltf) => {
          if (disposed) return
          model.attachGltf(gltf)
          setLoading(false)
          resize()
        },
        undefined,
        () => {
          if (disposed) return
          setLoading(false)
          setFailed(true)
        },
      )
    }

    const resize = () => {
      const width = Math.max(host.clientWidth, 1)
      const height = Math.max(host.clientHeight, 1)
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.position.z = variant === 'hands' ? (width < 480 ? 7.4 : 6) : (width < 480 ? 7.1 : 6.4)
      if (variant === 'analysis') camera.lookAt(0, -0.25, -0.45)
      camera.updateProjectionMatrix()
      renderer.render(scene, camera)
    }
    const observer = new ResizeObserver(resize)
    observer.observe(host)
    resize()

    let visible = true
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    visibilityObserver.observe(host)
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const clock = new THREE.Clock()
    renderer.setAnimationLoop(() => {
      if (!visible) return
      model.update(reducedMotion.matches ? 0 : clock.getElapsedTime(), phaseRef.current)
      renderer.render(scene, camera)
    })

    return () => {
      disposed = true
      renderer.setAnimationLoop(null)
      observer.disconnect()
      visibilityObserver.disconnect()
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose()
        if (object.material) {
          const materials = Array.isArray(object.material) ? object.material : [object.material]
          materials.forEach((material) => {
            new Set(Object.values(material).filter((value) => value?.isTexture)).forEach((texture) => texture.dispose())
            material.dispose()
          })
        }
      })
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [variant])

  return (
    <div className="three-stage" role="img" aria-label={label} ref={hostRef}>
      {loading && <div className="three-stage__loading">Cargando modelo 3D…</div>}
      {failed && <div className="three-stage__fallback">Vista 3D no disponible en este dispositivo.</div>}
    </div>
  )
}
