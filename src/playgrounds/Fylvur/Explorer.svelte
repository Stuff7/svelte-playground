<script lang="ts">
  import { getUserFiles } from 'api';
  import serverStore from 'store/server';
  import router from 'store/router';
  import Icon from 'components/Icon.svelte';
  import File from './File.svelte';
  import Video from 'components/Video.svelte';

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
    }
  }
  $: files = $serverStore.awake && currentFolder ? getUserFiles(currentFolder) : [];

</script>

{#if videoId}
  <Video id={videoId} />
{:else}
  <section class="Explorer">
    {#await files}
      <div class="Explorer__loading">
        <Icon name="hdd" />
      </div>
    {:then files}
      <div class="Explorer__nav">
        <div class="Explorer__tools">
          <p class="Explorer__item-count">
            {files.length} items
          </p>
        </div>
      </div>
      <div class="Explorer__list">
        {#each files as file (file.id) }
          <File
            id={file.id}
            metadata={file.metadata}
            name={file.name}
          />
        {/each}
      </div>
    {/await}
  </section>
{/if}

<style lang="scss">
  @use 'style/color';
  @use 'style/animation';
  @use 'style/misc';

  .Explorer {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &__loading {
      --icon-size: var(--area-nm-100);
      display: flex;
      position: absolute;
      left: 50%;
      top: 50%;
      translate: -50% -50%;
      padding: 0;
      @include animation.rotate;
    }

    & > * {
      padding: 1rem;
    }

    &__nav {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      position: sticky;
      background: var(--color-secondary-300);
      z-index: 1;
      @include misc.shadow();
    }

    &__tools {
      display: flex;
      justify-content: space-between;
    }

    &__item-count {
      margin-left: auto;
    }

    &__list {
      display: grid;
      grid-template-columns: repeat(auto-fill, var(--area-sm-100));
      grid-gap: 3.25rem 1.5rem;
      justify-content: center;
      align-items: center;
    }
  }
</style>
