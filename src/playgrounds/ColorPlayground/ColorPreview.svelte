<script lang="ts">
  import Input from 'components/Input.svelte';

  export let editable = false;
  export let hexBackground: string;
  export let hexText: string;
  export let name = '';
</script>

<div class="ColorPreview" style="
--color-preview__hex-background: {hexBackground};
--color-preview__hex-text: {hexText};
">
  {#if editable}<Input bind:value={hexBackground} />{/if}
  {#if name}<span class="ColorPreview__name">{name}</span>{/if}
  <div class="ColorPreview__value ">{hexText}</div>
</div>

<style lang="scss">
  @use 'style/color';
  @use 'style/misc';

  .ColorPreview {
    display: flex;
    flex-direction: column;
    position: relative;
    font-size: var(--h-md-200);
    min-height: clamp(misc.rem(150), 30vw, misc.rem(300));
    flex: 1;
    background: var(--color-preview__hex-background);
    outline: 1px solid var(--color-secondary-200);

    --input-position: absolute;
    --input-left: var(--spacing-sm-50);
    --input-top: var(--spacing-lg-100);
    --input-max-width: calc(100% - var(--spacing-sm-100));

    &__value {
      color: var(--color-preview__hex-text);
      width: 100%;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
    }

    &__name {
      background: var(--color-secondary-300);
      padding: var(--spacing-sm-50) var(--spacing-sm-100);
      color: var(--color-secondary-900);
      width: 100%;
      font-size: var(--p-nm-200);
      display: inline-block;
      text-align: center;
    }
  }
</style>
