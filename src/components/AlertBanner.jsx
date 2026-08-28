import { useEffect } from 'react'
import { X } from 'lucide-react'
import { useAlert } from '@/context/AlertContext'

export default function AlertBanner() {
  const { alert, hideAlert } = useAlert()

  useEffect(() => {
    if (!alert) return
    const timer = setTimeout(() => {
      hideAlert()
    }, 5000)
    return () => clearTimeout(timer)
  }, [alert, hideAlert])

  if (!alert) return null

  const colors =
    alert.type === 'error'
      ? 'border-destructive text-red-500'
      : 'border-green-500 text-green-500'

  return (
    <div
      className={`surface-card fixed top-4 left-1/2 z-9999 -translate-x-1/2 border ${colors} flex max-w-md items-center gap-3 rounded-lg px-4 py-3 shadow-lg`}
    >
      <p className="text-sm">{alert.message}</p>
      <button onClick={hideAlert} className="ml-auto shrink-0">
        <X size={16} />
      </button>
    </div>
  )
}
