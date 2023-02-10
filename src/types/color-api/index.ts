export type ColorMode = 'monochrome' | 'monochrome-dark' | 'monochrome-light' | 'analogic' | 'complement' | 'analogic-complement' | 'triad' | 'quad';

export interface IColor {
  XYZ: {
    X: number,
    Y: number,
    Z: number,
    fraction: {
      X: number,
      Y: number,
      Z: number
    },
    value: string,
  },
  cmyk: {
    c: number,
    k: number,
    m: number,
    y: number
    fraction: {
      c: number,
      k: number,
      m: number,
      y: number
    },
    value: string
  },
  contrast: {
    value: string
  },
  hex: {
    clean: string,
    value: string
  },
  hsl: {
    fraction: {
      h: number,
      s: number,
      l: number
    },
    h: number,
    s: number,
    l: number,
    value: string
  },
  hsv: {
    fraction: {
      h: number,
      s: number,
      v: number
    },
    h: number,
    s: number,
    v: number,
    value: string
  },
  rgb: {
    fraction: {
      r: number,
      g: number,
      b: number
    },
    r: number,
    g: number,
    b: number,
    value: string
  },
  image: {
    bare: string,
    name: string
  },
  name: {
    closest_named_hex: string
    distance: number,
    exact_match_name: boolean,
    value: string,
  }
}

export interface IColorPalette {
  colors: IColor[],
  count: number,
  image: {
    bare: string,
    named: string
  },
  mode: string,
  seed: IColor
};