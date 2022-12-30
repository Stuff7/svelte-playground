/// <reference types="svelte" />
/// <reference types="vite/client" />

declare namespace svelte.JSX {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface HTMLProps<T> {
    oncustomdragstart?: import('types/events').CustomDragHandler;
    oncustomdrag?: import('types/events').CustomDragHandler;
    oncustomdragend?: import('types/events').CustomDragHandler;
    onhover?: import('types/events').HoverHandler;
    onhovermove?: import('types/events').HoverHandler;
    onhoverend?: import('types/events').HoverHandler;
  }
}
