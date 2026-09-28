import { showcaseStates } from '../../data/siteContent.js'
import SectionHeading from '../ui/SectionHeading.jsx'

function Preview({ variant }) {
  return (
    <div className={`preview preview--${variant}`} aria-hidden="true">
      <div className="preview__top"><span>CAM 01 / HOGAR</span><span>● REC</span></div>
      <div className="preview__image" />
      <span className="preview__bounding" />
      <div className="preview__bottom"><span>FALLDETECT · VIDEO</span><span>00:04:28</span></div>
    </div>
  )
}

export default function Showcase() {
  return (
    <section id="visualizacion" className="section showcase">
      <div className="container">
        <SectionHeading
          number="05 / VISUALIZACIÓN"
          title="De la caída al aviso."
          description="Mira una simulación de 14 segundos: una caída en casa, su detección y la alerta que recibe su hija."
        />
        <figure className="showcase__film">
          <div className="showcase__film-top">
            <span>Demostración animada</span>
            <span>00:14</span>
          </div>
          <video
            className="showcase__video"
            controls
            playsInline
            preload="none"
            poster="/img/falldetect-demo-poster.png"
            aria-label="Simulación de FallDetect: observación, detección de caída y envío de una alerta"
          >
            <source src="/video/falldetect.mp4" type="video/mp4" />
            Tu navegador no puede reproducir este video. <a href="/video/falldetect.mp4">Abrir la demostración</a>.
          </video>
          <figcaption>Secuencia conceptual; no es una grabación del sistema en funcionamiento.</figcaption>
        </figure>
        <h3 className="showcase__states-title">El flujo en tres momentos</h3>
        <div className="showcase__grid">
          {showcaseStates.map((item) => (
            <article className="showcase-card" key={item.code}>
              <Preview variant={item.variant} />
              <div className="showcase-card__text"><span>{item.code} / {item.status}</span><h3>{item.title}</h3><p>{item.description}</p></div>
            </article>
          ))}
        </div>
        <p className="showcase__note">Las imágenes también son ilustrativas. Las capturas reales del programa pueden incorporarse aquí cuando estén disponibles.</p>
      </div>
    </section>
  )
}
