"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tabbable = exports.focused = exports.focusable = exports.default = void 0;
var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const focusableFn = (element, tabIndex) => {
  if (!visible(element)) {
    return false;
  }
  const nodeName = element.nodeName.toLowerCase();
  const isTabIndexNotNaN = !isNaN(tabIndex);
  const isDisabled = element.disabled;
  const isDefaultFocus = /^(input|select|textarea|button|object|iframe)$/.test(nodeName);
  const isHyperlink = nodeName === 'a';
  let isFocusable;
  const {
    isContentEditable
  } = element;
  if (isDefaultFocus || isContentEditable) {
    isFocusable = !isDisabled;
  } else if (isHyperlink) {
    isFocusable = element.href || isTabIndexNotNaN;
  } else {
    isFocusable = isTabIndexNotNaN;
  }
  return isFocusable;
};
function visible(element) {
  const $element = (0, _renderer.default)(element);
  return $element.is(':visible') && $element.css('visibility') !== 'hidden' && $element.parents().css('visibility') !== 'hidden';
}
const focusable = (index, element) => focusableFn(element, (0, _renderer.default)(element).attr('tabIndex'));
exports.focusable = focusable;
const tabbable = (index, element) => {
  const tabIndex = (0, _renderer.default)(element).attr('tabIndex');
  // @ts-expect-error
  return (isNaN(tabIndex) || tabIndex >= 0) && focusableFn(element, tabIndex);
};
// note: use this method instead of is(":focus")
exports.tabbable = tabbable;
const focused = $element => {
  const element = (0, _renderer.default)($element).get(0);
  // @ts-expect-error
  return _dom_adapter.default.getActiveElement(element) === element;
};
exports.focused = focused;
var _default = exports.default = {
  focusable,
  tabbable,
  focused
};