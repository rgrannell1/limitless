import { DEFAULT_LIMITS, LIMIT_TEXT_SIZE } from "../constants";

export function renderLimitBarText(limitsBar: any) {
  const value = limitsBar.value || 0;
  return "◈ ".repeat(value).padEnd(6, " ");
}

export function LimitsBar() {
  return [
    text(renderLimitBarText({ value: DEFAULT_LIMITS }), {
      size: LIMIT_TEXT_SIZE,
    }),
    pos(50, 25),
    { value: 3 },
  ];
}
