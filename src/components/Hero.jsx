export default function Hero({ count }) {
  return (
    <section className="hero">
      {/* Decorative "marquee bulb" shapes — purely visual, aria-hidden so
          screen readers skip them. */}
      <div className="hero__glow hero__glow--amber" aria-hidden="true" />
      <div className="hero__glow hero__glow--teal" aria-hidden="true" />

      <p className="hero__eyebrow">Your library, all in one place</p>
      <h1 className="hero__title">
        Every game
        <br />
        worth remembering.
      </h1>
      <p className="hero__sub">
        {count > 0
          ? `Tracking ${count} games across every genre and platform you play on.`
          : 'Loading your catalog\u2026'}
      </p>
    </section>
  )
}
