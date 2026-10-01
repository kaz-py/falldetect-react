import { principles } from '../../data/siteContent.js'
import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'

export default function Principles() {
  return (
    <section id="fundamentos" className="section principles">
      <div className="container">
        <SectionHeading
          number="04 / FUNDAMENTOS"
          title="Tecnología útil, pensada para el hogar."
          description="El proyecto combina herramientas de visión y una lógica de respuesta centrada en el cuidado."
        />
        <div className="principles__grid">
          {principles.map((item, index) => (
            <Reveal as="article" className="principle" key={item.title} delay={index * 0.08}>
              <span className="principle__index">{String(index + 1).padStart(2, '0')}</span>
              <div><h3>{item.title}</h3><p>{item.description}</p></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
