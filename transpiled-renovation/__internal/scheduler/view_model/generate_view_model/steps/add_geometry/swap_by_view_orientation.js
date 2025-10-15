"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAbstractSizeByViewOrientation = getAbstractSizeByViewOrientation;
exports.getRealSizeByViewOrientation = getRealSizeByViewOrientation;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function getAbstractSizeByViewOrientation(size, viewOrientation) {
  const abstractSize = {
    sizeY: viewOrientation === 'horizontal' ? size.height : size.width,
    sizeX: viewOrientation === 'horizontal' ? size.width : size.height
  };
  if (!('top' in size && 'left' in size)) {
    return abstractSize;
  }
  return _extends({}, abstractSize, {
    offsetY: viewOrientation === 'horizontal' ? size.top : size.left,
    offsetX: viewOrientation === 'horizontal' ? size.left : size.top
  });
}
function getRealSizeByViewOrientation(size, viewOrientation) {
  const realSize = {
    height: viewOrientation === 'horizontal' ? size.sizeY : size.sizeX,
    width: viewOrientation === 'horizontal' ? size.sizeX : size.sizeY
  };
  if (!('offsetY' in size && 'offsetX' in size)) {
    return realSize;
  }
  return _extends({}, realSize, {
    top: viewOrientation === 'horizontal' ? size.offsetY : size.offsetX,
    left: viewOrientation === 'horizontal' ? size.offsetX : size.offsetY
  });
}