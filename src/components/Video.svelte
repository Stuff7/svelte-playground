<script lang="ts">
  import { API_URL } from '@Playground/config';

  export let id: string;
</script>

<video
  src="{API_URL}/api/files/video/{id}"
  controls
>
  <track kind="captions">
</video>
