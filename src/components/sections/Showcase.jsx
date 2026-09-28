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
          title="Así se entiende el flujo."
          description="Tres estados ilustrativos muestran cómo el sistema observa, interpreta y responde."
        />
        <div className="showcase__grid">
          {showcaseStates.map((item) => (
            <article className="showcase-card" key={item.code}>
              <Preview variant={item.variant} />
              <div className="showcase-card__text"><span>{item.code} / {item.status}</span><h3>{item.title}</h3><p>{item.description}</p></div>
            </article>
          ))}
        </div>
        <p className="showcase__note">Visualizaciones conceptuales. Las capturas reales del programa pueden incorporarse aquí cuando estén disponibles.</p>
      </div>
    </section>
  )
}
