<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { hslString, type HSL } from 'utils/color';
  import AnimatedInput from 'components/AnimatedInput.svelte';
  import ColorPicker from 'components/ColorPicker.svelte';
  import ColorWheel from 'components/ColorWheel.svelte';
  import Icon from 'components/Icon.svelte';
  import Tooltip from 'components/Tooltip.svelte';
  import DebugObject from 'components/DebugObject.svelte';
  import Button from 'components/Button.svelte';

  let hotPlaygroundElement: HTMLElement;
  let color1: HSL = [310, 100, 74];
  let color2: HSL = [127, 100, 50];
  $: hsl1 = hslString(color1);
  $: hsl2 = hslString(color2);
  let output = [] as string[];
  let handleEvent: Option<() => void>;
  let debugObjectOpen = false;

  function log(msg: string) {
    output = [...output, msg];
  }

  function clearOutput() {
    output = [];
  }

  function throwError() {
    throw new Error('Test Error');
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

  const icons = ['sun', 'fire', 'user-plus', 'knob', 'brush'] as const;
</script>

<section class="HotPlayground" bind:this={hotPlaygroundElement}>
  {#each icons as iconName, i (i)}
    <Button
      icon={iconName}
      on:click={() => console.log(iconName)}
    >
      Option {i}
    </Button>
  {/each}
  <Button on:click={clearOutput}>Clear</Button>
  <div class="HotPlayground__output" on:dblclick={() => log('Hey')}>
    {#each output as msg}
      <span>{msg}</span>
    {/each}
  </div>
  <AnimatedInput />
  <div class="HotPlayground__hot-stuff">
    <ColorWheel bind:hslColor={color1} />
    <ColorPicker bind:hslColor={color2} />
  </div>
  <Button tooltip="tooltip-button yeah!">
    Simple Tooltip
  </Button >
  <Tooltip
    for="custom-tooltip"
    style="display: flex;--icon-accent: {hsl1};--icon-accent-3: {hsl2};--icon-size: min(10vw, 5rem);"
  >
    <Icon name="brush" />
    <Icon name="display" />
    <Icon name="trash" />
    <Icon name="moon" />
    <Icon name="fire" />
  </Tooltip>
  <Button
    tooltipId="custom-tooltip"
    tooltipStatic
    tooltipPosition="bottom"
  >
    Custom Static Tooltip
  </Button>
  <Button on:click={() => debugObjectOpen = !debugObjectOpen}>
    Debug object
  </Button>
  <Button
    background="var(--color-error)"
    color="var(--color-error-contrast)"
    on:click={throwError}
  >
    Trigger Error
  </Button>
  <DebugObject bind:open={debugObjectOpen} data={{ color1, color2, hsl1, hsl2, output }} />
</section>

<style lang="scss">
  @use 'style/color';
  @use 'style/misc';

  .HotPlayground {
    display: flex;
    flex-direction: column;
    padding: var(--spacing-sm-100) var(--spacing-nm-100);
    max-height: 100%;
    gap: var(--spacing-sm-100);
    --button-content-align: left;

    &__hot-stuff {
      display: flex;
      gap: var(--spacing-nm-100);
    }
    &__output {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      gap: var(--spacing-nm-100);
      padding: var(--spacing-nm-100);
      white-space: pre;
      overflow: hidden auto;
    }
  }
</style>
