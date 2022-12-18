<script lang="ts">
  import { range } from 'utils/math';
  import { genCssVars } from 'utils/dom';
  import hover from 'actions/hover';

  export let label = '';
  export let min = 0;
  export let max = 100;
  export let step = 0.001;
  export let value = 0;
  export let valueLabelPosition: 'top' | 'right' | 'bottom' | 'left' = 'top';
  export let stepIndicators = false;
  export let thumbRadius = '0.5em';
  export let element: HTMLDivElement | null = null;
  export let formatter: (val: number) => string | number = (val: number) => val;

  $: length = max - min;
  $: rangePercentage = (value - min) * 100 / length;
  $: stepCount = stepIndicators ? 100 / (length / step) : 0;
  $: steps = stepCount ? [...range(stepCount, 100, stepCount)] : [];
</script>

<div class="Slider">
  {#if label}
    <p class="Slider__label">{label}</p>
  {/if}
  <div class="Slider__wrapper">
    <div
      class="Slider__container"
      style={genCssVars({
        rangePercentage: `${rangePercentage}%`,
        thumbRadius,
      })}
      bind:this={element}
      on:hover
      on:hoverend
      on:pointermove
      use:hover
    >
      <input
        class="Slider__input"
        type="range"
        {min}
        {max}
        {step}
        bind:value
        on:change
      />
      <div class="Slider__track">
        {#each steps as stepPos (`Slider__step-indicator--${stepPos}`)}
          <div
            class="Slider__step-indicator"
            style={genCssVars({ stepPos: `${stepPos}%` })}
          />
        {/each}
        <span
          class="Slider__value-label {valueLabelPosition}"
        >
          {formatter(value)}
          <span class="Slider__value-label-triangle"></span>
        </span>
      </div>
    </div>
    <div class="Slider__values">
      <span class="Slider__min-label">{formatter(min)}</span>
      <span class="Slider__max-label">{formatter(max)}</span>
    </div>
  </div>
</div>

<style lang="scss">
  @use 'style/color';
  @use 'style/misc';

  @include misc.input-range-track((
    min-height: 2.75rem,
    background: transparent,
  ));

  @include misc.input-range-thumb((
    min-width: 1.25rem,
    min-height: 3rem,
  ));

  .Slider {
    display: flex;
    flex-direction: column;
    gap: clamp(misc.rem(10), 1vw, misc.rem(16));

    &__label {
      margin: 0;
    }

    &__wrapper {
      display: flex;
      flex-direction: column;
      position: relative;
      gap: clamp(misc.rem(10), 1vw, misc.rem(16));
    }

    &__container {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      width: var(--slider-width);
    }

    &__step-indicator {
      position: absolute;
      left: var(--stepPos);
      height: 0.5em;
      width: misc.rem(2);
      background: var(--color-secondary-100);
    }

    &__track {
      display: flex;
      flex: 1;
      align-items: center;
      background: var(--slider-track-color);
      height: 0.75em;
      border: 2px solid var(--color-secondary-200);
      border-radius: var(--radius-nm-100);
      pointer-events: none;
      position: relative;
      &:before {
        content: "";
        background: var(--slider-track-before-color);
        width: var(--rangePercentage);
        height: 100%;
        border-radius: var(--radius-nm-100);
      }
      &:after {
        content: "";
        position: absolute;
        @include misc.circle(var(--thumbRadius));
        @include misc.shadow;
        background: var(--slider-thumb-color);
        left: var(--rangePercentage);
        transform: translateX(-50%);
      }
    }

    &__value-label {
      position: absolute;
      $gap: var(--spacing-md-100);
      padding: var(--spacing-sm-50) var(--spacing-sm-100);
      @include misc.border-radius;
      @include misc.shadow;
      background: var(--slider-value-label-color);
      color: var(--slider-value-label-text-color);
      text-align: center;

      &-triangle {
        position: absolute;
        z-index: -1;
      }

      $component: &;
      @include misc.triangle-classes() using ($pos, $inv) {
        transform: translateX(0);
        @if $pos == 'top' or $pos == 'bottom' {
          #{$inv}: calc(100% + $gap);
          transform: translateX(-50%);
          left: var(--rangePercentage);
        } @else if $pos == 'left' {
          right: calc(100% - var(--rangePercentage) + var(--thumbRadius) * 2);
        } @else {
          left: calc(var(--rangePercentage) + calc(var(--thumbRadius) * 2));
        }
        #{$component}-triangle {
          @include misc.triangle($inv, $gap, calc($gap / 2), var(--slider-value-label-color));
          @if $pos == 'top' or $pos == 'bottom' {
            #{$pos}: 100%;
            @include misc.abs-horizontal-center;
          } @else {
            top: 50%;
            #{$pos}: 100%;
            transform: translateY(-50%);
          }
        }
      };

    }

    &__values {
      display: flex;
      justify-content: space-between;
    }

    &__input {
      position: absolute;
      cursor: pointer;
      left: -0.5em;
      width: calc(100% + 1em);
      height: 100%;
      opacity: 0;
      margin: 0;
      padding: 0;
    }
  }
</style>
