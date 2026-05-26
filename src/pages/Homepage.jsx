import { motion } from 'motion/react'

import { ArrowRight } from 'lucide-react'
import Marquee from '@/components/Marquee'

export default function Homepage() {
  return (
    <>
      {/* MARQUEE */}
      <div className="absolute top-10 left-0 z-20 w-full lg:top-14.5">
        <Marquee />
      </div>

      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1756276900419-868625adff43?w=1600&h=1000&fit=crop&auto=format"
            alt="immagine hero"
            className="h-full w-full object-cover"
          />
        </div>

        {/* OVERLAY */}
        <div className="from-background via-background/40 to-background absolute inset-0 bg-linear-to-t" />

        {/* CONTENUTO */}
        <div className="container-editorial relative z-20 flex h-screen flex-col justify-end pb-20">
          <div className="mb-10">
            <h1>NO</h1>
            <h1 className="text-primary">RULES</h1>
            <h1>JUST RAWS</h1>
          </div>
          <div>
            <button className="btn-primary mb-4">
              SHOP NEW DROPS
              <ArrowRight className="ml-2" size={16} />
            </button>
            <p className="text-mono text-xs">
              QUANTITA' LIMITATE - SPEDIZIONI IN TUTTO IL MONDO
            </p>
          </div>
        </div>
      </section>

      {/* LOW SIGNAL PRINCIPI */}
      <section className="mobile-menu-border section-spacing">
        <div className="container-editorial lg:px-80">
          <h2 className="text-center leading-tight">
            "WEAR IT UNTIL IT BREAKS. THEN WEAR IT SOME MORE"
          </h2>
          <div className="bg-card mt-20 flex flex-col justify-center lg:flex-row lg:justify-around">
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <span className="text-primary mb-4 font-mono text-3xl font-bold">
                01
              </span>
              <span className="font-body text-foreground mb-4 text-xl font-bold">
                MATERIAL TRUTH
              </span>
              <div className="w-70">
                <p>
                  We use fabrics that improve with age. No synthetic shortcuts.
                </p>
              </div>
            </div>

            <div className="border-t lg:border-t-0 lg:border-l border-border flex flex-col items-center justify-center py-8 text-center lg:pl-20">
              <span className="text-primary mb-4 font-mono text-3xl font-bold">
                02
              </span>
              <span className="font-body text-foreground mb-4 text-xl font-bold">
                ANTI-TREND
              </span>
              <div className="w-70">
                <p>
                  We use fabrics that improve with age. No synthetic shortcuts.
                </p>
              </div>
            </div>

            <div className="border-t lg:border-t-0 lg:border-l border-border flex flex-col items-center justify-center py-8 text-center lg:pl-20">
              <span className="text-primary mb-4 font-mono text-3xl font-bold">
                03
              </span>
              <span className="font-body text-foreground mb-4 text-xl font-bold">
                MADE TO LAST
              </span>
              <p className="w-70">
                We use fabrics that improve with age. No synthetic shortcuts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="surface-card section-spacing">
        <div className="container-editorial">
          <p className="text-mono text-primary mb-4 text-center">
            AREA RISERVATA
          </p>
          <h2 className="text-center leading-none">
            ACCEDI SUBITO.
            <br />
            SENZA RUMORE
          </h2>
          <p className="mt-4 text-center">
            Avvisi sui nuovi lanci, accesso anticipato e qualche annuncio
            dall'underground.
            <br />
            Niente spam, noi non lo facciamo.
          </p>

          {/* CAMPO EMAIL ISCRIZIONE NEWSLETTER */}
          <form className="mt-10 flex justify-around lg:mx-150">
            <input
              type="text"
              placeholder="LA TUA EMAIL"
              className="input-base"
            />
            <button className="btn-primary">UNISCITI</button>
          </form>
        </div>
      </section>
    </>
  )
}
