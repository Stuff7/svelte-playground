<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const NUMBER_PATTERN = /^-?(\d+\.?\d*|\d*\.?\d+)$/;

  type V = $$Generic<string | number>;
  export let formatter: (val: V) => string = (v) => v.toString();
  export let label = '';
  export let value: V = '' as V;
  export let inputMode = typeof value === 'number' ? 'numeric' as const : 'text' as const;
  export let focused = false;

  const dispatch = createEventDispatcher<{ input: V }>();

  $: inputValue = focused ? (value === 0 ? '' : value).toString() : formatter(value);

  function validateInput(event: Event) {
    const prevValue = inputValue;

    const target = event.currentTarget;
    if (!(target instanceof HTMLInputElement)) {
      return;
    }

    inputValue = target.value;
    if (inputMode === 'text') {
      value = inputValue as V;
      dispatch('input', inputValue as V);
      return;
    }

    if (NUMBER_PATTERN.test(`${inputValue}0`)) {
      const numValue = Number(inputValue);
      value = (isNaN(numValue) ? 0 : numValue) as V;
      dispatch('input', value);
      return;
    }

    inputValue = prevValue;
  }
</script>

<label class="Input">
  {#if label}<p class="Input__label">{label}</p>{/if}
  <input
    class="Input__input"
    inputmode={inputMode}
    value={inputValue}
    on:blur={() => focused = false}
    on:focus={() => focused = true}
    on:input={validateInput}
  />
</label>

<style lang="scss">
  @use 'style/text';
  @use 'style/misc';
  @use 'style/media';

  .Input {
    --input__background: var(--input-background, var(--color-secondary-200));
    --input__color: var(--input-color, var(--color-secondary-800));
    --input__padding: var(--input-padding, var(--spacing-sm-100) var(--spacing-nm-100));
    --input__padding-small: var(--input-padding, var(--spacing-sm-50) var(--spacing-sm-100));
    --input__font-size: var(--input-font-size, var(--h-nm-100));

    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm-50);
    position: var(--input-position, initial);
    left: var(--input-left, initial);
    top: var(--input-top, initial);
    max-width: var(--input-max-width, initial);

    &__label {
      margin: 0;
      font-size: var(--h-nm-100);
      color: var(--color-secondary-800);
    }

    &__input {
      font-size: var(--input__font-size);
      width: var(--input-width, 100%);
      min-width: clamp(misc.rem(10), 4vw, misc.rem(30));
      padding: var(--input__padding);
      background: var(--input__background);
      color: var(--input__color);
      transition: border-color 0.25s;
      outline: 0;
      text-align: var(--input-text-align, initial);
      border: 1px solid var(--color-secondary-400);
      @include misc.border-radius;
      &:focus {
        border-color: var(--color-primary-100-contrast);
      }
      @include media.smaller-than(phone) {
        padding: var(--input__padding-small);
  }
    }
  }
</style>
