export type ColorMode = 'monochrome' | 'monochrome-dark' | 'monochrome-light' | 'analogic' | 'complement' | 'analogic-complement' | 'triad' | 'quad';

export type XYZColor = {
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
};

export type CMYKColor = {
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
  }
};

export type ColorName = {
  closest_named_hex: string
  distance: number,
  exact_match_name: boolean,
  value: string,
}

export type ColorImage = {
  bare: string,
  name: string
}

export interface IColor {
  XYZ: XYZColor,
  cmyk: CMYKColor,
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
  image: ColorImage,
  name: ColorName
}

export interface IColorPalette {
  colors: IColor[],
  count: number,
  image: ColorImage,
  mode: ColorMode,
  seed: IColor
};