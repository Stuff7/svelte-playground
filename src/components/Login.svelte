<script lang="ts">
  import { API_URL } from '@Playground/config';
  import tooltip from 'actions/tooltip';
  import Icon from 'components/Icon.svelte';

  export let style: Option<string> = null;
  export let size: Option<string> = null;
</script>

<article {style} style:--login-size={size}>
  <h3>Press the <strong>G</strong></h3>
  <section>
    <a
      role="button"
      href="{API_URL}/auth/google/login"
      data-tooltip="To login with google"
      use:tooltip
    >
      <Icon name="google"/>
    </a>
  </section>
</article>

<style lang="scss">
  @use 'style/color';

  article {
    $font-size: var(--login-size, clamp(1.35rem, 2vw, 1.5rem));
    $spacing: var(--spacing-sm-100);
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: $spacing;
    --icon-accent: var(--color-primary-100-contrast);

    &, h3 {
      font-size: $font-size;
    }

    strong {
      color: var(--color-primary-100-contrast)
    }

    section {
      display: flex;
      justify-content: center;
      gap: $spacing;
    }

    [role=button] {
      display: flex;
      align-items: center;
      gap: $spacing;
      border-radius: 50%;
      overflow: hidden;
      border-color: var(--color-primary-100-contrast);
      aspect-ratio: 1 / 1;
      --icon-accent: var(--color-primary-contrast);
      --icon-size: calc(#{$font-size} * 5);
      &:hover {
        --icon-accent: var(--color-primary);
      }
    }
  }
</style>
