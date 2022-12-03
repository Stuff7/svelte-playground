<script lang="ts">
  import DebugObject from 'components/DebugObject.svelte';
  import drag from 'actions/drag';

  export let value = '';

  let inputElem: HTMLInputElement;
  let isSelecting = false;
  let selection: [number, number] = [0, 0];
  let selectionDirection: HTMLInputElement['selectionDirection'] = 'none';
  let parts = ['', '', ''];
  let lastInput = '';

  function updateCaretPosition() {
    const { selectionEnd, selectionStart } = inputElem;
    if (selectionStart !== null && selectionEnd !== null) {
      const [start, end] = selection = [selectionStart, selectionEnd];
      parts = [
        value.slice(0, start - lastInput.length),
        parts[1],
        value.slice(start, end),
        value.slice(end, value.length),
      ];
      selectionDirection = inputElem.selectionDirection;
    }
  }

  function takeInput(e: Event) {
    if (e instanceof InputEvent && e.data) {
      lastInput = e.data;
      const [start] = selection;
      parts = [
        value.slice(0, start - lastInput.length),
        lastInput,
        parts[2],
        parts[3],
      ];
    }
    updateCaretPosition();
  }

  function clearLastInput() {
    lastInput = '';
    const [start] = selection;
    parts = [
      value.slice(0, start),
      '',
      parts[2],
      parts[3],
    ];
  }

  function startSelecting() {
    isSelecting = true;
    updateCaretPosition();
  }

  function endSelecting() {
    isSelecting = false;
    updateCaretPosition();
  }

  $: caretPosition = selection[0];
  $: hasSelection = selection[0] !== selection[1];
</script>

<label class="AnimatedInput">
  🇺🇸🇬🇧🇪🇸🇲🇽🇵🇹🇧🇷🇫🇷🇩🇪🇯🇵🇨🇳🇰🇷🇮🇳
  <input
    class="AnimatedInput__input"
    bind:this={inputElem}
    bind:value
    on:dragstart={startSelecting}
    on:drag={isSelecting ? updateCaretPosition : undefined}
    on:dragend={endSelecting}
    on:input={takeInput}
    on:keydown={updateCaretPosition}
    on:keyup={updateCaretPosition}
    use:drag
  />
  <p class="AnimatedInput__input-value">
    {#each parts as part, i}
      <span
        class:new-input={i === 1 && !!lastInput}
        class:selected={i === 2 && hasSelection}
        on:animationend={clearLastInput}
      >{part}</span>
    {/each}
  </p>
  <DebugObject
    data={{
      selection,
      selectionDirection,
      caretPosition,
      hasSelection,
      isSelecting,
      parts,
      lastInput,
    }}
  />
</label>

<style lang="scss">
  @use 'style/text';
  @use 'style/misc';
  @use 'style/color';
  @use 'style/animation';

  .AnimatedInput {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm-50);
    position: relative;
    font-size: var(--p-md-300);

    &__input-value {
      display: flex;
      white-space: pre;

      & .new-input {
        @include animation.fadeIn;
      }

      & :nth-child(3) {
        margin-inline: -1px;
        border-inline: 1px solid var(--color-surface1-contrast);

        &.selected {
          background: color.alpha(--color-accent, 0.5);
        }

        &:not(.selected) {
          @include animation.blink;
          max-width: 0;
        }
      }
    }

    &__input {
      &:not(:focus) + p :nth-child(3) {
        background: transparent;
        animation: none;
        max-width: none;
        border: 0;
        margin-inline: 0;
      }
    }
  }
</style>
