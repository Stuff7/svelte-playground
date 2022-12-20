/// <reference types="svelte" />
/// <reference types="vite/client" />

type Handler<E> = (event: E) => void;

declare type MouseTouchEvent = MouseEvent | TouchEvent;

declare type CustomDragDetail = { event: MouseTouchEvent };
declare type CustomDragEvent = CustomEvent<CustomDragDetail>;
declare type CustomDragHandler = Handler<CustomDragEvent>;

declare type AreaDragDetail = Point & { isDragging: boolean, percentage: Point };
declare type AreaDragEvent = CustomEvent<AreaDragDetail>;
declare type AreaDragHandler = Handler<AreaDragEvent>;

declare type HoverDetail = { event: MouseEvent };
declare type HoverEvent = CustomEvent<HoverDetail>;
declare type HoverHandler = Handler<HoverEvent>;

declare namespace svelte.JSX {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface HTMLProps<T> {
    oncustomdragstart?: CustomDragHandler;
    oncustomdrag?: CustomDragHandler;
    oncustomdragend?: CustomDragHandler;
    onhover?: HoverHandler;
    onhoverend?: HoverHandler;
  }
}

declare interface RectSize {
  width: number;
  height: number;
}

declare interface Vec2 {
  x: number;
  y: number;
}

declare type Point = Vec2;
declare interface LineSegment {
  a: Point;
  b: Point;
}

declare type Position = 'top' | 'right' | 'bottom' | 'left' | 'none';
declare type MixedPosition = Position | 'top-right' | 'bottom-right' | 'bottom-left' | 'top-left';

type WS = ' ' | '\n' | '\t';

declare type TrimLeft<S extends string, E extends string = WS> =
  S extends `${WS | E}${infer Rest}` ?
    TrimLeft<Rest, E> :
  S;

declare type TrimRight<S extends string, E extends string = WS> =
  S extends `${infer Rest}${WS | E}` ?
    TrimRight<Rest, E> :
  S;

declare type Trim<S extends string, E extends string = WS> = TrimLeft<TrimRight<S, E>, E>;

declare type ReplaceOrNever<S extends string, From extends string, To extends string> =
  From extends '' ?
    S :
  S extends `${infer Prefix}${From}${infer Suffix}` ?
    `${Prefix}${To}${Suffix}` :
  never;

declare type Replace<S extends string, From extends string, To extends string> =
  From extends '' ?
    S :
  S extends `${infer Prefix}${From}${infer Suffix}` ?
    `${Prefix}${To}${Suffix}` :
  S;

declare type IsNumber<S extends string | number> =
  [S] extends [never] ?
    false :
  Trim<S> extends `${number}` ? true : false;

declare type IsEmptyString<S extends string> =
  Trim<S> extends '' ? true : false;
