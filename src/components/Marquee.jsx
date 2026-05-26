import { motion } from 'framer-motion'

const marqueeItems = [
  "QUANTITA' LIMITATE",
  'SPEDIZIONE GRATUITA OLTRE €200',
  'SPEDIZIONI IN TUTTO IL MONDO',
  'NUOVO DROP',
]

export default function Marquee() {
  return (
    <div className="bg-primary flex h-8 items-center overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 60,
        }}
      >
        {[...Array(4)].map((_, loopIndex) => (
          <div key={loopIndex} className="flex items-center">
            {marqueeItems.map((item, itemIndex) => (
              <span
                key={`${loopIndex}-${itemIndex}`}
                className="text-mono text-background px-8 text-xs font-bold tracking-[0.25em]"
              >
                {item}
                <span className="ml-15">/</span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
