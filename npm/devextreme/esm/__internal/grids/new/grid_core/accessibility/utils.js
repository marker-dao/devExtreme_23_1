/**
* DevExtreme (esm/__internal/grids/new/grid_core/accessibility/utils.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import messageLocalization from '../../../../../localization/message';
export const getCardRoleDescription = isEditable => isEditable ? messageLocalization.format('dxCardView-ariaEditableCard') : messageLocalization.format('dxCardView-ariaCard');
// @ts-expect-error ts-error
const getPositionDescription = position => position ? messageLocalization.format('dxCardView-ariaCardPosition', position.rowIndex + 1, position.columnIndex + 1) : '';
export const getCardStateDescription = (position, isSelectable, isSelected) => {
  const parts = [getPositionDescription(position)];
  if (isSelectable) {
    parts.push(isSelected ? messageLocalization.format('dxCardView-ariaSelectedCardState') : messageLocalization.format('dxCardView-ariaNotSelectedCardState'));
  }
  return parts.join(', ');
};
export const getCardDescriptiveLabel = (hasCover, coverId, contentId) => {
  const ids = [];
  if (hasCover) {
    ids.push(coverId);
  }
  ids.push(contentId);
  return ids.join(' ');
};
export const getPosition = (idx, columnCount) => ({
  rowIndex: Math.floor(idx / columnCount),
  columnIndex: idx % columnCount
});
