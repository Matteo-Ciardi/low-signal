import { useState } from 'react'
import { Link } from 'react-router'
import { Menu, ShoppingBag } from 'lucide-react'

import { navigation } from '@/data/navigation'

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <nav>
        <div className="container-editorial flex items-center justify-between py-1">
          <div>
            <Menu
              className="cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>

          <div>
            <span className="font-display text-xl font-normal">LOW SIGNAL</span>
          </div>

          <div>
            <ShoppingBag className="cursor-pointer" />
          </div>
        </div>

        {isOpen && (
          <div className="mobile-menu-border">
            <div className="container-editorial flex flex-col py-4">
              {navigation.map((link) => {
                return (
                  <Link
                    to={link.path}
                    key={link.label}
                    onClick={() => setIsOpen(false)}
                    className="cursor-pointer font-mono text-sm leading-relaxed tracking-widest"
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
