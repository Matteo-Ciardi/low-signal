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

        {/* Contatore mobile */}
        <span className="text-mono text-muted absolute right-4 bottom-4 text-xs lg:hidden">
          {String(currentIndex + 1).padStart(2, '0')} /{' '}
          {String(images.length).padStart(2, '0')}
        </span>

        {/* Contatore desktop */}
        <span className="text-mono text-foreground bg-background/80 absolute bottom-4 left-4 hidden px-2 py-1 text-xs lg:block">
          {String(currentIndex + 1).padStart(2, '0')} /{' '}
          {String(images.length).padStart(2, '0')}
        </span>

        {/* Frecce desktop (sopra l'immagine, basso a destra) */}
        <div className="absolute right-4 bottom-4 hidden gap-2 lg:flex">
          <button
            type="button"
            onClick={() => goTo(currentIndex - 1)}
            className="border-border bg-background/80 text-foreground flex h-9 w-9 items-center justify-center border transition-colors hover:bg-background"
            aria-label="Previous image"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => goTo(currentIndex + 1)}
            className="border-border bg-background/80 text-foreground flex h-9 w-9 items-center justify-center border transition-colors hover:bg-background"
            aria-label="Next image"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Controlli mobile */}
      <div className="mt-2 flex items-center justify-between px-1 lg:hidden">
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

      {/* Strip thumbnail desktop */}
      <div className="mt-2 hidden grid-cols-4 gap-2 lg:grid">
        {images.map((img, i) => (
          <button
            key={img.id || i}
            type="button"
            onClick={() => setCurrentIndex(i)}
            className={`aspect-[4/3] overflow-hidden transition-all ${
              i === currentIndex
                ? 'border-b-2 border-primary opacity-100'
                : 'border-b-2 border-transparent opacity-50 hover:opacity-75'
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
    </div>
  )
}
