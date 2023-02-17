<script lang="ts">
  import { createVideo, getVideoMetadata } from 'api';
  import type { CreateVideoBody, VideoMetadata } from 'api/models';
  import { formatTime } from 'utils/string';
  import Input from 'components/Input.svelte';
  import Modal from 'components/Modal.svelte';
  import Button from 'components/Button.svelte';

  export let open: boolean;
  export let folder: string;

  let inputDelayTimeout = -1;
  let videoId: string;
  let metadata: Option<VideoMetadata> = null;
  let customMetadata = { folder } as CreateVideoBody;

  function createNewVideo() {
    createVideo(videoId, customMetadata).then(() => open = false);
  }

  $: {
    window.clearTimeout(inputDelayTimeout);
    inputDelayTimeout = window.setTimeout(() => {
      if (videoId) {
        getVideoMetadata(videoId).then(data => {
          metadata = data;
          customMetadata = data ? {
            name: data.name,
            thumbnail: data.thumbnail,
            folder,
          } : { folder };
        });
      }
    });
  }
</script>

<Modal disableClickOutClose minWidth="var(--area-md-100)" bind:open>
  <Input bind:value={videoId} />
  {#if metadata}
    <fieldset>
      <section>
        <img
          src={customMetadata.thumbnail}
          alt="video thumbnail"
          referrerPolicy="no-referrer"
        >
        <div>
          <Input label="Name" bind:value={customMetadata.name} />
          <Input label="Thumbnail" bind:value={customMetadata.thumbnail} />
        </div>
      </section>
      <p><strong>Duration: </strong>{formatTime(metadata.durationMillis / 1000)}</p>
      <p><strong>Width: </strong>{metadata.width}</p>
      <p><strong>Height: </strong>{metadata.height}</p>
      <p><strong>Type: </strong>{metadata.mimeType}</p>
      <p><strong>Size: </strong>{metadata.sizeBytes / 1e6}mb</p>
      <Button disabled={!videoId} on:click={createNewVideo}>
        Create video
      </Button>
    </fieldset>
  {/if}
</Modal>

<style lang="scss">
  fieldset {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm-100);
    padding: var(--spacing-nm-100);
    border: 0;
    background: var(--color-primary-400);
    font-size: var(--h-nm-100);

    section {
      display: flex;
      width: 100%;
      gap: var(--spacing-md-100);

      div {
        flex: 1;
        justify-content: space-between;
        display: flex;
        flex-direction: column;
      }
    }
    img {
      width: var(--area-sm-50);
    }

    p {
      font-size: var(--h-nm-200);
    }

    strong {
      color: var(--color-primary-700);
    }
  }
</style>
