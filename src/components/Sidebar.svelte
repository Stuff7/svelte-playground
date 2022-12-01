<script lang="ts">
  import internalLink from 'actions/internalLink';
  import { routes } from '@Playground/routes';
  import router from 'store/router';
  import Icon from './Icon.svelte';
</script>

<aside class="Sidebar">
  <h6 class="Sidebar__section-title">Playgrounds</h6>
  <section class="Sidebar__section">
    {#each routes as route}
      <a
        class="Sidebar__button"
        class:active={route.name === $router}
        href={route.name === $router ? '/' : route.name}
        use:internalLink
      >
        <Icon class="Sidebar__button-icon" name={route.icon} />
        <p class="Sidebar__button-text">{route.name} Playground</p>
      </a>
    {/each}
  </section>
</aside>

<style lang="scss">
  @use 'style/color';
  @use 'style/text';
  @use 'style/misc';
  @use 'style/media';

  $sidebar-color: var(--color-surface3);
  $sidebar-outline-color: var(--color-surface4);
  $sidebar-title-color: var(--color-surface9);
  $button-hover-bg: var(--color-surface5);
  $button-active-bg: var(--color-accent);

  .Sidebar {
    $component: &;
    display: flex;
    overflow: hidden auto;
    height: 100%;
    grid-area: b;
    background: $sidebar-color;
    outline: 1px solid $sidebar-outline-color;
    flex-direction: row;
    width: 100%;

    & > &__section:not(:last-child) {
      border-bottom: 1px solid $sidebar-outline-color;
    }

    &__section {
      display: flex;
      flex-direction: row;
      gap: var(--spacing-nm-100);
      padding: var(--spacing-nm-100);
      width: 100%;
    }

    &__section-title {
      display: none;
    }

    &__button {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-nm-100);
      gap: var(--spacing-sm-100);
      font-size: var(--p-sm-100);
      font-weight: 600;
      width: 100%;
      text-transform: capitalize;
      color: var(--color-surface9);
      padding: var(--spacing-sm-50);

      &:hover {
        background: $button-hover-bg;
        color: var(--color-surface9);
      }
      &.active {
        background: $button-active-bg;
        color: var(--color-accent-contrast);
      }

      & > :global(#{$component}__button-icon svg) {
        width: clamp(misc.rem(16), 3vw, misc.rem(24));
        height: clamp(misc.rem(16), 3vw, misc.rem(24));
      }
      &.active :global(path.brush-paint) {
        fill: var(--color-accent-contrast);
      }
    }

    @include media.smaller-than(phone) {
      &__button-text {
        display: none;
      }
    }

    @include media.larger-than(tablet) {
      flex-direction: column;
      padding: var(--spacing-nm-100) 0;
      width: max-content;

      &__section {
        flex-direction: column;
        padding: var(--spacing-nm-100) 0 var(--spacing-nm-100) var(--spacing-nm-100);
      }

      &__section-title {
        display: block;
        background: var(--color-surface1);
        color: $sidebar-title-color;
        padding: var(--spacing-sm-100);
        font-weight: 800;
        text-transform: uppercase;
      }

      &__button {
        border-radius: var(--radius-nm-100) 0 0 var(--radius-nm-100);
        justify-content: start;
      }
    }
  }
</style>
