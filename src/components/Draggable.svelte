<script lang="ts">
  import { onMount } from 'svelte';
  import { genCssVars, getPagePos, type MouseTouchEvent } from 'utils/dom';

  let x = 0;
  let y = 0;
  let startX = 0;
  let startY = 0;
  let isDragging = false;
  let container: HTMLDivElement;

  onMount(() => {
    const parent = container.parentElement?.getBoundingClientRect();
    if (!parent) {
      return;
    }
    x = parent.left;
    y = parent.top;
  });

  function startDrag(e: MouseTouchEvent) {
    isDragging = true;
    const { left: offsetX, top: offsetY } = container.getBoundingClientRect();
    const { clientX, clientY } = getPagePos(e);
    startX = clientX - offsetX;
    startY = clientY - offsetY;
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);
    document.addEventListener('mouseup', finishDrag);
    document.addEventListener('touchend', finishDrag);
    document.body.style.overflow = 'hidden';
  }

  function drag(e: MouseTouchEvent) {
    if (!isDragging) {
      return;
    }
    const { pageX, pageY } = getPagePos(e);
    x = pageX - startX;
    y = pageY - startY;
    e.preventDefault();
  }

  function finishDrag() {
    isDragging = false;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('touchmove', drag);
    document.removeEventListener('mouseup', finishDrag);
    document.removeEventListener('touchend', finishDrag);
    document.body.style.overflow = '';
  }
</script>

<div
  class="Draggable"
  class:dragging={isDragging}
  style={genCssVars({ x: `${x}px`, y: `${y}px` })}
  bind:this={container}
  on:mousedown={startDrag}
  on:touchstart={startDrag}
>
  <slot />
</div>

<style lang="scss">
  .Draggable {
    position: absolute;
    transform: translate(var(--x), var(--y));
    cursor: grab;

    &.dragging {
      user-select: none;
      cursor: grabbing;
    }
  }
</style>
