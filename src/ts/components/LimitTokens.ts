type ListTokensParams = {
  position: [number, number];
};

export function LimitTokens(params: ListTokensParams) {
  const { position } = params;

  return [
    text("◈", { size: 32, styles: {} }),
    pos(...position),
    area(),
  ];
}
