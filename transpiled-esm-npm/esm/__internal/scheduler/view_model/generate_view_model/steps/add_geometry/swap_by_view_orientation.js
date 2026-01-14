export function getAbstractSizeByViewOrientation(size, viewOrientation) {
  const abstractSize = {
    sizeY: viewOrientation === 'horizontal' ? size.height : size.width,
    sizeX: viewOrientation === 'horizontal' ? size.width : size.height
  };
  if (!('top' in size && 'left' in size)) {
    return abstractSize;
  }
  return Object.assign({}, abstractSize, {
    offsetY: viewOrientation === 'horizontal' ? size.top : size.left,
    offsetX: viewOrientation === 'horizontal' ? size.left : size.top
  });
}
export function getRealSizeByViewOrientation(size, viewOrientation) {
  const realSize = {
    height: viewOrientation === 'horizontal' ? size.sizeY : size.sizeX,
    width: viewOrientation === 'horizontal' ? size.sizeX : size.sizeY
  };
  if (!('offsetY' in size && 'offsetX' in size)) {
    return realSize;
  }
  return Object.assign({}, realSize, {
    top: viewOrientation === 'horizontal' ? size.offsetY : size.offsetX,
    left: viewOrientation === 'horizontal' ? size.offsetX : size.offsetY
  });
}