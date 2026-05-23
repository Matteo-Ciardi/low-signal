import { BrowserRouter, Routes, Route } from 'react-router-dom'

import GlobalLayout from '@/layouts/GlobalLayout'
import Homepage from '@/pages/Homepage'
import Collections from '@/pages/Collections'
import Lookbook from '@/pages/Lookbook'
import About from '@/pages/About'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<GlobalLayout />}>
            <Route index element={<Homepage />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/lookbook" element={<Lookbook />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
