import { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Menu, ShoppingBag, X, User } from 'lucide-react'

import { navigation } from '@/data/navigation'
import { useAuth } from '@/context/AuthContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const getNavLinkClass = ({ isActive }) =>
    `cursor-pointer font-mono text-sm leading-relaxed tracking-widest transition-colors
      ${isActive ? 'text-primary' : 'hover:text-primary'}`

  // Gestione dinamica del click sul profilo con redirect intelligente
  const handleProfileClick = () => {
    if (user) {
      navigate('/dashboard')
    } else {
      navigate('/login', { state: { from: location } })
    }
  }

  return (
    <>
      <nav className="bg-background relative">
        {/* MOBILE NAVBAR (Risolto con griglia a 3 colonne simmetriche) */}
        <div className="container-editorial grid h-13 grid-cols-3 items-center py-1 lg:hidden">
          {/* Colonna Sinistra */}
          <div className="flex justify-start">
            {isOpen ? (
              <X
                className="cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              />
            ) : (
              <Menu
                className="cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              />
            )}
          </div>

          {/* Colonna Centrale (Matematicamente perfetta al centro) */}
          <div className="flex justify-center text-center">
            <NavLink
              to="/"
              className="font-display text-foreground text-xl font-normal whitespace-nowrap"
            >
              LOW SIGNAL
            </NavLink>
          </div>

          {/* Colonna Destra */}
          <div className="flex justify-end gap-4">
            <User className="cursor-pointer" onClick={handleProfileClick} />
            <ShoppingBag className="cursor-pointer" />
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {isOpen && (
          <div className="mobile-menu-border bg-background">
            <div className="container-editorial flex flex-col gap-3 py-4">
              {navigation.map((link) => (
                <NavLink
                  to={link.path}
                  key={link.label}
                  onClick={() => setIsOpen(false)}
                  className={getNavLinkClass}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}

        {/* DESKTOP NAVBAR (Inclusa icona profilo bilanciata) */}
        <div className="container-editorial hidden grid-cols-3 items-center py-3 lg:grid">
          {/* Colonna Sinistra */}
          <div className="flex gap-8">
            {navigation.map((link) => (
              <NavLink
                to={link.path}
                key={link.label}
                className={getNavLinkClass}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Colonna Centrale */}
          <div className="flex justify-center">
            <NavLink
              to="/"
              className="font-display text-foreground text-xl font-normal"
            >
              LOW SIGNAL
            </NavLink>
          </div>

          {/* Colonna Destra */}
          <div className="flex justify-end gap-4">
            <User className="cursor-pointer" onClick={handleProfileClick} />
            <ShoppingBag className="cursor-pointer" />
          </div>
        </div>
      </nav>
    </>
  )
}
