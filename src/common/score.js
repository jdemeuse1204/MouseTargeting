export function shootingScore(fired, hit, time) {
  return time * (hit * (fired + hit));
}
