<script lang="ts">
  import Modal from 'components/Modal.svelte';
  type Data = $$Generic<object>;
  export let data: Data;
</script>

<Modal>
  <pre class="DebugObject">{JSON.stringify(data, null, 2)}</pre>
</Modal>

<style lang="scss">
  .DebugObject {
    background: var(--color-surface3);
    border: var(--spacing-nm-100) solid var(--color-surface5);
    font-size: var(--p-md-100);
    border-radius: var(--radius-nm-100);
    color: var(--color-surface1-contrast);
    opacity: 0.85;
    padding: var(--spacing-md-100);
  }
</style>
