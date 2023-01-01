import { circInOut } from 'svelte/easing';

export default function clipPath<T extends HTMLElement>(_: T, {
  delay = 0,
  duration = 200,
  easing = circInOut,
} = {}) {
  return {
    delay,
    duration,
    easing,
    css: (t: number) => `clip-path: inset(${(1 - t) * 50}% ${(1 - t) * 50}%)`,
  };
}
