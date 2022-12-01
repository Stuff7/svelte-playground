<script lang="ts">
  import internalLink from 'actions/internalLink';
  import Icon from 'components/Icon.svelte';
</script>

<nav class="Topbar">
  <a class="Topbar__home" href="/" use:internalLink>
    <Icon class="Topbar__logo" name="logo" />
    JSPlayground
  </a>
</nav>

<style lang="scss">
  @use 'style/color';
  @use 'style/text';
  @use 'style/misc';

  .Topbar {
    $component: &;
    display: flex;
    align-items: center;
    height: max-content;
    width: 100%;
    padding: var(--spacing-sm-100) var(--spacing-nm-100);
    gap: var(--spacing-nm-100);
    grid-area: a;
    background: var(--color-surface3);
    outline: 1px solid var(--color-surface4);

    &__home {
      @include text.font-title;
      font-size: var(--h-nm-100);
      display: flex;
      align-items: center;
      gap: var(--spacing-nm-100);
      color: var(--color-accent);
      font-weight: 800;
      & > :global(#{$component}__logo > svg) {
        $logo-size: var(--h-nm-200);
        width: $logo-size;
        height: $logo-size;
      }
    }
  }
</style>
