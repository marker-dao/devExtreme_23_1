/**
* DevExtreme (cjs/__internal/grids/new/grid_core/search/controller.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _options_controller = require("../../../../grids/new/grid_core/options_controller/options_controller.mock");
var _utils = require("../../../../grids/new/grid_core/search/utils");
var _di = require("../di.test_utils");
var _controller = require("./controller");
_globals.jest.mock('@ts/grids/new/grid_core/search/utils');
const setup = function () {
  let config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const context = (0, _di.getContext)(config);
  return {
    options: context.get(_options_controller.OptionsControllerMock),
    controller: context.get(_controller.SearchController)
  };
};
(0, _globals.describe)('SearchController', () => {
  (0, _globals.describe)('highlightTextOptions', () => {
    (0, _globals.afterEach)(() => {
      _globals.jest.clearAllMocks();
    });
    (0, _globals.it)('should have observable from widget options', () => {
      const {
        controller
      } = setup({
        searchPanel: {
          highlightSearchText: true,
          highlightCaseSensitive: false,
          text: 'TEST_SEARCH_STR'
        }
      });
      const stateSlice = controller.highlightTextOptions.peek();
      (0, _globals.expect)(stateSlice).toStrictEqual({
        enabled: true,
        caseSensitive: false,
        searchStr: 'TEST_SEARCH_STR'
      });
    });
    (0, _globals.it)('getHighlightText method should call util function', () => {
      const {
        controller
      } = setup({
        searchPanel: {
          highlightSearchText: true,
          highlightCaseSensitive: false,
          text: 'TEST_SEARCH_STR'
        }
      });
      controller.getHighlightedText('SOURCE_TEXT');
      (0, _globals.expect)(_utils.splitHighlightedText).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(_utils.splitHighlightedText).toHaveBeenCalledWith('SOURCE_TEXT', {
        enabled: true,
        caseSensitive: false,
        searchStr: 'TEST_SEARCH_STR'
      });
    });
  });
});
