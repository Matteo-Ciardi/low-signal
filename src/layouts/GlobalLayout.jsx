import { Outlet } from 'react-router'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function GlobalLayout() {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  )
}
