<script lang="ts">
  import { contrast, hslToRgb, toCssFn } from 'utils/color';
  import { genCssVars } from 'utils/dom';
  import Slider from 'components/Slider.svelte';

  let h = 29;
  let s = 90;
  let l = 40;

  function degrees(value: number) {
    return `${value}°`;
  }
  function percentage(value: number) {
    return `${value.toFixed(1)}%`;
  }

  $: bgColor = hslToRgb([h, s, l]);
  $: textColor = contrast(bgColor);
  $: textColorString = toCssFn(textColor);
</script>

<section class="CSSContrast">
  <Slider
    formatter={degrees}
    label="Hue"
    max={360}
    min={0}
    step={1}
    bind:value={h}
  />
  <Slider
    formatter={percentage}
    label="Saturation"
    max={100}
    min={0}
    step={0.5}
    bind:value={s}
  />
  <Slider
    formatter={percentage}
    label="Lightness"
    max={100}
    min={0}
    step={0.5}
    bind:value={l}
  />
  <figure
    class="CSSContrast__color-preview"
    style={genCssVars({ h, s: percentage(s), l: percentage(l), contrast: textColorString })}
  >
    <figcaption>hsl({h}, {percentage(s)}, {percentage(l)})</figcaption>
  </figure>
</section>

<style lang="scss">
  @use 'style/misc';
  .CSSContrast {
    display: grid;
    grid-template: 
      "a d" max-content
      "b d" max-content
      "c d" max-content / 60% 1fr;
    place-content: center;

    &__color-preview {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: clamp(misc.rem(16), 2.5vw, misc.rem(32));
      grid-area: d;

      background: hsl(var(--h), var(--s), var(--l));
      color: var(--contrast);
    }
  }
</style>
