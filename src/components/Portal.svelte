<script lang="ts">
  import { portal, type PortalID } from 'actions/portal';

  export let target: PortalID | undefined = undefined;
  export let style = '';
</script>

<div {style} use:portal={target}>
  <slot />
</div>
