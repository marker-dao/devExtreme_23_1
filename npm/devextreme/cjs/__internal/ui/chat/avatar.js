/**
* DevExtreme (cjs/__internal/ui/chat/avatar.js)
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
exports.default = void 0;
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _type = require("../../../core/utils/type");
var _widget = _interopRequireDefault(require("../../core/widget/widget"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const AVATAR_CLASS = 'dx-avatar';
const AVATAR_INITIALS_CLASS = 'dx-avatar-initials';
const AVATAR_IMAGE_CLASS = 'dx-avatar-image';
class Avatar extends _widget.default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      name: 'Unknown User',
      url: '',
      alt: ''
    });
  }
  _initMarkup() {
    (0, _renderer.default)(this.element()).addClass(AVATAR_CLASS);
    super._initMarkup();
    this._renderAvatarContent();
  }
  _renderAvatarContent() {
    var _this$_$content;
    (_this$_$content = this._$content) === null || _this$_$content === void 0 || _this$_$content.remove();
    if (this._isValuableUrl()) {
      this._renderImage();
      return;
    }
    this._renderInitials();
  }
  _renderImage() {
    this._renderImageElement();
    this._updateUrl();
    this._updateAlt();
  }
  _renderInitials() {
    this._renderInitialsElement();
    this._updateInitials();
  }
  _renderImageElement() {
    this._$content = (0, _renderer.default)('<img>').addClass(AVATAR_IMAGE_CLASS).appendTo(this.element());
  }
  _renderInitialsElement() {
    this._$content = (0, _renderer.default)('<div>').addClass(AVATAR_INITIALS_CLASS).appendTo(this.element());
  }
  _updateInitials() {
    var _this$_$content2;
    const {
      name
    } = this.option();
    (_this$_$content2 = this._$content) === null || _this$_$content2 === void 0 || _this$_$content2.text(this._getInitials(name));
  }
  _updateUrl() {
    var _this$_$content3;
    const {
      url
    } = this.option();
    (_this$_$content3 = this._$content) === null || _this$_$content3 === void 0 || _this$_$content3.attr('src', url ?? '');
  }
  _updateAlt() {
    var _this$_$content4;
    const {
      alt,
      name
    } = this.option();
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const altText = alt || name || _message.default.format('dxAvatar-defaultImageAlt');
    (_this$_$content4 = this._$content) === null || _this$_$content4 === void 0 || _this$_$content4.attr('alt', altText);
  }
  _isValuableUrl() {
    var _url$trim;
    const {
      url
    } = this.option();
    const result = !!(url !== null && url !== void 0 && (_url$trim = url.trim) !== null && _url$trim !== void 0 && _url$trim.call(url));
    return result;
  }
  _getInitials(name) {
    if ((0, _type.isDefined)(name)) {
      const splitValue = String(name).trim().split(/\s+/);
      const firstInitial = this._getFirstChar(splitValue[0]);
      const secondInitial = this._getFirstChar(splitValue[1]);
      const result = `${firstInitial}${secondInitial}`;
      return result;
    }
    return '';
  }
  _getFirstChar(value) {
    return (value === null || value === void 0 ? void 0 : value.charAt(0).toUpperCase()) ?? '';
  }
  _optionChanged(args) {
    const {
      name
    } = args;
    switch (name) {
      case 'alt':
      case 'name':
      case 'url':
        this._renderAvatarContent();
        break;
      default:
        super._optionChanged(args);
    }
  }
}
var _default = exports.default = Avatar;
