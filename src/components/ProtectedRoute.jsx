import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

// Wrap any <Route element={...}> with this to require a logged-in user.
// If there isn't one, we bounce to /login and remember where they were
// headed so we can send them back after they sign in.
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <p className="page-loading">Checking your session…</p>

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  return children
}
