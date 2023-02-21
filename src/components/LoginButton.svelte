<script lang="ts">
  import accountStore from 'store/account';
  import ProfileSettings from 'components/ProfileSettings.svelte';
  import Icon from 'components/Icon.svelte';
  import FloatingDialog from 'components/FloatingDialog.svelte';
  import SleepingServerBoundary from 'components/SleepingServerBoundary.svelte';
  import Login from 'components/Login.svelte';

  let loginModalOpen = false;
</script>

<SleepingServerBoundary>
  {#if $accountStore.user}
    <ProfileSettings user={$accountStore.user} />
  {:else}
    <section>
      <button on:click={() => loginModalOpen = !loginModalOpen}>
        <Icon name="user" />
      </button>
      <FloatingDialog bind:open={loginModalOpen}>
        <Login />
      </FloatingDialog>
    </section>
  {/if}
</SleepingServerBoundary>

<style lang="scss">
  @use 'style/color';

  section {
    position: relative;
    display: flex;
    align-items: center;
    --icon-accent: var(--color-primary-100-contrast);

    button {
      --icon-size: clamp(1.35rem, 2vw, 1.5rem);
    }
  }
</style>
