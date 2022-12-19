export default function drag<T extends HTMLElement>(node: T) {
  function startDrag(event: MouseTouchEvent) {
    document.addEventListener('mousemove', doDrag);
    document.addEventListener('touchmove', doDrag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);
    if (event instanceof MouseEvent && event.button !== 0) {
      return;
    }
    node.dispatchEvent(new CustomEvent('dragstart', {
      detail: { event },
    }));
  }

  function doDrag(event: MouseTouchEvent) {
    if (event instanceof MouseEvent && event.button !== 0) {
      return;
    }
    node.dispatchEvent(new CustomEvent('drag', {
      detail: { event },
    }));
  }

  function endDrag(event: MouseTouchEvent) {
    document.removeEventListener('mousemove', doDrag);
    document.removeEventListener('touchmove', doDrag);
    document.removeEventListener('mouseup', endDrag);
    document.removeEventListener('touchend', endDrag);
    if (event instanceof MouseEvent && event.button !== 0) {
      return;
    }
    node.dispatchEvent(new CustomEvent('dragend', {
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
