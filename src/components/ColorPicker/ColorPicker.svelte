<script lang="ts">
  import Draggable from 'components/Draggable.svelte';
  import { contrast, hslToRgb, hsvToHsl, hslToHsv, toCssFn, type HSL, type HSV } from 'utils/color';
  import { resizeObserver } from 'actions/resizeObserver';
  import Slider from 'components/Slider.svelte';
  import { toFixed } from 'utils/math';

  export let hslColor: HSL = [42, 84, 52];
  let hsvColor: HSV = hslToHsv(hslColor);

  let height: number, width: number;

  function onSelectorResize(w: number, h: number) {
    width = w; height = h;
  }

  function onDrag({ detail: { x, y } }: DraggingAction) {
    const s = x / width * 100;
    const v = (height - y) / height * 100;
    hsvColor = [hsvColor[0], s, v];
  }

  $: hslColor = hsvToHsl(hsvColor);
  $: hsl = toCssFn(hslColor, 'hsl');
  $: contrastColor = toCssFn(contrast(hslToRgb(hslColor)));
</script>

<section
  class="ColorPicker"
  style="
--hsl: {hsl};
--slider-thumb-color: hsl({hslColor[0]}, 100%, 50%);
--slider-value-label-color: hsl({hslColor[0]}, 100%, 50%);
--slider-value-label-text-color: {toCssFn(contrast(hslToRgb([hslColor[0], 100, 50])))};
--picker-h: {hslColor[0]};
--picker-s: {hslColor[1]}%;
--picker-l: {hslColor[2]}%;
--contrast: {contrastColor};"
>
  <div class="ColorPicker__selector-wrapper">
    <div class="ColorPicker__selector" use:resizeObserver={onSelectorResize}>
      {#if width && height}
        <Draggable
          minX={0}
          minY={0}
          maxX={width}
          maxY={height}
          startingX={width * hsvColor[1] / 100}
          startingY={height - (height * hsvColor[2] / 100)}
          on:drag={onDrag}
        >
          <div class="ColorPicker__picker"/>
        </Draggable>
      {/if}
    </div>
    <Slider
      min={0}
      max={360}
      bind:value={hsvColor[0]}
      formatter={(v) => `${toFixed(v)}°`}
      valueLabelPosition="bottom"
    />
  </div>
</section>

<style lang="scss">
  @use 'style/color';

  .ColorPicker {
    display: flex;
    flex-direction: column;
    padding: var(--spacing-nm-100);
    background: var(--color-secondary-400);
    border: 1px solid var(--color-secondary-500);
    border-radius: var(--radius-nm-100);
    width: min-content;
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

    &__selector-wrapper {
      display: flex;
      flex-direction: column;
      width: min-content;
      gap: var(--spacing-md-200);
    }
    &__selector {
      width: 20vw;
      aspect-ratio: 1 / 1;
      background:
        linear-gradient(180deg, hsla(0, 0%, 100%, 0) 0%, hsl(0, 0%, 0%) 100%),
        linear-gradient(90deg, hsl(0, 0%, 100%) 0%, hsla(0, 0%, 50%, 0) 100%);
      background-color: hsl(var(--picker-h), 100%, 50%);
    }
    &__picker {
      width: var(--spacing-lg-100);
      aspect-ratio: 1 / 1;
      background-color: var(--hsl);
      border: 2px solid var(--contrast);
      border-radius: 50%;
    }
  }
</style>
