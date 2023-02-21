<script lang="ts">
  import type { UserFile } from 'api/models';
  import type { Realtime } from 'api/realtime';
  import { createFolder } from 'api';
  import { onMount } from 'svelte';
  import File from './File.svelte';
  import Nav from './Nav.svelte';
  import AddVideoModal from './AddVideo.svelte';

  export let userId: string;
  export let folder: string;
  export let files: UserFile[];
  export let realtime: Realtime;

  onMount(() => {
    const onFilesChange = realtime.on('folder-change', (change) => {
      if (change.folderId === folder || (folder === 'root' && change.folderId === userId)) {
        files = change.files;
      }
    });
    return () => realtime.off('folder-change', onFilesChange);
  });

  let newFolderName: Option<string> = null;
  let videoDialogOpen = false;
  let inSelectMode = false;
  let selectedFiles = new Set<string>();
</script>

<section class="Explorer">
  <Nav
    fileCount={files.length}
    {selectedFiles}
    bind:inSelectMode
    on:create-folder={() => {
      newFolderName = '';
    }}
    on:create-video={() => {
      videoDialogOpen = true;
    }}
  />
  <div class="Explorer__list">
    {#each files as file (file._id) }
      <File
        id={file._id}
        metadata={file.metadata}
        name={file.name}
        {inSelectMode}
        on:selectionchange={({ detail: selected }) => {
          selectedFiles[selected ? 'add' : 'delete'](file._id);
          selectedFiles = selectedFiles;
        }}
      />
    {/each}
    {#if newFolderName !== null}
      <File
        disableLink
        id=""
        metadata={{ type: 'folder' }}
        name={newFolderName}
        on:create={async ({ detail: name }) => {
          await createFolder(name, folder);
          newFolderName = null;
        }}
      />
    {/if}
  </div>
  <AddVideoModal {folder} bind:open={videoDialogOpen} />
</section>

<style lang="scss">
  @use 'style/color';
  @use 'style/animation';
  @use 'style/misc';

  .Explorer {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &__list {
      display: grid;
      grid-template-columns: repeat(auto-fill, var(--area-sm-100));
      grid-gap: 3.25rem 1.5rem;
      justify-content: center;
      align-items: center;
    }
  }
</style>
