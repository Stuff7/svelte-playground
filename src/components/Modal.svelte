<script lang="ts">
  import type { MixedPosition } from 'types/math';
  import Portal from 'components/Portal.svelte';
  import Draggable from 'components/Draggable.svelte';
  import ConditionalWrapper from 'components/ConditionalWrapper.svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{ close: undefined }>();

  export let open = true;
  export let portal = false;
  export let position: MixedPosition = 'none';
  export let disableDrag = false;
  export let backdrop = false;
  export let whitelistOnly = false;

  function close() {
    open = false;
    dispatch('close');
  }

  $: positionClass = disableDrag ? position : '';
</script>

{#if open}
  <ConditionalWrapper component={Portal} target="modal" wrap={portal}>
    {#if backdrop}
      <div class="Modal__backdrop" aria-hidden="true" on:click={close} />
    {/if}
    <dialog class="Modal {positionClass}" class:center={portal} open>
      <ConditionalWrapper component={Draggable} wrap={!disableDrag} {position} {whitelistOnly}>
        <slot />
      </ConditionalWrapper>
    </dialog>
  </ConditionalWrapper>
{/if}

<style lang="scss">
  @use 'style/misc';

  .Modal {
    $component: &;
    background: transparent;
    z-index: 10;

    &__backdrop {
      position: fixed;
      left: 0;
      top: 0;
      width: 100vw;
      height: 100vh;
      z-index: 9;
    }

    &.center {
      position: absolute;
      transform: translate(-50%, -50%);
    }

    &__triangle {
      position: absolute;
    }

    $gap: var(--spacing-nm-100);
    @include misc.position-classes($mixed: true) using($pos, $inv-pos) {
      @if $pos == left or $pos == right {
        top: 50%;
        left: if($pos == right, calc(100% + $gap), -100%);
        transform: if($pos == right, translate(0, -50%), translate(-100%, -50%));
      } @else {
        #{$inv-pos}: calc(100% + $gap);
        @if $pos == top or $pos == bottom {
          left: 50%;
          transform: translateX(-50%);
        } @else if $pos == top-left or $pos == bottom-left {
          left: 100%;
          transform: translateX(-100%);
        }
      }
    }
  }
</style>
