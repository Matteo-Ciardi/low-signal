import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const sections = [
  { title: 'Details & Construction', content: '' },
  { title: 'Materials', content: '' },
  { title: 'Sizing & Fit', content: '' },
  { title: 'Care Instructions', content: '' },
  { title: 'Shipping & Returns', content: '' },
]

export default function ProductAccordion() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="border-border border-t">
      {sections.map((section, index) => {
        const isOpen = openIndex === index

        return (
          <div key={section.title} className="border-border border-t">
            <button
              type="button"
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between py-5"
            >
              <span className="font-mono text-xs font-bold tracking-wide uppercase">
                {section.title}
              </span>
              <ChevronDown
                size={16}
                className={`text-muted transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isOpen && section.content && (
              <div className="text-muted-foreground pb-5 text-sm leading-relaxed">
                {section.content}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
