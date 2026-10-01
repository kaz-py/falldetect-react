import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import Hero from './components/sections/Hero.jsx'
import Challenge from './components/sections/Challenge.jsx'
import Process from './components/sections/Process.jsx'
import Capabilities from './components/sections/Capabilities.jsx'
import Signal from './components/sections/Signal.jsx'
import Principles from './components/sections/Principles.jsx'
import Showcase from './components/sections/Showcase.jsx'
import About from './components/sections/About.jsx'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <Header />
      <main id="contenido">
        <Hero />
        <Challenge />
        <Process />
        <Capabilities />
        <Signal />
        <Principles />
        <Showcase />
        <About />
      </main>
      <Footer />
    </>
  )
}
