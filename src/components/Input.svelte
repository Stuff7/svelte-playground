<script lang="ts">
  const NUMBER_PATTERN = /^-?(\d+\.?\d*|\d*\.?\d+)$/;

  type V = $$Generic<string | number>;
  export let formatter: ((val: V) => string) | null = null;
  export let label = '';
  export let value: V = '' as V;
  export let inputMode = typeof value === 'number' ? 'numeric' : 'text';

  let inputValue = (value === 0 ? '' : value).toString();

  function validateInput(event: Event) {
    const prevValue = inputValue;

    const target = event.currentTarget;
    if (!(target instanceof HTMLInputElement)) {
      return;
    }

    inputValue = target.value;
    if (inputMode === 'text') {
      return;
    }

    if (NUMBER_PATTERN.test(`${inputValue}0`)) {
      const numValue = Number(inputValue);
      value = (isNaN(numValue) ? 0 : numValue) as V;
      return;
    }

    inputValue = prevValue;
  }
</script>

<label class="Input">
  <p class="Input__label">{label}</p>
  <div class="Input__wrapper">
    <input
      class="Input__input"
      inputmode={inputMode}
      value={inputValue}
      on:input={validateInput}
    />
    {#if formatter}
      <span class="Input__format">
        {formatter(value)}
      </span>
    {/if}
  </div>
</label>

<style lang="scss">
  @use 'style/text';
  @use 'style/misc';

  .Input {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm-50);

    &__label {
      margin: 0;
      font-size: var(--h-nm-100);
    }

    &__wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    &__input {
      width: 100%;
      &:focus + .Input__format {
        display: none;
      }
    }

    &__format {
      position: absolute;
      background: var(--color-secondary-200);
      left: misc.rem(3);
      z-index: 1;
      font-size: var(--h-nm-100);
      padding-inline: clamp(misc.rem(10), 0.4vw, misc.rem(30));
      pointer-events: none;
    }
  }
</style>
