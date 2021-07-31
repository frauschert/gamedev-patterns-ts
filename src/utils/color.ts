export type Color = {
  readonly r: number;
  readonly g: number;
  readonly b: number;
  readonly a: number;
};

export function isValidChannel(v: number, isAlpha = false): boolean {
  const max = isAlpha ? 1 : 255;
  if (v < 0 || v > max) {
    return false;
  }
  if (!isAlpha && v % 1 !== 0) {
    return false;
  }

  return true;
}

export function createColor(r: number, g: number, b: number, a: number): Color {
  if (!isValidChannel(r)) {
    throw new Error("Provided incorrect value for Red channel");
  }

  if (!isValidChannel(g)) {
    throw new Error("Provided incorrect value for Green channel");
  }

  if (!isValidChannel(b)) {
    throw new Error("Provided incorrect value for Blue channel");
  }

  if (!isValidChannel(a, true)) {
    throw new Error("Provided incorrect value for Alpha channel");
  }

  return {
    r,
    g,
    b,
    a,
  };
}

export function colorToString(color: Color): string {
  const { r, g, b, a } = color;
  return `rgba(${r},${g},${b},${a})`;
}
