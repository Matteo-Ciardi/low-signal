import { useState, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/context/AuthContext'
import { useAlert } from '@/context/AlertContext'
import api from '@/services/api'

import { Eye, EyeOff } from 'lucide-react'

export default function Signup() {
  const { signup } = useAuth()
  const { showAlert } = useAlert()
  const navigate = useNavigate()
  const passwordRef = useRef(null)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  // 1. Configurazione del registro per la password (posizionato a livello di componente)
  const { ref: registerPasswordRef, ...passwordRest } = register('password', {
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
  })

  // 2. Unica funzione onSubmit per la gestione dell'invio
  const onSubmit = async (data) => {
    try {
      // Chiamata di registrazione globale dell'AuthContext
      await signup({
        name: data.name,
        surname: data.surname,
        email: data.email,
        password: data.password,
        phone: data.tel,
      })

      // Gestione asincrona parallela per la newsletter (se spuntata)
      if (data.newsletter) {
        try {
          await api.post('/newsletter', {
            email: data.email,
          })
        } catch (newsletterError) {
          console.error(
            "Errore durante l'iscrizione alla newsletter:",
            newsletterError
          )
        }
      }

      // Sposta l'utente alla schermata di Login
      navigate('/login', { state: { from: { pathname: '/' } }, replace: true })
    } catch (error) {
      console.error('Errore durante la registrazione:', error)
      showAlert(error.message || 'Errore durante la registrazione.')
    }
  }

  return (
    <>
      <div className="bg-background container-editorial relative flex min-h-screen w-full items-center justify-center">
        <div className="surface-card container-editor relative z-10 flex w-full max-w-md flex-col gap-8 p-8">
          <h2>
            SIGN <span className="text-primary">UP</span>
          </h2>

          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            {/* NAME */}
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

            {/* SURNAME */}
            <label htmlFor="surname" className="mt-2">
              Surname
            </label>
            <input
              id="surname"
              type="text"
              placeholder="SURNAME"
              className="input-base"
              {...register('surname', {
                required: "Il cognome e' obbligatorio",
              })}
            />
            {errors.surname && (
              <p className="mt-1 text-xs text-red-500">
                {errors.surname.message}
              </p>
            )}

            {/* EMAIL */}
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

            {/* PASSWORD */}
            <label htmlFor="password" className="mt-2">
              Password
            </label>
            <div className="relative w-full">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="PASSWORD"
                className="input-base pr-12"
                {...passwordRest}
                ref={(e) => {
                  registerPasswordRef(e)
                  passwordRef.current = e
                }}
              />

              {/* Pulsante Mostra/Nascondi */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-mono text-muted-foreground hover:text-primary absolute top-1/2 right-3 -translate-y-1/2 py-2 text-xs transition-colors duration-150"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}

            {/* CONFIRM PASSWORD */}
            <label htmlFor="confirmpassword" className="mt-2">
              Confirm password
            </label>
            <div className="relative w-full">
              <input
                id="confirmpassword"
                type={showPassword ? 'text' : 'password'}
                placeholder="CONFIRM PASSWORD"
                className="input-base pr-12"
                {...register('confirmpassword', {
                  required: 'Conferma la tua password',
                  validate: (value) =>
                    value === passwordRef.current?.value ||
                    'Le password non corrispondono',
                })}
              />

              {/* Pulsante Mostra/Nascondi */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-mono text-muted-foreground hover:text-primary absolute top-1/2 right-3 -translate-y-1/2 py-2 text-xs transition-colors duration-150"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmpassword && (
              <p className="mt-1 text-xs text-red-500">
                {errors.confirmpassword.message}
              </p>
            )}

            {/* TELEPHONE */}
            <label htmlFor="tel" className="mt-2">
              Telephone number
            </label>
            <input
              id="tel"
              type="tel"
              placeholder="PHONE NUMBER"
              className="input-base"
              {...register('tel', { required: "Il telefono e' obbligatorio" })}
            />

            {/* NEWSLETTER */}
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

            {/* SUBMIT */}
            <div className="mt-8">
              <button className="btn-primary w-full" disabled={isSubmitting}>
                {isSubmitting ? 'INVIO IN CORSO' : 'SIGNUP'}
              </button>
            </div>
          </form>

          <div>
            <p className="text-center text-sm">
              Already have an account?{' '}
              <NavLink to="/login" className="text-primary text-sm">
                Login
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
