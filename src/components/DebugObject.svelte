<script lang="ts">
  import type { Position } from 'types/math';
  import Modal from 'components/Modal.svelte';
  
  type Data = $$Generic<object>;
  
  export let data: Data;
  export let portal = false;
  export let position: Position = portal ? 'none' : 'bottom';
</script>

<Modal {portal} {position} open>
  <pre class="DebugObject">{JSON.stringify(data, null, 2)}</pre>
</Modal>

<style lang="scss">
  .DebugObject {
    background: var(--color-secondary-300);
    border: var(--spacing-sm-100) solid var(--color-secondary-300);
    font-size: var(--p-md-100);
    border-radius: var(--radius-md-100);
    color: var(--color-secondary-800);
    opacity: 0.85;
    padding: var(--spacing-md-100);
  }
</style>
