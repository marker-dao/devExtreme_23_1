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