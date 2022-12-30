<script lang="ts">
  import type { PortalID } from 'actions/portal';

  export let portalID: PortalID;
  export let element = 'div' as keyof HTMLElementTagNameMap;
  export let zIndex = 1;
  export let left = '0';
  export let top = '0';
  export let cover = false;
  export let preventClicks = false;
  export let style = '';
  export let statik = false;

  export { statik as static };
</script>

<svelte:element
  this={element}
  class="PortalLayer"
  class:cover
  class:prevent-clicks={preventClicks}
  class:static={statik}
  aria-hidden="true"
  data-portal-id={portalID}
  {style}
  style:--portal-layer__z-index={zIndex}
  style:--portal-layer__left={left}
  style:--portal-layer__top={top}
>
  <slot />
</svelte:element>

<style lang="scss">
  @use 'style/color';
  @use 'style/media';

  .PortalLayer {
    &:not(.static) {
      position: fixed;
      z-index: var(--portal-layer__z-index);
      left: var(--portal-layer__left);
      top: var(--portal-layer__top);
    }

    &.cover {
      width: 100vw;
      height: 100vh;
    }

    &.prevent-clicks {
      pointer-events: none;
    }
  }
</style>
