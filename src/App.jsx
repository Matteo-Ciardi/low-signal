import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'
import { AlertProvider } from './context/AlertContext'
import { CartProvider } from './context/CartContext'
import AlertBanner from '@/components/AlertBanner'
import ScrollToTop from '@/components/ScrollToTop'

import GlobalLayout from '@/layouts/GlobalLayout'
import Homepage from '@/pages/Homepage'
import Collections from '@/pages/Collections'
import Lookbook from '@/pages/Lookbook'
import About from '@/pages/About'
import Signup from './pages/Signup'
import Login from './pages/Login'
import AuthLayout from './layouts/AuthLayout'
import Product from './pages/Product'
import Dashboard from './pages/Dashboard'
import Checkout from './pages/Checkout'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <>
      <AuthProvider>
        <AlertProvider>
          <CartProvider>
            <BrowserRouter>
              <ScrollToTop />
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
                  <Route path="/product/:slug" element={<Product />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                  </Route>
                </Route>
              </Routes>
            </BrowserRouter>
            <AlertBanner />
          </CartProvider>
        </AlertProvider>
      </AuthProvider>
    </>
  )
}
