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
