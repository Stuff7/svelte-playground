<script lang="ts">
  import { range } from 'utils/math';
  import { genCssVars } from 'utils/dom';
  import hover from 'actions/hover';

  export let label = '';
  export let min = 0;
  export let max = 100;
  export let step = 0.001;
  export let width = '2em';
  export let value = 0;
  export let stepIndicators = false;
  export let thumbRadius = '0.5em';
  export let element: HTMLDivElement | null = null;
  export let formatter = (val: number) => val.toString();

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
      class="Slider__container {$$props.class ?? ''}"
      style={genCssVars({
        rangePercentage: `${rangePercentage}%`,
        thumbRadius,
        width,
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
        <span class="Slider__value-label">{formatter(value)}</span>
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
      width: var(--width);
    }

    &__step-indicator {
      position: absolute;
      left: var(--stepPos);
      height: 0.5em;
      width: misc.rem(2);
      background: var(--color-surface1);
    }

    &__track {
      display: flex;
      flex: 1;
      align-items: center;
      background: var(--color-surface4);
      height: 0.75em;
      border: 2px solid var(--color-surface2);
      border-radius: misc.rem(5);
      pointer-events: none;
      position: relative;
      &:before {
        content: "";
        background: var(--color-accent);
        width: var(--rangePercentage);
        height: 100%;
      }
      &:after {
        content: "";
        position: absolute;
        @include misc.circle(var(--thumbRadius));
        @include misc.shadow;
        background: var(--color-accent);
        left: var(--rangePercentage);
        transform: translateX(-50%);
      }
    }

    &__value-label {
      position: absolute;
      $gap: var(--spacing-md-100);
      bottom: calc(100% + $gap);
      left: var(--rangePercentage);
      transform: translateX(-50%);
      padding: var(--spacing-sm-50) var(--spacing-sm-100);
      @include misc.border-radius;
      @include misc.shadow;
      background: var(--color-accent);
      color: var(--color-accent-contrast);
      text-align: center;
      &::after {
        content: "";
        z-index: -1;
        @include misc.triangle('bottom', $gap, calc($gap / 2), var(--color-accent));
        @include misc.abs-horizontal-center;
      }
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
