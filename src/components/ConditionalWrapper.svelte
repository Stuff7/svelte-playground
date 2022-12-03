<script lang="ts">
  import type { SvelteComponent } from 'svelte';

  export let component: typeof SvelteComponent | null = null;
  export let wrap = false;
</script>

{#if wrap}
  <svelte:component this={component} {...$$restProps}>
    <slot />
  </svelte:component>
{:else}
  <slot />
{/if}
