import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import ThreeStage from '../three/ThreeStage.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

const phases = 12

function phaseLabel(phase) {
  if (phase === 0) return 'Mostrar la mano abierta'
  if (phase === 1) return 'Colocar el pulgar sobre la palma'
  if (phase === 11) return 'Aviso preparado para Telegram'
  return phase % 2 === 0 ? 'Cerrar los cuatro dedos' : 'Volver a abrir los cuatro dedos'
}

export default function Signal() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [phase, setPhase] = useState(0)
  const [playing, setPlaying] = useState(true)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible || !playing || reducedMotion) return undefined
    const timer = window.setInterval(() => setPhase((current) => (current + 1) % phases), 1050)
    return () => window.clearInterval(timer)
  }, [visible, playing, reducedMotion])

  const cycle = phase >= 2 && phase <= 10 ? Math.floor(phase / 2) : phase === 11 ? 5 : 0

  return (
    <section id="signal" className="section signal" ref={sectionRef}>
      <div className="container signal__layout">
        <div className="signal__content">
          <SectionHeading
            number="03 / SEGUNDA VÍA DE AYUDA"
            title="Una señal silenciosa que también cuenta."
            description="Signal for Help suma una forma de pedir auxilio cuando no hay una caída visible."
            light
          />
          <p className="signal__body">Frente a la cámara, la persona abre y cierra los cuatro dedos —sin contar el pulgar— cinco veces seguidas. El programa sigue la mano y cuenta los ciclos. Al completar el quinto, envía una alerta por Telegram al contacto designado.</p>
          <div className="signal__sequence" aria-label="Secuencia del gesto">
            <div><span>1</span><strong>Mostrar la mano</strong><small>Frente a la cámara</small></div>
            <div><span>2</span><strong>Colocar el pulgar</strong><small>Sobre la palma</small></div>
            <div><span>3</span><strong>Abrir y cerrar</strong><small>Los cuatro dedos, cinco veces</small></div>
            <div><span>4</span><strong>Enviar el aviso</strong><small>Al contacto de confianza</small></div>
          </div>
        </div>
        <div className="signal__visual">
          <div className="signal__visual-heading"><span>GESTO DE AUXILIO</span><span>MODELO 3D / SIMULACIÓN</span></div>
          <div className="signal__stage"><ThreeStage variant="hands" gesturePhase={phase} label={`Modelo tridimensional de una mano: ${phaseLabel(phase).toLowerCase()}. Ciclo ${cycle} de 5.`} /></div>
          <div className="signal__visual-caption">
            <motion.span key={phase} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>{phaseLabel(phase)}</motion.span>
            <strong>{cycle} / 5 ciclos</strong>
          </div>
          <div className="signal__pose-controls" aria-label="Ver cada posición del gesto">
            {[
              { phase: 0, label: '1 · Mano abierta' },
              { phase: 1, label: '2 · Pulgar al centro' },
              { phase: 2, label: '3 · Cerrar dedos' },
            ].map((step) => (
              <button
                type="button"
                key={step.phase}
                className={phase === step.phase ? 'is-active' : ''}
                aria-pressed={phase === step.phase}
                onClick={() => { setPlaying(false); setPhase(step.phase) }}
              >{step.label}</button>
            ))}
          </div>
          <div className="signal__progress" aria-label={`${cycle} de 5 ciclos completados`}>{Array.from({ length: 5 }, (_, index) => <span className={index < cycle ? 'is-complete' : ''} key={index} />)}</div>
          <button className="signal__replay" type="button" onClick={() => { if (!playing) setPhase(0); setPlaying((current) => !current) }}>{playing ? 'Pausar animación' : 'Reanudar animación'}</button>
          <p className="signal__disclaimer">Representación visual del gesto; no utiliza la cámara de este dispositivo.</p>
        </div>
      </div>
    </section>
  )
}
