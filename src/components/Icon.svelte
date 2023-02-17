<script lang="ts">
  import tooltip from 'actions/tooltip';
  import iconError from 'icons/triangle-exclamation.svg?raw';
  import iconLoading from 'icons/loading.svg?raw';

  export let name: IconName;
  export let style: Option<string> = null;
  export let size: Option<string> = null;
  export let margin: Option<string> = null;
  export let spinning = false;
  export let tooltipValue: Option<string> = null; export { tooltipValue as tooltip };
  export let tooltipId: Option<string> = null;
  export let tooltipStatic = false;
  export let tooltipPosition: Option<string> = null;

  async function loadIcon(iconName: IconName) {
    const icon = (await import(`icons/${iconName}.svg?raw`)).default as string;
    if (icon.includes('${dynamic-id}')) {
      return icon.replaceAll('${dynamic-id}', crypto.randomUUID());
    }
    return icon;
  }

  $: quotedName = `"${name}"`;
  $: iconPromise = loadIcon(name);
</script>

{#await iconPromise}
  <span
    class="Icon Icon--rotate"
    {style}
    data-tooltip="Loading {quotedName} icon..."
    use:tooltip
  >
    {@html iconLoading}
  </span>
{:then icon}
  <span
    class="Icon"
    class:Icon--rotate={spinning}
    {style}
    style:overflow="visible"
    style:--icon-size={size}
    style:margin
    data-tooltip={tooltipValue}
    data-tooltip-id={tooltipId}
    data-tooltip-static={tooltipStatic || null}
    data-tooltip-position={tooltipPosition}
    use:tooltip
  >
    {@html icon}
  </span>
{:catch}
  <span
    class="Icon Icon__error"
    {style}
    data-tooltip="Could not find icon
    {quotedName}"
    use:tooltip
  >
    {@html iconError}
  </span>
{/await}

<style lang="scss">
  @use 'style/animation';
  @use 'style/color';
  @use 'style/misc';

  .Icon {
    display: var(--icon-display, flex);

    &--rotate {
      & :global(svg) {
        animation: rotate 2s linear infinite;
      }
    }

    & :global(svg) {
      width: var(--icon-size, var(--svg-nm-100));
      height: var(--icon-size, var(--svg-nm-100));
      position: var(--icon-position, initial);
      left: var(--icon-left, initial);
      top: var(--icon-top, initial);
      transform: var(--icon-transform, initial);
      cursor: var(--icon-cursor, inherit);
      filter: drop-shadow(1px 1px 2px var(--icon-shadow, transparent));
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
    & :global(svg path.icon-transition) {
      transition: transform var(--icon-transition-duration, 0.5s);
      transform: var(--icon-transition-transform, none);
    }
    & :global(svg path.icon-transition-2) {
      transition: transform var(--icon-transition-2-duration, 0.5s);
      transform: var(--icon-transition-2-transform, none);
    }
    & :global(.icon-error) {
      color: var(--icon-error, var(--color-error));
    }
  }
</style>
