import { contrast, hslToRgb, toCssFn, type HSL } from 'utils/color';
import { createLocalStore } from 'utils/local-storage';

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

preferences.subscribe(store => {
  const { colorPrimary, colorSecondary, colorTertiary, theme } = store;
  document.documentElement.dataset.theme = theme;
  const colors = [colorPrimary, colorSecondary, colorTertiary];
  const colorUnits = ['deg', '%', '%'];
  ['primary', 'secondary', 'tertiary'].forEach((color, iColor) => {
    const currColor = colors[iColor];
    ['h', 's', 'l'].forEach((value, iValue) => {
      const hslValue = `${currColor[iValue]}${colorUnits[iValue]}`;
      document.documentElement.style.setProperty(`--color-${color}-${value}`, hslValue);
    });
    const contrastValue = toCssFn(contrast(hslToRgb(currColor)));
    document.documentElement.style.setProperty(`--color-${color}-contrast`, contrastValue);
  });
});

export default preferences;
