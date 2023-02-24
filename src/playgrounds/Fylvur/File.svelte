<script lang="ts">
  import internalLink from 'actions/internalLink';
  import { updateFile } from 'api';
  import type { FileMetadata } from 'api/models';
  import Checkbox from 'components/Checkbox.svelte';
  import Icon from 'components/Icon.svelte';
  import { createEventDispatcher, onMount } from 'svelte';

  export let id: string;
  export let name: string;
  export let metadata: FileMetadata;
  export let disableLink = false;

  onMount(() => {
    if (disableLink && nameInput) {
      nameInput.focus();
    }
    return () => dispatch('selectionchange', false);
  });

  const dispatch = createEventDispatcher<{ create: string, selectionchange: boolean }>();

  let checked = false;
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

  $: dispatch('selectionchange', checked);
</script>

<button class:checked on:click={({ target, currentTarget }) => {
  if (target === currentTarget) {
    checked = !checked;
  }
}}>
  <Checkbox bind:checked />
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
  <input value={name} on:blur={changeName} bind:this={nameInput} />
</button>

<style lang="scss">
  @use 'style/color';
  @use 'style/text';

  button {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: var(--spacing-sm-100);
    align-items: center;
    position: relative;
    cursor: default;
    $padding: var(--spacing-sm-100);
    $checkbox-size: var(--h-nm-200);
    $checkbox-space: calc(var(--spacing-sm-50) + $padding + $checkbox-size);
    padding: $checkbox-space $padding $padding $padding;
    min-width: var(--area-nm-50);
    min-height: 100%;
    border-radius: var(--radius-nm-100);

    &:hover {
      background: color.alpha(--color-primary-100-contrast, 0.4);
    }

    &.checked {
      background: color.alpha(--color-primary-100-contrast, 0.6);
    }

    --checkbox-size: #{$checkbox-size};
    --checkbox-position: absolute;
    --checkbox-left: #{$padding};
    --checkbox-top: #{$padding};
    --checkbox-z-index: 1;

    a {
      $folder-color: var(--color-primary-100-contrast);
      $paper-color: var(--color-primary-200);

      display: flex;
      justify-content: center;
      position: relative;
      background: transparent;
      border: 0;
      padding: 0;
      max-width: 100%;
      width: max-content;
      height: max-content;
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

        img {
          object-fit: contain;
        }

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
      max-width: 100%;
      &:hover, &:focus {
        border-color: var(--color-primary-500);
      }
      &:focus {
        border-color: var(--color-primary-100-contrast);
      }
    }
  }
</style>
