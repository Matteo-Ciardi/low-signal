import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

function getSections(product) {
  return [
    {
      title: 'Details & Construction',
      content: [
        product?.description,
        'All seams double-stitched with bonded thread.',
        'Bartacked at all stress points.',
        'Hardware sourced from the same mills across collections.',
      ],
    },
    {
      title: 'Materials',
      content: [
        'Lining (where applicable): 100% cupro.',
        'All materials sourced within 500km of production.',
        'Zero synthetic fill used across any piece.',
      ],
    },
    {
      title: 'Sizing & Fit',
      content: [
        'Model is 6\'1" wearing size L.',
        'All measurements listed in the size guide.',
      ],
    },
    {
      title: 'Care Instructions',
      content: [
        'Machine wash cold, inside out.',
        'Do not bleach. Do not tumble dry.',
        'Hang or lay flat to dry.',
        'Iron on low heat if needed — avoid direct contact with prints.',
        'Waxed pieces: spot clean only. Re-wax annually.',
      ],
    },
    {
      title: 'Shipping & Returns',
      content: [
        'Free standard shipping on orders over €200.',
        'Standard (5–8 days): €12 · Express (2–3 days): €28 · Overnight: €54.',
        'Free returns within 30 days — unworn, original packaging.',
        '3-year structural guarantee on all pieces.',
        'Repair service available beyond guarantee period.',
      ],
    },
  ]
}

export default function ProductAccordion({ product }) {
  const [openIndex, setOpenIndex] = useState(null)

  const sections = getSections(product)

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="border-border border-t">
      {sections.map((section, index) => {
        const isOpen = openIndex === index
        const items = section.content.filter(Boolean)

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

            {isOpen && items.length > 0 && (
              <ul className="space-y-2 pb-5">
                {items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span className="size-1.5 shrink-0 bg-primary" />
                    <span className="text-muted-foreground text-sm leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )
      })}
    </div>
  )
}
