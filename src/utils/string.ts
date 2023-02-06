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

export function snakeCase(text: string): string {
  return text.split(/-|\s|(?=[A-Z])/).join('_').toLowerCase();
}

export function stringify<T>(value: T) {
  if (value === null) {
    return null;
  }
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

export function formatTime(seconds: number) {
  const hrs = ~~(seconds / 3600);
  const mins = ~~((seconds % 3600) / 60);
  const secs = ~~seconds % 60;

  const timestamp = [];
  if (hrs) {
    timestamp.push(hrs.toString().padStart(2, '0'));
  }
  return [
    ...timestamp,
    mins.toString().padStart(2, '0'),
    secs.toString().padStart(2, '0'),
  ].join(':');
}
