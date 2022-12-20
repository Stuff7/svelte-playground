<script lang="ts">
  import { genCssVars, getPagePos } from 'utils/dom';
  import drag from 'actions/drag';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{ drag: Point }>();

  export let position: Position = 'none';

  let startX = 0;
  let startY = 0;
  let x = 0;
  let y = 0;
  let endX = 0;
  let endY = 0;
  let isDragging = false;

  function startDrag({ detail: { event: e } }: CustomDragEvent) {
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
  style={genCssVars({ x: `${x}px`, y: `${y}px` })}
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
