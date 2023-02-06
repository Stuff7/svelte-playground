<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { clickOut } from 'actions/clickOut';
  import { expoInOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';

  export let open = false;
  export let background: Option<string> = null;
  export let padding: Option<string> = null;
  export let radius: Option<string> = null;
  export let display: Option<string> = null;

  const dispatch = createEventDispatcher<{ close: undefined }>();

  $: if (!open) {
    dispatch('close');
  }
</script>

{#if open}
  <dialog
    class="FloatingDialog"
    style:background
    style:padding
    style:display
    style:border-radius={radius}
    on:clickout={() => open = false}
    transition:fly|local={{ easing: expoInOut, x: 100 }}
    use:clickOut
  >
    <slot />
  </dialog>
{/if}

<style lang="scss">
  @use 'style/color';
  @use 'style/misc';

  .FloatingDialog {
    @include misc.shadow;
    background: var(--color-secondary-400);
    color: var(--color-secondary-900);
    position: absolute;
    top: calc(100% + var(--spacing-nm-100));
    left: 100%;
    transform: translateX(-100%);
    z-index: 9;
    min-width: max-content;
    padding: var(--spacing-nm-100);
    border-radius: var(--radius-nm-100);
    display: block;
  }
</style>
