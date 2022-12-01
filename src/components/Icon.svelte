<script lang="ts">
  import iconError from 'icons/error.svg?raw';
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
  <span class="Icon {$$props.class ?? ''}" title="Could not find icon {quotedName}">
    {@html iconError}
  </span>
{/await}

<style lang="scss">
  @use 'style/animation';

  .Icon {
    display: flex;

    &--rotate {
      @include animation.rotate;
    }
  }
</style>
