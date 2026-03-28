
// ew ew ew

export function getAssetBasePath(): string {
  if (window.location.hostname === "limitless.rgrannell.xyz") {
    return "/dist/assets/";
  }

  return "/assets/";
}

export function getAssetPath(filename: string): string {
  return getAssetBasePath() + filename;
}
