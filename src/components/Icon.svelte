<script lang="ts">
  import iconError from 'icons/triangle-exclamation.svg?raw';
  import iconLoading from 'icons/loading.svg?raw';

  export let name: IconName;

  async function loadIcon(iconName: IconName) {
    return (await import(`icons/${iconName}.svg?raw`)).default as string;
  }

  $: quotedName = `"${name}"`;
  $: iconPromise = loadIcon(name);
</script>

{#await iconPromise}
  <span class="Icon Icon--rotate {$$props.class ?? ''}" title="Loading {quotedName} icon...">
    {@html iconLoading}
  </span>
{:then icon}
  <span class="Icon {$$props.class ?? ''}">
    {@html icon}
  </span>
{:catch}
  <span class="Icon Icon__error {$$props.class ?? ''}" title="Could not find icon {quotedName}">
    {@html iconError}
  </span>
{/await}

<style lang="scss">
  @use 'style/animation';
  @use 'style/color';

  .Icon {
    display: flex;

    &--rotate {
      @include animation.rotate;
    }

    & :global(.icon-accent) {
      color: var(--icon-accent, var(--color-primary));
    }
    & :global(.icon-accent-2) {
      color: var(--icon-accent-2, var(--color-secondary));
    }
    & :global(.icon-accent-3) {
      color: var(--icon-accent-3, var(--color-tertiary));
    }
    & :global(.icon-error) {
      color: var(--icon-error, var(--color-error));
    }
  }
</style>
