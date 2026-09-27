import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function LoginPage() {
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from ?? '/'

  const [mode, setMode] = useState('signin') // 'signin' | 'signup'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [info, setInfo] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setInfo(null)
    setSubmitting(true)

    const { error } =
      mode === 'signin' ? await signIn(email, password) : await signUp(email, password)

    setSubmitting(false)

    if (error) {
      setError(error.message)
      return
    }

    if (mode === 'signup') {
      // Depending on your Supabase project's auth settings, new accounts
      // may need to confirm their email before they can sign in.
      setInfo('Account created. Check your email to confirm, then sign in.')
      setMode('signin')
      return
    }

    navigate(redirectTo, { replace: true })
  }

  return (
    <main className="form-page form-page--narrow">
      <h1 className="form-page__title">
        {mode === 'signin' ? 'Sign in' : 'Create an account'}
      </h1>
      <p className="form-page__sub">
        {mode === 'signin'
          ? "Sign in to add games to the catalog."
          : 'Sign up to start adding games to the catalog.'}
      </p>

      <form className="game-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
        </label>

        {error && <p className="game-form__error">{error}</p>}
        {info && <p className="game-form__success">{info}</p>}

        <button type="submit" disabled={submitting}>
          {submitting
            ? 'Please wait…'
            : mode === 'signin'
              ? 'Sign in'
              : 'Sign up'}
        </button>
      </form>

      <button
        type="button"
        className="form-page__toggle"
        onClick={() => {
          setMode(mode === 'signin' ? 'signup' : 'signin')
          setError(null)
          setInfo(null)
        }}
      >
        {mode === 'signin'
          ? "Don't have an account? Sign up"
          : 'Already have an account? Sign in'}
      </button>
    </main>
  )
}
