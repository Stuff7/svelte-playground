<script lang="ts">
  import type { BasicFileInfo } from 'api/models';
  import Select from 'components/Select.svelte';
  import { createEventDispatcher } from 'svelte';

  export let folder: string;
  export let ancestors: BasicFileInfo[];

  const dispatch = createEventDispatcher<{ navigation: string }>();
  let selectedFolder: string;

  $: if (selectedFolder) { dispatch('navigation', selectedFolder); }
</script>

<Select
  icon="chevron-folder"
  options={ancestors.reverse().map(ancestor => ({
    label: ancestor.name,
    value: ancestor._id,
  }))}
  placeholder={folder}
  bind:value={selectedFolder}
/>
