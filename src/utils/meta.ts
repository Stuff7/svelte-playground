import { stringify } from 'utils/string';

export class UnsupportedValueError extends Error {
  constructor(value: never) {
    super(`Unsupported value: ${stringify(value)}`);
  }
}
