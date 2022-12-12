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

export function kebabCase(text: string) {
  return text.split(/_|\s|(?=[A-Z])/).join('-').toLowerCase();
}
