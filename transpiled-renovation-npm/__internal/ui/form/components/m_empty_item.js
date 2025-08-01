"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FIELD_EMPTY_ITEM_CLASS = void 0;
exports.renderEmptyItem = renderEmptyItem;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const FIELD_EMPTY_ITEM_CLASS = exports.FIELD_EMPTY_ITEM_CLASS = 'dx-field-empty-item';
function renderEmptyItem(info) {
  const {
    $parent,
    rootElementCssClassList
  } = info;
  return (0, _renderer.default)('<div>').addClass(FIELD_EMPTY_ITEM_CLASS).html('&nbsp;').addClass(rootElementCssClassList.join(' ')).appendTo($parent);
}