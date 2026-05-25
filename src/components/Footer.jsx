import { NavLink } from 'react-router-dom'
import { footer } from '@/data/footer'

export default function Footer() {
  return (
    <>
      <div className="mobile-menu-border">
        <section className="container-editorial section-spacing justify-between lg:grid lg:grid-cols-2">
          {/* TITOLO FOOTER */}
          <div>
            <h4>LOW SIGNAL</h4>
            <p className="mt-4">
              Nessun compromesso. Creato per chi non ha paura di muoversi.
            </p>
          </div>

          {/* SEZIONE LINKS */}
          <section className="grid grid-cols-2 gap-y-8 pt-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-4 lg:py-0">
            {footer.map(({ section, links }) => {
              return (
                // COLONNA LINKS
                <section key={section}>
                  <div>
                    <span className="text-mono text-label text-accent">
                      {section}
                    </span>
                  </div>
                  <ul className="mt-2 flex flex-col">
                    {links.map(({ label }) => {
                      return (
                        // TODO: CORREGGERE I NOMI DEI LINK E COLLEGARLI
                        <NavLink key={label} className="py-2 text-xs">
                          {label}
                        </NavLink>
                      )
                    })}
                  </ul>
                </section>
              )
            })}
          </section>
        </section>

        {/* INFORMATIVA */}
        <section className="mobile-menu-border container-editorial mb-10 pt-4">
          <span className="text-mono">
            SITO A SCOPO DIDATTICO. OGNI PRODOTTO E' FRUTTO DI FANTASIA E NIENTE
            DI CIO' CHE E' MOSTRATO E' IN VENDITA.
          </span>
        </section>
      </div>
    </>
  )
}
