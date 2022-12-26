import type { InOut, LineSegment, Point, RectSize } from 'types/math';
import { UnsupportedValueError } from 'utils/meta';

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
  return Number(n.toFixed(decimals));
}

function radToDeg(rad: number) {
  return rad * 180 / Math.PI;
}

function degToRad(deg: number) {
  return deg * Math.PI / 180;
}

export function circleSquareSide(radius: number, position: InOut = 'outer') {
  if (position === 'inner') {
    return radius * 2 / Math.sqrt(2);
  }
  if (position === 'outer') {
    return radius * 2;
  }
  throw new UnsupportedValueError(position);
}

export function squareCircumcircleRadius(square: RectSize, position: InOut = 'outer') {
  if (position === 'inner') {
    return square.width / 2;
  }
  if (position === 'outer') {
    return Math.hypot(square.width, square.height) / 2;
  }
  throw new UnsupportedValueError(position);
}

export function lineLength({ a, b }: LineSegment) {
  return Math.hypot(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
}

export function lineAngle({ a, b }: LineSegment) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return 180 + radToDeg(Math.atan2(dy, dx));
}

export function lineSlope({ a, b }: LineSegment) {
  if (b.x - a.x) {
    return (b.y - a.y) / (b.x - a.x);
  }
}

export function pointAtLength(line: LineSegment, length: number): Point {
  const { a, b } = line;
  const m = lineSlope(line);
  if (m !== undefined) {
    let r = Math.hypot(1, m);
    r = b.x < a.x ? -r : r;
    return { x: a.x + (length / r), y: a.y + ((length * m) / r) };
  }
  return { x: a.x, y: a.y + length };
}

export function pointFromAngle(angle: number, length: number, { x, y }: Point = { x: 0, y: 0 }): Point {
  return { x: x + length * Math.cos(degToRad(angle)), y: y + length * Math.sin(degToRad(angle)) };
}
