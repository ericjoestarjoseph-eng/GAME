import GameCard from './GameCard.jsx'

export default function GameGrid({ games }) {
  if (games.length === 0) {
    return <p className="game-grid__empty">No games match those filters yet.</p>
  }

  return (
    <div className="game-grid">
      {games.map((game, i) => (
        // Staggering the animation delay per card (via a CSS custom property)
        // is what makes the grid feel like it's "arriving" rather than
        // popping in all at once.
        <div
          key={game.id}
          className="game-grid__item"
          style={{ '--delay': `${Math.min(i, 8) * 40}ms` }}
        >
          <GameCard game={game} />
        </div>
      ))}
    </div>
  )
}
