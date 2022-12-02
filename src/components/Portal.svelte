<script lang="ts">
  import { getElementByPortalId, type PortalID } from 'utils/dom';
  import { onMount, onDestroy } from 'svelte';

  export let target: PortalID | HTMLElement | null | undefined = globalThis.document?.body;

  let container: HTMLElement;
  let nodes: ChildNode[] = [];

  onMount(() => {
    target = typeof target === 'string' ? getElementByPortalId(target) : target;
    const { childNodes } = container;
    if (target && childNodes.length) {
      nodes = [...childNodes];
      target.append(...childNodes);
    }
    container.remove();
  });

  onDestroy(() => {
    nodes.forEach(node => node.remove());
  });
</script>

<div bind:this={container}>
  <slot />
</div>
