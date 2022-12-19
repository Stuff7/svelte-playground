<script lang="ts">
  import { getPagePos } from 'utils/dom';
  import drag from 'actions/drag';
  import { createEventDispatcher } from 'svelte';
  import { resizeObserver } from 'actions/resizeObserver';
  import { clamp } from 'utils/math';

  const dispatch = createEventDispatcher();

  export let isDragging = false;

  let x = 0;
  let y = 0;
  let areaRect = { width: 1, height: 1 };
  let draggableArea: HTMLDivElement;

  function startDrag(action: DragAction) {
    isDragging = true;
    document.body.style.overflow = 'hidden';
    document.body.style.userSelect = 'none';
    doDrag(action);
  }

  function doDrag({ detail: { event: e } }: DragAction) {
    if (!isDragging) {
      return;
    }
    const { left, top } = draggableArea?.getBoundingClientRect() || {};
    const { pageX, pageY } = getPagePos(e);
    const { width, height } = areaRect;

    x = clamp(0, pageX - left, width);
    y = clamp(0, height - (pageY - top), height);

    dispatch('areadrag', { x, y, percentage: { x: x / width * 100, y: y / height * 100 }, isDragging });
  }

  function finishDrag(action: DragAction) {
    isDragging = false;
    document.body.style.overflow = '';
    document.body.style.userSelect = '';
    doDrag(action);
  }
</script>

<div
  class="DraggableArea"
  bind:this={draggableArea}
  on:dragstart={startDrag}
  on:drag={doDrag}
  on:dragend={finishDrag}
  use:drag
  use:resizeObserver={(size) => areaRect = size}
>
  <slot />
</div>

<style lang="scss">
  .DraggableArea {
    position: relative;
    background: var(--draggable-area-background);
    width: var(--draggable-area-width, var(--draggable-area-size));
    height: var(--draggable-area-height, var(--draggable-area-size));
  }
</style>
