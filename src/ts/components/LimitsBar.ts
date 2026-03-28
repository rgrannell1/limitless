import {
  DEFAULT_LIMITS,
  LIMIT_TEXT_SIZE,
  LIMIT_TEXT_X,
  LIMIT_TEXT_Y,
  paletteColor,
} from "../commons/constants";

export function renderLimitBarText(limitsBar: any) {
  const value = limitsBar.value || 0;
  return "◈".repeat(value).padEnd(6, " ");
}

export function LimitsBar() {
  return [
    text(renderLimitBarText({ value: DEFAULT_LIMITS }), {
      size: LIMIT_TEXT_SIZE,
    }),
    pos(LIMIT_TEXT_X, LIMIT_TEXT_Y),
    paletteColor("cyan"),
    { value: 3 },
  ];
}
