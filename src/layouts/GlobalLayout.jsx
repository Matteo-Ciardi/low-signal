import { Outlet } from 'react-router'

export default function GlobalLayout() {
  return (
    <>
      <header>
        <h2>Sono la navbar</h2>
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
