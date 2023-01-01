<script context="module" lang="ts">
  const colorKeys = ['primary', 'secondary', 'tertiary'] as const;
  type ColorKey = typeof colorKeys[number];
</script>

<script lang="ts">
  import { fly } from 'svelte/transition';
  import { expoInOut } from 'svelte/easing';
  import { capitalize } from 'utils/string';
  import { clickOut } from 'actions/clickOut';
  import { tooltip } from 'actions/tooltip';
  import preferences from 'store/preferences';
  import ColorWheel from 'components/ColorWheel.svelte';

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
      {#if activeColorKey === colorKey}
        <dialog
          class="ColorSettings__dialog"
          open
          on:clickout={() => activeColorKey = null}
          transition:fly={{ easing: expoInOut, x: 100 }}
          use:clickOut
        >
          <ColorWheel bind:hslColor={$preferences[`color${capitalize(colorKey)}`]} />
        </dialog>
      {/if}
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

    &__dialog {
      background: transparent;
      position: absolute;
      top: calc(100% + var(--spacing-nm-100));
      left: 100%;
      transform: translateX(-100%);
    }
  }
</style>
