<script lang="ts">
  import Icon from 'components/Icon.svelte';

  export let error: Error;

  let collapsed = true;
</script>

<section class="ErrorBlock">
  <h1 class="ErrorBlock__title">
    <Icon name="triangle-exclamation" />
    <span>{error.name}:</span>
    <span class="ErrorBlock__message">{error.message}</span>
  </h1>
  <pre
    class="ErrorBlock__stack"
    class:collapsed={collapsed}
    on:mousedown={() => collapsed = !collapsed}
  >{error.stack}</pre>
</section>

<style lang="scss">
  @use 'style/text';
  @use 'style/color';

  .ErrorBlock {
    background: color.alpha(--color-error, 0.2);
    color: var(--color-error-100-contrast);
    padding: var(--spacing-sm-100);

    &__title {
      display: flex;
      gap: var(--spacing-sm-50);
      align-items: center;
      font-size: var(--p-nm-300);
      flex-wrap: wrap;
    }

    &__message {
      font-weight: 400;
    }

    &__stack.collapsed {
      @include text.ellipsis(3);
    }
  }
</style>
