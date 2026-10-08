import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

import { useModal } from '@/hooks/useModal'

// Tabella taglie — valori in pollici, dal design Figma
const SIZE_ROWS = [
  { size: 'XS', values: ['34–36"', '27–29"', '35–37"', '27"'] },
  { size: 'S', values: ['36–38"', '29–31"', '37–39"', '27.5"'] },
  { size: 'M', values: ['38–40"', '31–33"', '39–41"', '28"'] },
  { size: 'L', values: ['40–42"', '33–35"', '41–43"', '28.5"'] },
  { size: 'XL', values: ['42–44"', '35–37"', '43–45"', '29"'] },
]

const COLUMNS = ['Chest', 'Waist', 'Hip', 'Length']

export default function SizeGuideModal({ isOpen, onClose }) {
  // Scroll lock + chiudi con ESC
  useModal(isOpen, onClose)

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-1200 flex items-center justify-center px-4">
      {/* BACKDROP */}
      <button
        type="button"
        aria-label="Chiudi size guide"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* CARD */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="size-guide-title"
        className="bg-card border-border relative z-10 max-h-[90vh] w-full max-w-xl overflow-y-auto border shadow-2xl lg:zoom-[1.1]"
      >
        {/* HEADER */}
        <div className="border-border flex items-center justify-between border-b px-8 py-5">
          <h3
            id="size-guide-title"
            className="text-foreground font-mono text-[10px] leading-[15px] font-bold tracking-[2px] uppercase"
          >
            Size Guide
          </h3>

          <button
            type="button"
            onClick={onClose}
            aria-label="Chiudi size guide"
            className="text-muted-foreground flex size-5 items-center justify-center transition-colors hover:text-white"
          >
            <X size={18} strokeWidth={1.6} />
          </button>
        </div>

        {/* CORPO */}
        <div className="flex flex-col gap-6 p-8">
          {/* TABELLA TAGLIE */}
          <table className="border-border w-full table-fixed border-collapse">
            <colgroup>
              <col className="w-[16.4%]" />
              <col className="w-[20.9%]" />
              <col className="w-[20.9%]" />
              <col className="w-[20.9%]" />
              <col className="w-[20.9%]" />
            </colgroup>

            <thead>
              <tr>
                <th
                  scope="col"
                  className="text-primary border-border h-[36.5px] border-b text-left align-middle font-mono text-[9px] leading-3 font-bold tracking-[1.8px] uppercase"
                >
                  Size
                </th>
                {COLUMNS.map((column) => (
                  <th
                    key={column}
                    scope="col"
                    className="text-primary border-border h-[36.5px] border-b text-left align-middle font-mono text-[9px] leading-3 font-bold tracking-[1.8px] uppercase"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {SIZE_ROWS.map((row) => (
                <tr key={row.size}>
                  <td className="text-primary border-border h-[45px] border-b align-middle font-mono text-xs leading-4 font-bold">
                    {row.size}
                  </td>
                  {row.values.map((value, index) => (
                    <td
                      key={`${row.size}-${COLUMNS[index]}`}
                      className="text-muted-foreground border-border h-[45px] border-b align-middle font-mono text-xs leading-4"
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* NOTA */}
          <p className="text-muted-foreground font-body text-[9px] leading-[14.625px] tracking-[0.45px]">
            All measurements in inches. Model is 6&apos;1&quot; wearing size L.
            When in doubt, size up — our silhouettes are intentionally generous.
          </p>
        </div>
      </div>
    </div>,
    document.body
  )
}
