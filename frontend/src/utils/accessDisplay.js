/** Module cap for LP progress label (3 / 6 / 9). */
export function moduleDisplayCap(highestPlan) {
  if (highestPlan >= 9) return 9
  if (highestPlan >= 6) return 6
  if (highestPlan >= 3) return 3
  return Math.max(highestPlan, 1)
}

export function accessProgressPercent(highestPlan) {
  const cap = moduleDisplayCap(highestPlan)
  return Math.min(100, Math.round((highestPlan / cap) * 100))
}
