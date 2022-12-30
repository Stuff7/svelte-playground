<script lang="ts">
  import Portal from 'components/Portal.svelte';
  import tooltipStore, { createTooltipID } from 'store/tooltip';

  export let forProp: string;
  export let style = '';

  $: target = createTooltipID(forProp);

  export { forProp as for };
</script>

{#if $tooltipStore.has(target)}
  <Portal {style} {target}>
    <slot />
  </Portal>
{/if}
