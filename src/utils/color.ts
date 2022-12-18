import { clamp, toFixed } from 'utils/math';

export type RGB = [r: number, g: number, b: number];
export type RGBString<T extends string> =
  Trim<T> extends `rgb(${infer R},${infer G},${infer B})` ?
    true extends IsNumber<R> & IsNumber<G> & IsNumber<B> ?
      `rgb(${R},${G},${B})` :
    never :
  never;

export type HSV = [h: number, s: number, v: number];
export type HSL = [h: number, s: number, l: number];
export type HSLString<T extends string, FnName extends 'hsl' | 'hsv'> =
  Trim<T> extends `${FnName}(${infer H},${infer S},${infer L})` ?
    true extends (
      IsNumber<ReplaceOrNever<H, 'deg', ''>> &
      IsNumber<ReplaceOrNever<S, '%', ''>> &
      IsNumber<ReplaceOrNever<L, '%', ''>>
    ) ?
      T :
    never :
  never;

type CSSFnName = 'rgb' | 'hsl' | 'hsv';
export type CSSFn<T extends string> =
  Trim<T> extends `${infer FnName}(${infer Rest})` ?
    FnName extends 'rgb' ?
      Rest extends `${string},${string},${string}` ?
        RGBString<`${FnName}(${Rest})`> :
      never :
    FnName extends 'hsl' | 'hsv' ?
      Rest extends `${string},${string},${string}` ?
        HSLString<`${FnName}(${Rest})`, FnName> :
      never :
    never :
  never;

export function hexToRgb(hex: string): RGB {
  const h = String(hex).replace(/^#/, '');
  if(h.length === 3) {
    return [
      parseInt(h[0] + h[0], 16),
      parseInt(h[1] + h[1], 16),
      parseInt(h[2] + h[2], 16),
    ];
  }
  if(h.length === 6) {
    return [
      parseInt(h.slice(0, 2), 16),
      parseInt(h.slice(2, 4), 16),
      parseInt(h.slice(4, 6), 16),
    ];
  }
  return [255, 255, 255];
}

export function paddedHex(n: number) {
  return n.toString(16).padStart(2, '0');
}

export function hexString(color: RGB) {
  const [r, g, b] = color;
  return `#${paddedHex(r)}${paddedHex(g)}${paddedHex(b)}`;
}

export function toCssFn(color: RGB, fnName: CSSFnName = 'rgb') {
  const [r, g, b] = color;
  const cssFn = fnName === 'rgb' ?
    `${fnName}(${toFixed(r)},${toFixed(g)},${toFixed(b)})` as const :
    `${fnName}(${toFixed(r)}deg,${toFixed(g)}%,${toFixed(b)}%)` as const;
  return cssFn as CSSFn<typeof cssFn>;
}

export function contrast(a: RGB, b = a, {
  strength = 0.9,
  minDifference = 0.7,
} = {}): RGB {
  const brightnessA = brightness(a);
  const brightnessB = brightness(b);

  if (Math.abs(brightnessA - brightnessB) > minDifference) {
    return b;
  }

  return scaleBrightness(b, brightnessA <= 0.5009 ? strength : -strength);
}

export function scaleBrightness(color: RGB, percentage: number): RGB {
  const [r, g, b] = color;
  let P: number | boolean = percentage < 0;
  const t = P ? 0 : 255 * percentage;
  P = P ? 1 + percentage : 1 - percentage;
  return [
    clamp(0, Math.round(r * P + t), 255),
    clamp(0, Math.round(g * P + t), 255),
    clamp(0, Math.round(b * P + t), 255),
  ];
}

export function brightness(color: RGB) {
  const [r, g, b] = color;
  return (r * 2126 + g * 7152 + b * 722) / 10000 / 255;
}

export function hslToRgb(color: HSL): RGB {
  let [H, S, L] = color;
  S = S / 100;
  L = L / 100;
  const C = (1 - Math.abs(2 * L - 1)) * S;
  const X = C * (1 - Math.abs((H / 60) % 2 - 1));
  const m = L - C / 2;

  const modH = H % 360;
  let dR = 0, dG = 0, dB = 0;
  if (modH >= 0 && modH < 60) {
    dR = C; dG = X; dB = 0;
  } else if (modH >= 60 && modH < 120) {
    dR = X; dG = C; dB = 0;
  } else if (modH >= 120 && modH < 180) {
    dR = 0; dG = C; dB = X;
  } else if (modH >= 180 && modH < 240) {
    dR = 0; dG = X; dB = C;
  } else if (modH >= 240 && modH < 300) {
    dR = X; dG = 0; dB = C;
  } else if (modH >= 300 && modH < 360) {
    dR = C; dG = 0; dB = X;
  }

  return [
    clamp(0, Math.round((dR + m) * 255), 255),
    clamp(0, Math.round((dG + m) * 255), 255),
    clamp(0, Math.round((dB + m) * 255), 255),
  ];
}

export function hsvToHsl(color: HSV): HSL {
  let [h, s, v] = color;
  s = s / 100;
  v = v / 100;
  const l = v - v * s / 2;
  const m = Math.min(l, 1 - l);
  return [h, (m ? (v - l) / m : 0) * 100, l * 100];
}

export function hslToHsv(color: HSL): HSV {
  let [h, s, l] = color;
  s = s / 100;
  l = l / 100;
  const v = s * Math.min(l, 1 - l) + l;
  return [h, (v ? 2 - 2 * l / v : 0) * 100, v * 100];
}

export function randomColor() {
  return `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`;
}
