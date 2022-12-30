import { writable } from 'svelte/store';

export type TooltipPortalID = `tooltip-${string}`;

const tooltipStore = writable<Set<TooltipPortalID>>(new Set());

export function createTooltipID(id: string): TooltipPortalID {
  return `tooltip-${id}`;
}

export function addTooltipPortal(id: string) {
  tooltipStore.update(portalSet => {
    const newSet = new Set(portalSet);
    newSet.add(createTooltipID(id));
    return newSet;
  });
}

export function deleteTooltipPortal(id: string) {
  tooltipStore.update(portalSet => {
    const newSet = new Set(portalSet);
    newSet.delete(createTooltipID(id));
    return newSet;
  });
}

export default tooltipStore;
