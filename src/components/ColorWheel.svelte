<script lang="ts">
  import { contrast, hslToRgb, toCssFn, type HSL } from 'utils/color';
  import { pointFromAngle, toFixed } from 'utils/math';
  import DraggableArea from 'components/DraggableArea.svelte';
  import HSLInput from 'components/HSLInput.svelte';
  import Slider from 'components/Slider.svelte';
  import Icon from 'components/Icon.svelte';

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
--color-wheel__knob-rotation: {-hslColor[0]}deg;
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
    style={isDragging ? '--draggable-area-cursor: grabbing;' : ''}
    bind:isDragging
    on:areadrag={({ detail: { shapeDrag } }) => {
      hslColor = [toFixed(shapeDrag.angle, 1), hslColor[1], hslColor[2]];
    }}
  >
    <Icon name="knob" style="pointer-events: none;" />
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
    flex-direction: column;
    justify-content: center;
    gap: var(--spacing-md-100);
    padding: var(--spacing-nm-100) var(--spacing-md-100);
    background: var(--color-wheel__background);
    border: 1px solid var(--color-secondary-500);
    border-radius: var(--radius-md-100);
    width: min-content;
    height: max-content;
    position: relative;

    --draggable-area-cursor: grab;
    --draggable-area-border: #{misc.rem(3)} solid var(--color-secondary-800);
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

    --icon-accent: var(--color-wheel__hsl);
    --icon-accent-2: var(--color-wheel__contrast);
    --icon-size: 90%;
    --icon-position: absolute;
    --icon-left: 50%;
    --icon-top: 50%;
    --icon-transform: translate(-50%, -50%) rotate(var(--color-wheel__knob-rotation));
  }
</style>
