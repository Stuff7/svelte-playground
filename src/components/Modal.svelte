<script lang="ts">
  import Portal from 'components/Portal.svelte';
  import Draggable from 'components/Draggable.svelte';
  import { portalIdMap } from 'utils/dom';
</script>

<Portal target={portalIdMap.modal}>
  <Draggable>
    <slot />
  </Draggable>
</Portal>
