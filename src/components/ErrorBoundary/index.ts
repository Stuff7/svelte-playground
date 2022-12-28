import type { ComponentType } from 'svelte';
import { writable } from 'svelte/store';
import ErrorComponent from './Error.svelte';

const GUARDED_BLOCK_FNS = ['c', 'l', 'h', 'm', 'p', 'a', 'i', 'o', 'd'];

type UnknownObject = Record<string, unknown>;

interface Component extends ComponentType {
  $$render?: (result: UnknownObject, props: UnknownObject, bindings: UnknownObject, slots: UnknownObject) => void;
}

interface Config {
  props?: {
    $$slots?: Record<string, BlockFn[]>;
  }
  target: Element | ShadowRoot;
}

type BlockFn = (...args: unknown[]) => Block;

type Block = Record<string, BlockFn>;

export function createBoundary(Component: Component) {
  if (Component.$$render) {
    const render = Component.$$render;
    Component.$$render = (result, props, bindings, slots) => {
      const error = createErrorStore();

      try {
        return render(result, { error, ...props }, bindings, slots);
      } catch (e) {
        error.set(e as Error);
        return render(result, { error, ...props }, bindings, {});
      }
    };

    return Component;
  }

  function guard(fn: BlockFn, onError: (err: Error) => unknown) {
    return function guarded(...args: unknown[]) {
      try {
        return fn(...args);
      } catch (err) {
        onError(err as Error);
      }
    };
  }

  return class ErrorBoundaryComponent extends Component {
    constructor(config: Config) {
      const error = createErrorStore();

      if (config.props?.$$slots) {
        config.props.$$slots.default = config.props.$$slots.default.map(
          (slot) => (...args: unknown[]) => {
            const guarded = guard(slot, error.set);
            const block = guarded(...args);

            if (block) {
              for (const fn of GUARDED_BLOCK_FNS) {
                if (block[fn]) {
                  block[fn] = guard(block[fn], error.set) as BlockFn;
                }
              }
            }

            return block as Block;
          },
        );
      }

      super(config);

      this.$$set?.({ error });
    }
  };
}

function createErrorStore() {
  return writable<Error>();
}

export default createBoundary(ErrorComponent);
