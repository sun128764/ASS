export const $fixFontSize = document.createElement("div");
$fixFontSize.className = "ASS-fix-font-size";
$fixFontSize.textContent = "M";

const cache = Object.create(null);

export function getRealFontSize(fn, fs) {
  const key = `${fn}-${fs}`;
  if (!cache[key]) {
    $fixFontSize.style.cssText = `line-height:normal;font-size:${fs}px;font-family:"${fn}",Arial;`;
    /*
    In other platform, the font size is calculated based on ascender+descender. But in the browser, JavaScript can only read the unitsPerEm of the font.
    As a result, the font size in ass.js cannot be exactly as same as other ass renders, such as libass or xy-VSFilter.
    An easy way to fix it is calculating the relative scale of EACH FONT. 
    You can use https://github.com/yusyabu/otfcc to dump an OpenType font file into JSON and get the ascender+descender from hhea table and unitsPerEm from head table.
    The relative scale will be ascender+descender/unitsPerEm.
    */
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
