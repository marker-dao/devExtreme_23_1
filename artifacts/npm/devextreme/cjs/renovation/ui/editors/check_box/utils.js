/**
* DevExtreme (cjs/renovation/ui/editors/check_box/utils.js)
* Version: 23.2.2
* Build date: Fri Nov 10 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getDefaultFontSize = getDefaultFontSize;
exports.getDefaultIconSize = getDefaultIconSize;
exports.getFontSizeByIconSize = getFontSizeByIconSize;
var _themes = require("../../../../ui/themes");
const defaultIconSizes = [[22, 16], [18, 16]];
const defaultFontSizes = [[[12, 8], [20, 18]], [[16, 10], [16, 14]]];
function getThemeType() {
  const theme = (0, _themes.current)();
  return {
    isMaterialTheme: (0, _themes.isMaterial)(theme),
    isCompactTheme: (0, _themes.isCompact)(theme)
  };
}
function getDefaultIconSize() {
  const {
    isCompactTheme,
    isMaterialTheme
  } = getThemeType();
  return defaultIconSizes[+isMaterialTheme][+isCompactTheme];
}
function getDefaultFontSize(isChecked) {
  const {
    isCompactTheme,
    isMaterialTheme
  } = getThemeType();
  return defaultFontSizes[+isChecked][+isMaterialTheme][+isCompactTheme];
}
function getFontSizeByIconSize(iconSize, isChecked) {
  const defaultFontSize = getDefaultFontSize(isChecked);
  const defaultIconSize = getDefaultIconSize();
  const fontToIconSizeRatio = defaultFontSize / defaultIconSize;
  return Math.ceil(fontToIconSizeRatio * iconSize);
}
