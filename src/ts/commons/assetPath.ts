
// ew ew ew

export function getAssetBasePath(): string {
  if (window.location.hostname === "limitless.rgrannell.xyz") {
    return "/assets/";
  }

  return "/dist/assets/";
}

export function getAssetPath(filename: string): string {
  return getAssetBasePath() + filename;
}
