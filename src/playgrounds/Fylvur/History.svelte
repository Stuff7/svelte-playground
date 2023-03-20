<script lang="ts">
  import type { BasicFileInfo } from 'api/models';
  import { createEventDispatcher } from 'svelte';

  export let folder: string;
  export let ancestors: BasicFileInfo[];

  const dispatch = createEventDispatcher<{ navigation: string }>();
</script>

<span>
  {#each ancestors as ancestor (ancestor._id)}
    <button on:click={() => dispatch('navigation', ancestor._id)}>
      {ancestor.name}
    </button>
    <p>/</p>
  {/each}
  <p>{folder}</p>
</span>

<style lang="scss">
  @use 'style/misc';
  @use 'style/color';

  span {
    display: flex;
    max-width: 100%;
    gap: var(--spacing-sm-100);
    padding: var(--spacing-sm-100) 0;
    overflow: auto hidden;
    white-space: nowrap;

    * {
      font-size: var(--p-nm-100);
    }

    button {
      text-decoration: underline;
      color: var(--color-primary-100-contrast);
      cursor: pointer;
      font-weight: bold;
    }
  }
</style>
