import type { MouseTouchEvent } from 'types/events';

export default function hover<T extends HTMLElement>(node: T) {
  function hoverStart(event: MouseTouchEvent) {
    node.dispatchEvent(new CustomEvent('hover', { detail: { event } }));
  }

  function hoverMove(event: MouseTouchEvent) {
    node.dispatchEvent(new CustomEvent('hovermove', { detail: { event } }));
  }

  function hoverEnd(event: MouseTouchEvent) {
    if (window.TouchEvent && event instanceof TouchEvent) {
      const touch = event.changedTouches[0];
      if (node === document.elementFromPoint(touch.clientX, touch.clientY)) {
        return;
      }
    }

    node.dispatchEvent(new CustomEvent('hoverend', { detail: { event } }));
  }

  node.addEventListener('mouseenter', hoverStart);
  node.addEventListener('touchstart', hoverStart);
  node.addEventListener('mousemove', hoverMove);
  node.addEventListener('touchmove', hoverMove);
  node.addEventListener('mouseleave', hoverEnd);
  document.addEventListener('touchend', hoverEnd);

  return {
    destroy() {
      node.removeEventListener('mouseenter', hoverStart);
      node.removeEventListener('touchstart', hoverStart);
      node.removeEventListener('mousemove', hoverMove);
      node.removeEventListener('touchmove', hoverMove);
      node.removeEventListener('mouseleave', hoverEnd);
      document.removeEventListener('touchend', hoverEnd);
    },
  };
}
