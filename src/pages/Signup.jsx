import { NavLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  const watchPassword = watch('password')

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          surname: data.surname,
          email: data.email,
          password: data.password,
          phone: data.tel,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(
          result.error || result.message || "Qualcosa e' andato storto"
        )
      }

      if (data.newsletter) {
        try {
          const newsletterResponse = await fetch(
            'http://localhost:8080/newsletter',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: data.email,
              }),
            }
          )

          if (!newsletterResponse.ok) {
            console.warn(
              "L'utente è stato registrato, ma l'iscrizione alla newsletter è fallita."
            )
          }
        } catch (newsletterError) {
          console.error(
            "Errore durante l'iscrizione alla newsletter:",
            newsletterError
          )
        }
      }

      alert('Registrazione completata con successo')
    } catch (error) {
      console.error('Errore durante la registrazione:', error)
      alert(error.message)
    }
  }

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

          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="NAME"
              className="input-base"
              {...register('name', { required: "Il nome e' obbligatorio" })}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            )}

            <label htmlFor="surname" className="mt-2">
              Surname
            </label>
            <input
              id="surname"
              type="text"
              placeholder="SURNAME"
              className="input-base"
              {...register('surname', {
                required: "Il congnome e' obbliugatorio",
              })}
            />
            {errors.surname && (
              <p className="mt-1 text-xs text-red-500">
                {errors.surname.message}
              </p>
            )}

            <label htmlFor="email" className="mt-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="EMAIL"
              className="input-base"
              {...register('email', {
                required: "L'email è obbligatoria",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Indirizzo email non valido',
                },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}

            <label htmlFor="password" className="mt-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="PASSWORD"
              className="input-base"
              {...register('password', {
                required: 'La password è obbligatoria',
                minLength: {
                  value: 6,
                  message: 'La password deve avere almeno 6 caratteri',
                },
                pattern: {
                  value: /^(?=.*\d)(?=.*[A-Z])(?=.*[\W_]).{6,}$/,
                  message:
                    'La password deve includere almeno una maiuscola, un numero e un simbolo',
                },
              })}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}

            <label htmlFor="confirmpassword" className="mt-2">
              Confirm password
            </label>
            <input
              id="confirmpassword"
              type="password"
              placeholder="CONFIRM PASSWORD"
              className="input-base"
              {...register('confirmpassword', {
                required: 'Conferma la tua password',
                validate: (value) =>
                  value === watchPassword || 'Le password non corrispondono',
              })}
            />
            {errors.confirmpassword && (
              <p className="mt-1 text-xs text-red-500">
                {errors.confirmpassword.message}
              </p>
            )}

            <label htmlFor="tel" className="mt-2">
              Telephone number
            </label>
            <input
              id="tel"
              type="tel"
              placeholder="PHONE NUMBER"
              className="input-base"
              {...register('tel', {
                required: "Il telefono e' obbliugatorio",
              })}
            />

            <div className="mt-4 flex items-start gap-3">
              <input
                type="checkbox"
                id="newsletter"
                className="border-muted-foreground/40 text-primary mt-1 h-4 w-4 cursor-pointer"
                {...register('newsletter')}
              />
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
              <button className="btn-primary w-full">
                {isSubmitting ? 'INVIO IN CORSO' : 'SIGNUP'}
              </button>
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
