export function createCurrencyFormatter(
  locales?: string | string[],
  currency = 'USD',
  options: Intl.NumberFormatOptions = {},
) {
  return (new Intl.NumberFormat(locales, {
    ...options,
    style: 'currency',
    currency,
  })).format;
}

export function capitalize<T extends string>(text: T) {
  return `${text.charAt(0).toUpperCase()}${text.slice(1)}` as Capitalize<T>;
}

export function kebabCase(text: string) {
  return text.split(/_|\s|(?=[A-Z])/).join('-').toLowerCase();
}

export function stringify<T>(value: T) {
  return typeof value === 'object' ?
    JSON.stringify(value) :
    `${value}`;
}

export function clampNumber(n: number, max: number): `${number}+` | number {
  if (n >= max) {
    return `${max}+`;
  }
  return n;
}
