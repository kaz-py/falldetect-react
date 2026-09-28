import { useState } from 'react'

const links = [
  { href: '#proyecto', label: 'El proyecto' },
  { href: '#funciona', label: 'Cómo funciona' },
  { href: '#signal', label: 'Signal for Help' },
  { href: '#visualizacion', label: 'Demostración' },
  { href: '#universidad', label: 'UNAE' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="site-header__inner container">
        <a className="brand" href="#inicio" onClick={() => setOpen(false)} aria-label="FallDetect, ir al inicio">
          <span className="brand__symbol" aria-hidden="true"><span /></span>
          <span>Fall<span className="brand__light">Detect</span></span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="primary-navigation"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((value) => !value)}
        >
          <span /><span /><span />
        </button>
        <nav id="primary-navigation" className={`site-nav ${open ? 'site-nav--open' : ''}`} aria-label="Navegación principal">
          {links.map(({ href, label }) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <a className="site-nav__contact" href="#universidad" onClick={() => setOpen(false)}>Sobre el equipo <span aria-hidden="true">↗</span></a>
        </nav>
      </div>
    </header>
  )
}
