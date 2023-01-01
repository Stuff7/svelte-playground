<script lang="ts">
  import type { SvelteComponent } from 'svelte';

  export let component: Option<typeof SvelteComponent> = null;
  export let wrap = false;
</script>

{#if wrap}
  <svelte:component this={component} {...$$restProps}>
    <slot />
  </svelte:component>
{:else}
  <slot />
{/if}
