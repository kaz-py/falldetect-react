import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'

const patternSteps = ['Postura vertical', 'Cambio brusco', 'Inmovilidad posterior']

function CameraIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="6" y="13" width="27" height="22" rx="5" stroke="currentColor" strokeWidth="2" />
      <path d="m33 20 9-5v18l-9-5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="19.5" cy="24" r="5" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function PoseIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M24 13v17m0-12-11 7m11-7 11 7M24 30l-9 12m9-12 9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="13" cy="25" r="2" fill="currentColor" /><circle cx="35" cy="25" r="2" fill="currentColor" />
      <circle cx="15" cy="42" r="2" fill="currentColor" /><circle cx="33" cy="42" r="2" fill="currentColor" />
    </svg>
  )
}

function AlertIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M8 12h32v23H8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="m10 14 14 12 14-12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="39" cy="10" r="5" fill="#a8e8ff" />
    </svg>
  )
}

function CameraVisual() {
  return (
    <div className="capability__visual capability__visual--camera" aria-hidden="true">
      <div className="cap-camera">
        <div className="cap-camera__top"><span>CAM 01 / HOGAR</span><span className="cap-camera__rec">● REC</span></div>
        <div className="cap-camera__view">
          <div className="cap-camera__scan" />
          <svg viewBox="0 0 260 170" fill="none">
            <path d="M12 136h236M62 136V67h46v69M166 136V48h53v88" stroke="currentColor" strokeWidth="1.5" opacity=".23" />
            <path d="M108 136h58" stroke="currentColor" strokeWidth="1.5" opacity=".23" />
            <circle cx="137" cy="64" r="10" stroke="currentColor" strokeWidth="2" />
            <path d="M137 75v34m0-27-20 20m20-20 19 20m-19 7-16 26m16-26 17 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="117" cy="102" r="2.5" fill="currentColor" /><circle cx="156" cy="102" r="2.5" fill="currentColor" />
          </svg>
          <div className="cap-camera__box"><span>PERSONA 01</span></div>
        </div>
        <div className="cap-camera__bottom"><span>OBSERVANDO EL ESPACIO</span><span>● SEÑAL ACTIVA</span></div>
      </div>
    </div>
  )
}

function PipelineVisual() {
  return (
    <div className="capability__visual capability__visual--pipeline" aria-hidden="true">
      <div className="cap-pipeline__orbit cap-pipeline__orbit--one" />
      <div className="cap-pipeline__orbit cap-pipeline__orbit--two" />
      <div className="cap-pipeline__track"><span /></div>
      <div className="cap-pipeline__node"><CameraIcon /><span>CÁMARA</span></div>
      <div className="cap-pipeline__node cap-pipeline__node--focus"><PoseIcon /><span>POSTURA</span></div>
      <div className="cap-pipeline__node"><AlertIcon /><span>AVISO</span></div>
    </div>
  )
}

function PatternVisual() {
  const visualRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState(2)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.3 })
    if (visualRef.current) observer.observe(visualRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible || reducedMotion) return undefined
    const timer = window.setInterval(() => setActive((current) => (current + 1) % patternSteps.length), 2300)
    return () => window.clearInterval(timer)
  }, [visible, reducedMotion])

  const selected = reducedMotion ? 2 : active

  return (
    <div className="capability__visual capability__visual--pattern" aria-hidden="true" ref={visualRef}>
      <div className="cap-pattern">
        {patternSteps.map((step, index) => (
          <div className={`cap-pattern__row ${selected === index ? 'cap-pattern__row--active' : ''}`} key={step}>
            <span className="cap-pattern__mark">{String(index + 1).padStart(2, '0')}</span>
            <span>{step}</span>
            {selected === index ? <span className="cap-pattern__check">✓</span> : <span className="cap-pattern__line" />}
          </div>
        ))}
      </div>
    </div>
  )
}

function TelegramVisual() {
  return (
    <div className="capability__visual capability__visual--telegram" aria-hidden="true">
      <div className="cap-telegram">
        <div className="cap-telegram__top"><span className="cap-telegram__plane">↗</span><span>FallDetect</span><small>SIMULACIÓN</small></div>
        <div className="cap-telegram__message"><span className="cap-telegram__alert">● AVISO PREPARADO</span><strong>Posible caída detectada</strong><p>El contacto designado recibe una notificación por Telegram.</p></div>
      </div>
    </div>
  )
}

function GestureVisual() {
  return (
    <div className="capability__visual capability__visual--gesture" aria-hidden="true">
      <div className="cap-gesture__ring">
        <svg className="cap-gesture__hand" viewBox="0 0 100 120" fill="none">
          <path d="M30 67V27a6 6 0 0 1 12 0v29-39a6 6 0 0 1 12 0v39-34a6 6 0 0 1 12 0v37-27a6 6 0 0 1 12 0v48c0 22-13 35-33 35H39c-13 0-21-5-28-17L3 82a6 6 0 0 1 10-7l17 17V67Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
          <path d="M30 67v25M42 56v23M54 56v23M66 59v22" stroke="currentColor" strokeWidth="2" opacity=".38" />
        </svg>
        <span className="cap-gesture__label">GESTO DE AUXILIO</span>
      </div>
      <div className="cap-gesture__cycles"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span></div>
      <span className="cap-gesture__caption">ABRIR Y CERRAR LOS DEDOS</span>
    </div>
  )
}

const cards = [
  {
    title: 'Observación con cámara',
    description: 'Una cámara común capta el espacio del hogar para que el sistema pueda localizar a la persona.',
    visual: <CameraVisual />,
    className: 'capability--small-top',
  },
  {
    title: 'Visión por computadora',
    description: 'OpenCV procesa el video y YOLO estima los puntos clave del cuerpo para seguir la postura.',
    visual: <PipelineVisual />,
    className: 'capability--large-top',
  },
  {
    title: 'Confirmación del patrón',
    description: 'La orientación, el cambio brusco y la inmovilidad posterior ayudan a reconocer una posible caída.',
    visual: <PatternVisual />,
  },
  {
    title: 'Aviso por Telegram',
    description: 'Al reconocer el evento, FallDetect notifica al contacto de confianza designado.',
    visual: <TelegramVisual />,
  },
  {
    title: 'Signal for Help',
    description: 'Cinco ciclos del gesto con la mano ofrecen una segunda vía para pedir auxilio.',
    visual: <GestureVisual />,
  },
]

export default function Capabilities() {
  return (
    <section id="capacidades" className="section capabilities">
      <div className="container">
        <SectionHeading
          number="CAPACIDADES / FALLDETECT"
          title="Una cámara. Dos formas de pedir ayuda."
          description="Estas son las funciones que conectan la observación con una respuesta para la persona de confianza."
        />
        <div className="capabilities__grid">
          {cards.map((card, index) => (
            <Reveal as="article" className={`capability ${card.className || ''}`} key={card.title} delay={index * 0.07}>
              {card.visual}
              <div className="capability__content"><h3>{card.title}</h3><p>{card.description}</p></div>
            </Reveal>
          ))}
        </div>
        <p className="capabilities__note">Las vistas de las tarjetas ilustran el funcionamiento previsto; no muestran datos en vivo.</p>
      </div>
    </section>
  )
}
