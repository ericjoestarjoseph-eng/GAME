import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../supabaseClient.js'

// React Context lets any component "subscribe" to the current user without
// passing props down through every layer (Navbar, AddGamePage, etc. all need
// to know if someone's logged in).
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // On first load, ask Supabase if there's already a valid session
    // (e.g. the browser remembers a previous login).
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Then keep listening — this fires automatically whenever someone
    // signs in, signs out, or their session refreshes.
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => listener.subscription.unsubscribe()
  }, [])

  async function signUp(email, password) {
    const { error } = await supabase.auth.signUp({ email, password })
    return { error }
  }

  async function signIn(email, password) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { error }
  }

  async function signOut() {
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook so components can just call `const { user } = useAuth()`
// instead of importing useContext + AuthContext every time.
export function useAuth() {
  return useContext(AuthContext)
}
