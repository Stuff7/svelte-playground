import type { MouseTouchEvent } from 'types/events';
import { MouseButton } from 'utils/dom';

export default function drag<T extends HTMLElement>(node: T) {
  function startDrag(event: MouseTouchEvent) {
    document.addEventListener('mousemove', doDrag);
    document.addEventListener('touchmove', doDrag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);
    if (event instanceof MouseEvent && event.button !== MouseButton.Left) {
      return;
    }
    node.dispatchEvent(new CustomEvent('customdragstart', {
      detail: { event },
    }));
  }

  function doDrag(event: MouseTouchEvent) {
    if (event instanceof MouseEvent && event.button !== MouseButton.Left) {
      return;
    }
    node.dispatchEvent(new CustomEvent('customdrag', {
      detail: { event },
    }));
  }

  function endDrag(event: MouseTouchEvent) {
    document.removeEventListener('mousemove', doDrag);
    document.removeEventListener('touchmove', doDrag);
    document.removeEventListener('mouseup', endDrag);
    document.removeEventListener('touchend', endDrag);
    if (event instanceof MouseEvent && event.button !== MouseButton.Left) {
      return;
    }
    node.dispatchEvent(new CustomEvent('customdragend', {
      detail: { event },
    }));
  }

  node.addEventListener('mousedown', startDrag);
  node.addEventListener('touchstart', startDrag);

  return {
    destroy() {
      node.removeEventListener('mousedown', startDrag);
      node.removeEventListener('touchstart', startDrag);
    },
  };
}
