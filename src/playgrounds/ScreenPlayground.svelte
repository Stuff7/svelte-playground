<script lang="ts">
  import AnimatedInput from '@Playground/components/AnimatedInput.svelte';
import { onDestroy, onMount } from 'svelte';

  let output = [] as string[];
  let handleEvent: (() => void) | undefined;

  function log(msg: string) {
    output = [...output, msg];
  }

  function clearOutput() {
    output = [];
  }

  onMount(() => {
    let orientation = 0;
    if (screen.orientation) {
      handleEvent = () => {
        switch (screen.orientation.type) {
          case 'portrait-primary': orientation = 0; break;
          case 'portrait-secondary': orientation = 180; break;
          case 'landscape-primary': orientation = 90; break;
          case 'landscape-secondary': orientation = -90; break;
        }
        log(`Orientation is ${orientation}`);
      };
      screen.orientation.addEventListener('change', handleEvent);
      handleEvent();
    } else { // For iOS Safari
      handleEvent = () => {
        if (typeof window.orientation === 'number') {
          orientation = window.orientation;
        }
        log(`Orientation is ${orientation}`);
      };
      window.addEventListener('orientationchange', handleEvent);
      handleEvent();
    }
  });

  onDestroy(() => {
    if (!handleEvent) {
      return;
    }
    if (screen.orientation) {
      screen.orientation.removeEventListener('change', handleEvent);
    } else if (typeof window.orientation === 'number') {
      window.removeEventListener('orientationchange', handleEvent);
    }
  });

</script>

<section class="ScreenPlayground">
  <button class="ScreenPlayground__clear" on:click={clearOutput}>Clear</button>
  <div class="ScreenPlayground__output" on:dblclick={() => log('Hey')}>
    {#each output as msg}
      <span>{msg}</span>
    {/each}
  </div>
  <AnimatedInput />
</section>

<style lang="scss">
  @use 'style/color';
  @use 'style/misc';

  .ScreenPlayground {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    padding: var(--spacing-sm-100) var(--spacing-nm-100);
    height: 100%;

    &__output {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-nm-100);
      padding: var(--spacing-nm-100);
      white-space: pre;
    }
  }
</style>
