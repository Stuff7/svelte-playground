<script context="module" lang="ts">
  const colorKeys = ['primary', 'secondary', 'tertiary'] as const;
  type ColorKey = typeof colorKeys[number];
</script>

<script lang="ts">
  import { capitalize } from 'utils/string';
  import { tooltip } from 'actions/tooltip';
  import preferences from 'store/preferences';
  import ColorWheel from 'components/ColorWheel.svelte';
  import FloatingDialog from './FloatingDialog.svelte';

  let activeColorKey: Option<ColorKey> = null;
</script>

<article class="ColorSettings">
  {#each colorKeys as colorKey}
    <section
      class="ColorSettings__ColorPicker"
      style:--color="var(--color-{colorKey})"
      style:--contrast="var(--color-{colorKey}-contrast)"
    >
      <button
        data-tooltip="{colorKey} color"
        on:click={() => activeColorKey = colorKey}
        use:tooltip
      >
        {colorKey[0]}
      </button>
      <FloatingDialog
        open={activeColorKey === colorKey}
        background="transparent"
        padding="0"
        radius="var(--radius-md-100)"
        on:close={() => activeColorKey = null}
      >
        <ColorWheel bind:hslColor={$preferences[`color${capitalize(colorKey)}`]} />
      </FloatingDialog>
    </section>
  {/each}
</article>

<style lang="scss">
  @use 'style/color';
  @use 'style/text';
  @use 'style/misc';

  .ColorSettings {
    $component: &;
    display: flex;
    background: var(--color-secondary-300);
    height: 100%;

    &__ColorPicker {
      background: var(--color);
      border-inline: misc.rem(4) dotted var(--color-secondary-700);
      position: relative;
      z-index: 10;
      display: flex;
      height: 100%;
      & button, & button:hover {
        background: transparent;
        color: var(--contrast);
        border-radius: 0;
        border: 0;
        outline: 0;
        width: 100%;
        height: 100%;
        text-transform: uppercase;
        transition: font-size 0.1s;
      }
    }
  }
</style>
