<script lang="ts">
  import type { Position } from 'types/math';
  import { createTooltipID } from 'store/tooltip';
  import { fade } from 'svelte/transition';
  import PortalLayer from 'components/PortalLayer.svelte';

  export let title = '';
  export let x: number;
  export let y: number;
  export let rect: DOMRect;
  export let id = '';
  export let position: Position = 'bottom';
  export let isStatic: boolean;

  $: portalID = createTooltipID(id);
  $: offsetX = isStatic ? position === 'right' ? rect.width : 0 : 0;
  $: offsetY = isStatic ? position === 'bottom' ? rect.height : position === 'top' ? -rect.height : 0 : 0;
</script>

<div
  class="TooltipFromAction {position}"
  class:static={isStatic}
  style:top="{y + offsetY}px"
  style:left="{x + offsetX}px"
  transition:fade={{ duration: 250 }}
>
  {#if id}
    <PortalLayer {portalID} static />
  {:else}
    <slot>{title}</slot>
  {/if}
</div>

<style lang="scss">
  @use 'style/misc';

  .TooltipFromAction {
    $tooltip-bg: var(--color-tertiary-400);
    background: $tooltip-bg;
    color: var(--color-tertiary-900);
    @include misc.shadow(var(--color-tertiary-300));
    @include misc.border-radius;
    padding: var(--spacing-sm-100);
    position: absolute;

    &:not(.static) {
      transform: translate(1rem, 1rem);
    }

    &.static {
      $gap: var(--spacing-nm-100);
      $triangle-w: var(--spacing-nm-200);
      $triangle-h: var(--spacing-sm-100);
      &::after {
        content: "";
        position: absolute;
      }
      &.left {
        transform: translateX(calc(-100% - $gap));
        &::after {
          @include misc.triangle(right, $triangle-w, $triangle-h, $tooltip-bg);
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      &.right {
        transform: translateX($gap);
        &::after {
          @include misc.triangle(left, $triangle-w, $triangle-h, $tooltip-bg);
          left: 0;
          top: 50%;
          transform: translate(-100%, -50%);
        }
      }
      &.top {
        transform: translateY(calc(-1 * $gap));
        &::after {
          @include misc.triangle(bottom, $triangle-w, $triangle-h, $tooltip-bg);
          top: 100%;
        }
      }
      &.bottom {
        transform: translateY($gap);
        &::after {
          @include misc.triangle(top, $triangle-w, $triangle-h, $tooltip-bg);
          top: 0;
          transform: translateY(-100%);
        }
      }
    }
  }
</style>
