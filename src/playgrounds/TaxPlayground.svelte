<script lang="ts">
  import Input from 'components/Input.svelte';
  import { createCurrencyFormatter } from 'utils/string';

  const format$ = createCurrencyFormatter('es-MX', 'MXN');

  let income = 0;
  let tax = 0;

  let payment = 0;
  $: {
    const taxPercent = tax / income;
    if (taxPercent <= 0.10) {
      payment = income * 0.03;
    } else if (taxPercent <= 0.14) {
      payment = income * 0.02;
    } else if (taxPercent <= 0.15) {
      payment = income * 0.01 + (income * 0.15 - tax);
    } else if (taxPercent <= 0.195) {
      payment = income * 0.01;
    } else if (taxPercent <= 0.20) {
      payment = income * 0.005 + (income * 0.20 - tax);
    } else {
      payment = income * 0.005;
    }
  }
</script>

<article class="TaxPlayground">
  <section class="TaxPlayground__calculator">
    <h1 class="TaxPlayground__heading">Tax Calculator</h1>
    <form class="TaxPlayground__inputs">
      <Input
        formatter={format$}
        label="Income"
        bind:value={income}
      />
      <Input
        formatter={format$}
        label="Tax"
        bind:value={tax}
      />
    </form>
    <section
      class="TaxPlayground__payment"
      class:hidden={!payment}
    >
      <p class="TaxPlayground__payment-label">Payment:</p>
      <p class="TaxPlayground__result">{format$(Math.min(payment, 3e3))}</p>
    </section>
  </section>
</article>

<style lang="scss">
  @use 'style/color';
  @use 'style/misc';

  .TaxPlayground {
    $component: &;
    display: flex;
    flex-direction: column;
    gap: max(1vw, misc.rem(10));
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: max(2vw, misc.rem(10));
    background: var(--color-secondary-200);

    &__heading {
      text-align: center;
      padding-top: var(--spacing-md-100);
      color: var(--color-primary);
    }

    &__calculator {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-radius: var(--radius-md-100);
      border: 1px solid var(--color-secondary-400);
      background: var(--color-secondary-300);
      min-width: clamp(misc.rem(150), 65vw, misc.rem(600));
      min-height: clamp(misc.rem(200), 85vw, 80vh);
      overflow: hidden;
    }

    &__inputs {
      display: flex;
      flex-direction: column;
      flex: 1;
      padding: var(--spacing-lg-100);
      gap: var(--spacing-md-200);
      width: 100%;
      justify-content: center;
      --h-nm-100: var(--h-md-200);
    }

    &__payment {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-basis: 33%;
      width: 100%;
      font-size: var(--h-lg-100);
      font-weight: 700;
      display: flex;
      gap: var(--spacing-nm-100);
      overflow: hidden;
      transition: max-height 0.75s, background 0.75s;
      background: var(--color-primary);
      color: var(--color-primary-contrast);
      max-height: 100%;
      padding: var(--spacing-md-200);

      &.hidden {
        max-height: calc(var(--spacing-md-200) * 3);
        background: var(--color-secondary-400);
        & #{$component}__payment-label, & #{$component}__result {
          color: var(--color-secondary-500);
        }
      }
    }

    &__payment-label {
      color: var(--color-primary-contrast);
      opacity: 0.8;
    }

    &__result {
      color: var(--color-primary-contrast);
    }
  }
</style>
