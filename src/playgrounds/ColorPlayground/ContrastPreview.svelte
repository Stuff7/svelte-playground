<script lang="ts">
  import ColorPreview from './ColorPreview.svelte';
  import { contrast, hexString, hexToRgb } from 'utils/color';
  import colorPreview from 'store/color-preview';

  export let hexText: string;
  export let hexBackground: string;

  $: contrastOptions = {
    minDifference: $colorPreview.minimumLikeness,
    strength: $colorPreview.percentage,
  };
  $: hexBackgroundContrast = hexString(contrast(hexToRgb(hexBackground), hexToRgb(hexText), contrastOptions));
  $: hexTextContrast = hexString(contrast(hexToRgb(hexText), hexToRgb(hexBackground), contrastOptions));
</script>

<div class="ContrastPreview">
  <ColorPreview
    editable
    bind:hexBackground={hexText}
    bind:hexText={hexTextContrast}
    name="Text"
  />
  <ColorPreview
    editable
    bind:hexBackground={hexBackground}
    bind:hexText={hexBackgroundContrast}
    name="Background"
  />
  <ColorPreview
    bind:hexBackground={hexBackgroundContrast}
    bind:hexText={hexBackground}
    name="Contrast"
  />
</div>

<style lang="scss">
  .ContrastPreview {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
</style>
