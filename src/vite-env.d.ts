/// <reference types="svelte" />
/// <reference types="vite/client" />

declare type MouseTouchEvent = MouseEvent | TouchEvent;

declare type DragAction = CustomEvent<{ event: MouseTouchEvent }>;
declare type DragActionHandler = (e: DragAction) => void;

declare type DraggingAction = CustomEvent<Vec2>;
declare type DraggingActionHandler = (e: DraggingAction) => void;

declare type AreaDragAction = CustomEvent<Vec2 & { percentage: Vec2, isDragging: boolean }>;
declare type AreaDragHandler = (e: AreaDragAction) => void;

declare type HoverAction = CustomEvent<{ event: MouseEvent }>;
declare type HoverActionHandler = (e: HoverAction) => void;

declare namespace svelte.JSX {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface DOMAttributes<T> {
    onareadrag?: AreaDragHandler;
    ondragstart?: DragActionHandler;
    ondrag?: DragActionHandler;
    ondragend?: DragActionHandler;
    onhover?: HoverActionHandler;
    onhoverend?: HoverActionHandler;
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
