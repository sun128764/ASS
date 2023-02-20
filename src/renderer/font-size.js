export const $fixFontSize = document.createElement("div");
$fixFontSize.className = "ASS-fix-font-size";
$fixFontSize.textContent = "M";

const cache = Object.create(null);

export function getRealFontSize(fn, fs) {
  const key = `${fn}-${fs}`;
  if (!cache[key]) {
    $fixFontSize.style.cssText = `line-height:normal;font-size:${fs}px;font-family:"${fn}",Arial;`;
    let scale = 1;
    switch (fn) {
      case "Noto Sans":
        scale = 0.77;
        break;
      default:
        scale = 1;
        break;
    }
    cache[key] = ((fs * fs) / $fixFontSize.clientHeight) * scale;
  }
  return cache[key];
}
