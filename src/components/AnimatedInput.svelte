<script lang="ts">
  import DebugObject from './DebugObject.svelte';

  export let value = '';

  let rangeToDel: [number, number] = [0, 0];
  let inputElem: HTMLInputElement;
  let isSelecting = false;
  let selection: [number, number] = [0, 0];
  let selectionDirection: HTMLInputElement['selectionDirection'] = 'none';

  function updateCaretPosition() {
    const { selectionEnd, selectionStart } = inputElem;
    if (selectionStart !== null && selectionEnd !== null) {
      selection = [selectionStart, selectionEnd];
      selectionDirection = inputElem.selectionDirection;
    }
  }

  function handleMouseDown() {
    isSelecting = true;
    updateCaretPosition();
  }

  function handleMouseUp() {
    isSelecting = false;
    updateCaretPosition();
  }

  function handleInput(e: KeyboardEvent) {
    const charString = e.key;
    if (charString === 'Enter') {
      return;
    }

    const selectionEnd = inputElem.selectionEnd || 0;
    const selectionStart = inputElem.selectionStart || 0;

    let appendIndex = selectionEnd;
    rangeToDel = [selectionStart, selectionEnd];
  
    if((selectionEnd - selectionStart) > 0 && e.key && !(e.metaKey || e.ctrlKey)) {
      appendIndex = selectionStart;

      // Rem chars
    }

    if( e.key && !(e.metaKey || e.ctrlKey) ) {
      // Add chars
    }
  }

  $: caretPosition = selection[0];
  $: hasSelection = selection[0] !== selection[1];
  $: chars = value.split(/(?!$)/u);
</script>

<label class="AnimatedInput">
  <input
    class="AnimatedInput__input"
    bind:this={inputElem}
    bind:value
    on:blur={updateCaretPosition}
    on:click={updateCaretPosition}
    on:focus={updateCaretPosition}
    on:mousedown={handleMouseDown}
    on:mousemove={isSelecting ? updateCaretPosition : undefined}
    on:mouseup={handleMouseUp}
    on:keydown={updateCaretPosition}
    on:keyup={updateCaretPosition}
    on:keypress={handleInput}
  />
  <DebugObject data={{ selection, selectionDirection, caretPosition, hasSelection, chars }} />
  <div class="AnimatedInput__input-value">
    
  </div>
</label>

<style lang="scss">
  @use 'style/text';
  @use 'style/misc';

  .AnimatedInput {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm-50);
  }
</style>
