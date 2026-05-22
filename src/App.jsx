import { BrowserRouter, Routes, Route } from 'react-router-dom'

import GlobalLayout from '@/layouts/GlobalLayout'
import Homepage from '@/pages/Homepage'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<GlobalLayout />}>
            <Route index element={<Homepage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
