export default function Filters({
  genres,
  platforms,
  activeGenre,
  activePlatform,
  search,
  onGenreChange,
  onPlatformChange,
  onSearchChange,
}) {
  return (
    <div className="filters">
      <div className="filters__group filters__group--search">
        <label htmlFor="search-input">Search</label>
        <input
          id="search-input"
          type="text"
          placeholder="Search by title…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="filters__group">
        <label htmlFor="genre-select">Genre</label>
        <select
          id="genre-select"
          value={activeGenre}
          onChange={(e) => onGenreChange(e.target.value)}
        >
          <option value="all">All genres</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      <div className="filters__group">
        <label htmlFor="platform-select">Platform</label>
        <select
          id="platform-select"
          value={activePlatform}
          onChange={(e) => onPlatformChange(e.target.value)}
        >
          <option value="all">All platforms</option>
          {platforms.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
