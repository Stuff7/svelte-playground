<script lang="ts">
  import { contrast, hslToRgb, toCssFn, type HSL } from 'utils/color';
  import { pointFromAngle, toFixed } from 'utils/math';
  import DraggableArea from 'components/DraggableArea.svelte';
  import HSLInput from 'components/HSLInput.svelte';
  import Slider from 'components/Slider.svelte';

  export let hslColor: HSL = [0, 100, 50];

  let isDragging = false;

  $: pickerPoint = pointFromAngle(hslColor[0], 50, { x: 50, y: 50 });
  $: contrastColor = toCssFn(contrast(hslToRgb(hslColor)));
  $: contrastH = toCssFn(contrast(hslToRgb([hslColor[0], 100, 50])));
  $: contrastS = toCssFn(contrast(hslToRgb([hslColor[0], hslColor[1], 50])));
  $: contrastL = toCssFn(contrast(hslToRgb([0, 0, hslColor[2]])));
</script>

<section
  class="ColorWheel"
  style="
--color-wheel__hsl: hsl({hslColor[0]}, {hslColor[1]}%, {hslColor[2]}%);
--color-wheel__knob-x: {pickerPoint.x}%;
--color-wheel__knob-y: {pickerPoint.y}%;
--color-wheel__knob-rotation: {90 - hslColor[0]}deg;
--color-wheel__h: {hslColor[0]}deg;
--color-wheel__s: {hslColor[1]}%;
--color-wheel__l: {hslColor[2]}%;
--color-wheel__contrast: {contrastColor};
--color-wheel__contrast-h: {contrastH};
--color-wheel__contrast-s: {contrastS};
--color-wheel__contrast-l: {contrastL};"
>
  <DraggableArea
    shape="circle"
    bind:isDragging
    on:areadrag={({ detail: { shapeDrag } }) => {
      hslColor = [toFixed(shapeDrag.angle, 1), hslColor[1], hslColor[2]];
    }}
  >
    <div class="ColorWheel__panel">
      <div class="ColorWheel__panel__knob" class:dragging={isDragging}>
        <svg class="ColorWheel__panel__knob__triangle" width="512" height="512" viewBox="0 0 512 512" fill="#C73436">
          <path d="M216.39 27.9384L2.23756 453.087C-5.4107 470.092 6.3167 512 40.989 512H471.844C508.046 512 518.754 470.092 508.046 447.013L294.913 27.9384C284.977 11.6708 269.784 0.0106391 255.142 7.84612e-06C238.913 -0.0117758 223.36 13.251 216.39 27.9384Z"/>
        </svg>
      </div>
    </div>
  </DraggableArea>
  <div class="ColorWheel__controls">
    <Slider
      style="
      --slider-track-color: linear-gradient(90deg,
        hsl(var(--color-wheel__h), 0%, var(--color-wheel__l)), hsl(var(--color-wheel__h), 100%, var(--color-wheel__l))
      );"
      hideMinMax
      hideValue
      label="SATURATION"
      min={0}
      max={100}
      step={0.1}
      bind:value={hslColor[1]}
    />
    <Slider
      style="
      --slider-track-color: linear-gradient(90deg,
        hsl(var(--color-wheel__h), var(--color-wheel__s), 0%),
        hsl(var(--color-wheel__h), var(--color-wheel__s), 50%),
        hsl(var(--color-wheel__h), var(--color-wheel__s), 100%)
      );"
      hideMinMax
      hideValue
      label="LIGHTNESS"
      min={0}
      max={100}
      step={0.1}
      bind:value={hslColor[2]}
    />
    <HSLInput bind:color={hslColor} />
  </div>
</section>

<style lang="scss">
  @use 'style/color';
  @use 'style/misc';
  @use 'style/media';

  .ColorWheel {
    --color-wheel__background: var(--color-secondary-400);
    --color-wheel__radius: calc(var(--draggable-area-size) / 2);

    display: flex;
    gap: var(--spacing-md-100);
    @include media.smaller-than(tablet) {
      flex-direction: column;
      justify-content: center;
    }
    padding: var(--spacing-nm-100) var(--spacing-md-100);
    background: var(--color-wheel__background);
    border: 1px solid var(--color-secondary-500);
    border-radius: var(--radius-md-100);
    width: min-content;
    height: max-content;
    position: relative;

    --draggable-area-cursor: grab;
    --draggable-area-size: clamp(#{misc.rem(180)}, 20vw, #{misc.rem(200)});
    --draggable-area-position: relative;
    --draggable-area-z-index: 1;
    --draggable-area-background: conic-gradient(#{color.hue-step(40, var(--color-wheel__s), var(--color-wheel__l))});

    &__controls {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: var(--spacing-sm-100);
      width: var(--draggable-area-size);
      --slider-thumb-color: var(--color-wheel__hsl);
      --slider-track-before-color: transparent;
      --slider-track-width: var(--spacing-nm-200);
      --slider-label-letter-spacing: var(--spacing-sm-50);
      --slider-label-font-size: var(--p-nm-100);
    }

    &__panel {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) rotate(var(--color-wheel__knob-rotation));
      display: flex;
      justify-content: center;
      align-items: center;
      width: 60%;
      aspect-ratio: 1 / 1;
      background: var(--color-wheel__background);
      border-radius: 50%;
      &__knob {
        position: relative;
        width: 75%;
        aspect-ratio: 1 / 1;
        border-radius: 50%;
        border: 1px solid var(--color-wheel__contrast);
        cursor: grab;
        &.dragging {
          cursor: grabbing;
        }

        &__triangle {
          position: absolute;
          left: 50%;
          top: 0;
          transform: translate(-50%, -65%);
          width: calc(var(--color-wheel__radius) / 2);
          height: calc(var(--color-wheel__radius) / 1.5);
          fill: var(--color-wheel__hsl);
          stroke: var(--color-wheel__contrast);
          stroke-width: 10px;
        }

        &::after {
          content: "";
          background: var(--color-wheel__hsl);
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }
  }
</style>
