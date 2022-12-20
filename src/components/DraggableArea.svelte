<script lang="ts">
  import { getPagePos } from 'utils/dom';
  import drag from 'actions/drag';
  import { createEventDispatcher } from 'svelte';
  import { resizeObserver } from 'actions/resizeObserver';
  import { circleSquareSide, clamp, lineLength, pointAtLength, squareCircumcircleRadius, type Shape } from 'utils/math';

  const dispatch = createEventDispatcher<{ areadrag: AreaDragDetail }>();

  export let isDragging = false;
  export let shape: Shape = 'rectangle';

  let x = 0;
  let y = 0;
  let percentage = { x, y };
  let rect = { width: 1, height: 1 };
  let draggableArea: HTMLDivElement;

  let updatePoint: (point: Point) => void;
  $: {
    switch (shape) {
      case 'rectangle': {
        updatePoint = (point: Point) => {
          const { width, height } = rect;
          x = clamp(0, point.x, width);
          y = clamp(0, point.y, height);
          percentage = { x: x / width * 100, y: y / height * 100 };
        };
        break;
      }
      case 'circle': {
        const radius = squareCircumcircleRadius(rect, 'inner');
        const center = { x: rect.width / 2, y: rect.height / 2 };
        const innerRectSize = circleSquareSide(radius, 'inner');

        updatePoint = (point: Point) => {
          const line: LineSegment = { a: center, b: point };
          ({ x, y } = lineLength(line) > radius ? pointAtLength(line, radius) : point);
          percentage = {
            x: clamp(0, (x + innerRectSize / 2 - radius) / innerRectSize * 100, 100),
            y: clamp(0, (y + innerRectSize / 2 - radius) / innerRectSize * 100, 100),
          };
          percentage = { x: x / rect.width * 100, y: y / rect.height * 100 };
        };
        break;
      }
      default: {
        throw new Error(`Unhandled DraggableArea shape: ${shape}`);
      }
    }
  }

  function startDrag(action: CustomDragEvent) {
    isDragging = true;
    document.body.style.overflow = 'hidden';
    document.body.style.userSelect = 'none';
    doDrag(action);
  }

  function doDrag({ detail: { event: e } }: CustomDragEvent) {
    if (!isDragging) {
      return;
    }
    const { left, top } = draggableArea?.getBoundingClientRect() || {};
    const { pageX, pageY } = getPagePos(e);

    updatePoint({ x: pageX - left, y: rect.height - (pageY - top) });

    dispatch('areadrag', { x, y, isDragging, percentage });
  }

  function finishDrag(action: CustomDragEvent) {
    isDragging = false;
    document.body.style.overflow = '';
    document.body.style.userSelect = '';
    doDrag(action);
  }
</script>

<div
  class="DraggableArea"
  class:circle={shape === 'circle'}
  bind:this={draggableArea}
  on:customdragstart={startDrag}
  on:customdrag={doDrag}
  on:customdragend={finishDrag}
  use:drag
  use:resizeObserver={(size) => rect = size}
>
  <slot />
</div>

<style lang="scss">
  .DraggableArea {
    position: relative;
    background: var(--draggable-area-background);
    width: var(--draggable-area-width, var(--draggable-area-size));
    height: var(--draggable-area-height, var(--draggable-area-size));
    &.circle {
      border-radius: 50%;
    }
  }
</style>
