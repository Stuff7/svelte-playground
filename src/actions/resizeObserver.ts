export function resizeObserver<E extends HTMLElement>(
  node: E,
  onResize: (size: DOMRect) => void,
) {
  const observer = new ResizeObserver(([element]) => {
    onResize(element.contentRect);
  });

  observer.observe(node);

  function destroy() {
    observer.unobserve(node);
    observer.disconnect();
  }

  return {
    destroy,
  };
}
