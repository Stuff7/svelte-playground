<script lang="ts">
  import type { AreaDragDetail, CustomDragEvent, ShapeDrag } from 'types/events';
  import type { LineSegment, Point, Shape } from 'types/math';
  import { createEventDispatcher } from 'svelte';
  import { clamp, lineAngle, lineLength, pointAtLength, squareCircumcircleRadius } from 'utils/math';
  import { UnsupportedValueError } from 'utils/meta';
  import { getPagePos } from 'utils/dom';
  import { resizeObserver } from 'actions/resizeObserver';
  import drag from 'actions/drag';

  type S = $$Generic<Shape>;
  export let isDragging = false;
  export let shape: S = 'rectangle' as S;

  const dispatch = createEventDispatcher<{ areadrag: AreaDragDetail<S> }>();

  let rect = { width: 1, height: 1 };
  let draggableArea: HTMLDivElement;

  let updatePoint: (point: Point) => AreaDragDetail<S>;
  $: {
    switch (shape) {
      case 'rectangle': {
        updatePoint = (point: Point) => {
          const x = clamp(0, point.x, rect.width);
          const y = clamp(0, point.y, rect.height);
          const percentage = { x: x / rect.width * 100, y: y / rect.height * 100 };
          const relativePosition = { x, y, percentage };
          const rectDrag: ShapeDrag<'rectangle'> = { x, y, percentage };
          return { isDragging, relativePosition, shapeDrag: rectDrag as ShapeDrag<S> };
        };
        break;
      }
      case 'circle': {
        const radius = squareCircumcircleRadius(rect, 'inner');
        const center = { x: rect.width / 2, y: rect.height / 2 };

        updatePoint = (point: Point) => {
          const line: LineSegment = { a: center, b: point };
          const centerDistance = lineLength(line);
          const { x, y } = centerDistance > radius ? pointAtLength(line, radius) : point;
          const percentage = { x: x / rect.width * 100, y: y / rect.height * 100 };
          const relativePosition = { x, y, percentage };
          const length = Math.min(centerDistance, radius);
          const circleDrag: ShapeDrag<'circle'> = {
            length,
            lengthPercent: length / radius * 100,
            radius,
            angle: lineAngle(line),
          };
          return { isDragging, relativePosition, shapeDrag: circleDrag as ShapeDrag<S> };
        };
        break;
      }
      default: throw new UnsupportedValueError(shape);
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

    dispatch('areadrag', updatePoint({ x: pageX - left, y: rect.height - (pageY - top) }));
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
