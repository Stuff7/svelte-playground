<script lang="ts">
  import Slider from 'components/Slider.svelte';
  import { randomColor } from 'utils/color';
  import colorPreview from 'store/color-preview';
  import CssContrast from './CSSContrast.svelte';
  import ContrastPreview from './ContrastPreview.svelte';

  let colors = [...new Array(5)].map(randomColor);

  function formatSlideValue(value: number) {
    return value.toFixed(4);
  }

  function randomize() {
    colors = [...new Array(5)].map(randomColor);
  }
</script>

<section class="ColorPlayground" on:dblclick={randomize}>
  <div class="ColorPlayground__slider-container">
    <Slider
      formatter={formatSlideValue}
      label="Minimum Likeness"
      max={1}
      min={0.0001}
      step={0.0001}
      bind:value={$colorPreview.minimumLikeness}
    />
  </div>
  <div class="ColorPlayground__slider-container">
    <Slider
      formatter={formatSlideValue}
      label="Lighten/Darken Percentage"
      max={1}
      min={0.0001}
      step={0.0001}
      bind:value={$colorPreview.percentage}
    />
  </div>
  <CssContrast />
  {#each colors as colorText (`text-${colorText}`)}
    {#each colors as colorBackground (`background-${colorBackground}`)}
      <ContrastPreview hexBackground={colorBackground} hexText={colorText} />
    {/each}
  {/each}
</section>

<style lang="scss">
  @use 'style/color';
  @use 'style/misc';

  .ColorPlayground {
    display: flex;
    padding: var(--spacing-sm-100) var(--spacing-nm-100);
    flex-direction: column;
    height: 100%;

    &__slider-container {
      padding: var(--spacing-sm-100) var(--spacing-md-100);
      background-color: var(--color-secondary-300);
      display: flex;
      gap: 1rem;
      flex-direction: column;
      border-top: 1px solid var(--color-primary-100-contrast);
    }
  }
</style>
