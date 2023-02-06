<script lang="ts">
  import serverStore, { setAwake } from 'store/server';
  import { tooltip } from 'actions/tooltip';
  import Icon from 'components/Icon.svelte';
  import Tooltip from 'components/Tooltip.svelte';
  import { pingServer } from 'api';

  const tooltipID = crypto.randomUUID();
  let pingResult = new Promise<boolean>((resolve) => resolve($serverStore.awake));
  let loading = false;

  $: pingResult.then(awake => {
    setAwake(awake);
    loading = false;
  });
</script>

{#if $serverStore.awake}
  <slot />
{:else}
  <button
    class="SleepingServerBoundary"
    class:loading
    data-tooltip-id={tooltipID}
    on:click={() => {
      loading = true;
      pingResult = pingServer();
    }}
    use:tooltip
  >
    <Icon name={loading ? 'loading' : 'server-zz'} />
  </button>
  <Tooltip for={tooltipID}>
    {#if loading}
      Pinging...
    {:else}
      <p>The server is <strong>sleeping</strong> 😴</p>
      <strong>Click</strong> to ping the server
    {/if}
  </Tooltip>
{/if}

<style lang="scss">
  @use 'style/color';
  @use 'style/animation';

  .SleepingServerBoundary {
    --icon-size: var(--p-md-300);
    --icon-accent: #{color.shade(--color-primary, 600)};
    padding: 0;
    background: transparent;
    border: 0;
    color: var(--color-secondary-900);
    &.loading {
      @include animation.rotate;
    }
  }
</style>
