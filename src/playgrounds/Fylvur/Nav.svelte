<script lang="ts">
  import Button from 'components/Button.svelte';
  import FloatingDialog from 'components/FloatingDialog.svelte';
  import Icon from 'components/Icon.svelte';
  import { createEventDispatcher } from 'svelte';

  type CreateEvent = 'create-folder' | 'create-video';
  const dispatch = createEventDispatcher<{[key in CreateEvent]: undefined }>();

  export let fileCount: number;

  let createDialogOpen = false;
</script>

<nav>
  <p>{fileCount} items</p>
  <Button icon="add-file" on:click={() => createDialogOpen = !createDialogOpen}>
    Create
  </Button>
  <FloatingDialog padding="0" bind:open={createDialogOpen}>
    <menu>
      <button on:click={() => dispatch('create-folder')}>
        Folder
        <Icon name="folder" />
      </button>
      <button on:click={() => dispatch('create-video')}>
        Video
        <Icon name="play" />
      </button>
    </menu>
  </FloatingDialog>
</nav>

<style lang="scss">
  @use 'style/misc';

  nav {
    display: flex;
    gap: var(--spacing-nm-100);
    padding: var(--spacing-sm-100);
    align-items: center;
    position: sticky;
    background: var(--color-secondary-300);
    z-index: 1;
    @include misc.shadow();
    --floating-dialog-separation: 0px;

    p {
      margin-left: auto;
    }

    menu {
      background: var(--color-secondary-500);
      border: 1px solid var(--color-secondary-500);
      border-right: 0;
      border-radius: var(--radius-nm-100) 0 0 var(--radius-nm-100);
      overflow: hidden;
      gap: 1px;
      display: flex;
      flex-direction: column;
      min-width: var(--area-sm-100);
      button {
        display: flex;
        justify-content: end;
        align-items: center;
        gap: var(--spacing-sm-100);
        padding: var(--spacing-nm-100);
        background: var(--color-secondary-700);
        color: var(--color-secondary-300);
        --icon-accent: var(--color-secondary-300);
        font-weight: 800;
        &:hover {
          background: var(--color-secondary-400);
          color: var(--color-secondary-900);
          --icon-accent: var(--color-secondary-900);
        }
      }
    }
  }
</style>
