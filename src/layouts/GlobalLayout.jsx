import { Outlet } from 'react-router'

import MobileNavbar from '@/components/MobileNavbar'

export default function GlobalLayout() {
  return (
    <>
      <header>
        <MobileNavbar />
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
