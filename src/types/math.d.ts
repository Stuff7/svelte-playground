export interface RectSize {
  width: number;
  height: number;
}

export type InOut = 'inner' | 'outer';

export interface Vec2 {
  x: number;
  y: number;
}

export type Point = Vec2;

export interface LineSegment {
  a: Point;
  b: Point;
}

export type Position = 'top' | 'right' | 'bottom' | 'left' | 'none';

export type MixedPosition = Position | 'top-right' | 'bottom-right' | 'bottom-left' | 'top-left';
