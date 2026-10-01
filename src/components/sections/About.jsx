import Reveal from '../ui/Reveal.jsx'

export default function About() {
  return (
    <section id="universidad" className="about">
      <div className="container about__inner">
        <Reveal className="about__mark" aria-hidden="true">UNAE<span>↗</span></Reveal>
        <Reveal className="about__content" delay={0.12}>
          <span className="about__label">06 / ORIGEN DEL PROYECTO</span>
          <h2>Construido para cuidar.<br />Aprendiendo a crear futuro.</h2>
          <p>FallDetect y Signal for Help fueron desarrollados por estudiantes de primer año de Ingeniería Informática y Ciencia de Datos, en la Facultad de Ciencia, Arte y Tecnología de la Universidad Autónoma de Encarnación.</p>
          <p>Una propuesta que une aprendizaje, visión por computadora y una idea concreta: que nadie tenga que esperar solo después de una caída.</p>
          <a className="button button--dark" href="#inicio">Volver al inicio <span aria-hidden="true">↑</span></a>
        </Reveal>
      </div>
    </section>
  )
}
