import { writable } from 'svelte/store';

export interface ColorPreviewStore {
  minimumLikeness: number;
  percentage: number;
}

export const initialState: ColorPreviewStore = {
  minimumLikeness: 0.5,
  percentage: 1,
};

const colorPreview = writable(initialState);

export default colorPreview;
