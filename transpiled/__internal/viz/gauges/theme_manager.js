"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extend2 = require("../../../core/utils/extend");
var _base_theme_manager = require("../../viz/core/base_theme_manager");
/* eslint-disable prefer-rest-params */
/* eslint-disable prefer-spread */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable @typescript-eslint/naming-convention */

const _extend = _extend2.extend;
const ThemeManager = _base_theme_manager.BaseThemeManager.inherit({
  ctor(options) {
    this.callBase.apply(this, arguments);
    this._subTheme = options.subTheme;
  },
  _initializeTheme() {
    const that = this;
    let subTheme;
    if (that._subTheme) {
      subTheme = _extend(true, {}, that._theme[that._subTheme], that._theme);
      _extend(true, that._theme, subTheme);
    }
    that.callBase.apply(that, arguments);
  }
});
var _default = exports.default = {
  ThemeManager
};