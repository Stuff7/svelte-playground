<script lang="ts">
  import { portal, type PortalID } from 'actions/portal';

  export let target: Option<PortalID> = null;
  export let style: Option<string> = null;
</script>

<div {style} use:portal={target}>
  <slot />
</div>
