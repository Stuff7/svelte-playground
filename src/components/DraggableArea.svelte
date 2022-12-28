<script lang="ts">
  import type { AreaDragDetail, CustomDragEvent, Shape, ShapeDrag } from 'types/events';
  import type { LineSegment, Point } from 'types/math';
  import { createEventDispatcher } from 'svelte';
  import { clamp, lineAngle, lineLength, pointAtLength, squareCircumcircleRadius } from 'utils/math';
  import { UnsupportedValueError } from 'utils/meta';
  import { getPagePos } from 'utils/dom';
  import { resizeObserver } from 'actions/resizeObserver';
  import drag from 'actions/drag';

  type S = $$Generic<Shape>;
  export let isDragging = false;
  export let shape: S = 'rectangle' as S;
  export let style = '';

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
  class:dragging={isDragging}
  draggable="false"
  {style}
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
  @use 'style/misc';

  .DraggableArea {
    position: var(--draggable-area-position, relative);
    transform: var(--draggable-area-transform, inherit);
    left: var(--draggable-area-left, inherit);
    top: var(--draggable-area-top, inherit);
    z-index: var(--draggable-area-z-index, 0);
    border: var(--draggable-area-border, 0);
    background: var(--draggable-area-background);
    cursor: var(--draggable-area-cursor, initial);
    width: var(--draggable-area-width, var(--draggable-area-size, misc.rem(200)));
    height: var(--draggable-area-height, var(--draggable-area-size, misc.rem(200)));
    mask: var(--draggable-area-mask, none);

    &.circle {
      border-radius: 50%;
      flex: 0 0 auto;
    }

    &.dragging {
      -webkit-user-select: none;
      user-select: none;
    }
  }
</style>
