
export function resizeObserver<E extends HTMLElement>(
  node: E,
  onResize: (w: number, h: number) => void,
) {
  const observer = new ResizeObserver(([element]) => {
    onResize(
      element.contentRect.width,
      element.contentRect.height,
    );
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
