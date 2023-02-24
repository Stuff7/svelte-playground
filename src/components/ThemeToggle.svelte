<script lang="ts">
  import Icon from 'components/Icon.svelte';
  import preferences from 'store/preferences';

  let checked: boolean;

  preferences.subscribe(({ theme }) => checked = theme === 'dark');

  $: if (preferences) {
    $preferences.theme = checked ? 'dark' : 'light';
  }
</script>

<label class="ThemeToggle">
  <input
    class="ThemeToggle__toggle-checkbox"
    type="checkbox"
    bind:checked
  />
  <div class="ThemeToggle__toggle-slot">
    <div class="ThemeToggle__sun-icon-wrapper">
      <Icon name="sun" />
    </div>
    <div class="ThemeToggle__toggle-button"></div>
    <div class="ThemeToggle__moon-icon-wrapper">
      <Icon name="moon" />
    </div>
  </div>
</label>

<style lang="scss">
  @use 'style/color';

  .ThemeToggle {
    $component: &;
    --theme-toggle__width: var(--theme-toggle-width, 3rem);
    --icon-size: var(--svg-sm-100);

    cursor: pointer;
    width: var(--theme-toggle__width);
    aspect-ratio: 2 / 1;
    position: relative;
    margin-left: auto;
    border-radius: 10em;
    overflow: hidden;

    &__toggle-checkbox {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
      &:checked ~ #{$component}__toggle-slot {
        background-color: #374151;
        & #{$component}__toggle-button {
          background-color: #374151;
          box-shadow: inset 0px 0px 0px calc(var(--theme-toggle__width) * 0.0375) white;
          transform: translate(28%, -50%);
        }
        & #{$component}__sun-icon-wrapper {
          opacity: 0;
          transform: translate(3em, -50%) rotate(0deg);
        }
        & #{$component}__moon-icon-wrapper {
          opacity: 1;
          transform: translate(202%, -50%) rotate(-15deg);
        }
      }
    }

    &__toggle-slot {
      position: relative;
      height: 100%;
      width: 100%;
      border: 2px solid #e4e7ec;
      border-radius: 10em;
      background-color: white;
      box-shadow: 0px calc(var(--theme-toggle__width) * 0.005) calc(var(--theme-toggle__width) * 0.025) var(--color-primary-100-contrast);
      transition: background-color 250ms;
    }

    &__toggle-button {
      top: 50%;
      transform: translate(188%, -50%);
      position: absolute;
      width: 32.5%;
      aspect-ratio: 1 / 1;
      border-radius: 50%;
      background-color: var(--color-primary-100-contrast);
      box-shadow: inset 0px 0px 0px calc(var(--theme-toggle__width) * 0.0375) var(--color-primary-100-contrast);
      transition: background-color 250ms, border-color 250ms, transform 500ms cubic-bezier(.26,2,.46,.71);
    }

    &__sun-icon-wrapper {
      position: absolute;
      width: 30%;
      aspect-ratio: 1 / 1;
      opacity: 1;
      top: 50%;
      transform: translate(33.66%, -50%) rotate(15deg);
      transform-origin: 50% 50%;
      transition: opacity 150ms, transform 500ms cubic-bezier(.26,2,.46,.71);
    }

    &__moon-icon-wrapper {
      position: absolute;
      width: 30%;
      aspect-ratio: 1 / 1;
      opacity: 0;
      top: 50%;
      transform: translate(185.16%, -50%) rotate(0deg);
      transform-origin: 50% 50%;
      transition: opacity 150ms, transform 500ms cubic-bezier(.26,2.5,.46,.71);
    }
  }
</style>
