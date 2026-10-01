export const processSteps = [
  {
    number: '01',
    title: 'Captura',
    description: 'Una cámara común observa el espacio y envía video a la computadora.',
    detail: 'Cámara + OpenCV',
  },
  {
    number: '02',
    title: 'Interpretación',
    description: 'YOLO localiza a la persona y estima los puntos clave de su postura.',
    detail: 'Visión por computadora',
  },
  {
    number: '03',
    title: 'Confirmación',
    description: 'El sistema busca un cambio brusco de vertical a horizontal y la inmovilidad posterior.',
    detail: 'Patrón de caída',
  },
  {
    number: '04',
    title: 'Aviso',
    description: 'Cuando reconoce el evento, envía una notificación por Telegram al contacto designado. También se puede configurar una llamada telefónica con costo adicional.',
    detail: 'Alerta automática',
  },
]

export const principles = [
  {
    title: 'Visión aplicada',
    description: 'OpenCV procesa el video cuadro por cuadro. Ultralytics YOLO identifica personas y estima la postura corporal sin sensores adicionales.',
  },
  {
    title: 'Contexto del movimiento',
    description: 'La orientación, la velocidad del cambio y el tiempo de inmovilidad ayudan a distinguir una caída de un movimiento cotidiano.',
  },
  {
    title: 'Dos vías de alerta',
    description: 'Una caída confirmada o cinco ciclos del gesto de auxilio pueden iniciar un aviso por Telegram.',
  },
  {
    title: 'Uso doméstico',
    description: 'El proyecto está pensado para funcionar en una computadora y una cámara dentro del hogar.',
  },
]

export const showcaseStates = [
  {
    code: 'A',
    title: 'Observación',
    status: 'Persona detectada',
    description: 'La cámara capta el entorno y el sistema localiza la figura humana.',
    variant: 'observation',
  },
  {
    code: 'B',
    title: 'Análisis',
    status: 'Postura estimada',
    description: 'Los puntos corporales permiten seguir la orientación y el movimiento.',
    variant: 'analysis',
  },
  {
    code: 'C',
    title: 'Respuesta',
    status: 'Alerta preparada',
    description: 'Si se confirma el patrón de riesgo, se notifica al contacto de confianza.',
    variant: 'response',
  },
]
