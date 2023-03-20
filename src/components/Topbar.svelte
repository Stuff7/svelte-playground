<script lang="ts">
  import internalLink from 'actions/internalLink';
  import Icon from 'components/Icon.svelte';
  import Console from 'components/Console/index.svelte';
  import ThemeToggle from 'components/ThemeToggle.svelte';
  import ColorSettings from 'components/ColorSettings.svelte';
  import PortalLayer from 'components/PortalLayer.svelte';
  import LoginButton from 'components/LoginButton.svelte';
</script>

<nav class="Topbar">
  <a class="Topbar__home" href="/" use:internalLink>
    <Icon name="playground" />
    JSPlayground
  </a>
  <PortalLayer
    element="section"
    portalID="topbar"
    static
    style="display: flex; align-items: center; margin-left: auto; gap: var(--spacing-sm-100);"
  >
    <Console />
    <ThemeToggle />
  </PortalLayer>
  <ColorSettings />
  <LoginButton />
</nav>

<style lang="scss">
  @use 'style/color';
  @use 'style/text';
  @use 'style/misc';

  .Topbar {
    $component: &;
    display: flex;
    align-items: center;
    width: 100%;
    height: clamp(misc.rem(34), 3vw, misc.rem(42));
    padding-inline: var(--spacing-nm-100);
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
      color: var(--color-primary-100-contrast);
      font-weight: 800;
      --icon-size: var(--h-nm-200);
      --icon-accent: var(--color-primary-100-contrast);
      --icon-accent-2: var(--color-secondary-100-contrast);
      --icon-accent-3: var(--color-tertiary-100-contrast);
    }
  }
</style>
