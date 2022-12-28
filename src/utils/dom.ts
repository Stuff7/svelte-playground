import type { MouseTouchEvent } from 'types/events';
import { kebabCase } from 'utils/string';

export function cssCustomProps(vars: Record<string, unknown>) {
  return Object.entries(vars).reduce((css, [key, val]) => (
    `${css}--${kebabCase(key)}:${val};`
  ), '');
}

export function checkIfSafari() {
  return !!(
    navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
    navigator.userAgent.match(/AppleWebKit/)
  );
}

export function getPagePos(e: MouseTouchEvent) {
  if (window.TouchEvent && e instanceof TouchEvent) {
    return e.touches[0];
  }
  return e as MouseEvent;
}

export function getElementByPortalId<T extends HTMLElement>(id: PortalID) {
  return document.querySelector<T>(`[data-portal-id = ${id}]`);
}

export const portalIdMap = {
  modal: 'modal',
  topbar: 'topbar',
} as const;

export type PortalID = typeof portalIdMap[keyof typeof portalIdMap];
