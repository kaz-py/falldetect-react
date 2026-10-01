import Reveal from './Reveal.jsx'

export default function SectionHeading({ number, title, description, light = false }) {
  return (
    <Reveal className={`section-heading ${light ? 'section-heading--light' : ''}`}>
      <span className="section-heading__number">{number}</span>
      <div>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
    </Reveal>
  )
}
