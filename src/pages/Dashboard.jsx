import { useAuth } from '@/context/AuthContext'
import { useAlert } from '@/context/AlertContext'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const { logout, user } = useAuth()
  const { showAlert } = useAlert()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.error('Errore durante il logout:', error)
      showAlert(error.message || 'Errore durante il logout. Riprova.')
    }
  }

  return (
    <>
      <section className="section-spacing container-editorial">
        <h1>
          DASH<span className="text-primary">BOARD</span>
        </h1>
        <p className="text-muted mt-4">
          Area riservata in costruzione. Qui troverai profilo, ordini e
          wishlist.
        </p>

        <div className="text-muted small mt-4">
          Benvenuto,
          <p>
            {user.name} {user.surname}
          </p>
          <p>{user.email}</p>
        </div>

        <button onClick={handleLogout}>LOGOUT</button>
      </section>
    </>
  )
}
