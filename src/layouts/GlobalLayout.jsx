import { Outlet } from 'react-router'

import Navbar from '@/components/Navbar'

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
        <h2>Sono il footer</h2>
      </footer>
    </>
  )
}
