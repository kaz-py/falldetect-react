import { processSteps } from '../../data/siteContent.js'
import SectionHeading from '../ui/SectionHeading.jsx'

export default function Process() {
  return (
    <section id="funciona" className="section process">
      <div className="container">
        <SectionHeading
          number="02 / EL PROCESO"
          title="De la imagen a la alerta."
          description="Una secuencia de análisis transforma lo que ve la cámara en una señal útil para la persona de confianza."
        />
        <div className="process__grid">
          {processSteps.map((step) => (
            <article className="process-card" key={step.number}>
              <span className="process-card__number">{step.number}</span>
              <span className="process-card__line" />
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <span className="process-card__detail">{step.detail}</span>
            </article>
          ))}
        </div>
        <div className="process__detail">
          <div><span className="process__detail-indicator" /> Núcleo técnico</div>
          <p>OpenCV captura el video cuadro por cuadro. Ultralytics YOLO estima los puntos clave del cuerpo. FallDetect evalúa la orientación y la velocidad del movimiento; una pérdida brusca de verticalidad seguida de inmovilidad se interpreta como un posible evento de caída y da paso a la alerta por Telegram.</p>
        </div>
      </div>
    </section>
  )
}
