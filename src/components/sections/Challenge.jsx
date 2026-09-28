import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'

export default function Challenge() {
  return (
    <section id="proyecto" className="section challenge">
      <div className="container">
        <SectionHeading
          number="01 / EL CONTEXTO"
          title="El tiempo después de una caída importa."
          description="La atención temprana puede marcar una diferencia cuando una persona vive sola o pasa muchas horas sin compañía."
        />
        <Reveal className="challenge__layout">
          <div className="challenge__stat">
            <span className="challenge__stat-value">28–35<span>%</span></span>
            <p>de las personas mayores de 65 años sufren una caída cada año, según el informe mundial de la OMS.</p>
            <a href="https://www.who.int/publications/i/item/9789241563536" target="_blank" rel="noreferrer">Fuente: Organización Mundial de la Salud ↗</a>
          </div>
          <div className="challenge__copy">
            <p>El riesgo no termina con la caída. Si nadie está cerca, pueden pasar horas antes de que llegue ayuda. FallDetect nace para observar ese momento crítico y activar un aviso sin depender de que la persona pueda pedirlo.</p>
            <div className="challenge__note"><span className="challenge__note-icon">+</span><p>El proyecto también incorpora una segunda vía de auxilio mediante un gesto de la mano frente a la cámara.</p></div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
