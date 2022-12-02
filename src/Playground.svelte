<script lang="ts">
  import router from 'store/router';
  import routes from '@Playground/routes';
  import Sidebar from 'components/Sidebar.svelte';
  import Topbar from 'components/Topbar.svelte';
  import Icon from 'components/Icon.svelte';
  import { portalIdMap } from 'utils/dom';

  $: CurrentPlayground = $router in routes ? (
    routes[$router as keyof typeof routes]
  ) : null;
</script>

<main id="playground" class="Playground">
  <Topbar />
  <Sidebar />
  {#if CurrentPlayground}
    <svelte:component this={CurrentPlayground} />
  {:else}
    <section class="Playground__default-content">
      <Icon name="logo" />
    </section>
  {/if}
</main>
<div aria-hidden="true" data-portal-id={portalIdMap.modal} />

<style lang="scss">
  @use 'style/color';
  @use 'style/media';

  .Playground {
    display: grid;
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 100%;
    margin: 0 auto;
    overflow: hidden auto;
    background-color: var(--color-surface2);
    gap: 1px;
    grid-template:
      "a" max-content
      "c" 1fr
      "b" max-content / 1fr;

    & > :global(:last-child) {
      max-height: 100%;
      overflow: hidden auto;
      grid-area: c;
    }

    &__default-content {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      opacity: 0.3;

      & :global(svg) {
        $size: min(45vw, 100vh);
        width: $size;
        height: $size;
      }
    }

    @include media.larger-than(tablet) {
      grid-template:
        "a a" max-content
        "b c" 1fr
        "b c" 1fr / max-content 1fr;
    }
  }

  [data-portal-id = modal] {
    position: fixed;
    z-index: 10;
    left: 0;
    top: 0;
  }
</style>
