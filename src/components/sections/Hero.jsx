import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import ThreeStage from '../three/ThreeStage.jsx'

const scenes = {
  camera: {
    number: '01 / CAPTURA',
    label: 'Cámara de seguridad 3D observando el entorno',
    title: 'Todo empieza con una mirada atenta.',
    description: 'Una cámara común observa el espacio donde se encuentra la persona. FallDetect procesa ese video para reconocer cambios de postura.',
  },
  analysis: {
    number: '02 / ANÁLISIS',
    label: 'Persona tridimensional que cae y permanece visible durante el análisis',
    title: 'Cuando algo cambia, el sistema responde.',
    description: 'La visión por computadora sigue la postura, identifica un patrón de caída y prepara una alerta para la persona de confianza.',
  },
}

export default function Hero() {
  const [scene, setScene] = useState('camera')
  const [replay, setReplay] = useState(0)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return undefined
    const timer = window.setTimeout(() => setScene('analysis'), 4700)
    return () => window.clearTimeout(timer)
  }, [reducedMotion])

  const current = scenes[scene]
  return (
    <section id="inicio" className="hero">
      <div className="hero__ambient hero__ambient--one" />
      <div className="hero__ambient hero__ambient--two" />
      <div className="container hero__inner">
        <div className="hero__copy">
          <div className="hero__meta"><span className="live-dot" /> Proyecto universitario · UNAE 2026</div>
          <h1>Detectar a tiempo.<br /><span>Cuidar mejor.</span></h1>
          <p className="hero__lead">FallDetect observa la postura de adultos mayores con una cámara y reconoce patrones de caída para reducir el tiempo de espera antes de recibir ayuda.</p>
          <div className="hero__actions">
            <a className="button button--light" href="#funciona">Conocer el sistema <span aria-hidden="true">↗</span></a>
            <a className="button button--outline" href="#signal">Ver Signal for Help</a>
          </div>
          <div className="hero__trust">
            <span>Visión por computadora</span>
            <span>Detección de postura</span>
            <span>Aviso por Telegram</span>
          </div>
        </div>
        <div className="hero__visual">
          <div className="hero__visual-top"><span className="hero__visual-label"><span className="live-dot" /> SISTEMA EN FOCO</span><span>FALLDETECT / 2026</span></div>
          <div className="hero__scene-frame">
            <div className="hero__grid" />
            <AnimatePresence mode="wait">
              <motion.div
                key={scene}
                className="hero__scene"
                initial={reducedMotion ? false : { opacity: 0, x: 38, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={reducedMotion ? {} : { opacity: 0, x: -38, filter: 'blur(8px)' }}
                transition={{ duration: reducedMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                <ThreeStage key={replay} variant={scene} label={current.label} />
              </motion.div>
            </AnimatePresence>
            <div className="hero__scene-mark hero__scene-mark--tl" />
            <div className="hero__scene-mark hero__scene-mark--br" />
            {scene === 'analysis' && <button className="hero__replay" type="button" onClick={() => setReplay((value) => value + 1)}>↻ Repetir caída</button>}
          </div>
          <div className="hero__visual-bottom">
            <div className="hero__scene-text" aria-live="polite">
              <span>{current.number}</span>
              <strong>{current.title}</strong>
              <p>{current.description}</p>
            </div>
            <div className="hero__controls" aria-label="Escenas de la introducción">
              <button type="button" className={scene === 'camera' ? 'is-active' : ''} aria-label="Mostrar cámara" aria-pressed={scene === 'camera'} onClick={() => setScene('camera')}>01</button>
              <button type="button" className={scene === 'analysis' ? 'is-active' : ''} aria-label="Mostrar análisis de caídas" aria-pressed={scene === 'analysis'} onClick={() => setScene('analysis')}>02</button>
            </div>
          </div>
        </div>
      </div>
      <div className="hero__bottom-line"><div className="container"><span>Observar</span><span>Interpretar</span><span>Actuar</span><a href="#proyecto">Explorar el proyecto ↓</a></div></div>
    </section>
  )
}
