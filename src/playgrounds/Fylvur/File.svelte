<script lang="ts">
  import internalLink from 'actions/internalLink';
  import { updateFile } from 'api';
  import type { FileMetadata } from 'api/models';
  import Icon from 'components/Icon.svelte';
  import { createEventDispatcher } from 'svelte';

  export let id: string;
  export let name: string;
  export let metadata: FileMetadata;
  export let disableLink = false;

  const dispatch = createEventDispatcher<{ create: string }>();

  async function changeName({ currentTarget }: FocusEvent) {
    if (!(currentTarget instanceof HTMLInputElement) || currentTarget.value === name) {
      return;
    }

    if (!id) {
      dispatch('create', currentTarget.value);
      return;
    }

    const file = await updateFile(id, { name: currentTarget.value });

    if (file?.name) {
      name = file.name;
    } else {
      currentTarget.value = name;
    }
  }
</script>

<div>
  <a
    aria-disabled={disableLink || null}
    href="/fylvur/{metadata.type}/{metadata.type === 'video' ? metadata.playId : id}"
    use:internalLink
  >
    {#if metadata.type === 'folder'}
      <Icon name={metadata.type} />
    {:else if metadata.type === 'video'}
      <picture>
        <img
          referrerPolicy="no-referrer"
          src="{metadata.thumbnail}"
          alt="Video"
        />
        <div class="File__play-icon">
          <Icon name="play" />
        </div>
      </picture>
    {:else}
      <Icon name="file" />
    {/if}
  </a>
  <input value={name} on:blur={changeName} />
</div>

<style lang="scss">
  @use 'style/color';
  @use 'style/text';

  div {
    display: flex;
    flex-direction: column;
    a {
      $folder-color: color.shade(--color-primary, 700);
      $paper-color: var(--color-primary-200);

      display: flex;
      justify-content: center;
      position: relative;
      background: transparent;
      border: 0;
      padding: 0;
      color: var(--color-primary-800);
      aspect-ratio: 1 / 1;
      --icon-size: var(--area-sm-100);
      --icon-accent: #{$folder-color};
      --icon-accent-2: #{$paper-color};
      --icon-transition-duration: 0.1s;
      --icon-transition-2-duration: 0.1s;

      &:hover {
        --icon-transition-transform: rotate(-3deg) translate(-2%, -2%);
        --icon-transition-2-transform: translateY(4%);
        --icon-accent: #{color.shade(--color-primary, 900)};
      }

      picture {
        aspect-ratio: 1 / 1;
        display: flex;
        justify-content: center;
        background: $folder-color;
        border-radius: var(--radius-nm-100);
        position: relative;
        overflow: hidden;
        .File__play-icon {
          --icon-accent: #{$folder-color};
          --icon-shadow: var(--color-primary-400);
          --icon-size: var(--h-lg-100);
          pointer-events: none;
          background: transparent;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          transition: background 0.5s;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        &:hover .File__play-icon {
          background: rgba(0, 0, 0, 0.5);
        }
      }
    }

    input {
      background: none;
      color: var(--color-primary-900);
      border: 1px solid var(--color-primary-400);
      border-radius: var(--spacing-sm-25);
      padding: var(--spacing-sm-25);
      &:hover, &:focus {
        border-color: var(--color-primary-500);
      }
      &:focus {
        border-color: color.shade(--color-primary, 700);
      }
    }
  }
</style>
