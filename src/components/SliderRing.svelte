<script lang="ts">
  import { pointFromAngle, toFixed } from 'utils/math';
  import DraggableArea from 'components/DraggableArea.svelte';

  export let min = 0;
  export let max = 100;
  export let value = min;
  export let rotation = 0;

  let isDragging = false;

  $: length = max - min;
  $: rangePercentage = (value - min) * 100 / length;
  $: angle = toFixed(360 * rangePercentage / 100, 1);
  $: pickerPoint = pointFromAngle(angle + rotation, 50, { x: 50, y: 50 });
</script>

<section
  class="SliderRing"
  style:--ring-slider__picker-rotation="{180 - angle + rotation}deg"
  style:--ring-slider__picker-x="{pickerPoint.x}%"
  style:--ring-slider__picker-y="{pickerPoint.y}%"
  style:--ring-slider__contrast="white"
>
  <DraggableArea
    shape="circle"
    bind:isDragging
    on:areadrag={({ detail: { shapeDrag } }) => {
      let rotated = shapeDrag.angle - rotation;
      rotated = toFixed(rotated < 0 ? 360 + rotated : rotated, 1);
      // value = toFixed((shapeDrag.angle / 360 * 100 - 50) * 2, 1);
      value = toFixed(min + (rotated / 360 * length), 1);
    }}
  >
    <div class="SliderRing__picker" class:dragging={isDragging}/>
  </DraggableArea>
</section>

<style lang="scss">
  @use 'style/color';
  @use 'style/misc';

  .SliderRing {
    --ring-slider__radius: var(--ring-slider-radius, clamp(#{misc.rem(90)}, 10vw, #{misc.rem(128)}));
    --ring-slider__width: var(--ring-slider-width, var(--spacing-nm-100));
    --ring-slider__thumb-color: var(--ring-slider-thumb-color, var(--color-primary-contrast));

    --draggable-area-size: calc(var(--ring-slider__radius) * 2);
    --draggable-area-background: var(--ring-slider-background, var(--color-primary));
    --draggable-area-mask: radial-gradient(
      transparent calc(var(--ring-slider__radius) - var(--ring-slider__width)),
      #000 calc(var(--ring-slider__radius) - var(--ring-slider__width) + 1px)
    );

    position: var(--ring-slider-position, relative);
    left: var(--ring-slider-left, 0);
    top: var(--ring-slider-top, 0);
    --draggable-area-z-index: var(--ring-slider-z-index, inherit);

    &__picker {
      position: absolute;
      width: calc(var(--ring-slider__width) * 2);
      aspect-ratio: 2 / 1;
      background-color: var(--ring-slider__thumb-color);
      transform: translate(-50%, 50%) rotate(var(--ring-slider__picker-rotation));
      left: var(--ring-slider__picker-x);
      bottom: var(--ring-slider__picker-y);
      cursor: grab;
      &.dragging {
        cursor: grabbing;
      }
    }
  }
</style>
