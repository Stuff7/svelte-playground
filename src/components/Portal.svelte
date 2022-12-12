<script lang="ts">
  import { portal } from 'actions/portal';
  import type { PortalID } from 'utils/dom';

export let target: PortalID | undefined = undefined;
</script>

<div use:portal={target}>
  <slot />
</div>
