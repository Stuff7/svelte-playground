<script lang="ts">
  import iconError from 'icons/triangle-exclamation.svg?raw';
  import iconLoading from 'icons/loading.svg?raw';

  export let name: IconName;
  export let style = '';

  async function loadIcon(iconName: IconName) {
    return (await import(`icons/${iconName}.svg?raw`)).default as string;
  }

  $: quotedName = `"${name}"`;
  $: iconPromise = loadIcon(name);
</script>

{#await iconPromise}
  <span class="Icon Icon--rotate" {style} title="Loading {quotedName} icon...">
    {@html iconLoading}
  </span>
{:then icon}
  <span class="Icon" {style}>
    {@html icon}
  </span>
{:catch}
  <span class="Icon Icon__error" {style} title="Could not find icon {quotedName}">
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

    & :global(svg) {
      width: var(--icon-size, var(--svg-nm-100));
      height: var(--icon-size, var(--svg-nm-100));
      position: var(--icon-position, initial);
      left: var(--icon-left, initial);
      top: var(--icon-top, initial);
      transform: var(--icon-transform, initial);
      cursor: var(--icon-cursor, inherit);
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
