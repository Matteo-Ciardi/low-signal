import { Outlet } from 'react-router-dom'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CartSidebar from '@/components/cart/CartSidebar'

export default function GlobalLayout() {
  return (
    <>
      <header className="relative">
        <div className="fixed top-0 left-0 z-1000 w-full">
          <Navbar />
        </div>
      </header>

      <CartSidebar />

      <main>
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  )
}
