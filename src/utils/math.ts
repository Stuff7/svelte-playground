export type Shape = 'circle' | 'rectangle';
export type InOut = 'inner' | 'outer';

export function* range(start: number, stop?: number, step = 1) {
  let loopStart = start;
  let loopEnd = stop || 0;

  if (stop === undefined) {
    [loopStart, loopEnd] = [0, start];
  }

  if (!step) {
    throw new RangeError('range() step argument invalid');
  }

  if (step > 0) {
    while (loopStart < loopEnd) {
      yield loopStart;
      loopStart += step;
    }
  } else if (step < 0) {
    while (loopStart > loopEnd) {
      yield loopStart;
      loopStart += step;
    }
  }
}

export function inRange(n: number, lower: number, upper?: number) {
  if (upper === undefined) {
    return n >= 0 && n <= lower;
  }
  return n >= lower && n <= upper;
}

export function clamp(min: number, n: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function* counter() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

export function toFixed(n: number, decimals = 2) {
  return isNaN(n) ? n : Number(n.toFixed(decimals));
}

export function circleSquareSide(radius: number, position: InOut = 'outer') {
  if (position === 'inner') {
    return radius * 2 / Math.sqrt(2);
  }
  if (position === 'outer') {
    return radius * 2;
  }
  throw new Error(`Unhandled position ${position}`);
}

export function squareCircumcircleRadius(square: RectSize, position: InOut = 'outer') {
  if (position === 'inner') {
    return square.width / 2;
  }
  if (position === 'outer') {
    return Math.hypot(square.width, square.height) / 2;
  }
  throw new Error(`Unhandled position ${position}`);
}

export function lineLength({ a, b }: LineSegment) {
  return Math.hypot(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
}

export function slope({ a, b }: LineSegment) {
  if (b.x - a.x) {
    return (b.y - a.y) / (b.x - a.x);
  }
}

export function pointAtLength(line: LineSegment, length: number): Vec2 {
  const { a, b } = line;
  const m = slope(line);
  if (m) {
    let r = Math.hypot(1, m);
    r = b.x < a.x ? -r : r;
    return { x: a.x + (length / r), y: a.y + ((length * m) / r) };
  }
  return { x: 0, y: a.y + length };
}
