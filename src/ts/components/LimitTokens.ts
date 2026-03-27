
type ListTokensParams = {
  position: [number, number];
};

const ICON = "◈";

export function LimitTokens(params: ListTokensParams) {
  const { position } = params;

  return [
    text(ICON, { size: 32, styles: {} }),
    pos(...position),
    color(66, 255, 233),
    area(),
  ];
}
