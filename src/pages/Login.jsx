import { useState } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/context/AuthContext'

import { Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()
  
  const from = location.state?.from?.pathname || '/'

  const onSubmit = async (data) => {
    try {
      await login({
        email: data.email,
        password: data.password,
      })

      // Reindirizza alla pagina da cui proveniva l'utente
      // replace: true evita di rimandarlo al login se clicca "Indietro" sul browser
      navigate(from, { replace: true })
    } catch (error) {
      console.error('Errore durante il login:', error)
      alert(error.message)
    }
  }

  return (
    <>
      <div className="bg-background container-editorial relative flex min-h-screen w-full items-center justify-center">
        <div className="surface-card container-editor relative z-10 flex w-full max-w-md flex-col gap-8 p-8">
          <h2>
            LOG <span className="text-primary">IN</span>
          </h2>

          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            {/* EMAIL */}
            <label htmlFor="email">Email</label>
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
                {...register('password', {
                  required: 'La password è obbligatoria',
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
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}

            {/* SUBMIT */}
            <div className="mt-8">
              <button className="btn-primary w-full" disabled={isSubmitting}>
                {isSubmitting ? 'ACCESSO IN CORSO' : 'LOGIN'}
              </button>
            </div>
          </form>

          <div>
            <p className="text-center text-sm">
              Don't have an account?{' '}
              <NavLink to="/signup" className="text-primary text-sm">
                Sign up
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
