/**
* DevExtreme (renovation/utils/getThemeType.js)
* Version: 23.2.0
* Build date: Wed Sep 06 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _themes = require("../../ui/themes");
var getThemeType = function getThemeType() {
  var theme = (0, _themes.current)();
  return {
    isCompact: (0, _themes.isCompact)(theme),
    isMaterial: (0, _themes.isMaterial)(theme)
  };
};
var _default = getThemeType;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
