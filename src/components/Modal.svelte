<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { expoInOut } from 'svelte/easing';
  import { scale } from 'svelte/transition';
  import clickOut from 'actions/clickOut';
  import tooltip from 'actions/tooltip';
  import Portal from 'components/Portal.svelte';
  import Draggable from 'components/Draggable.svelte';
  import Icon from 'components/Icon.svelte';

  const dispatch = createEventDispatcher<{ close: undefined }>();

  export let open = true;
  export let style: Option<string> = null;
  export let topbarBackground: Option<string> = null;
  export let background: Option<string> = null;
  export let minWidth: Option<string> = null;
  export let color: Option<string> = null;
  export let disableClickOutClose = false;
  export let borderColor: Option<string> = null;

  function close() {
    open = false;
    dispatch('close');
  }
</script>

{#if open}
  <Portal target="modal">
    <Draggable whitelistOnly>
      <dialog
        class="Modal"
        {style}
        style:min-width={minWidth}
        style:--modal-topbar-background={topbarBackground}
        style:--modal-background={background}
        style:--modal-color={color}
        style:--modal-border-color={borderColor}
        open
        on:clickout={disableClickOutClose ? null : close}
        transition:scale|local={{ easing: expoInOut }}
        use:clickOut
      >
        <div class="Modal__topbar" data-draggable>
          <div class="Modal__topbar__left">
            <slot name="topbar-left" />
          </div>
          <div class="Modal__topbar__right">
            <slot name="topbar-right" />
            <button
              class="Modal__close"
              data-tooltip="Close"
              on:click={close}
              use:tooltip
            >
              <Icon name="x" />
            </button>
          </div>
        </div>
        <slot />
      </dialog>
    </Draggable>
  </Portal>
{/if}

<style lang="scss">
  @use 'style/misc';
  @use 'style/color';

  .Modal {
    $component: &;
    transform: translate(-50%, -50%);
    background: var(--modal-background, var(--color-secondary-300));
    color: var(--modal-color, var(--color-secondary-900));
    border: misc.rem(1) solid var(--modal-border-color, var(--color-secondary-400));
    @include misc.border-radius;

    &__close {
      --icon-size: #{misc.rem(12)};
      color: var(--modal-color, var(--color-secondary-900));
      width: var(--spacing-lg-100);
      display: flex;
      justify-content: center;
      align-items: center;
      aspect-ratio: 1 / 1;
      &:hover {
        color: var(--color-primary-100-contrast);
      }
    }
    &__topbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--modal-topbar-background, var(--modal-background));
      border-radius: var(--radius-nm-100) var(--radius-nm-100) 0 0;
      & > * {
        display: flex;
        align-items: center;
      }
    }
  }
</style>
