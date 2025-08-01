/**
* DevExtreme (cjs/__internal/core/utils/m_icon.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getImageSourceType = exports.getImageContainer = exports.ICON_CLASS = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ICON_CLASS = exports.ICON_CLASS = 'dx-icon';
const SVG_ICON_CLASS = 'dx-svg-icon';
const getImageSourceType = source => {
  if (!source || typeof source !== 'string') {
    return false;
  }
  if (/^\s*<svg[^>]*>(.|\r?\n)*?<\/svg>\s*$/i.test(source)) {
    return 'svg';
  }
  if (/data:.*base64|\.|[^<\s]\/{1,1}/.test(source)) {
    return 'image';
  }
  if (/^[\w-_]+$/.test(source)) {
    return 'dxIcon';
  }
  if (/^\s?([\w-_:]\s?)+$/.test(source)) {
    return 'fontIcon';
  }
  return false;
};
exports.getImageSourceType = getImageSourceType;
const getImageContainer = source => {
  switch (getImageSourceType(source)) {
    case 'image':
      return (0, _renderer.default)('<img>').attr('src', source).addClass(ICON_CLASS);
    case 'fontIcon':
      return (0, _renderer.default)('<i>').addClass(`${ICON_CLASS} ${source}`);
    case 'dxIcon':
      return (0, _renderer.default)('<i>').addClass(`${ICON_CLASS} ${ICON_CLASS}-${source}`);
    case 'svg':
      return (0, _renderer.default)('<i>').addClass(`${ICON_CLASS} ${SVG_ICON_CLASS}`).append(source);
    default:
      return null;
  }
};
exports.getImageContainer = getImageContainer;
