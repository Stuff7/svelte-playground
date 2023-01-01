<script lang="ts">
  import { clampNumber } from 'utils/string';
  import debug, { clearErrors } from 'store/debug';
  import Modal from 'components/Modal.svelte';
  import IconButton from 'components/IconButton.svelte';
  import ErrorBlock from './ErrorBlock.svelte';

  export let open = false;

  $: errorCount = $debug.errors.length;
  $: if (errorCount === 0) {
    open = false;
  }
</script>

{#if errorCount}
  <IconButton
    name="console"
    iconAccent="hsl(var(--color-primary-h), var(--color-primary-s), var(--color-shade-400))"
    padding="0"
    size="clamp(1.35rem, 2vw, 1.5rem)"
    on:click={() => open = !open}
  >
    <span class="ConsoleButton__error-count">{clampNumber(errorCount, 99)}</span>
  </IconButton>
  <Modal
    borderColor="hsl(var(--color-error-h), var(--color-error-s), var(--color-shade-700))"
    bind:open
  >
    <h1 class="Console__title" slot="topbar-left">
      {errorCount} Error{errorCount > 1 ? 's' : ''} Found
    </h1>
    <IconButton
      slot="topbar-right"
      name="trash"
      tooltip="Clear console"
      on:click={clearErrors}
    />
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
    border-top: misc.rem(1) solid color.shade(--color-error, 700);
    gap: misc.rem(1);

    &__title {
      margin-left: var(--spacing-sm-100);
      color: color.shade(--color-error, 700);
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
    &__error-count {
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
