<script lang="ts">
  import { onMount } from 'svelte';
  import { capitalize } from 'utils/string';
  import { initPreferencesStore } from 'store/preferences';
  import router from 'store/router';
  import routes from '@Playground/routes';
  import Sidebar from 'components/Sidebar.svelte';
  import Topbar from 'components/Topbar.svelte';
  import ErrorBoundary from 'components/ErrorBoundary';
  import PortalLayer from 'components/PortalLayer.svelte';
  import PlaygroundLogo from 'components/PlaygroundLogo.svelte';

  onMount(initPreferencesStore);

  $: CurrentPlayground = $router.playgroundKey && $router.playgroundKey in routes ? (
    routes[$router.playgroundKey]
  ) : null;
  $: title = $router ? `${capitalize($router.playgroundKey)} Playground` : 'Playground';
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>
<main id="playground" class="Playground">
  <Topbar />
  <Sidebar />
  {#if CurrentPlayground}
    <ErrorBoundary>
      <svelte:component this={CurrentPlayground} />
    </ErrorBoundary>
  {:else}
    <section class="Playground__default-content">
      <PlaygroundLogo />
    </section>
  {/if}
</main>
<PortalLayer portalID="modal" left="50%" top="50%" zIndex={10} />
<PortalLayer portalID="tooltip" cover preventClicks zIndex={10} />

<style lang="scss">
  @use 'style/color';
  @use 'style/media';
  @use 'style/text';

  .Playground {
    display: grid;
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 100%;
    margin: 0 auto;
    overflow: hidden auto;
    background-color: var(--color-secondary-200);
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
      --icon-size: min(65vw, 75vh);
    }

    @include media.larger-than(tablet) {
      grid-template:
        "a a" max-content
        "b c" 1fr
        "b c" 1fr / max-content 1fr;
    }
  }
</style>
