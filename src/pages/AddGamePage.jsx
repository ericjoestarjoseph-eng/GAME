import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient.js'

const ALL_PLATFORMS = ['PC', 'PS5', 'Xbox Series X', 'Switch']

function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function AddGamePage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '',
    genre: '',
    developer: '',
    releaseYear: '',
    rating: '',
    description: '',
    coverImageUrl: '',
  })
  const [platforms, setPlatforms] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  function updateField(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  function togglePlatform(p) {
    setPlatforms((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    )
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    if (!form.title || !form.genre || platforms.length === 0) {
      setError('Title, genre, and at least one platform are required.')
      return
    }

    setSubmitting(true)
    const { error } = await supabase.from('games').insert({
      title: form.title,
      slug: slugify(form.title),
      genre: form.genre,
      platform: platforms,
      developer: form.developer || null,
      release_year: form.releaseYear ? Number(form.releaseYear) : null,
      rating: form.rating ? Number(form.rating) : 0,
      description: form.description || null,
      cover_image_url: form.coverImageUrl || null,
    })
    setSubmitting(false)

    if (error) {
      setError(error.message)
      return
    }

    setSuccess(true)
    setTimeout(() => navigate('/'), 900)
  }

  return (
    <main className="form-page">
      <h1 className="form-page__title">Add a game</h1>
      <p className="form-page__sub">
        This writes straight into the Supabase <code>games</code> table.
        Row-level security only allows this insert because you're signed in.
      </p>

      <form className="game-form" onSubmit={handleSubmit}>
        <label>
          Title
          <input
            type="text"
            value={form.title}
            onChange={updateField('title')}
            required
          />
        </label>

        <label>
          Genre
          <input
            type="text"
            value={form.genre}
            onChange={updateField('genre')}
            placeholder="e.g. RPG, Strategy, Horror"
            required
          />
        </label>

        <fieldset className="game-form__platforms">
          <legend>Platforms</legend>
          {ALL_PLATFORMS.map((p) => (
            <label key={p} className="game-form__checkbox">
              <input
                type="checkbox"
                checked={platforms.includes(p)}
                onChange={() => togglePlatform(p)}
              />
              {p}
            </label>
          ))}
        </fieldset>

        <div className="game-form__row">
          <label>
            Developer
            <input
              type="text"
              value={form.developer}
              onChange={updateField('developer')}
            />
          </label>
          <label>
            Release year
            <input
              type="number"
              value={form.releaseYear}
              onChange={updateField('releaseYear')}
              min="1970"
              max="2100"
            />
          </label>
          <label>
            Rating (0–10)
            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={form.rating}
              onChange={updateField('rating')}
            />
          </label>
        </div>

        <label>
          Cover image URL (optional — we'll generate one if left blank)
          <input
            type="url"
            value={form.coverImageUrl}
            onChange={updateField('coverImageUrl')}
            placeholder="https://…"
          />
        </label>

        <label>
          Description
          <textarea
            rows={3}
            value={form.description}
            onChange={updateField('description')}
          />
        </label>

        {error && <p className="game-form__error">{error}</p>}
        {success && <p className="game-form__success">Saved! Taking you to the catalog…</p>}

        <button type="submit" disabled={submitting}>
          {submitting ? 'Saving…' : 'Add game'}
        </button>
      </form>
    </main>
  )
}
