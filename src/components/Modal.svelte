<script lang="ts">
  import Portal from 'components/Portal.svelte';
  import Draggable from 'components/Draggable.svelte';
  import ConditionalWrapper from 'components/ConditionalWrapper.svelte';
  import { portalIdMap } from 'utils/dom';

  export let open = true;
  export let portal = false;
  export let position: Position = 'none';
  export let disableDrag = false;
</script>

{#if open}
  <ConditionalWrapper component={Portal} target={portalIdMap.modal} wrap={portal}>
    <ConditionalWrapper component={Draggable} wrap={!disableDrag} {position}>
      <dialog class="Modal {disableDrag ? `position-${position}` : ''}" class:center={portal} open>
        <slot />
      </dialog>
    </ConditionalWrapper>
  </ConditionalWrapper>
{/if}

<style lang="scss">
  .Modal {
    background: transparent;
    &.center {
      position: absolute;
      transform: translate(-50%, -50%);
    }
    &.position {
      position: absolute;
      z-index: 10;
      &-top {
        left: 50%;
        transform: translateX(-50%);
        bottom: 100%;
      }
      &-right {
        left: -100%;
        transform: translateX(100%);
        top: 100%;
      }
      &-bottom {
        left: 50%;
        transform: translateX(-50%);
        top: 100%;
      }
      &-left {
        left: 100%;
        transform: translateX(-100%);
        top: 100%;
      }
    }
  }
</style>
