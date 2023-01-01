import type { IntersectionDetail } from 'types/events';
import { getElementByPortalId, type PortalID } from 'actions/portal';

export function intersectionObserver<E extends HTMLElement>(
  node: E,
  options = {} as IntersectionObserverInit & { rootPortalID?: PortalID, rootSelector?: string },
) {
  let root: Option<Element>;
  if (options.rootPortalID) {
    root = getElementByPortalId(options.rootPortalID);
  } else if (options.rootSelector) {
    root = document.querySelector(options.rootSelector);
  } else {
    root = null;
  }

  const observer = new IntersectionObserver(([element]) => {
    node.dispatchEvent(new CustomEvent<IntersectionDetail>('intersection', { detail: element }));
  }, { root, threshold: 1, ...options });

  observer.observe(node);

  function destroy() {
    observer.unobserve(node);
    observer.disconnect();
  }

  return {
    destroy,
  };
}
