<script lang="ts">
  import { getFolderFamily, moveFiles } from '@Playground/api';
  import Icon from 'components/Icon.svelte';
  import Modal from 'components/Modal.svelte';
  import Button from 'components/Button.svelte';
  import History from './History.svelte';

  export let folderId: string;
  export let open = false;
  export let selectedFiles: Set<string>;

  let folderName = '';
  let currentFolder = folderId;
  $: if (!open) { currentFolder = folderId; }

  // 😔 https://github.com/sveltejs/svelte/issues/5604
  function updateFolderName(newName: string) {
    folderName = newName;
    return newName;
  }

  async function moveSelectedFiles() {
    if (await moveFiles(currentFolder, Array.from(selectedFiles))) {
      open = false;
    }
  }
</script>

<Modal
  topbarBackground="var(--color-secondary-300)"
  background="transparent"
  bind:open
>
  <svelte:fragment slot="topbar-left">{folderName}</svelte:fragment>
  <section>
    {#await getFolderFamily(currentFolder)}
      <Icon name="loading" spinning margin="auto" />
    {:then folderFamily}
      {#if folderFamily}
        <header>
          <History
            on:navigation={({ detail: folder }) => currentFolder = folder}
            ancestors={folderFamily.ancestors}
            folder={updateFolderName(folderFamily.name)}
          />
        </header>
        <menu>
          {#each folderFamily.children.filter(child => (
            child.metadata.type === 'folder' && !selectedFiles.has(child._id)
          )) as child (child._id)}
            <button
              on:click={() => currentFolder = child._id}
            >
              <Icon name="folder" />
              <p>{child.name}</p>
            </button>
          {/each}
        </menu>
        <footer>
          <Button
            on:click={moveSelectedFiles}
            radius="0 0 0 var(--radius-nm-100)"
          >
            Move
          </Button>
          <Button
            on:click={() => open = false}
            radius="0 0 var(--radius-nm-100) 0"
          >
            Cancel
          </Button>
        </footer>
      {:else}
        <p style="margin: auto">No folders found? 😔🪲</p>
      {/if}
    {/await}
  </section>
</Modal>

<style lang="scss">
  @use 'style/misc';
  @use 'style/color';

  section {
    display: flex;
    flex-direction: column;
    min-width: var(--area-lg-100);
    max-width: var(--area-lg-200);
    height: var(--area-lg-200);
    background: color.shade(--color-primary, 100, $a: 0.95);
    border-radius: 0 0 var(--radius-nm-100) var(--radius-nm-100);

    header {
      display: flex;
      gap: var(--spacing-sm-100);
      padding: 0 var(--spacing-nm-100);
      overflow: auto hidden;
      background: var(--color-secondary-300);
      white-space: nowrap;
      border-width: 1px 0;
      border-style: solid;
      border-color: var(--color-secondary-400);
    }

    menu {
      display: flex;
      flex-direction: column;
      @include misc.scrollbar(var(--color-primary-100-contrast));
      overflow: hidden auto;
      flex: 1;

      button {
        display: flex;
        gap: var(--spacing-nm-100);
        padding: var(--spacing-sm-100);
        background: var(--color-primary-200);
        color: var(--color-primary-800);
        --icon-accent: var(--color-primary-100-contrast);
        --icon-accent-2: var(--color-primary-200);
        border: 1px solid var(--color-primary-300);

        &:hover {
          background: var(--color-primary-400);
        }

        p {
          display: flex;
          align-items: center;
        }
      }
    }

    footer {
      display: flex;
      gap: 1px;
      --button-width: 100%;
    }
  }
</style>
