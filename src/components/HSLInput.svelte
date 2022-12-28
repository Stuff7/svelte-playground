<script lang="ts">
  import type { HSL } from 'utils/color';
  import Input from './Input.svelte';

  export let color: HSL = [0, 100, 50];
  export let label = 'HSL';

  $: [inputH, inputS, inputL] = color;
</script>

<section class="HSLInput">
  <span class="HSLInput__label">{label}</span>
  <div class="HSLInput__inputs">
    <Input
      bind:value={inputH}
      on:input={({ detail }) => color = [detail, color[1], color[2]]}
    />
    <Input
      bind:value={inputS}
      on:input={({ detail }) => color = [color[0], detail, color[2]]}
    />
    <Input
      bind:value={inputL}
      on:input={({ detail }) => color = [color[0], color[1], detail]}
    />
  </div>
</section>

<style lang="scss">
  @use 'style/misc';

  .HSLInput {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--hsl-input-background-hover, var(--color-secondary-200));
    color: var(--color-secondary-900);
    gap: var(--spacing-sm-50);
    padding: var(--spacing-sm-50) var(--spacing-sm-100);
    @include misc.border-radius;

    &__label {
      flex: 1;
      font-size: var(--p-nm-100);
      font-weight: bold;
    }

    &__inputs {
      --input-background: var(--hsl-input-background, var(--color-secondary-400));
      --input-padding: var(--spacing-sm-50) var(--spacing-sm-25);
      --input-max-width: min-content;
      --input-font-size: var(--p-nm-100);
      --input-text-align: center;
      --input-width: #{clamp(misc.rem(32), 4vw, misc.rem(42))};

      display: flex;
      flex: 0;
      gap: var(--spacing-sm-50);
    }
  }
</style>
