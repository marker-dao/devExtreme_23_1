/**
* DevExtreme (cjs/__internal/ui/text_box/m_utils.caret.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCaret = exports.default = void 0;
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _type = require("../../../core/utils/type");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  ios,
  // @ts-expect-error Device type doesn't contain mac
  mac
} = _devices.default.real();
// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
const isFocusingOnCaretChange = ios || mac;
const getCaret = input => {
  let range = {
    start: 0,
    end: 0
  };
  try {
    range = {
      start: input.selectionStart ?? 0,
      end: input.selectionEnd ?? 0
    };
  } catch (e) {
    range = {
      start: 0,
      end: 0
    };
  }
  return range;
};
const setCaret = (input, selection) => {
  try {
    input.selectionStart = selection.start;
    input.selectionEnd = selection.end;
  } catch {/** empty */}
};
exports.setCaret = setCaret;
const caret = function (input, selection) {
  let force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  const inputElement = (0, _renderer.default)(input).get(0);
  if (!(0, _type.isDefined)(selection)) {
    return getCaret(inputElement);
  }
  // NOTE: AppleWebKit-based browsers focuses element input after caret position has changed
  if (!force && isFocusingOnCaretChange && _dom_adapter.default.getActiveElement(inputElement) !== inputElement) {
    return undefined;
  }
  setCaret(inputElement, selection);
  return undefined;
};
var _default = exports.default = caret;
