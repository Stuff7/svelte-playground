/// <reference types="svelte" />
/// <reference types="vite/client" />

declare type MouseTouchEvent = MouseEvent | TouchEvent;

declare type DragAction = CompositionEvent<{ event: MouseTouchEvent }>;
declare type DragActionHandler = (e: DragAction) => void;

declare type HoverAction = CompositionEvent<{ event: MouseEvent }>;
declare type HoverActionHandler = (e: HoverAction) => void;

declare namespace svelte.JSX {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface DOMAttributes<T> {
    ondragstart?: DragActionHandler;
    ondrag?: DragActionHandler;
    ondragend?: DragActionHandler;
    onhover?: HoverActionHandler;
    onhoverend?: HoverActionHandler;
  }
}

declare type Position = 'top' | 'right' | 'bottom' | 'left';
