/// <reference types="svelte" />
/// <reference types="vite/client" />

declare type HoverEvent = CompositionEvent<{ event: MouseEvent }>;
declare type HoverEventHandler = (e: HoverEvent) => void;

declare namespace svelte.JSX {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface DOMAttributes<T> {
    onhover?: HoverEventHandler;
    onhoverend?: HoverEventHandler;
  }
}
