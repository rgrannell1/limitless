export function parseRgbString(rgbString: string): [number, number, number] {
  const match = rgbString.match(/\d+/g);
  if (!match) {
    throw new Error(`Invalid RGB string do better: ${rgbString}`);
  }

  const [r, g, b] = match;
  return [parseInt(r), parseInt(g), parseInt(b)];
}

export function rgbToHex(rgbString: string): string {
  const [r, g, b] = parseRgbString(rgbString);
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}
