<script lang="ts">
  import Icon from 'components/Icon.svelte';
  import type { Writable } from 'svelte/store';

  export let error: Writable<Error>;
  export let onError: Option<(err: Error) => unknown> = null;

  $: if ($error && onError) {
    onError($error);
  }
</script>

{#if $error}
  <article class="Error">
    <section class="Error__wrapper">
      <h1 class="Error__name">
        <Icon name="error" />
        <span>{$error?.name}</span>
        <h4 class="Error__message">{$error?.message}</h4>
      </h1>
      <pre class="Error__stack">{$error?.stack}</pre>
    </section>
  </article>
{:else}
  <slot />
{/if}

<style lang="scss">
  @use 'style/text';
  .Error {
    $component: &;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    padding: var(--spacing-md-200);
    overflow: hidden;

    &__wrapper {
      display: flex;
      flex-direction: column;
      border-radius: var(--radius-md-100);
      overflow: hidden;
      width: 100%;
    }

    &__name {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      background: var(--color-primary);
      color: var(--color-primary-contrast);
      padding: var(--spacing-md-200);
      gap: var(--spacing-nm-100);
      @include text.font-title;
    }

    &__message {
      @include text.font-body;
    }

    &__stack {
      color: var(--color-secondary-900);
      background: var(--color-secondary-100);
      font-size: var(--p-md-100);
      white-space: pre-wrap;
      padding: var(--p-md-100);
      overflow: hidden auto;
      white-space: pre-wrap;
    }

    --icon-size: var(--spacing-lg-200);
  }
</style>
