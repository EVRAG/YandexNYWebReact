export function pxToVw(px: number, baseWidth = 2154) {
  return (px / baseWidth) * 100 + 'vw';
}
