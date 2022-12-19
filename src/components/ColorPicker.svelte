<script lang="ts">
  import DraggableArea from 'components/DraggableArea.svelte';
  import { contrast, hslToRgb, hsvToHsl, hslToHsv, toCssFn, type HSL, type HSV } from 'utils/color';
  import Slider from 'components/Slider.svelte';
  import { toFixed } from 'utils/math';

  export let hslColor: HSL = [42, 84, 52];

  let hsvColor: HSV = hslToHsv(hslColor);
  let isDragging = false;

  $: hslColor = hsvToHsl(hsvColor);
  $: hsl = toCssFn(hslColor, 'hsl');
  $: contrastColor = toCssFn(contrast(hslToRgb(hslColor)));
</script>

<section
  class="ColorPicker"
  style="
--hsl: {hsl};
--slider-thumb-color: hsl({hslColor[0]}, 100%, 50%);
--picker-x: {hsvColor[1]}%;
--picker-y: {hsvColor[2]}%;
--picker-h: {hslColor[0]};
--picker-s: {hslColor[1]}%;
--picker-l: {hslColor[2]}%;
--contrast: {contrastColor};"
>
  <DraggableArea
    bind:isDragging
    on:areadrag={({ detail: { percentage: { x, y } } }) => hsvColor = [hsvColor[0], x, y]}
  >
    <div class="ColorPicker__picker" class:dragging={isDragging}/>
  </DraggableArea>
  <Slider
    hideMinMax
    hideValue
    min={0}
    max={360}
    bind:value={hsvColor[0]}
    formatter={(v) => `${toFixed(v)}°`}
    valueLabelPosition="bottom"
  />
</section>

<style lang="scss">
  @use 'style/color';
  @use 'style/misc';

  .ColorPicker {
    display: flex;
    flex-direction: column;
    padding: var(--spacing-nm-100);
    background: var(--color-secondary-400);
    border: 1px solid var(--color-secondary-500);
    border-radius: var(--radius-nm-100);
    width: min-content;
    gap: var(--spacing-md-200);

    --slider-track-color: linear-gradient(90deg,
      hsl(0,100%,50%),
      hsl(60,100%,50%),
      hsl(120,100%,50%),
      hsl(180,100%,50%),
      hsl(240,100%,50%),
      hsl(300,100%,50%),
      hsl(360,100%,50%)
    );
    --slider-track-before-color: transparent;

    --draggable-area-size: max(#{misc.rem(180)}, 20vw);
    --draggable-area-background:
      linear-gradient(180deg, hsla(0, 0%, 100%, 0) 0%, hsl(0, 0%, 0%) 100%),
      linear-gradient(90deg, hsl(0, 0%, 100%) 0%, hsla(0, 0%, 50%, 0) 100%),
      hsl(var(--picker-h), 100%, 50%);

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
