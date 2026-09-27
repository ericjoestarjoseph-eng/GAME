import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  // NavLink is like a normal <a>, but React Router intercepts the click,
  // swaps the page content instead of reloading the whole site, and gives
  // us `isActive` so we can highlight whichever page we're on.
  return (
    <header className="navbar">
      <NavLink to="/" className="navbar__mark">
        <span className="navbar__notch" />
        Backlog
      </NavLink>

      <nav className="navbar__links">
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? 'is-active' : '')}
        >
          Catalog
        </NavLink>
        <NavLink
          to="/add"
          className={({ isActive }) => (isActive ? 'is-active' : '')}
        >
          Add a game
        </NavLink>

        {user ? (
          <div className="navbar__user">
            <span>{user.email}</span>
            <button type="button" onClick={handleSignOut}>
              Sign out
            </button>
          </div>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? 'is-active' : '')}
          >
            Sign in
          </NavLink>
        )}
      </nav>
    </header>
  )
}
