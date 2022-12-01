export function genCssVars(vars: Record<string, unknown>) {
  return Object.entries(vars).reduce((css, [key, val]) => (
    css + `--${key}:${val};`
  ), '');
}

export function checkIfSafari() {
  return !!(
    navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
    navigator.userAgent.match(/AppleWebKit/)
  );
}
