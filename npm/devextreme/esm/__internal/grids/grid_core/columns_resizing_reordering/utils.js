/**
* DevExtreme (esm/__internal/grids/grid_core/columns_resizing_reordering/utils.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { each } from '../../../core/utils/m_iterator';
export const getDraggingPanelBoundingRects = draggingPanels => {
  const boundingRects = [];
  each(draggingPanels, (_, draggingPanel) => {
    const boundingRect = draggingPanel === null || draggingPanel === void 0 ? void 0 : draggingPanel.getBoundingRect();
    if (boundingRect) {
      boundingRects.push({
        draggingPanel,
        boundingRect
      });
    }
  });
  return boundingRects.length ? boundingRects : null;
};
