<script lang="ts">
  import type { User } from 'api/models';
  import { logout } from '@Playground/api';
  import FloatingDialog from 'components/FloatingDialog.svelte';
  import Button from 'components/Button.svelte';

  export let user: User;
  let profileDialogOpen = false;
</script>

<section class="ProfileSettings">
  <button on:click={() => profileDialogOpen = !profileDialogOpen}>
    <img
      class="ProfileSettings__picture"
      referrerPolicy="no-referrer"
      src="{user.picture}"
      alt="User"
    />
  </button>
  <FloatingDialog padding="0" bind:open={profileDialogOpen}>
    <section class="ProfileSettings__content">
      <h4 class="ProfileSettings__name">{user.name}</h4>
      <Button icon="door-out" on:click={logout}>
        Log out
      </Button>
    </section>
  </FloatingDialog>
</section>

<style lang="scss">
  @use 'style/color';
  @use 'style/misc';

  .ProfileSettings {
    &__name {
      color: color.shade(--color-primary, 600);
      font-size: var(--p-md-300);
    }

    &, button {
      position: relative;
      display: flex;
      max-height: 100%;
      aspect-ratio: 1 / 1;
    }

    &__picture {
      border-radius: 50%;
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-nm-100);
      max-height: clamp(misc.rem(240), 40vh, misc.rem(400));
      min-width: clamp(misc.rem(200), 5vw, misc.rem(300));
      margin: var(--spacing-sm-50);
      & > * {
        padding: var(--spacing-sm-50);
      }
      border: 1px solid var(--color-secondary-400);
      border-radius: var(--radius-nm-100);
      background: var(--color-secondary-300);
      --button-background: #{color.shade(--color-primary, 600)};
      --button-color: var(--color-primary-200);
      --button-radius: 0 0 var(--radius-nm-100) var(--radius-nm-100)
    }
  }
</style>
