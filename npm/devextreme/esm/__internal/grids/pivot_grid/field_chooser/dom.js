/**
* DevExtreme (esm/__internal/grids/pivot_grid/field_chooser/dom.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../../../core/renderer';
import { getOuterWidth } from '../../../../core/utils/size';
import { ATTRIBUTES, CLASSES, SORTABLE_CONST } from './const';
// === Drag-N-Drop item render ===
function getTreeViewItem($sourceItem) {
  return $sourceItem.clone().addClass(CLASSES.area.box).css('width', parseFloat(getOuterWidth($sourceItem)));
}
function getAreaBoxItemArray($sourceItem, target) {
  const $itemArray = $sourceItem.clone();
  if (target === SORTABLE_CONST.targets.drag) {
    $sourceItem.each((idx, sourceItem) => {
      const width = parseFloat(getOuterWidth(sourceItem));
      $itemArray.eq(idx).css('width', width);
      return true;
    });
  }
  return $itemArray;
}
function getDefaultItem($sourceItem) {
  return $('<div>').addClass(CLASSES.area.field).addClass(CLASSES.area.box).text($sourceItem.text());
}
function getItemArray($sourceItem, target) {
  const isAreaBox = $sourceItem.hasClass(CLASSES.area.box);
  const isTreeList = $sourceItem.attr(ATTRIBUTES.treeViewItem);
  if (isAreaBox) {
    return getAreaBoxItemArray($sourceItem, target);
  }
  if (isTreeList) {
    return getTreeViewItem($sourceItem);
  }
  return getDefaultItem($sourceItem);
}
function wrapItemsInFieldsContainer($itemArray) {
  const $wrappedTmpContainer = $('<div>');
  $itemArray.each((_, item) => {
    const $wrappedItem = $('<div>').addClass(CLASSES.pivotGrid.fieldsContainer).addClass(CLASSES.widget).append($(item));
    $wrappedTmpContainer.append($wrappedItem);
    return true;
  });
  return $wrappedTmpContainer.children();
}
export function dragAndDropItemRender($sourceItem, target) {
  const $itemArray = getItemArray($sourceItem, target);
  if (target === SORTABLE_CONST.targets.drag) {
    return wrapItemsInFieldsContainer($itemArray);
  }
  return $itemArray;
}
