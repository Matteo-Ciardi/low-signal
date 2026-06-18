import { useState, useEffect } from 'react'
import QuickAddSheet from './QuickAddSheet'
import QuickAddDesktop from './QuickAddDesktop'

export default function QuickAddManager(props) {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    // Funzione per verificare se lo schermo è >= 1024px (lg di Tailwind)
    const mediaQuery = window.matchMedia('(min-width: 1024px)')

    // Set iniziale
    setIsDesktop(mediaQuery.matches)

    // Listener per i cambi di dimensione dello schermo
    const handler = (e) => setIsDesktop(e.matches)
    mediaQuery.addEventListener('change', handler)

    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Passa le stesse identiche props al componente corretto in base al dispositivo
  if (isDesktop) {
    return <QuickAddDesktop {...props} />
  }

  return <QuickAddSheet {...props} />
}
