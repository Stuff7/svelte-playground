export default function drag<T extends HTMLElement>(node: T) {
  function startDrag(event: MouseTouchEvent) {
    node.dispatchEvent(new CustomEvent('dragstart', {
      detail: { event },
    }));
    document.addEventListener('mousemove', doDrag);
    document.addEventListener('touchmove', doDrag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);
  }

  function doDrag(event: MouseTouchEvent) {
    node.dispatchEvent(new CustomEvent('drag', {
      detail: { event },
    }));
  }

  function endDrag(event: MouseTouchEvent) {
    node.dispatchEvent(new CustomEvent('dragend', {
      detail: { event },
    }));
    document.removeEventListener('mousemove', doDrag);
    document.removeEventListener('touchmove', doDrag);
    document.removeEventListener('mouseup', endDrag);
    document.removeEventListener('touchend', endDrag);
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
