import { ArrowRight } from 'lucide-react'

import Marquee from '@/components/Marquee'
import HomeGrid from '@/components/HomeGrid'

import { collections } from '@/data/collections'

export default function Homepage() {
  return (
    <>
      {/* MARQUEE */}
      <div className="absolute top-13 left-0 z-20 w-full lg:top-14.5">
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
            <button
              onClick={() => {
                document
                  .getElementById('featured')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="btn-primary mb-4"
            >
              SHOP NEW DROPS
              <ArrowRight className="ml-2" size={16} />
            </button>
            <p className="text-mono text-xs">
              LIMITED QUANTITIES - SHIPPING WORLDWIDE
            </p>
          </div>
        </div>
      </section>

      {/* GRIGLIA PRODOTTI */}
      <section className="section-spacing container-editorial">
        <div className="mb-16">
          <span className='text-primary font-display text-2xl lg:text-4xl'>{collections[0].name}</span>
        </div>
        <div className="">
          <HomeGrid />
        </div>
      </section>

      {/* FEATURED / NEW DROP */}
      <section
        id="featured"
        className="bg-card mobile-menu-border scroll-mt-24 lg:flex lg:gap-20"
      >
        <div>
          <img
            src="https://images.unsplash.com/photo-1762666167416-72b1540a76b7?w=900&h=700&fit=crop&auto=format"
            alt="immagine prodotto"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="section-spacing p-10">
          <div>
            <div className="mb-8">
              <span className="text-label text-primary">
                LIMITED DROP - NOME DROP
              </span>
            </div>
            <div className="mb-8 w-50 lg:w-80">
              <h2 className="leading-none">
                BUILT FOR THE
                <span className="text-primary">
                  {' '}
                  STREET, <br />
                </span>
                NOT THE RUNAWAY.
              </h2>
            </div>
            <div className="mb-8">
              <p>Descrizione del prodotto presa dal DB</p>
            </div>
          </div>
          <div className='flex gap-12 items-center'>
            <button className="btn-primary mr-8">
              SHOP NOW
              <ArrowRight className="ml-2" size={16} />
            </button>
            <span className="text-mono font-bold text-foreground">€200</span>
          </div>
        </div>
      </section>

      {/* LOW SIGNAL PRINCIPI */}
      <section className="mobile-menu-border section-spacing">
        <div className="container-editorial lg:px-80">
          <h2 className="text-center leading-tight">
            "WEAR IT UNTIL IT BREAKS.
            <br />
            THEN WEAR IT SOME MORE"
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

            <div className="border-border flex flex-col items-center justify-center border-t py-8 text-center lg:border-t-0 lg:border-l lg:pl-20">
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

            <div className="border-border flex flex-col items-center justify-center border-t py-8 text-center lg:border-t-0 lg:border-l lg:pl-20">
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
            RESERVED AREA
          </p>
          <h2 className="text-center leading-none">
            FIRST ACCES.
            <br />
            NO NOISE
          </h2>
          <p className="mt-4 text-center">
            Drop alerts, early access, and occasional dispatches from the
            underground.
            <br />
            No spam — we don't do that.
          </p>

          {/* CAMPO EMAIL ISCRIZIONE NEWSLETTER */}
          <form className="mt-10 flex justify-around lg:max-w-3xl mx-auto">
            <input
              type="text"
              placeholder="YOUR EMAIL"
              className="input-base"
            />
            <button className="btn-primary">JOIN</button>
          </form>
        </div>
      </section>
    </>
  )
}

;
