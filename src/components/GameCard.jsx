import { coverImageFor, genreIcon, platformIcon } from '../lib/images.js'

export default function GameCard({ game }) {
  const {
    title,
    genre,
    platform = [],
    rating,
    release_year: releaseYear,
    developer,
    description,
  } = game

  return (
    <article className="game-card">
      <div className="game-card__image-wrap">
        <img
          className="game-card__image"
          src={coverImageFor(game)}
          alt={`${title} cover art`}
          loading="lazy"
        />
        <div className="game-card__rating" title="Rating out of 10">
          {rating?.toFixed(1)}
        </div>
      </div>

      <div className="game-card__body">
        <p className="game-card__genre">
          <span aria-hidden="true">{genreIcon(genre)}</span> {genre}
        </p>
        <h3 className="game-card__title">{title}</h3>
        {description && <p className="game-card__desc">{description}</p>}

        <div className="game-card__meta">
          <span>{developer}</span>
          {releaseYear && <span>{releaseYear}</span>}
        </div>

        <ul className="game-card__platforms">
          {platform.map((p) => (
            <li key={p}>
              <span aria-hidden="true">{platformIcon(p)}</span> {p}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
