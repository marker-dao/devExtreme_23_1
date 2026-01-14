/**
* DevExtreme (cjs/__internal/grids/grid_core/columns_resizing_reordering/utils.test.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _utils = require("./utils");
const getRandomPoint = max => Math.floor(Math.random() * max);
const getDraggingPanelMock = () => ({
  getBoundingRect: () => ({
    top: getRandomPoint(1080),
    bottom: getRandomPoint(1080),
    left: getRandomPoint(1920),
    right: getRandomPoint(1920)
  })
});
(0, _globals.describe)('getDraggingPanelBoundingRects', () => {
  (0, _globals.it)('returns equal amount of elements in tuple', () => {
    const draggingPanels = [getDraggingPanelMock(), getDraggingPanelMock(), getDraggingPanelMock()];
    const result = (0, _utils.getDraggingPanelBoundingRects)(draggingPanels);
    (0, _globals.expect)(result === null || result === void 0 ? void 0 : result.length).toBe(draggingPanels.length);
  });
  (0, _globals.it)('returns the same dragging panel objects', () => {
    const draggingPanels = [getDraggingPanelMock(), getDraggingPanelMock(), getDraggingPanelMock()];
    const result = (0, _utils.getDraggingPanelBoundingRects)(draggingPanels);
    (0, _globals.expect)(result).not.toBeNull();
    result === null || result === void 0 || result.forEach((draggingPanelBoundingRect, index) => {
      (0, _globals.expect)(draggingPanelBoundingRect.draggingPanel).toBe(draggingPanels[index]);
    });
  });
  (0, _globals.it)('returns filtered tuple without empty objects', () => {
    const draggingPanels = [getDraggingPanelMock(), undefined, getDraggingPanelMock(), null];
    const result = (0, _utils.getDraggingPanelBoundingRects)(draggingPanels);
    (0, _globals.expect)(result === null || result === void 0 ? void 0 : result.length).toBe(draggingPanels.filter(Boolean).length);
  });
  (0, _globals.it)('returns null if the result is empty array', () => {
    const draggingPanels = [undefined, null];
    const result = (0, _utils.getDraggingPanelBoundingRects)(draggingPanels);
    (0, _globals.expect)(result).toBeNull();
  });
  (0, _globals.it)('returns null if draggingPanels array is empty', () => {
    const draggingPanels = [];
    const result = (0, _utils.getDraggingPanelBoundingRects)(draggingPanels);
    (0, _globals.expect)(result).toBeNull();
  });
  (0, _globals.it)('returns null if draggingPanels is null or undefined', () => {
    (0, _globals.expect)((0, _utils.getDraggingPanelBoundingRects)(undefined)).toBeNull();
    (0, _globals.expect)((0, _utils.getDraggingPanelBoundingRects)(null)).toBeNull();
  });
});
