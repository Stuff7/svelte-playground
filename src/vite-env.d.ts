/// <reference types="svelte" />
/// <reference types="vite/client" />

declare namespace svelte.JSX {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface HTMLProps<T> {
    onclickout?: Option<import('types/events').ClickOutHandler>;
    oncustomdragstart?: Option<import('types/events').CustomDragHandler>;
    oncustomdrag?: Option<import('types/events').CustomDragHandler>;
    oncustomdragend?: Option<import('types/events').CustomDragHandler>;
    onintersection?: Option<import('types/events').IntersectionHandler>;
    onhover?: Option<import('types/events').HoverHandler>;
    onhovermove?: Option<import('types/events').HoverHandler>;
    onhoverend?: Option<import('types/events').HoverHandler>;
  }
}
