/**
* DevExtreme (cjs/__internal/grids/grid_core/columns_resizing_reordering/utils.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDraggingPanelBoundingRects = void 0;
var _m_iterator = require("../../../core/utils/m_iterator");
const getDraggingPanelBoundingRects = draggingPanels => {
  const boundingRects = [];
  (0, _m_iterator.each)(draggingPanels, (_, draggingPanel) => {
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
exports.getDraggingPanelBoundingRects = getDraggingPanelBoundingRects;
