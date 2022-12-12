<script lang="ts">
  import Icon from 'components/Icon.svelte';
  import Modal from 'components/Modal.svelte';
  import debug, { clearErrors } from 'store/debug';
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
  </button>
  <Modal portal {open}>
    <section class="Console">
      <div class="Console__title-bar">
        <h1 class="Console__title">{$debug.errors.length} errors</h1>
        <button on:click={clearErrors}>clear</button>
        <button on:click={toggleModal}>x</button>
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

  .Console {
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
      color: var(--color-primary);
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
    color: var(--color-secondary-900);
    background: transparent;
    --icon-accent: var(--color-secondary-100);
    padding: 0;
    border: 0;
    &:hover {
      color: var(--color-secondary-100);
      --icon-accent: var(--color-secondary-900);
    }
  }
</style>
