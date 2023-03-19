<script lang="ts">
  import { sortFiles, type File as FileType } from 'api/models';
  import type { Realtime } from 'api/realtime';
  import { createFolder } from 'api';
  import { onMount } from 'svelte';
  import File from './File.svelte';
  import Nav from './Nav.svelte';
  import AddVideoModal from './AddVideo.svelte';

  export let userId: string;
  export let folder: string;
  export let files: FileType[];
  export let realtime: Realtime;

  onMount(() => {
    const onFilesChange = realtime.on('folder-change', (change) => {
      if (change._id === folder || (folder === 'root' && change._id === userId)) {
        files = change.children;
      }
    });
    return () => realtime.off('folder-change', onFilesChange);
  });

  let newFolderName: Option<string> = null;
  let videoDialogOpen = false;
  let selectedFiles = new Set<string>();

  $: files = sortFiles(files);
</script>

<section class="Explorer">
  <Nav
    fileCount={files.length}
    folderId={folder}
    {selectedFiles}
    on:create-folder={() => { newFolderName = ''; }}
    on:create-video={() => { videoDialogOpen = true; }}
  />
  <div class="Explorer__list">
    {#each files as file (file._id) }
      <File
        id={file._id}
        metadata={file.metadata}
        name={file.name}
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
          newFolderName = null;
          await createFolder(name, folder);
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

    &__list {
      display: grid;
      grid-template-columns: repeat(auto-fill, var(--area-nm-50));
      grid-auto-rows: minmax(var(--area-nm-50), auto);
      grid-gap: var(--spacing-sm-100);
      justify-content: center;
      align-items: center;
      padding: var(--spacing-nm-100) 0;
      @include misc.scrollbar(var(--color-primary-100-contrast));
      overflow: hidden auto;
    }
  }
</style>
