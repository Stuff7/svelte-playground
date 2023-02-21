<script lang="ts">
  import serverStore, { setAwake } from 'store/server';
  import tooltip from 'actions/tooltip';
  import Icon from 'components/Icon.svelte';
  import Tooltip from 'components/Tooltip.svelte';
  import { pingServer } from 'api';

  export let iconSize: Option<string> = 'var(--p-md-300)';

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
    data-tooltip-id={tooltipID}
    style:--icon-size={iconSize}
    on:click={() => {
      loading = true;
      pingResult = pingServer();
    }}
    use:tooltip
  >
    <Icon name={loading ? 'loading' : 'server-zz'} spinning={loading} />
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

  button {
    --icon-accent: var(--color-primary-100-contrast);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    background: transparent;
    border: 0;
    color: var(--color-secondary-100-contrast);
  }
  strong {
    color: var(--color-tertiary-100-contrast);
  }
</style>
