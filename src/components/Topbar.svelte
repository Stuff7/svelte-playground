<script lang="ts">
  import { portalIdMap } from 'utils/dom';
  import internalLink from 'actions/internalLink';
  import Icon from 'components/Icon.svelte';
  import Console from 'components/Console';
</script>

<nav class="Topbar">
  <a class="Topbar__home" href="/" use:internalLink>
    <Icon class="Topbar__logo" name="logo" />
    JSPlayground
  </a>
  <section data-portal-id={portalIdMap.topbar} class="Topbar__right-section">
    <Console />
  </section>
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
    background: var(--color-secondary-300);
    outline: 1px solid var(--color-secondary-400);

    &__home {
      @include text.font-title;
      font-size: var(--h-nm-100);
      display: flex;
      align-items: center;
      gap: var(--spacing-nm-100);
      color: var(--color-primary);
      font-weight: 800;
      --icon-size: var(--h-nm-200);
    }

    &__right-section {
      margin-left: auto;
    }
  }
</style>
