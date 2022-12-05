<script lang="ts">
  import { counter } from 'utils/math';
  import drag from 'actions/drag';
  import ErrorBoundary from 'components/ErrorBoundary';

  export let value = '';

  const idGenerator = counter();

  let inputElem: HTMLInputElement;

  let insertions: [start: number, end: number, id: string][] = [];
  let establishedInsertions = 0;

  let isSelecting = false;
  let selection: [number, number] = [0, 0];
  let selectionParts = ['', '', ''];

  function insertInput(e: Event) {
    if (e instanceof InputEvent && e.data) {
      const insertion = e.isComposing ? e.data.slice(-1) : e.data;
      const id = [insertion, idGenerator.next().value].join('-');

      insertions.push([caretPosition, caretPosition + insertion.length, id]);
      insertions.sort(([aStart], [bStart]) => aStart < bStart ? -1 : 1);

      const index = insertions.findIndex(i => i[2] === id);
      if (index > -1 && index < insertions.length - 1) {
        for (let i = index + 1; i < insertions.length; i++) {
          const current = insertions[i];
          current[0] = current[0] + insertion.length;
          current[1] = current[1] + insertion.length;
        }
      }

      insertions = insertions;
    }
    updateCaretPosition();
  }

  function establishInsertion() {
    establishedInsertions = establishedInsertions + 1;
  }

  function updateCaretPosition() {
    const { selectionEnd, selectionStart } = inputElem;
    if (selectionStart !== null && selectionEnd !== null) {
      const [start, end] = selection = [selectionStart, selectionEnd];
      selectionParts = [
        value.slice(0, start),
        value.slice(start, end),
        value.slice(end, value.length),
      ];
    }
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
  $: staticText = value.slice(insertions[insertions.length - 1]?.[1] ?? 0);

  $: prependeds = insertions.map(([start], i) => {
    const prevInsertion = insertions[i - 1];
    let prevEnd = 0;
    if (prevInsertion) {
      prevEnd = prevInsertion[1];
    }
    return value.slice(prevEnd, start);
  });

  $: if (establishedInsertions === insertions.length) {
    insertions = [];
    establishedInsertions = 0;
  }
</script>

<ErrorBoundary>
  <label class="AnimatedInput">
    <div class="AnimatedInput__input-wrapper">
      <input
        class="AnimatedInput__input"
        bind:this={inputElem}
        bind:value
        on:dragstart={startSelecting}
        on:drag={isSelecting ? updateCaretPosition : undefined}
        on:dragend={endSelecting}
        on:input={insertInput}
        on:keydown={updateCaretPosition}
        on:keyup={updateCaretPosition}
        use:drag
      />
      <p class="AnimatedInput__input-value">
        <span class="AnimatedInput__selection">
          {#each selectionParts as part, i}
            <span
              class:selected={i === 1 && hasSelection}
            >{part}</span>
          {/each}
        </span>
        {#each insertions as insertion, i (insertion[2])}
          <span>{prependeds[i]}</span>
          <span
            class="AnimatedInput__insertion"
            class:selected={false}
            on:animationend={establishInsertion}
          >{value.slice(insertion[0], insertion[1])}</span>
        {/each}
        <span>{staticText}</span>
      </p>
    </div>
  </label>
</ErrorBoundary>

<style lang="scss">
  @use 'style/text';
  @use 'style/misc';
  @use 'style/media';
  @use 'style/color';
  @use 'style/animation';

  .AnimatedInput {
    $component: &;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm-50);
    position: relative;
    font-size: var(--p-md-300);

    &__input-wrapper {
      position: relative;
      padding: var(--spacing-sm-100) var(--spacing-nm-100);
      background: var(--color-surface2);
      transition: border-color 0.25s;
      outline: 0;
      border: misc.rem(1) solid var(--color-surface4);
      @include misc.border-radius;
      &:focus {
        border-color: var(--color-accent);
      }
      color: var(--color-surface1-contrast);
      z-index: 1;
      @include media.smaller-than(phone) {
        padding: var(--spacing-sm-50) var(--spacing-sm-100);
      }
    }

    &__input-value, &__selection {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      align-items: center;
      display: flex;
      white-space: pre;
      pointer-events: none;
      padding: var(--spacing-sm-100) var(--spacing-nm-100);
    }

    &__selection {
      z-index: 4;
      & :not(:nth-child(2)) {
        opacity: 0;
      }
      & :nth-child(2) {
        margin-inline: -1px;
        border-inline: 1px solid var(--color-surface1-contrast);
        height: 100%;
        color: transparent;

        &.selected {
          background: color.alpha(--color-accent, 0.5);
        }

        &:not(.selected) {
          @include animation.blink;
          max-width: 0;
        }
      }
    }

    &__insertion {
      @include animation.fadeIn;
    }

    &__input {
      font-size: var(--p-md-300);
      padding: 0;
      border: 0;
      color: transparent;
      width: 100%;
      &::selection {
        background: transparent;
      }

      &:not(:focus) + #{$component}__input-value #{$component}__selection {
        display: none;
      }
    }
  }
</style>
