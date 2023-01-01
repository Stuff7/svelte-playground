<script lang="ts">
  import { range } from 'utils/math';
  import hover from 'actions/hover';
  import { tooltip } from 'actions/tooltip';

  export let label = '';
  export let hideMinMax = false;
  export let hideValue = false;
  export let min = 0;
  export let max = 100;
  export let step = 0.001;
  export let value = 0;
  export let stepIndicators = false;
  export let style: Option<string> = null;
  export let element: Option<HTMLDivElement> = null;
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
      {style}
      style:--slider__percentage="{rangePercentage}%"
      data-tooltip={hideValue ? null : formatter(value)}
      bind:this={element}
      on:hover
      on:hoverend
      on:pointermove
      use:hover
      use:tooltip
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
            style:--slider__step-pos="{stepPos}%"
          />
        {/each}
      </div>
    </div>
    {#if !hideMinMax}
      <div class="Slider__values">
        <span class="Slider__min-label">{formatter(min)}</span>
        <span class="Slider__max-label">{formatter(max)}</span>
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  @use 'style/color';
  @use 'style/misc';

  .Slider {
    display: flex;
    flex-direction: column;
    gap: clamp(misc.rem(10), 1vw, misc.rem(16));
    --slider__track-width: var(--slider-track-width, 0.75rem);
    --slider__thumb-radius: calc(var(--slider__track-width) * 2 / 3);
    --slider__track-radius: var(--slider-track-radius, var(--slider__thumb-radius));

    @include misc.input-range-track {
      min-height: 2.75rem;
      background: transparent;
    }

    @include misc.input-range-thumb {
      min-width: 1.25rem;
      min-height: 3rem;
    }

    &__label {
      margin: 0;
      letter-spacing: var(--slider-label-letter-spacing, inherit);
      font-size: var(--p-sm-100);
      color: var(--color-secondary-800);
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
      width: var(--slider-width, 100%);
    }

    &__step-indicator {
      position: absolute;
      left: var(--slider__step-pos);
      height: var(--slider__thumb-radius);
      width: misc.rem(2);
      background: var(--color-secondary-100);
    }

    &__track {
      display: flex;
      flex: 1;
      align-items: center;
      background: var(--slider-track-color, transparent);
      height: var(--slider__track-width);
      border: 1px solid color.shade(--color-primary, 600);
      border-radius: var(--slider__track-radius);
      pointer-events: none;
      position: relative;
      &:before {
        content: "";
        background: var(--slider-track-before-color, var(--color-primary));
        width: var(--slider__percentage);
        height: 100%;
        border-radius: var(--slider__track-radius);
      }
      &:after {
        content: "";
        position: absolute;
        @include misc.circle(var(--slider__thumb-radius));
        @include misc.shadow;
        background: var(--slider-thumb-color, var(--color-primary));
        border: 1px solid color.shade(--color-primary, 600);
        left: var(--slider__percentage);
        transform: translateX(-50%);
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
