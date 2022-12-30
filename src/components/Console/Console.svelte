<script lang="ts">
  import { tooltip } from 'actions/tooltip';
  import { clampNumber } from 'utils/string';
  import debug, { clearErrors } from 'store/debug';
  import Icon from 'components/Icon.svelte';
  import Modal from 'components/Modal.svelte';
  import ErrorBlock from './ErrorBlock.svelte';

  export let open = false;

  function toggleModal() {
    open = !open;
  }

  $: if ($debug.errors.length === 0) {
    open = false;
  }
</script>

{#if $debug.errors.length}
  <button class="ConsoleButton" on:click={toggleModal}>
    <Icon name="console" />
    <span class="ConsoleButton__error-count">{clampNumber($debug.errors.length, 99)}</span>
  </button>
  <Modal portal {open} whitelistOnly>
    <section class="Console">
      <div class="Console__title-bar" data-draggable>
        <h1 class="Console__title">{$debug.errors.length} errors</h1>
        <div class="Console__buttons">
          <button
            class="Console__icon-button"
            data-tooltip="Clear console"
            on:click={clearErrors}
            use:tooltip
          >
            <Icon name="trash" />
          </button>
          <button
            class="Console__icon-button Console__close-button"
            data-tooltip="Close"
            on:click={toggleModal}
            use:tooltip
          >
            <Icon name="x" />
          </button>
        </div>
      </div>
      <div class="Console__output">
        {#each $debug.errors as error}
          <ErrorBlock {error} />
        {/each}
      </div>
    </section>
  </Modal>
{/if}

<style lang="scss">
  @use 'style/misc';
  @use 'style/color';
  @use 'style/text';

  .Console {
    $component: &;
    display: flex;
    flex-direction: column;
    max-width: 80vw;
    max-height: 50vh;
    width: max-content;
    border-radius: var(--radius-nm-200);
    overflow: hidden;
    border: misc.rem(1) solid var(--color-secondary-500);
    gap: misc.rem(1);

    &__title-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--color-secondary-300);
      outline: misc.rem(1) solid var(--color-secondary-400);
      padding: var(--spacing-sm-100);
    }

    &__title {
      font-size: var(--p-nm-200);
      color: var(--color-secondary-900);
    }

    &__buttons {
      display: flex;
      gap: var(--spacing-md-100);
      & #{$component}__icon-button {
        --icon-size: #{misc.rem(16)};
        background: transparent;
        border: transparent;
        padding: 0;
        color: var(--color-secondary-900);
        &:hover {
          color: var(--color-primary);
          --icon-shadow: var(--color-primary-contrast);
        }
      }

      & #{$component}__close-button {
        --icon-size: #{misc.rem(12)};
      }
    }

    &__output {
      display: flex;
      flex-direction: column;
      background: var(--color-secondary-200);
      color: var(--color-secondary-800);
      overflow: hidden auto;
    }
  }

  .ConsoleButton {
    position: relative;
    color: var(--color-secondary-900);
    background: transparent;
    --icon-accent: var(--color-secondary-100);
    padding: 0;
    border: 0;
    &:hover {
      color: var(--color-secondary-100);
      --icon-accent: var(--color-secondary-900);
    }

    &__error-count {
      @include misc.circle(var(--radius-nm-200));
      font-size: var(--p-nm-100);
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(50%, -50%);
      background: var(--color-error);
      color: var(--color-error-contrast);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
