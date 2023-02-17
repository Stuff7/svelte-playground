<script context="module" lang="ts">
  import socketEvents, { type Realtime } from 'api/realtime';
  import type { User } from 'api/models';
  import serverStore from 'store/server';

  export interface DefaultSlotProps {
    user: User,
    realtime: Realtime,
  }

  let accessToken: Option<string> = null;
  export let realtime: Option<Realtime>;
  serverStore.subscribe(store => {
    if (store.accessToken !== accessToken) {
      accessToken = store.accessToken;
      realtime?.close();
      if (accessToken) {
        socketEvents(accessToken).then(rt => realtime = rt);
      } else {
        realtime = null;
      }
    }
  });

  window.addEventListener('beforeunload', () => {
    realtime?.close();
  });
</script>
<script lang="ts">
  import accountStore from 'store/account';
  import Icon from 'components/Icon.svelte';
  import SleepingServerBoundary from 'components/SleepingServerBoundary.svelte';
  import Login from 'components/Login.svelte';

  interface $$Slots {
    default: DefaultSlotProps,
  }

  export let iconSize: Option<string> = 'var(--p-md-300)';
</script>

<SleepingServerBoundary {iconSize}>
  {#if $accountStore.user && realtime}
    {#await realtime}
      <Icon name="hdd" margin="auto" size={iconSize} spinning />
    {:then realtime}
      <slot user={$accountStore.user} {realtime} />
    {/await}
  {:else}
    <Login size="var(--area-sm-50)" />
  {/if}
</SleepingServerBoundary>
