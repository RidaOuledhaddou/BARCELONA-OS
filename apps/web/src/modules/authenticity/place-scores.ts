/** Domain helpers for royale_one.place_scores + score_dimensions (wire loaders later). */

export function placeScoreRowKey(placeId: string, dimensionId: string) {
  return `${placeId}:${dimensionId}`;
}
