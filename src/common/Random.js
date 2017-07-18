export function number(min, max) {
  let result = Math.floor(Math.random() * max) + (min === 0 ? 0 : 1);

  while (result > max || result < min) {
    result = Math.floor(Math.random() * max) + (min === 0 ? 0 : 1);
  }

  return result;
}
