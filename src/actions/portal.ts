
import { tick } from 'svelte';
import { getElementByPortalId, type PortalID } from 'utils/dom';

export function portal<E extends HTMLElement>(
  element: E,
  target?: PortalID,
) {
  let currentTarget = target || globalThis.document?.body;
  let targetEl;

  async function update(newTarget: PortalID | HTMLElement) {
    currentTarget = newTarget || globalThis.document?.body;
    if (typeof currentTarget === 'string') {
      targetEl = getElementByPortalId(currentTarget);
      if (targetEl === null) {
        await tick();
        targetEl = getElementByPortalId(currentTarget);
      }
      if (targetEl === null) {
        throw new Error(
          `No element found matching css selector: "${currentTarget}"`,
        );
      }
    } else if (currentTarget instanceof HTMLElement) {
      targetEl = currentTarget;
    } else {
      throw new TypeError(
        `Unknown portal currentTarget type: ${
          currentTarget === null ? 'null' : typeof currentTarget
        }. Allowed types: PortalID or HTMLElement.`,
      );
    }
    targetEl.appendChild(element);
    element.hidden = false;
  }

  function destroy() {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }

  update(currentTarget);

  return {
    update,
    destroy,
  };
}
