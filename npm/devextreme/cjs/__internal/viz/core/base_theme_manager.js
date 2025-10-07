/**
* DevExtreme (cjs/__internal/viz/core/base_theme_manager.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseThemeManager = void 0;
var _class = _interopRequireDefault(require("../../../core/class"));
var _extend2 = require("../../../core/utils/extend");
var _iterator = require("../../../core/utils/iterator");
var _type = require("../../../core/utils/type");
var _palette = require("../palette");
var _themes = require("../themes");
var _utils = require("./utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-multi-assign */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-expressions */

const _getTheme = _themes.getTheme;
const _addCacheItem = _themes.addCacheItem;
const _removeCacheItem = _themes.removeCacheItem;
const _extend = _extend2.extend;
const _each = _iterator.each;
function getThemePart(theme, path) {
  let _theme = theme;
  path && _each(path.split('.'), (_, pathItem) => _theme = _theme[pathItem]);
  return _theme;
}
const BaseThemeManager = exports.BaseThemeManager = _class.default.inherit({
  ctor(options) {
    this._themeSection = options.themeSection;
    this._fontFields = options.fontFields || [];
    _addCacheItem(this);
  },
  dispose() {
    const that = this;
    _removeCacheItem(that);
    that._callback = that._theme = that._font = null;
    return that;
  },
  // TODO: Move it to constructor when charts theme managers's constructor is removed
  setCallback(callback) {
    this._callback = callback;
    return this;
  },
  setTheme(theme, rtl) {
    this._current = theme;
    this._rtl = rtl;
    return this.refresh();
  },
  // Officially we do not support objects as "theme" option value - we should stop doing it in code
  refresh() {
    const that = this;
    const current = that._current || {};
    let theme = _getTheme(current.name || current);
    that._themeName = theme.name;
    that._defaultPalette = theme.defaultPalette;
    that._font = _extend({}, theme.font, current.font);
    that._themeSection && _each(that._themeSection.split('.'), (_, path) => {
      theme = _extend(true, {}, theme[path]);
    });
    that._theme = _extend(true, {}, theme, (0, _type.isString)(current) ? {} : current);
    that._initializeTheme();
    if ((0, _utils.parseScalar)(that._rtl, that._theme.rtlEnabled)) {
      _extend(true, that._theme, that._theme._rtl);
    }
    that._callback();
    return that;
  },
  theme(path) {
    return getThemePart(this._theme, path);
  },
  themeName() {
    return this._themeName;
  },
  // TODO: May be we need some single method for all palettes?
  createPalette(palette, options) {
    return (0, _palette.createPalette)(palette, options, this._defaultPalette);
  },
  createDiscretePalette(palette, count) {
    return (0, _palette.getDiscretePalette)(palette, count, this._defaultPalette);
  },
  createGradientPalette(palette) {
    return (0, _palette.getGradientPalette)(palette, this._defaultPalette);
  },
  getAccentColor(palette) {
    return (0, _palette.getAccentColor)(palette, this._defaultPalette);
  },
  _initializeTheme() {
    const that = this;
    _each(that._fontFields || [], (_, path) => {
      that._initializeFont(getThemePart(that._theme, path));
    });
  },
  _initializeFont(font) {
    _extend(font, this._font, _extend({}, font));
  }
});
