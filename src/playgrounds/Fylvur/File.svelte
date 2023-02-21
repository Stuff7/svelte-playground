<script lang="ts">
  import internalLink from 'actions/internalLink';
  import { updateFile } from 'api';
  import type { FileMetadata } from 'api/models';
  import Icon from 'components/Icon.svelte';
  import { createEventDispatcher, onMount } from 'svelte';

  export let id: string;
  export let name: string;
  export let metadata: FileMetadata;
  export let disableLink = false;
  export let inSelectMode = false;

  onMount(() => {
    if (disableLink && nameInput) {
      nameInput.focus();
    }
    return () => dispatch('selectionchange', false);
  });

  const dispatch = createEventDispatcher<{ create: string, selectionchange: boolean }>();

  let selected = false;
  let nameInput: Option<HTMLInputElement>;

  async function changeName({ currentTarget }: FocusEvent) {
    if (!(currentTarget instanceof HTMLInputElement) || currentTarget.value === name) {
      return;
    }

    if (!id) {
      dispatch('create', currentTarget.value);
      return;
    }

    await updateFile(id, { name: currentTarget.value });
  }
</script>

<button
  class:selecting={inSelectMode}
  on:click={() => {
    if (inSelectMode) { dispatch('selectionchange', selected = !selected); }
  }}
>
  <a
    aria-disabled={disableLink || inSelectMode || null}
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
  <input value={name} disabled={inSelectMode} on:blur={changeName} bind:this={nameInput} />
  {#if inSelectMode && selected}
    <div role="img">
      <Icon name="checkmark" />
    </div>
  {/if}
</button>

<style lang="scss">
  @use 'style/color';
  @use 'style/text';

  button {
    display: flex;
    flex-direction: column;
    position: relative;

    &.selecting {
      outline: 2px dashed var(--color-secondary-600);
    }

    [role=img] {
      pointer-events: none;
      position: absolute;
      background-color: var(--color-primary-300);
      --icon-size: calc(var(--area-sm-100) / 10);
      --icon-color: var(--color-primary-100-contrast);
      border-radius: 50%;
      left: 50%;
      top: 50%;
      padding: var(--spacing-sm-100);
      transform: translate(-50%, -50%);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    a {
      $folder-color: var(--color-primary-100-contrast);
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
        --icon-accent: var(--color-primary-800);
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
        border-color: var(--color-primary-100-contrast);
      }
    }
  }
</style>
