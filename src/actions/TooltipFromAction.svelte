<script lang="ts">
  import type { Position } from 'types/math';
  import type { IntersectionEvent } from 'types/events';
  import { createTooltipID } from 'store/tooltip';
  import { intersectionObserver } from 'actions/intersectionObserver';
  import clipPath from 'transitions/clip-path';
  import PortalLayer from 'components/PortalLayer.svelte';

  export let title = '';
  export let x: number;
  export let y: number;
  export let rect: DOMRect;
  export let id = '';
  export let position: Position = 'bottom';
  export let isStatic: boolean;

  let calculatedPosition = { x: '1rem', y: '1rem' };

  $: portalID = createTooltipID(id);
  $: offsetX = isStatic ? position === 'right' ? rect.width : position !== 'left' ? rect.width / 2 : 0 : 0;
  $: offsetY = isStatic ? position === 'bottom' ? rect.height : position !== 'top' ? rect.height / 2 : 0 : 0;

  function onIntersection({ detail }: IntersectionEvent) {
    if (detail.intersectionRatio < 1) {
      const { boundingClientRect: tooltipRect, intersectionRect } = detail;
      let { x: positionX, y: positionY } = calculatedPosition;
      if (tooltipRect.right !== intersectionRect.right) {
        positionX = '-100% - 1rem';
      } else if (tooltipRect.left !== intersectionRect.left) {
        positionX = '1rem';
      }
      if (tooltipRect.top !== intersectionRect.top) {
        positionY = '1rem';
      } else if (tooltipRect.bottom !== intersectionRect.bottom) {
        positionY = '-100% - 1rem';
      }
      calculatedPosition = { x: positionX, y: positionY };
    }
  }
</script>

<div
  class="TooltipFromAction {position}"
  class:static={isStatic}
  style:top="{y + offsetY}px"
  style:left="{x + offsetX}px"
  style:--tooltip__calculated-x="calc({calculatedPosition.x})"
  style:--tooltip__calculated-y="calc({calculatedPosition.y})"
  on:intersection={onIntersection}
  transition:clipPath
  use:intersectionObserver={{ rootPortalID: 'tooltip' }}
>
  {#if id}
    <PortalLayer {portalID} static />
  {:else}
    <slot>{title}</slot>
  {/if}
</div>

<style lang="scss">
  @use 'style/color';
  @use 'style/misc';

  .TooltipFromAction {
    $tooltip-bg: color.alpha-shade(--color-tertiary, 400, 0.85);
    background: $tooltip-bg;
    color: var(--color-tertiary-900);
    @include misc.shadow(var(--color-tertiary-300));
    @include misc.border-radius;
    padding: var(--spacing-sm-100);
    position: absolute;
    width: max-content;
    min-width: clamp(misc.rem(48), 4vw, misc.rem(96));
    max-width: clamp(misc.rem(220), 80vw, misc.rem(900));
    pointer-events: all;

    &:not(.static) {
      $x: var(--tooltip__calculated-x);
      $y: var(--tooltip__calculated-y);
      transform: translate($x, $y);
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
        transform: translate(calc(-100% - $gap), -50%);
        &::after {
          @include misc.triangle(right, $triangle-w, $triangle-h, $tooltip-bg);
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      &.right {
        transform: translate($gap, -50%);
        &::after {
          @include misc.triangle(left, $triangle-w, $triangle-h, $tooltip-bg);
          left: 0;
          top: 50%;
          transform: translate(-100%, -50%);
        }
      }
      &.top {
        transform: translate(-50%, calc(-100% - $gap));
        &::after {
          @include misc.triangle(bottom, $triangle-w, $triangle-h, $tooltip-bg);
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
        }
      }
      &.bottom {
        transform: translate(-50%, $gap);
        &::after {
          @include misc.triangle(top, $triangle-w, $triangle-h, $tooltip-bg);
          top: 0;
          left: 50%;
          transform: translate(-50%, -100%);
        }
      }
    }
  }
</style>
