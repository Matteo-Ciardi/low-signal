import { Outlet, NavLink } from "react-router-dom";

export default function AuthLayout() {
    return (
      <>
        <header>
          <nav>
            <div className="h-13 bg-background flex items-center justify-center">
              <NavLink
                to="/"
                className="font-display text-foreground text-xl font-normal"
              >
                LOW SIGNAL
              </NavLink>
            </div>
          </nav>
        </header>

        <main>
          <Outlet />
        </main>
      </>
    )
}