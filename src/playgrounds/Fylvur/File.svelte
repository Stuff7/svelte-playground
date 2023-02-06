<script lang="ts">
  import internalLink from 'actions/internalLink';
  import type { FileMetadata } from 'api/models';
  import Icon from 'components/Icon.svelte';

  export let id: string;
  export let name: string;
  export let metadata: FileMetadata;
</script>

<a
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
  <p>{name}</p>
</a>

<style lang="scss">
  @use 'style/color';
  @use 'style/text';

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

    p {
      @include text.ellipsis(3);
      word-break: break-all;
      position: absolute;
      top: calc(100% + var(--spacing-sm-25));
    }

    picture {
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
</style>
