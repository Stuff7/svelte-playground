<script lang="ts">
  import { cssCustomProps } from 'utils/dom';
  import iconError from 'icons/triangle-exclamation.svg?raw';
  import iconLoading from 'icons/loading.svg?raw';

  type HSL = [h: number, s: number, l: number];

  export let name: IconName;
  export let size: string | undefined = undefined;
  export let primary: HSL | undefined = undefined;
  export let secondary: HSL | undefined = undefined;
  export let tertiary: HSL | undefined = undefined;

  async function loadIcon(iconName: IconName) {
    return (await import(`icons/${iconName}.svg?raw`)).default as string;
  }

  $: quotedName = `"${name}"`;
  $: iconPromise = loadIcon(name);
  $: svgColors = (
    (primary ? cssCustomProps({
      iconSize: size,
      iconPrimaryH: primary[0],
      iconPrimaryS: `${primary[1]}%`,
      iconPrimaryL: `${primary[2]}%`,
    }) : '') +
    (secondary ? cssCustomProps({
      iconSecondaryH: secondary[0],
      iconSecondaryS: `${secondary[1]}%`,
      iconSecondaryL: `${secondary[2]}%`,
    }) : '') +
    (tertiary ? cssCustomProps({
      iconTertiaryH: tertiary[0],
      iconTertiaryS: `${tertiary[1]}%`,
      iconTertiaryL: `${tertiary[2]}%`,
    }) : '')
  );
</script>

{#await iconPromise}
  <span class="Icon Icon--rotate {$$props.class ?? ''}" style={svgColors} title="Loading {quotedName} icon...">
    {@html iconLoading}
  </span>
{:then icon}
  <span class="Icon {$$props.class ?? ''}" style={svgColors}>
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
