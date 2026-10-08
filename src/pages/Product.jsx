import { useCallback, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowRight, Loader2 } from 'lucide-react'

import { useProduct } from '@/hooks/useProduct'
import { useProducts } from '@/hooks/useProducts'
import { useCart } from '@/context/CartContext'

import ProductImageCarousel from '@/components/product/ProductImageCarousel'
import SizeSelector from '@/components/product/SizeSelector'
import TrustBadges from '@/components/product/TrustBadges'
import ProductAccordion from '@/components/product/ProductAccordion'
import RelatedProducts from '@/components/product/RelatedProducts'
import SizeGuideModal from '@/components/modal/SizeGuideModal'

export default function Product() {
  const { slug } = useParams()
  const { product, loading, error } = useProduct(slug)
  const { products: allProducts } = useProducts()

  const [selectedSize, setSelectedSize] = useState(null)
  const [addedToCart, setAddedToCart] = useState(false)
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false)

  const openSizeGuide = useCallback(() => setIsSizeGuideOpen(true), [])
  const closeSizeGuide = useCallback(() => setIsSizeGuideOpen(false), [])

  const { addItem, openCart } = useCart()

  const relatedProducts = useMemo(() => {
    if (!product || !allProducts.length) return []
    return allProducts
      .filter(
        (p) => p.collectionId === product.collectionId && p.id !== product.id
      )
      .slice(0, 4)
  }, [product, allProducts])

  const handleAddToCart = () => {
    if (!selectedSize || !product) return
    addItem(product, selectedSize)
    openCart()
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="text-muted animate-spin" size={24} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="font-mono text-sm text-red-500">OFFLINE SIGNAL</p>
        <p className="text-muted text-sm">{error}</p>
        <Link to="/" className="btn-secondary mt-4">
          BACK TO HOME
        </Link>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="font-mono text-sm text-red-500">PRODUCT NOT FOUND</p>
        <Link to="/" className="btn-secondary mt-4">
          BACK TO HOME
        </Link>
      </div>
    )
  }

  const bannerImage =
    product.images?.find((img) => img.isPrimary)?.imageUrl ||
    product.images?.[0]?.imageUrl

  return (
    <section className="pt-20 pb-6">
      {/* GRIGLIA PRODOTTO DESKTOP */}
      <div className="lg:grid lg:grid-cols-2">
        {/* COLONNA IMMAGINI */}
        <div className="lg:border-border px-6 lg:border-r lg:px-0">
          <ProductImageCarousel
            images={product.images}
            tag={product.tag}
            name={product.name}
          />
        </div>

        {/* COLONNA INFORMAZIONI */}
        <div className="px-6 lg:px-12 lg:pt-10">
          {/* CATEGORIA */}
          <p className="text-label text-primary mb-2 font-mono text-xs uppercase">
            {product.collectionName}
          </p>

          {/* TITOLO */}
          <h2 className="text-foreground font-display mb-4 text-3xl leading-tight uppercase lg:text-7xl">
            {product.name}
          </h2>

          {/* PREZZO */}
          <div className="mb-6 flex items-baseline gap-3">
            <span className="text-foreground font-mono text-2xl font-bold">
              € {product.price?.toFixed(2)}
            </span>
          </div>

          {/* DESCRIZIONE */}
          {product.description && (
            <p className="text-muted-foreground lg:border-border mb-8 max-w-md text-sm leading-relaxed lg:mb-0 lg:border-b lg:pb-8">
              {product.description}
            </p>
          )}

          {/* SELEZIONE TAGLIE */}
          <div className={product.description ? 'lg:pt-8' : ''}>
            <SizeSelector
              variants={product.variants}
              selectedSize={selectedSize}
              onSelectSize={setSelectedSize}
              onSizeGuide={openSizeGuide}
            />
          </div>

          {/* AGGIUNGI AL CARRELLO */}
          <button
            type="button"
            className="btn-primary mt-4 w-full"
            disabled={!selectedSize}
            onClick={handleAddToCart}
          >
            {addedToCart
              ? 'ADDED'
              : `ADD TO CART — € ${product.price?.toFixed(2)}`}
            <ArrowRight size={16} className="ml-2 hidden lg:block" />
          </button>

          {/* BUY NOW */}
          <div className="mt-4 text-center lg:text-left">
            {/* Mobile: link testuale */}
            <button
              type="button"
              className="text-muted hover:text-foreground inline-flex items-center gap-2 font-mono text-xs uppercase transition-colors lg:hidden"
            >
              BUY NOW
              <ArrowRight size={14} />
            </button>
            {/* Desktop: bottone pieno bordato */}
            <button
              type="button"
              className="text-foreground border-border hidden h-12 w-full items-center justify-center gap-2 border font-mono text-xs font-bold tracking-wide uppercase transition-colors hover:bg-white/5 lg:inline-flex"
            >
              BUY NOW
              <ArrowRight size={14} />
            </button>
          </div>

          {/* TRUST BADGES */}
          <TrustBadges />

          {/* ACCORDION DETTAGLI */}
          <ProductAccordion product={product} />
        </div>
      </div>

      {/* BANNER FULL-WIDTH */}
      <div className="bg-card relative my-8 flex h-64 w-full items-end overflow-hidden lg:h-55 lg:items-center">
        {bannerImage && (
          <img
            src={bannerImage}
            alt={product.collectionName}
            className="absolute inset-y-0 right-0 hidden w-[30%] object-cover lg:block"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent lg:hidden" />
        <div className="from-card via-card/70 absolute inset-0 hidden bg-linear-to-r to-transparent lg:block" />
        <div className="relative z-10 p-6 lg:px-10">
          <h3 className="font-display lg:text-muted-foreground/40 text-4xl leading-none tracking-tight uppercase lg:text-[112px]">
            {product.collectionName}
          </h3>
        </div>
      </div>

      {/* PRODOTTI CORRELATI */}
      <div className="container-editorial">
        <RelatedProducts
          products={relatedProducts}
          collectionName={product.collectionName}
          collectionId={product.collectionId}
        />
      </div>

      {/* MODALE SIZE GUIDE */}
      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={closeSizeGuide} />
    </section>
  )
}
