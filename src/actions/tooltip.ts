import type { ComponentProps, SvelteComponent } from 'svelte';
import { check_outros, group_outros, transition_out } from 'svelte/internal';
import type { MouseTouchEvent } from 'types/events';
import type { Position } from 'types/math';
import { addTooltipPortal, deleteTooltipPortal } from 'store/tooltip';
import { getPagePos } from 'utils/dom';
import { getElementByPortalId } from 'actions/portal';
import Tooltip from 'actions/TooltipFromAction.svelte';

export function tooltip<T extends HTMLElement>(node: T) {
  let tooltipComponent: Tooltip | undefined;
  const isStatic = node.dataset.tooltipStatic !== undefined;

  function hoverStart(e: MouseTouchEvent) {
    const target = getElementByPortalId('tooltip');

    if (!target) {
      throw new Error('Could not find portal for tooltips', { cause: node });
    }

    const event = getPagePos(e);
    const id = node.dataset.tooltipId;
    const position = node.dataset.tooltipPosition as Position;
    const rect = node.getBoundingClientRect();
    const title = node.dataset.tooltip;
    const props: ComponentProps<Tooltip> = {
      id,
      isStatic,
      position,
      rect,
      title,
      x: event.pageX,
      y: event.pageY,
    };

    if (isStatic) {
      props.x = rect.left;
      props.y = rect.top;
    }

    tooltipComponent?.$destroy();
    removePortal();
    tooltipComponent = new Tooltip({ intro: true, props, target });

    if (id) {
      addTooltipPortal(id);
    }
  }

  function hoverMove(e: MouseTouchEvent) {
    const event = getPagePos(e);
    tooltipComponent?.$set({
      x: event.pageX,
      y: event.pageY,
    });
  }

  function hoverEnd() {
    outroAndDestroy(tooltipComponent, removePortal);
  }

  function removePortal() {
    const id = node.dataset.tooltipId;
    if (id) {
      deleteTooltipPortal(id);
    }
  }

  node.addEventListener('mouseenter', hoverStart);
  node.addEventListener('touchstart', hoverStart);
  if (!isStatic) {
    node.addEventListener('mousemove', hoverMove);
    node.addEventListener('touchmove', hoverMove);
  }
  node.addEventListener('mouseleave', hoverEnd);
  document.addEventListener('touchend', hoverEnd);

  return {
    destroy() {
      node.removeEventListener('mouseenter', hoverStart);
      node.removeEventListener('touchstart', hoverStart);
      if (!isStatic) {
        node.removeEventListener('mousemove', hoverMove);
        node.removeEventListener('touchmove', hoverMove);
      }
      node.removeEventListener('mouseleave', hoverEnd);
      document.removeEventListener('touchend', hoverEnd);
      hoverEnd();
    },
  };
}

// Workaround for https://github.com/sveltejs/svelte/issues/4056
function outroAndDestroy(instance?: SvelteComponent, callback?: () => void) {
  if (instance?.$$.fragment) {
    group_outros();
    transition_out(instance.$$.fragment, 0, 0, () => {
      instance.$destroy();
      callback?.();
    });
    check_outros();
  } else {
    instance?.$destroy();
    callback?.();
  }
}
