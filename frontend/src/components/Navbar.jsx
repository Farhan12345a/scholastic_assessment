import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <h1>📚 Reading Portal</h1>
      {user && (
        <div className="nav-right">
          <span>{user.name} ({user.role})</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </nav>
  )
}
