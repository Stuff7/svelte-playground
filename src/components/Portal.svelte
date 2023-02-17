<script lang="ts">
  import portal, { type PortalID } from 'actions/portal';

  export let target: Option<PortalID> = null;
  export let style: Option<string> = null;
  export let element: keyof HTMLElementTagNameMap = 'div';
</script>

<svelte:element {style} use:portal={target} this={element}>
  <slot />
</svelte:element>
