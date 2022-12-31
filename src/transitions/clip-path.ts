export default function clipPath<T extends HTMLElement>(_: T, {
  delay = 0,
  duration = 400,
}) {
  return {
    delay,
    duration,
    css: (t: number) => `clip-path: inset(${(1 - t) * 50}% ${(1 - t) * 50}%)`,
  };
}
