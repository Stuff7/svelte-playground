<script lang="ts">
  import { genCssVars, getPagePos } from 'utils/dom';
  import drag from 'actions/drag';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let position: Position = 'none';
  export let minX = NaN;
  export let maxX = NaN;
  export let minY = NaN;
  export let maxY = NaN;
  export let startingX = 0;
  export let startingY = 0;

  let startX = startingX;
  let startY = startingY;
  let x = startingX;
  let y = startingY;
  let endX = startingX;
  let endY = startingY;
  let isDragging = false;

  function startDrag({ detail: { event: e } }: DragAction) {
    isDragging = true;
    const { pageX, pageY } = getPagePos(e);
    startX = pageX;
    startY = pageY;
    document.body.style.overflow = 'hidden';
  }

  function doDrag({ detail: { event: e } }: DragAction) {
    if (!isDragging) {
      return;
    }
    const { pageX, pageY } = getPagePos(e);
    let newX = endX + pageX - startX;
    let newY = endY + pageY - startY;

    newX = isNaN(minX) ? newX : Math.max(minX, newX);
    newY = isNaN(minY) ? newY : Math.max(minY, newY);

    x = isNaN(maxX) ? newX : Math.min(maxX, newX);
    y = isNaN(maxY) ? newY : Math.min(maxY, newY);

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
  style={genCssVars({ x: `${x}px`, y: `${y}px` })}
  on:dragstart={startDrag}
  on:drag={doDrag}
  on:dragend={finishDrag}
  use:drag
>
  <slot />
</div>

<style lang="scss">
  .Draggable {
    position: absolute;
    transform: translate(calc(var(--x) - 50%), calc(var(--y) - 50%));
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
