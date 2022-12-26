<script lang="ts">
  import type { HSL } from 'utils/color';
  import Input from './Input.svelte';

  export let color: HSL = [0, 100, 50];
  export let aliasH = 'Hue';
  export let aliasS = 'Saturation';
  export let aliasL = 'Lightness';

  $: [inputH, inputS, inputL] = color;
</script>

<div class="HSLInput">
  <Input
    formatter={(value) => `${value}°`}
    label={aliasH}
    bind:value={inputH}
    on:input={({ detail }) => color = [detail, color[1], color[2]]}
  />
  <Input
    formatter={(value) => `${value}%`}
    label={aliasS}
    bind:value={inputS}
    on:input={({ detail }) => color = [color[0], detail, color[2]]}
  />
  <Input
    formatter={(value) => `${value}%`}
    label={aliasL}
    bind:value={inputL}
    on:input={({ detail }) => color = [color[0], color[1], detail]}
  />
</div>

<style lang="scss">
  .HSLInput {
    display: flex;
    flex-wrap: nowrap;
    gap: var(--spacing-nm-100);
  }
</style>
