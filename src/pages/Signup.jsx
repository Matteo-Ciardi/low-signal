import { NavLink } from 'react-router-dom'

export default function Signup() {
  return (
    <>
      <div className="bg-background container-editorial relative flex min-h-screen w-full items-center justify-center">
        {/* <div className="absolute top-0 left-[-10] z-0">
          <h1 className="text-muted-foreground/30 text-center text-[150px]">
            SIGNUP
          </h1>
        </div> */}

        <div className="surface-card container-editor relative z-10 flex w-full max-w-md flex-col gap-8 p-8">
          <h2>
            SIGN
            <span className="text-primary">UP</span>
          </h2>
          <form className='flex flex-col'>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="NAME"
              className="input-base"
            />

            <label htmlFor="surname" className="mt-">
              Surname
            </label>
            <input
              id="surname"
              type="text"
              placeholder="SURNAME"
              className="input-base"
            />

            <label htmlFor="email" className="mt-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="EMAIL"
              className="input-base"
            />

            <label htmlFor="password" className="mt-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="PASSWORD"
              className="input-base"
            />

            <label htmlFor="confirmpassword" className="mt-2">
              Confirm password
            </label>
            <input
              id="confirmpassword"
              type="password"
              placeholder="CONFIRM PASSWORD"
              className="input-base"
            />

            <label htmlFor="tel" className="mt-2">
              Telephone number
            </label>
            <input
              id="tel"
              type="tel"
              placeholder="PHONE NUMBER"
              className="input-base"
            />

            <div className="mt-4 flex items-start gap-3">
              <input type="checkbox" id="newsletter" className="mt-1" />
              <div>
                <label htmlFor="newsletter" className="text-label text-primary">
                  Subscribe to newsletter
                </label>
                <p className="text-sm">
                  Get early access to exclusive drops, restocks, and limited
                  releases.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <button className="btn-primary w-full">SIGNUP</button>
            </div>
          </form>

          <div>
            <p className="text-center text-sm">
              Already have an account?
              <NavLink to="/login" className="text-primary text-sm">
                {' '}
                Login
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
