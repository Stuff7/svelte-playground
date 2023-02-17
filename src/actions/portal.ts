
import { tick } from 'svelte';
import type { TooltipPortalID } from 'store/tooltip';

export default function portal<E extends HTMLElement>(
  element: E,
  target: Option<PortalID> = null,
) {
  let currentTarget = target || globalThis.document?.body;
  let targetEl: Option<HTMLElement> = null;

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
          `No element found matching target name: "${currentTarget}"`,
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

export function getElementByPortalId<T extends HTMLElement>(id: PortalID) {
  return document.querySelector<T>(`[data-portal-id = ${id}]`);
}

export type PortalID = 'modal' | 'tooltip' | TooltipPortalID | 'topbar';
