<script lang="ts">
  import { API_URL } from '@Playground/config';
  import accountStore from 'store/account';
  import IconButton from 'components/IconButton.svelte';
  import ProfileSettings from 'components/ProfileSettings.svelte';
  import Icon from 'components/Icon.svelte';
  import FloatingDialog from 'components/FloatingDialog.svelte';
  import SleepingServerBoundary from 'components/SleepingServerBoundary.svelte';

  let loginModalOpen = false;
</script>

<SleepingServerBoundary>
  {#if $accountStore.user}
    <ProfileSettings user={$accountStore.user} />
  {:else}
    <section class="LoginButton">
      <IconButton
        name="user"
        on:click={() => loginModalOpen = !loginModalOpen}
        padding="0"
        size="clamp(1.35rem, 2vw, 1.5rem)"
      />
      <FloatingDialog bind:open={loginModalOpen}>
        <a
          class="LoginButton__provider"
          role="button"
          href="{API_URL}/auth/google/login"
        >
          <span class="LoginButton__provider__icon">
            <Icon name="google"/>
          </span>
          <span>Login with google</span>
        </a>
      </FloatingDialog>
    </section>
  {/if}
</SleepingServerBoundary>

<style lang="scss">
  @use 'style/color';

  .LoginButton {
    position: relative;
    --icon-accent: #{color.shade(--color-primary, 600)};

    &__provider {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm-100);
      --icon-accent: #{color.shade(--color-primary, 400)};
      &:hover {
        --icon-accent: #{color.shade(--color-primary, 600)};
      }
    }
  }
</style>
