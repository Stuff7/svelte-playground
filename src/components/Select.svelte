<script lang="ts">
  import Icon from './Icon.svelte';

  type SelectOption = { label: string, value: string };
  export let options: SelectOption[];
  export let icon: Option<IconName> = null;
  export let placeholder: Option<string> = null;
  export let value: Option<string> = null;
</script>

<div class="Select">
  {#if options.length}
    <select bind:value>
      {#each options as option}
        <option value={option.value} selected={value === option.value}>
          {option.label}
        </option>
      {/each}
    </select>
  {/if}
  <button>
    {#if icon}<Icon name={icon} />{/if}
    {#if placeholder}<p>{placeholder}</p>{/if}
    <Icon name="chevron" size="var(--p-sm-100)" />
  </button>
</div>

<style lang="scss">
  .Select {
    position: relative;
    button {
      --icon-size: var(--h-nm-100);
      --icon-color: var(--color-secondary-100-contrast);
      background: var(--color-secondary-200);
      border-radius: var(--radius-nm-100);
      color: var(--color-secondary-900);
      padding: var(--spacing-sm-100) var(--spacing-nm-100);
      display: flex;
      align-items: center;
      gap: var(--spacing-nm-100);
      font-size: var(--h-nm-100);
      pointer-events: none;
      & :global(.Icon:last-child) {
        rotate: 90deg;
      }
    }

    & select:focus + button {
      background: var(--color-secondary-100);
    }

    select {
      appearance: none;
      opacity: 0;
      position: absolute;
      padding: 0;
      margin: 0;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      z-index: 1;
      pointer-events: all;
      cursor: pointer;
    }
  }
</style>
