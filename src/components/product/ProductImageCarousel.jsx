import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const tagClasses = {
  RESTOCKED: 'bg-background text-foreground',
  'NEW DROP': 'bg-primary text-background',
  LIMITED: 'bg-foreground text-background',
  'SOLD OUT': 'bg-secondary text-foreground',
}

export default function ProductImageCarousel({ images = [], tag, name }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (images.length === 0) return null

  const goTo = (index) => {
    if (index < 0) setCurrentIndex(images.length - 1)
    else if (index >= images.length) setCurrentIndex(0)
    else setCurrentIndex(index)
  }

  return (
    <div className="mb-6">
      <div className="bg-card relative aspect-[4/5] w-full overflow-hidden">
        <span
          className={`text-label absolute top-4 left-4 z-20 inline-flex px-3 py-2 font-bold ${
            tagClasses[tag] ?? 'bg-card text-foreground'
          }`}
        >
          {tag || 'NEW DROP'}
        </span>

        <img
          src={images[currentIndex]?.imageUrl}
          alt={name}
          className="h-full w-full object-cover"
        />

        <span className="text-mono text-muted absolute right-4 bottom-4 text-xs">
          {String(currentIndex + 1).padStart(2, '0')} /{' '}
          {String(images.length).padStart(2, '0')}
        </span>
      </div>

      <div className="mt-2 flex items-center justify-between px-1">
        <button
          type="button"
          onClick={() => goTo(currentIndex - 1)}
          className="text-muted p-2 transition-colors hover:text-foreground"
          aria-label="Previous image"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={img.id || i}
              type="button"
              onClick={() => setCurrentIndex(i)}
              className={`aspect-square w-16 overflow-hidden border-2 transition-all ${
                i === currentIndex
                  ? 'border-foreground'
                  : 'border-transparent opacity-50 hover:opacity-75'
              }`}
            >
              <img
                src={img.imageUrl}
                alt={`${name} view ${i + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(currentIndex + 1)}
          className="text-muted p-2 transition-colors hover:text-foreground"
          aria-label="Next image"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}
