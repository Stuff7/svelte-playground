<script lang="ts">
  export let checked = false;
  export let size: Option<string> = null;
</script>

<label
  style:--checkbox-size={size}
>
  <input type="checkbox" bind:checked />
  <p><span /><slot /></p>
</label>

<style lang="scss">
  @use "style/misc";

  label {
    $checkbox-size: var(--checkbox-size, var(--h-nm-100));
    display: flex;
    align-items: center;
    position: var(--checkbox-position, relative);
    left: var(--checkbox-left);
    top: var(--checkbox-top);
    z-index: var(--checkbox-z-index);
    max-width: max-content;

    p {
      display: flex;
      align-items: center;
      gap: var(--spacing-nm-100);

      span {
        $border-width: max(1px, clamp(calc($checkbox-size * 0.005), calc($checkbox-size), calc($checkbox-size * 0.05)));
        aspect-ratio: 1 / 1;
        cursor: pointer;
        width: $checkbox-size;
        border: $border-width solid var(--color-primary-900);
        border-radius: calc($border-width * 2);
        padding: calc($border-width * 2);
        &::after {
          content: "";
          display: block;
          width: 100%;
          transform: scale(0);
          transition: cubic-bezier(0.165, 0.84, 0.44, 1) transform 0.2s;
          transform-origin: center;
          aspect-ratio: 1 / 1;
          border-radius: calc($border-width / 2);
          background: var(--color-primary-100-contrast);
        }
      }
    }

    [type=checkbox] {
      appearance: none;
      position: absolute;
      &:checked + p > span::after {
        transform: scale(1);
      }
    }
  }
</style>
