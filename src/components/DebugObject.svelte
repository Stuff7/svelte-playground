<script lang="ts">
  import Modal from 'components/Modal.svelte';
  
  type Data = $$Generic<object>;
  
  export let data: Data;
  export let open = true;
</script>

<Modal
  disableClickOutClose
  topbarBackground="var(--color-secondary-300)"
  background="transparent"
  bind:open
  on:close
>
  <pre class="DebugObject">{JSON.stringify(data, null, 2)}</pre>
</Modal>

<style lang="scss">
  @use 'style/color';
  .DebugObject {
    background: color.shade(--color-secondary, 300, $a: 0.9);
    border: 1px solid var(--color-secondary-300);
    font-size: var(--p-md-100);
    border-radius: 0 0 var(--radius-nm-100) var(--radius-nm-100);
    color: var(--color-secondary-800);
    opacity: 0.85;
    padding: var(--spacing-md-100);
    width: max-content;
  }
</style>
