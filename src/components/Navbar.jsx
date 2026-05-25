import { useState } from 'react'
import { NavLink } from 'react-router'
import { Menu, ShoppingBag, X } from 'lucide-react'

import { navigation } from '@/data/navigation'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const getNavLinkClass = ({ isActive }) =>
    `cursor-pointer font-mono text-sm leading-relaxed tracking-widest transition-colors
      ${isActive ? 'text-primary' : 'hover:text-primary'}`

  return (
    <>
      <nav className="bg-background fixed top-0 left-0 z-1000 w-full">
        {/* MOBILE NAVBAR */}
        <div className="container-editorial flex items-center justify-between py-1 lg:hidden">
          <div>
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

          <div>
            <NavLink
              to="/"
              className="font-display text-foreground text-xl font-normal"
            >
              LOW SIGNAL
            </NavLink>
          </div>

          <div>
            <ShoppingBag className="cursor-pointer" />
          </div>
        </div>

        {isOpen && (
          <div className="mobile-menu-border bg-background absolute top-full left-0 z-20 w-full">
            <div className="container-editorial flex flex-col py-4">
              {navigation.map((link) => {
                return (
                  <NavLink
                    to={link.path}
                    key={link.label}
                    onClick={() => setIsOpen(false)}
                    className={getNavLinkClass}
                  >
                    {link.label}
                  </NavLink>
                )
              })}
            </div>
          </div>
        )}
      </nav>

      {/* DESKTOP NAVBAR */}
      <div className="bg-background fixed top-0 left-0 z-1000 w-full">
        <div className="container-editorial hidden grid-cols-3 items-center py-3 lg:grid">
          <div className="flex gap-8">
            {navigation.map((link) => {
              return (
                <NavLink
                  to={link.path}
                  key={link.label}
                  className={getNavLinkClass}
                >
                  {link.label}
                </NavLink>
              )
            })}
          </div>

          <div className="flex justify-center">
            <NavLink
              to="/"
              className="font-display text-foreground text-xl font-normal"
            >
              LOW SIGNAL
            </NavLink>
          </div>

          <div className="flex justify-end">
            <ShoppingBag className="cursor-pointer" />
          </div>
        </div>
      </div>
    </>
  )
}
