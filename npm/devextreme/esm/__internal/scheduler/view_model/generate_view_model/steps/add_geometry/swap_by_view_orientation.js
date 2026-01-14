/**
* DevExtreme (esm/__internal/scheduler/view_model/generate_view_model/steps/add_geometry/swap_by_view_orientation.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
