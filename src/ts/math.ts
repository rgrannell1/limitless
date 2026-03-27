
/*
 * Compute the vertices on an n-gon
 */
export function getRegularPolygonVertex(
  centerX: number,
  centerY: number,
  vertexRadius: number,
  sideCount: number,
  vertexIndex: number,
  startAngleRadians = 0,
) {
  const angle = startAngleRadians + (2 * Math.PI * vertexIndex) / sideCount;

  return {
    x: centerX + vertexRadius * Math.cos(angle),
    y: centerY + vertexRadius * Math.sin(angle),
  };
}
