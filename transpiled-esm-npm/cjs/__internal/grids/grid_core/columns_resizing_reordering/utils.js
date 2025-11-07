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