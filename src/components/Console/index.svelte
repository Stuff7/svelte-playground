<script lang="ts">
  import { clampNumber } from 'utils/string';
  import debug, { clearErrors } from 'store/debug';
  import Modal from 'components/Modal.svelte';
  import ErrorBlock from './ErrorBlock.svelte';
  import Icon from 'components/Icon.svelte';
  import tooltip from 'actions/tooltip';

  export let open = false;

  $: errorCount = $debug.errors.length;
  $: if (errorCount === 0) {
    open = false;
  }
</script>

{#if errorCount}
  <button class="ConsoleButton" on:click={() => open = !open}>
    <Icon name="console" />
    <p>{clampNumber(errorCount, 99)}</p>
  </button>
  <Modal
    borderColor="var(--color-error-100-contrast)"
    disableClickOutClose
    bind:open
  >
    <h1 class="Console__title" slot="topbar-left">
      {errorCount} Error{errorCount > 1 ? 's' : ''} Found
    </h1>
    <button
      class="Console__trash"
      slot="topbar-right"
      data-tooltip="Clear console"
      on:click={clearErrors}
      use:tooltip
    >
      <Icon name="trash" />
    </button>
    <section class="Console">
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
    min-width: 100%;
    max-width: 80vw;
    max-height: 50vh;
    width: max-content;
    border-radius: 0 0 var(--radius-nm-100) var(--radius-nm-100);
    overflow: hidden;
    border-top: misc.rem(1) solid var(--color-error-100-contrast);
    gap: misc.rem(1);

    &__trash {
      --icon-size: #{misc.rem(12)};
      color: var(--color-secondary-900);
      &:hover {
        color: var(--color-primary-100-contrast);
      }
    }
    &__title {
      margin-left: var(--spacing-sm-100);
      color: var(--color-error-100-contrast);
      font-size: var(--p-nm-100);
      cursor: initial;
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
    color: var(--color-primary-100-contrast);
    --icon-accent: var(--color-primary-100);
    --icon-size: var(--p-md-300);
    position: relative;
    p {
      @include misc.circle(clamp(misc.rem(8), 0.5vw, misc.rem(12)));
      font-size: var(--p-nm-100);
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(50%, -15%);;
      background: var(--color-error);
      color: var(--color-error-contrast);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
