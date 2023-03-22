<script lang="ts">
  import { routes } from '@Playground/routes';
  import internalLink from 'actions/internalLink';
  import router from 'store/router';
  import Icon from 'components/Icon.svelte';
  import tooltip from 'actions/tooltip';
  import { capitalize } from 'utils/string';

  let collapsed = false;
</script>

<aside class="Sidebar" class:collapsed>
  <button
    class="Sidebar__section-title"
    on:click={() => collapsed = !collapsed}
    data-tooltip={collapsed ? 'Expand' : 'Collapse'}
    data-tooltip-class="Sidebar__tooltip"
    use:tooltip
  >
    <p>Playgrounds</p>
    <Icon name="chevron" />
  </button>
  <section class="Sidebar__section">
    {#each routes as route}
      <a
        class="Sidebar__button"
        class:active={route.name === $router.playgroundKey}
        href={route.name === $router.playgroundKey ? '/' : route.name}
        data-tooltip={collapsed ? `${capitalize(route.name)} Playground` : null}
        data-tooltip-class="Sidebar__tooltip"
        data-tooltip-static
        data-tooltip-position="right"
        use:internalLink
        use:tooltip
      >
        <Icon name={route.icon} />
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

  $sidebar-color: var(--color-secondary-300);
  $sidebar-outline-color: var(--color-secondary-400);
  $button-hover-bg: var(--color-secondary-700);
  $button-active-bg: var(--color-primary);

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
      font-size: var(--p-sm-50);
      transition: font-size 0.5s;
      font-weight: 400;
      width: 100%;
      text-transform: capitalize;
      color: var(--color-secondary-900);
      padding: var(--spacing-sm-50);
      border-color: transparent;
      border-width: 1px 0 1px 1px;
      border-style: solid;
      @include media.smaller-than(tablet) {
        border-right-width: 1px;
      }

      &:hover {
        background: $button-hover-bg;
        color: var(--color-secondary-100);
      }
      &.active {
        background: $button-active-bg;
        color: var(--color-primary-contrast);
        border-color: var(--color-primary-100-contrast);
      }
    }

    &.collapsed #{$component}__button {
      font-size: 0;
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
        display: flex;
        justify-content: space-between;
        align-items: center;
        --icon-size: var(--p-nm-100);
        font-size: var(--p-nm-100);
        transition: font-size 0.5s, justify-content 0.5s;
        font-weight: 800;
        text-transform: uppercase;
        cursor: pointer;
        background: var(--color-tertiary-100-contrast);
        color: var(--color-tertiary-300);
        border-block: 4px double var(--color-tertiary-300);
        padding: var(--spacing-sm-50) var(--spacing-sm-100);

        & > :global(.Icon) {
          rotate: 180deg;
          transition: rotate 1s;
        }
        &:hover {
          background: var(--color-secondary-100-contrast);
          color: var(--color-secondary-300);
          & > :global(.Icon) {
            animation: point-left 1s infinite;
          }
        }
      }

      &.collapsed #{$component}__section-title {
        font-size: 0;
        justify-content: center;
        & > :global(.Icon) {
          rotate: 0deg;
        }
      }

      &__button {
        border-radius: var(--radius-nm-100) 0 0 var(--radius-nm-100);
        justify-content: start;
      }
    }
  }

  @include media.smaller-than(tablet) {
    :global(.Sidebar__tooltip) {
      display: none;
    }
  }
</style>
