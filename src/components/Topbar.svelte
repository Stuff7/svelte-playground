<script lang="ts">
  import { portalIdMap } from 'utils/dom';
  import preferences from 'store/preferences';
  import internalLink from 'actions/internalLink';
  import Icon from 'components/Icon.svelte';
  import Console from 'components/Console';
  import ColorPicker from 'components/ColorPicker.svelte';
  import Modal from 'components/Modal.svelte';
  import ThemeToggle from './ThemeToggle.svelte';

  let primaryPickerOpen = false;
  let secondaryPickerOpen = false;
  let tertiaryPickerOpen = false;
</script>

<nav class="Topbar">
  <a class="Topbar__home" href="/" use:internalLink>
    <Icon name="logo" />
    JSPlayground
  </a>
  <section data-portal-id={portalIdMap.topbar} class="Topbar__right-section">
    <Console />
    <ThemeToggle />
    <div class="Topbar__ColorPickerArea">
      <div
        class="Topbar__ColorPicker"
        style="--color: var(--color-primary)"
      >
        <button on:click={() => primaryPickerOpen = !primaryPickerOpen} />
        <Modal disableDrag open={primaryPickerOpen} position="left">
          <ColorPicker bind:hslColor={$preferences.colorPrimary} />
        </Modal>
      </div>
      <div
        class="Topbar__ColorPicker"
        style="--color: var(--color-secondary)"
      >
        <button on:click={() => secondaryPickerOpen = !secondaryPickerOpen} />
        <Modal disableDrag open={secondaryPickerOpen} position="left">
          <ColorPicker bind:hslColor={$preferences.colorSecondary} />
        </Modal>
      </div>
      <div
        class="Topbar__ColorPicker"
        style="--color: var(--color-tertiary)"
      >
        <button on:click={() => tertiaryPickerOpen = !tertiaryPickerOpen} />
        <Modal disableDrag open={tertiaryPickerOpen} position="left">
          <ColorPicker bind:hslColor={$preferences.colorTertiary} />
        </Modal>
      </div>
    </div>
  </section>
</nav>

<style lang="scss">
  @use 'style/color';
  @use 'style/text';
  @use 'style/misc';

  .Topbar {
    $component: &;
    display: flex;
    align-items: center;
    height: max-content;
    width: 100%;
    padding: var(--spacing-sm-100) var(--spacing-nm-100);
    gap: var(--spacing-nm-100);
    grid-area: a;
    background: var(--color-secondary-300);
    outline: 1px solid var(--color-secondary-400);

    &__right-section {
      display: flex;
      gap: var(--spacing-sm-100);
    }

    &__ColorPickerArea {
      display: flex;
    }

    &__ColorPicker {
      background: var(--color);
      position: relative;
      z-index: 10;
      display: flex;
      & button {
        opacity: 0;
        border-radius: 0;
      }
    }

    &__home {
      @include text.font-title;
      @include text.shadow(var(--color-primary-contrast));
      font-size: var(--h-nm-100);
      display: flex;
      align-items: center;
      gap: var(--spacing-nm-100);
      color: var(--color-primary);
      font-weight: 800;
      --icon-size: var(--h-nm-200);
    }

    &__right-section {
      margin-left: auto;
    }
  }
</style>
