<script lang="ts">
  import Portal from 'components/Portal.svelte';
  import Draggable from 'components/Draggable.svelte';
  import ConditionalWrapper from 'components/ConditionalWrapper.svelte';
  import { portalIdMap } from 'utils/dom';

  export let open = false;
  export let portal = false;
  export let position: Position = 'none';
</script>

<ConditionalWrapper component={Portal} target={portalIdMap.modal} wrap={portal}>
  <Draggable {position}>
    <dialog class="Modal" class:center={portal} {open}>
      <slot />
    </dialog>
  </Draggable>
</ConditionalWrapper>

<style lang="scss">
  .Modal {
    background: transparent;
    &.center {
      position: absolute;
      transform: translate(-50%, -50%);
    }
  }
</style>
