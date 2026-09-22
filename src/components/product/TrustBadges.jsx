const badges = [
  '3-YEAR GUARANTEE',
  'FREE RETURNS 30D',
  'SHIPS WORLDWIDE',
  'NATURAL FIBRES',
]

export default function TrustBadges() {
  return (
    <div className="border-border my-8 grid grid-cols-2 gap-6 border-t pt-8 lg:gap-3">
      {badges.map((badge) => (
        <div
          key={badge}
          className="flex items-center gap-3 lg:border-border lg:h-9 lg:items-center lg:border lg:px-3"
        >
          <span className="text-primary font-display text-sm">◈</span>
          <span className="font-mono text-xs font-bold uppercase">
            {badge}
          </span>
        </div>
      ))}
    </div>
  )
}
