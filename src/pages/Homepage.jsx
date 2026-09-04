import { useEffect, useState, useCallback } from 'react'
import { ArrowRight } from 'lucide-react'
import { useForm } from 'react-hook-form'

import Marquee from '@/components/Marquee'
import HomeGrid from '@/components/HomeGrid'
import QuickAddModal from '@/components/modal/QuickAddModal'
import { useQuickAdd } from '@/hooks/useQuickAdd'
import { useAlert } from '@/context/AlertContext'
import api from '@/services/api'

export default function Homepage() {
  const { isOpen, product, open, close } = useQuickAdd()
  const { showAlert } = useAlert()
  const [featuredProduct, setFeaturedProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  // STATO PER IL TITOLO DINAMICO DELLA SEZIONE (Fallback iniziale sicuro)
  const [collectionName, setCollectionName] = useState('COLLECTION')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      await api.post('/newsletter', { email: data.email })
      reset()
      showAlert('Iscrizione alla newsletter completata!', 'success')
    } catch (error) {
      console.error("Errore durante l'iscrizione:", error)
      showAlert("Errore durante l'iscrizione. Riprova.")
    }
  }

  useEffect(() => {
    const fetchFeaturedProduct = async () => {
      try {
        const response = await api.get(`/products`)

        const limitedProduct = response.data.find(
          (prod) => prod.tag === 'LIMITED'
        )

        if (limitedProduct) {
          setFeaturedProduct(limitedProduct)
        }
      } catch (error) {
        console.error('Errore nel recupero del prodotto in evidenza:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProduct()
  }, [])

  // CALLBACK PER AGGIORNARE IL TITOLO IN BASE AI PRODOTTI FILTRATI DALLA GRIGLIA
  const handleProductsLoaded = useCallback((products) => {
    const firstProduct = products[0]

    // Se ci sono prodotti e contengono la proprietà collectionName, aggiorna lo stato
    if (firstProduct && firstProduct.collectionName) {
      setCollectionName(firstProduct.collectionName)
    }
  }, [])

  const featuredImage =
    featuredProduct?.images?.find((img) => img.isPrimary)?.imageUrl ||
    featuredProduct?.images?.[0]?.imageUrl ||
    ''

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
        <div className="container-editorial relative z-20 flex h-screen flex-col justify-end bottom-10">
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
          <span className="text-primary font-display text-2xl tracking-wider uppercase lg:text-4xl">
            {collectionName}
          </span>
        </div>
        <div>
          {/* PASSAGGIO DELLA CALLBACK A HOMEGRID */}
          <HomeGrid onProductsLoaded={handleProductsLoaded} />
        </div>
      </section>

      {/* FEATURED / NEW DROP */}
      {!loading && featuredProduct && (
        <section
          id="featured"
          className="bg-card mobile-menu-border scroll-mt-24 lg:flex lg:gap-20"
        >
          <div className="lg:w-1/2">
            <div className="aspect-5/4 h-full w-full overflow-hidden bg-white/5">
              {featuredImage && (
                <img
                  src={featuredImage}
                  alt={featuredProduct.name}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          </div>
          <div className="section-spacing p-10">
            <div>
              <div className="mb-8">
                <span className="text-label text-primary font-mono text-xs tracking-wider uppercase">
                  LIMITED DROP - {featuredProduct.name}
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
                <p className="text-foreground/80 leading-relaxed">
                  {featuredProduct.description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-12">
              <button
                onClick={() => open(featuredProduct)}
                className="btn-primary mr-8"
              >
                SHOP NOW
                <ArrowRight className="ml-2" size={16} />
              </button>
              <span className="text-mono text-foreground text-lg font-bold">
                € {featuredProduct.price?.toFixed(2)}
              </span>
            </div>
          </div>
        </section>
      )}

      {/* MODALE QUICK ADD */}
      <QuickAddModal isOpen={isOpen} product={product} onClose={close} />

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
            FIRST ACCESS.
            <br />
            NO NOISE
          </h2>
          <p className="mt-4 text-center">
            Drop alerts, early access, and occasional dispatches from the
            underground.
            <br />
            No spam — we don't do that.
          </p>

          <form
            className="mx-auto mt-10 flex justify-around lg:max-w-3xl"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="email"
              placeholder="YOUR EMAIL"
              className="input-base"
              {...register('email', {
                required: "'email e' obbligatoria",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Indirizzo email non valido',
                },
              })}
            />
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? '...' : 'JOIN'}
            </button>
          </form>
          {errors.email && (
            <p className="mt-1 text-center text-xs text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>
      </section>
    </>
  )
}
