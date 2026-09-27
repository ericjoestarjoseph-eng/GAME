import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../supabaseClient.js'
import Hero from '../components/Hero.jsx'
import Filters from '../components/Filters.jsx'
import GameGrid from '../components/GameGrid.jsx'

export default function CatalogPage() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeGenre, setActiveGenre] = useState('all')
  const [activePlatform, setActivePlatform] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    let isMounted = true

    async function fetchGames() {
      setLoading(true)
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .order('rating', { ascending: false })

      if (!isMounted) return

      if (error) setError(error.message)
      else {
        setGames(data ?? [])
        setError(null)
      }
      setLoading(false)
    }

    fetchGames()
    return () => {
      isMounted = false
    }
  }, [])

  const genres = useMemo(
    () => [...new Set(games.map((g) => g.genre))].sort(),
    [games]
  )
  const platforms = useMemo(
    () => [...new Set(games.flatMap((g) => g.platform ?? []))].sort(),
    [games]
  )

  const filteredGames = games.filter((g) => {
    const matchesGenre = activeGenre === 'all' || g.genre === activeGenre
    const matchesPlatform =
      activePlatform === 'all' || (g.platform ?? []).includes(activePlatform)
    const matchesSearch =
      search.trim() === '' ||
      g.title.toLowerCase().includes(search.trim().toLowerCase())
    return matchesGenre && matchesPlatform && matchesSearch
  })

  return (
    <>
      <Hero count={games.length} />

      <main id="catalog" className="catalog">
        {error && (
          <p className="catalog__error">
            Couldn't load games: {error}. Check your Supabase URL/key in .env.
          </p>
        )}

        {!error && (
          <>
            <Filters
              genres={genres}
              platforms={platforms}
              activeGenre={activeGenre}
              activePlatform={activePlatform}
              search={search}
              onGenreChange={setActiveGenre}
              onPlatformChange={setActivePlatform}
              onSearchChange={setSearch}
            />

            {loading ? (
              <p className="catalog__loading">Loading catalog…</p>
            ) : (
              <GameGrid games={filteredGames} />
            )}
          </>
        )}
      </main>
    </>
  )
}
