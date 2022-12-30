<script lang="ts">
  import type { CustomDragEvent } from 'types/events';
  import type { Point, Position } from 'types/math';
  import { getPagePos } from 'utils/dom';
  import drag from 'actions/drag';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{ drag: Point }>();

  export let position: Position = 'none';
  export let whitelistOnly = false;

  let startX = 0;
  let startY = 0;
  let x = 0;
  let y = 0;
  let endX = 0;
  let endY = 0;
  let isDragging = false;

  function startDrag({ detail: { event: e } }: CustomDragEvent) {
    if (whitelistOnly && e.target instanceof HTMLElement && !('draggable' in e.target.dataset)) {
      return;
    }
    isDragging = true;
    const { pageX, pageY } = getPagePos(e);
    startX = pageX;
    startY = pageY;
    document.body.style.overflow = 'hidden';
  }

  function doDrag({ detail: { event: e } }: CustomDragEvent) {
    if (!isDragging) {
      return;
    }
    const { pageX, pageY } = getPagePos(e);
    x = endX + pageX - startX;
    y = endY + pageY - startY;

    dispatch('drag', { x, y });
  }

  function finishDrag() {
    isDragging = false;
    endX = x;
    endY = y;
    document.body.style.overflow = '';
  }
</script>

<div
  class="Draggable position-{position}"
  class:dragging={isDragging}
  style="
  --draggable__x: {x}px;
  --draggable__y: {y}px;"
  on:customdragstart={startDrag}
  on:customdrag={doDrag}
  on:customdragend={finishDrag}
  use:drag
>
  <slot />
</div>

<style lang="scss">
  .Draggable {
    position: absolute;
    transform: translate(calc(var(--draggable__x) - 50%), calc(var(--draggable__y) - 50%));
    cursor: grab;
    z-index: 1;

    &.dragging {
      user-select: none;
      cursor: grabbing;
      z-index: 2;
    }

    &.position {
      &-top {
        bottom: 100%;
      }
      &-right {
        left: 100%;
      }
      &-bottom {
        top: 100%;
      }
      &-left {
        right: 100%;
      }
    }
  }
</style>
