<script lang="ts">
  import router from 'store/router';
  import { getFolderFamily } from 'api';
  import Video from 'components/Video.svelte';
  import AuthBoundary from 'components/AuthBoundary.svelte';
  import Icon from 'components/Icon.svelte';
  import Explorer from './Explorer.svelte';

  let currentFolder: Option<string> = null;
  let videoId: Option<string> = null;
  $: {
    const [fileType, fileId] = $router.path.split('/', 3);
    if (fileType === 'fylvur') {
      currentFolder = 'root';
      videoId = null;
    } else if (fileType === 'folder') {
      currentFolder = fileId;
      videoId = null;
    } else if (fileType === 'video') {
      currentFolder = null;
      videoId = fileId;
    } else {
      currentFolder = null;
      videoId = null;
    }
  }
</script>

<AuthBoundary iconSize="var(--area-nm-100)" let:realtime let:user>
  {#if videoId}
    <Video id={videoId} />
  {:else if currentFolder}
    {#await getFolderFamily(currentFolder)}
      <Icon name="hdd" margin="auto" size="var(--area-nm-100)" spinning />
    {:then folder}
      {#if folder}
        <Explorer
          folder={currentFolder}
          userId={user._id}
          files={folder.children}
          folderAncestors={folder.ancestors}
          folderName={folder.name}
          {realtime}
        />
      {/if}
    {/await}
  {/if}
</AuthBoundary>
