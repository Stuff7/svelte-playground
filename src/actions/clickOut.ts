import type { MouseTouchEvent } from 'types/events';

export function clickOut<T extends HTMLElement>(node: T) {
  const handleClickOut = (event: MouseTouchEvent) => {
    if (event.target instanceof Node && !node.contains(event.target)) {
      node.dispatchEvent(new CustomEvent('clickout', { detail: event }));
    }
  };

  document.addEventListener('click', handleClickOut, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClickOut, true);
    },
  };
}
