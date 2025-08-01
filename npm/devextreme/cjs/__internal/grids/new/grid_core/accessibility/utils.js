/**
* DevExtreme (cjs/__internal/grids/new/grid_core/accessibility/utils.js)
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
exports.getPosition = exports.getCardStateDescription = exports.getCardRoleDescription = exports.getCardDescriptiveLabel = void 0;
var _message = _interopRequireDefault(require("../../../../../localization/message"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const getCardRoleDescription = isEditable => isEditable ? _message.default.format('dxCardView-ariaEditableCard') : _message.default.format('dxCardView-ariaCard');
// @ts-expect-error ts-error
exports.getCardRoleDescription = getCardRoleDescription;
const getPositionDescription = position => position ? _message.default.format('dxCardView-ariaCardPosition', position.rowIndex + 1, position.columnIndex + 1) : '';
const getCardStateDescription = (position, isSelectable, isSelected) => {
  const parts = [getPositionDescription(position)];
  if (isSelectable) {
    parts.push(isSelected ? _message.default.format('dxCardView-ariaSelectedCardState') : _message.default.format('dxCardView-ariaNotSelectedCardState'));
  }
  return parts.join(', ');
};
exports.getCardStateDescription = getCardStateDescription;
const getCardDescriptiveLabel = (hasCover, coverId, contentId) => {
  const ids = [];
  if (hasCover) {
    ids.push(coverId);
  }
  ids.push(contentId);
  return ids.join(' ');
};
exports.getCardDescriptiveLabel = getCardDescriptiveLabel;
const getPosition = (idx, columnCount) => ({
  rowIndex: Math.floor(idx / columnCount),
  columnIndex: idx % columnCount
});
exports.getPosition = getPosition;
