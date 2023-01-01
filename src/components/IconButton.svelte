<script lang="ts">
  import { tooltip } from 'actions/tooltip';
  import Icon from 'components/Icon.svelte';

  export let name: IconName;
  export let style: Option<string> = null;
  export let tooltipValue: Option<string> = null; export { tooltipValue as tooltip };
  export let tooltipID: Option<string> = null;
  export let padding: Option<string> = null;
  export let size: Option<string> = null;
  export let iconAccent: Option<string> = null;
</script>

<button
  class="IconButton"
  data-tooltip={tooltipValue}
  data-tooltip-id={tooltipID}
  {style}
  style:--icon-button-padding={padding}
  style:--icon-size={size}
  style:--icon-accent={iconAccent}
  on:click
  use:tooltip
>
  <Icon {name} />
  <slot />
</button>

<style lang="scss">
  @use 'style/color';
  @use 'style/misc';

  .IconButton {
    --icon-size: #{misc.rem(12)};
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--spacing-sm-50);
    height: max-content;
    background: transparent;
    border: transparent;
    padding: var(--icon-button-padding, var(--spacing-sm-100));
    color: var(--color-secondary-900);
    &:hover {
      color: color.shade(--color-primary, 700);
    }
  }
</style>
