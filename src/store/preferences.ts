import { contrast, hslToRgb, rgbToHsl, type HSL } from 'utils/color';
import { createLocalStore } from 'utils/local-storage';
import { toFixed } from 'utils/math';

export const PREFERENCES_STORE_KEY = 'Preferences';

export type ThemeKey = 'light' | 'dark';

export interface PreferencesStore {
  colorPrimary: HSL;
  colorSecondary: HSL;
  colorTertiary: HSL;
  theme: ThemeKey;
}

export const initialState: PreferencesStore = {
  colorPrimary: [42, 84, 52],
  colorSecondary: [201, 97, 70],
  colorTertiary: [154, 55, 50],
  theme: 'dark',
};

export const [
  preferences,
  initPreferencesStore,
] = createLocalStore(PREFERENCES_STORE_KEY, initialState);

const prevColors: HSL[] = [];
preferences.subscribe(store => {
  const { colorPrimary, colorSecondary, colorTertiary, theme } = store;
  document.documentElement.dataset.theme = theme;

  const colors = [colorPrimary, colorSecondary, colorTertiary];
  ['primary', 'secondary', 'tertiary'].forEach((colorName, iColor) => {
    const currColor = colors[iColor];
    const prevColor = prevColors[iColor];
    if (!prevColor?.every((c, i) => c === currColor[i])) {
      createColorVars(colorName, currColor);
      prevColors[iColor] = [...currColor] as HSL;
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  createColorVars('error', [0, 59, 49]);
});

function createColorVars(name: string, color: HSL) {
  const rgbColor = hslToRgb(color);
  const colorContrast = contrast(rgbColor, rgbColor, { strength: 0.85, minDifference: 0.5 });
  const onBlack = contrast(hslToRgb([color[0], 10, 5]), rgbColor);
  const onWhite = contrast(hslToRgb([color[0], 10, 97]), rgbColor);

  createHslColorVariable(name, color);
  createHslColorVariable(`${name}-contrast`, rgbToHsl(colorContrast));
  createHslColorVariable(`${name}-on-black`, rgbToHsl(onBlack));
  createHslColorVariable(`${name}-on-white`, rgbToHsl(onWhite));
}

function createHslColorVariable(name: string, [h, s, l]: HSL) {
  const { style } = document.documentElement;
  const varName = `--color-${name}`;
  style.setProperty(`${varName}-h`, `${toFixed(h)}deg`);
  style.setProperty(`${varName}-s`, `${toFixed(s)}%`);
  style.setProperty(`${varName}-l`, `${toFixed(l)}%`);
  style.setProperty(varName, `hsl(var(${varName}-h), var(${varName}-s), var(${varName}-l))`);
}

export default preferences;
