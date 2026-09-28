export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div>
          <a className="brand brand--footer" href="#inicio"><span className="brand__symbol" aria-hidden="true"><span /></span>Fall<span className="brand__light">Detect</span></a>
          <p>Tecnología puesta al servicio del cuidado.</p>
          <p>Modelo de mano: <a href="https://github.com/emmalieker/anatomical-hand-model" target="_blank" rel="noreferrer">Emma L. D. Lieker</a> · CC BY-NC 4.0.</p>
          <p>Figura 3D: <a href="https://github.com/UMRAM-Bilkent/supine-human-model" target="_blank" rel="noreferrer">Quaternius / UMRAM</a> · CC0.</p>
        </div>
        <p>Proyecto de Ingeniería Informática y Ciencia de Datos<br />Universidad Autónoma de Encarnación · 2026</p>
        <a href="#inicio" className="footer-top">Volver arriba ↑</a>
      </div>
    </footer>
  )
}
