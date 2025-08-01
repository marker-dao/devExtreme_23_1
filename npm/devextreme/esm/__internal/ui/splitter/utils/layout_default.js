/**
* DevExtreme (esm/__internal/ui/splitter/utils/layout_default.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { toFixed } from '../../../../common/core/localization/utils';
import { isDefined } from '../../../../core/utils/type';
import { findLastIndexOfVisibleItem, findLastVisibleExpandedItemIndex, normalizePanelSize } from './layout';
import { compareNumbersWithPrecision, PRECISION } from './number_comparison';
export function getDefaultLayout(layoutRestrictions) {
  let layout = new Array(layoutRestrictions.length).fill(null);
  let numPanelsWithDefinedSize = 0;
  let remainingSize = 100;
  layoutRestrictions.forEach((paneRestrictions, index) => {
    const {
      size,
      visible,
      collapsed,
      collapsedSize = 0
    } = paneRestrictions;
    if (visible === false) {
      numPanelsWithDefinedSize += 1;
      layout[index] = 0;
      remainingSize -= 0;
      return;
    }
    if (collapsed === true) {
      numPanelsWithDefinedSize += 1;
      layout[index] = collapsedSize;
      remainingSize -= collapsedSize;
      return;
    }
    if (isDefined(size)) {
      numPanelsWithDefinedSize += 1;
      if (remainingSize - size < 0) {
        layout[index] = remainingSize;
        remainingSize = 0;
        return;
      }
      layout[index] = size;
      remainingSize -= size;
    }
  });
  let panelsToDistribute = layoutRestrictions.length - numPanelsWithDefinedSize;
  if (panelsToDistribute === 0) {
    layout[findLastIndexOfVisibleItem(layoutRestrictions)] += remainingSize;
    remainingSize = 0;
  } else {
    layoutRestrictions.forEach((paneRestrictions, index) => {
      if (layout[index] === null) {
        if (isDefined(paneRestrictions.maxSize) && panelsToDistribute === 1) {
          layout[index] = remainingSize > paneRestrictions.maxSize ? remainingSize : paneRestrictions.maxSize;
          remainingSize -= layout[index];
          numPanelsWithDefinedSize += 1;
        } else if (isDefined(paneRestrictions.maxSize) && paneRestrictions.maxSize < remainingSize / panelsToDistribute) {
          layout[index] = paneRestrictions.maxSize;
          remainingSize -= paneRestrictions.maxSize;
          numPanelsWithDefinedSize += 1;
          panelsToDistribute -= 1;
        }
      }
    });
    panelsToDistribute = layoutRestrictions.length - numPanelsWithDefinedSize;
    if (panelsToDistribute > 0) {
      const spacePerPanel = remainingSize / panelsToDistribute;
      layout.forEach((panelSize, index) => {
        if (panelSize === null) {
          layout[index] = spacePerPanel;
        }
      });
    }
  }
  layout = layout.map(size => size === null ? 0 : parseFloat(toFixed(size, PRECISION)));
  if (layout.length === 1) {
    return layout;
  }
  let nextLayout = [...layout];
  const nextLayoutTotalSize = nextLayout.reduce((accumulated, current) => accumulated + current, 0);
  if (!(compareNumbersWithPrecision(nextLayoutTotalSize, 100) === 0)) {
    for (let index = 0; index < layoutRestrictions.length; index += 1) {
      const unsafeSize = nextLayout[index];
      const safeSize = 100 / nextLayoutTotalSize * unsafeSize;
      nextLayout[index] = safeSize;
    }
  }
  remainingSize = 0;
  nextLayout = layout.map((panelSize, index) => {
    const restriction = layoutRestrictions[index];
    const adjustedSize = normalizePanelSize(restriction, panelSize);
    remainingSize += panelSize - adjustedSize;
    return adjustedSize;
  });
  if (compareNumbersWithPrecision(remainingSize, 0) !== 0) {
    for (let index = 0; index < nextLayout.length && compareNumbersWithPrecision(remainingSize, 0) !== 0; index += 1) {
      const currentSize = nextLayout[index];
      const adjustedSize = normalizePanelSize(layoutRestrictions[index], currentSize + remainingSize);
      remainingSize -= adjustedSize - currentSize;
      nextLayout[index] = adjustedSize;
    }
    if (remainingSize > 0) {
      const paneIndex = findLastVisibleExpandedItemIndex(layoutRestrictions);
      if (paneIndex !== -1) {
        nextLayout[paneIndex] += remainingSize;
      }
    }
  }
  return nextLayout;
}
