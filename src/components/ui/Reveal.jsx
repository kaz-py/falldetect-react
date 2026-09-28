import { motion, useReducedMotion } from 'framer-motion'

export default function Reveal({ children, className, as = 'div', delay = 0, ...props }) {
  const reducedMotion = useReducedMotion()
  const Component = motion[as] || motion.div

  return (
    <Component
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 34, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: reducedMotion ? 0 : 0.8, delay: reducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </Component>
  )
}
