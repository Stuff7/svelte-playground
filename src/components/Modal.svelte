<script lang="ts">
  import Portal from 'components/Portal.svelte';
  import Draggable from 'components/Draggable.svelte';
  import ConditionalWrapper from 'components/ConditionalWrapper.svelte';
  import { portalIdMap } from 'utils/dom';

  export let open = false;
  export let portal = false;
  export let position: Position = 'bottom';
</script>

<ConditionalWrapper component={Portal} target={portalIdMap.modal} wrap={portal}>
  <Draggable {position}>
    <dialog class="Modal" {open}>
      <slot />
    </dialog>
  </Draggable>
</ConditionalWrapper>

<style lang="scss">
  .Modal {
    background: transparent;
  }
</style>
