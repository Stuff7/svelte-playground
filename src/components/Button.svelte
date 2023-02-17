<script lang="ts">
  import tooltip from 'actions/tooltip';
  import Icon from 'components/Icon.svelte';

  export let disabled = false;
  export let iconName: Option<IconName> = null; export { iconName as icon };
  export let tooltipValue: Option<string> = null; export { tooltipValue as tooltip };
  export let tooltipId: Option<string> = null;
  export let tooltipStatic = false;
  export let tooltipPosition: Option<string> = null;
  export let contentAlign: Option<string> = null;
  export let background: Option<string> = null;
  export let color: Option<string> = null;
</script>

<button
  data-tooltip={tooltipValue}
  data-tooltip-id={tooltipId}
  data-tooltip-static={tooltipStatic || null}
  data-tooltip-position={tooltipPosition}
  {disabled}
  style:--button-content-align={contentAlign}
  style:--button-background={background}
  style:--button-color={color}
  on:click
  use:tooltip
>
  {#if iconName}<Icon name={iconName} />{/if}
  {#if $$slots.default}<p><slot /></p>{/if}
</button>

<style lang="scss">
  @use 'style/misc';
  @use 'style/color';

  button, :global([role=button]) {
    $button-background: var(--button-background, var(--color-primary));
    $button-color: var(--button-color, var(--color-primary-contrast));
    --icon-size: var(--p-md-200);
    font-size: var(--h-nm-100);
    font-weight: 800;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: var(--button-content-align, center);
    gap: var(--spacing-sm-50);
    border: misc.rem(1) solid $button-background;
    border-radius: var(--button-radius, misc.rem(8));
    padding: var(--spacing-sm-50) var(--spacing-sm-100);
    font-family: inherit;
    background: $button-background;
    color: $button-color;
    --icon-accent: #{$button-color};
    cursor: pointer;
    transition: background 0.1s, color 0.1s, border-color 0.1s;
    &:hover {
      background: $button-color;
      color: $button-background;
      --icon-accent: #{$button-background};
      border-color: $button-background;
    }
    &:focus, &:focus-visible {
      outline: misc.rem(4) auto -webkit-focus-ring-color;
    }
    &:disabled {
      background: darkgray;
      color: black;
      pointer-events: none;
      --icon-accent: black;
    }
  }
</style>
