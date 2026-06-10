import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'

import GlobalLayout from '@/layouts/GlobalLayout'
import Homepage from '@/pages/Homepage'
import Collections from '@/pages/Collections'
import Lookbook from '@/pages/Lookbook'
import About from '@/pages/About'
import Signup from './pages/Signup'
import Login from './pages/Login'
import AuthLayout from './layouts/AuthLayout'
import Product from './pages/Product'

export default function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AuthLayout />}>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<GlobalLayout />}>
              <Route index element={<Homepage />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/lookbook" element={<Lookbook />} />
              <Route path="/about" element={<About />} />
              <Route path='/product' element={<Product />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}
