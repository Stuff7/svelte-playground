export default function hover<T extends HTMLElement>(node: T) {
  function hoverListener(event: Event) {
    node.dispatchEvent(new CustomEvent('hover', {
      detail: { event: event as MouseEvent },
    }));
  }

  function hoverEndListener(event: Event) {
    node.dispatchEvent(new CustomEvent('hoverend', {
      detail: { event: event as MouseEvent },
    }));
  }

  function mobileHoverEndListener(event: Event) {
    const touch = (event as TouchEvent).changedTouches[0];
    if (node !== document.elementFromPoint(touch.clientX, touch.clientY)) {
      node.dispatchEvent(new CustomEvent('hoverend', {
        detail: { event: event as MouseEvent },
      }));
    }
  }

  node.addEventListener('mouseenter', hoverListener);
  node.addEventListener('touchstart', hoverListener);

  node.addEventListener('mouseleave', hoverEndListener);
  document.addEventListener('touchend', mobileHoverEndListener);

  return {
    destroy() {
      node.removeEventListener('mouseenter', hoverListener);
      node.removeEventListener('touchstart', hoverListener);
      node.removeEventListener('mouseleave', hoverEndListener);
      document.removeEventListener('touchend', mobileHoverEndListener);
    },
  };
}
