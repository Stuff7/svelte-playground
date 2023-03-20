<script lang="ts">
  import Icon from 'components/Icon.svelte';
</script>

<div>
  <Icon name="playground" />
  <h1>
    {#each 'JSPlayground' as c, i}
      <svelte:element this={i < 3 ? 'strong' : 'span'}>{c}</svelte:element>
    {/each}
  </h1>
</div>

<style lang="scss">
  @use 'style/color';
  @use 'style/media';
  @use 'style/text';

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: var(--spacing-lg-100);
    width: min-content;
    --icon-accent: var(--color-primary-100-contrast);
    --icon-accent-2: var(--color-secondary-100-contrast);
    --icon-accent-3: var(--color-tertiary-100-contrast);
    h1 {
      display: flex;
      justify-content: space-between;
      width: 100%;
      span, strong {
        @include text.font-title;
        font-size: var(--h-lg-200);
        @include media.larger-than(tablet) {
          font-size: var(--h-xl-100);
        }
      }
      strong {
        font-weight: bold;
        color: var(--color-primary-100-contrast)
      }
    }
  }
</style>
