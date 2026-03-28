import { paletteColor } from "../commons/constants.ts";

type ListTokensParams = {
  position: [number, number];
};

const ICON = "◈";

export function LimitTokens(params: ListTokensParams) {
  const { position } = params;

  return [
    text(ICON, { size: 32, styles: {} }),
    pos(...position),
    paletteColor("cyan"),
    area(),
  ];
}
