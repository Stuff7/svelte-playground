import type { Point } from 'types/math';

type Handler<E> = (event: E) => void;

export type MouseTouchEvent = MouseEvent | TouchEvent;

export type ClickOutEvent = CustomEvent<MouseTouchEvent>;
export type ClickOutHandler = Handler<ClickOutEvent>;

export type CustomDragDetail = { event: MouseTouchEvent };
export type CustomDragEvent = CustomEvent<CustomDragDetail>;
export type CustomDragHandler = Handler<CustomDragEvent>;

interface RelativePosition extends Point {
  percentage: Point;
}

type RectDrag = RelativePosition;

interface CircleDrag {
  length: number;
  lengthPercent: number;
  radius: number;
  angle: number;
}

interface RingDrag {
  angle: number;
  anglePercent: number;
}

export type Shape = 'circle' | 'rectangle';

export type ShapeDrag<S extends Shape> =
S extends 'circle' ?
  CircleDrag :
S extends 'rectangle' ?
  RectDrag :
S extends 'ring' ?
  RingDrag :
never;

export type AreaDragDetail<S extends Shape> = {
  isDragging: boolean;
  relativePosition: RelativePosition;
  shapeDrag: ShapeDrag<S>;
}
export type AreaDragEvent<S extends Shape> = CustomEvent<AreaDragDetail<S>>;
export type AreaDragHandler = Handler<AreaDragEvent>;

export type HoverDetail = { event: MouseTouchEvent };
export type HoverEvent = CustomEvent<HoverDetail>;
export type HoverHandler = Handler<HoverEvent>;

export type IntersectionDetail = IntersectionObserverEntry;
export type IntersectionEvent = CustomEvent<IntersectionDetail>;
export type IntersectionHandler = Handler<IntersectionEvent>;
