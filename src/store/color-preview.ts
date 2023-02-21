import { writable } from 'svelte/store';

export interface ColorPreviewStore {
  minimumLikeness: number;
  percentage: number;
}

export const initialState: ColorPreviewStore = {
  minimumLikeness: 0.25,
  percentage: 0.6,
};

const colorPreview = writable(initialState);

export default colorPreview;
