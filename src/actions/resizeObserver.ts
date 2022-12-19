
export function resizeObserver<E extends HTMLElement>(
  node: E,
  onResize: (size: RectSize) => void,
) {
  const observer = new ResizeObserver(([element]) => {
    onResize({
      width: element.contentRect.width,
      height: element.contentRect.height,
    });
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
