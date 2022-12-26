<script lang="ts">
  import { contrast, hslToRgb, toCssFn, type HSL } from 'utils/color';
  import { pointFromAngle, toFixed } from 'utils/math';
  import DraggableArea from 'components/DraggableArea.svelte';
  import HSLInput from 'components/HSLInput.svelte';
  import Slider from 'components/Slider.svelte';

  export let hslColor: HSL = [0, 100, 50];

  let isDragging = false;

  $: pickerPoint = pointFromAngle(hslColor[0], (100 - hslColor[2]) / 2, { x: 50, y: 50 });
  $: hsl = toCssFn(hslColor, 'hsl');
  $: contrastColor = toCssFn(contrast(hslToRgb(hslColor)));
</script>

<section
  class="ColorWheel"
  style="
--hsl: {hsl};
--slider-thumb-color: hsl({hslColor[0]}, {hslColor[1]}%, 50%);
--picker-x: {pickerPoint.x}%;
--picker-y: {pickerPoint.y}%;
--picker-h: {hslColor[0]};
--picker-s: {hslColor[1]}%;
--picker-l: {hslColor[2]}%;
--contrast: {contrastColor};"
>
  <DraggableArea
    shape="circle"
    bind:isDragging
    on:areadrag={({ detail: { shapeDrag } }) => {
      hslColor = [toFixed(shapeDrag.angle, 1), hslColor[1], toFixed(100 - shapeDrag.lengthPercent, 1)];
    }}
  >
    <div class="ColorWheel__picker" class:dragging={isDragging}/>
  </DraggableArea>
  <Slider
    hideMinMax
    hideValue
    min={0}
    max={100}
    step={0.1}
    valueLabelPosition="bottom"
    bind:value={hslColor[1]}
  />
  <HSLInput bind:color={hslColor} />
</section>

<style lang="scss">
  @use 'style/color';
  @use 'style/misc';

  .ColorWheel {
    display: flex;
    flex-direction: column;
    padding: var(--spacing-nm-100);
    background: var(--color-secondary-400);
    border: 1px solid var(--color-secondary-500);
    border-radius: var(--radius-nm-100);
    width: min-content;
    gap: var(--spacing-md-200);

    --slider-track-color: linear-gradient(90deg, hsl(var(--picker-h), 0%, 50%), hsl(var(--picker-h), 100%, 50%));
    --slider-track-before-color: transparent;

    --draggable-area-size: max(#{misc.rem(180)}, 20vw);
    --draggable-area-background:
      radial-gradient(
        #fff 0%, #fffc 6.25%, #fff8 13%, #fff6 19.5%, #fff4 25%, #fff2 31.5%, #fff0 38%,
        #0002 42.5%, #0004 50%, #0008 56.5%, #000c 63%, #000 69.5%),
      conic-gradient(#{color.hue-step(40, var(--picker-s))});

    &__picker {
      position: absolute;
      width: var(--spacing-lg-100);
      aspect-ratio: 1 / 1;
      background-color: var(--hsl);
      border: 2px solid var(--contrast);
      border-radius: 50%;
      transform: translate(-50%, 50%);
      left: var(--picker-x);
      bottom: var(--picker-y);
      cursor: grab;
      &.dragging {
        cursor: grabbing;
      }
    }
  }
</style>
