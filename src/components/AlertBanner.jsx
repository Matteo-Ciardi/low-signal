import { X } from 'lucide-react'
import { useAlert } from '@/context/AlertContext'

export default function AlertBanner() {
  const { alert, hideAlert } = useAlert()

  if (!alert) return null

  const colors =
    alert.type === 'error'
      ? 'border-destructive text-red-500'
      : 'border-green-500 text-green-500'

  return (
    <div
      className={`fixed top-4 left-1/2 z-[9999] -translate-x-1/2 surface-card border ${colors} rounded-lg px-4 py-3 shadow-lg flex items-center gap-3 max-w-md`}
    >
      <p className="text-sm">{alert.message}</p>
      <button onClick={hideAlert} className="ml-auto shrink-0">
        <X size={16} />
      </button>
    </div>
  )
}
