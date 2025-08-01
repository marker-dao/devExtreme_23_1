/**
* DevExtreme (cjs/__internal/grids/new/grid_core/toolbar/utils.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _utils = require("./utils");
(0, _globals.describe)('isVisible', () => {
  (0, _globals.describe)('when visibleConfig = true', () => {
    (0, _globals.it)('should be equal to true', () => {
      (0, _globals.expect)((0, _utils.isVisible)(true, [])).toBe(true);
    });
  });
  (0, _globals.describe)('when visibleConfig = false', () => {
    (0, _globals.it)('should be equal to false', () => {
      (0, _globals.expect)((0, _utils.isVisible)(false, [{
        name: 'addCardButton'
      }])).toBe(false);
    });
  });
  (0, _globals.describe)('when visibleConfig = undefined and there are items', () => {
    (0, _globals.it)('should be equal to false', () => {
      (0, _globals.expect)((0, _utils.isVisible)(undefined, [])).toBe(false);
    });
  });
  (0, _globals.describe)('when visibleConfig = undefined and there are no items', () => {
    (0, _globals.it)('should be equal to true', () => {
      (0, _globals.expect)((0, _utils.isVisible)(undefined, [{
        name: 'addCardButton'
      }, {
        name: 'toolbarItem2'
      }])).toBe(true);
    });
  });
});
(0, _globals.describe)('normalizeToolbarItems', () => {
  (0, _globals.describe)('when only default items are specified', () => {
    (0, _globals.it)('should return default items', () => {
      (0, _globals.expect)((0, _utils.normalizeToolbarItems)([{
        name: 'addCardButton'
      }], undefined, ['addCardButton'])).toStrictEqual([{
        name: 'addCardButton'
      }]);
    });
  });
  (0, _globals.describe)('when only custom items are specified', () => {
    (0, _globals.it)('should return processed custom items', () => {
      (0, _globals.expect)((0, _utils.normalizeToolbarItems)([], [{
        name: 'customToolbarItem1'
      }], ['addCardButton'])).toStrictEqual([{
        name: 'customToolbarItem1',
        location: 'after'
      }]);
    });
  });
  (0, _globals.describe)('when default items and custom items are specified', () => {
    (0, _globals.it)('should return processed custom items', () => {
      (0, _globals.expect)((0, _utils.normalizeToolbarItems)([{
        name: 'addCardButton'
      }], [{
        name: 'customToolbarItem1'
      }], ['addCardButton'])).toStrictEqual([{
        name: 'customToolbarItem1',
        location: 'after'
      }]);
    });
  });
  (0, _globals.describe)('when custom items override default items', () => {
    (0, _globals.it)('should return default items merged with custom items', () => {
      (0, _globals.expect)((0, _utils.normalizeToolbarItems)([{
        name: 'addCardButton',
        location: 'before'
      }], [{
        name: 'addCardButton',
        location: 'after'
      }], ['addCardButton'])).toStrictEqual([{
        name: 'addCardButton',
        location: 'after'
      }]);
    });
  });
  (0, _globals.describe)('when default items are set in custom items', () => {
    (0, _globals.it)('should return both default and custom items', () => {
      (0, _globals.expect)((0, _utils.normalizeToolbarItems)([{
        name: 'addCardButton',
        location: 'before'
      }], ['addCardButton', {
        name: 'customToolbarItem1'
      }], ['addCardButton'])).toStrictEqual([{
        name: 'addCardButton',
        location: 'before'
      }, {
        name: 'customToolbarItem1',
        location: 'after'
      }]);
    });
  });
  (0, _globals.describe)('when there are no default items but they are specified in custom items', () => {
    (0, _globals.it)('should return processed default items', () => {
      (0, _globals.expect)((0, _utils.normalizeToolbarItems)([], ['addCardButton'], ['addCardButton'])).toStrictEqual([{
        name: 'addCardButton',
        location: 'after',
        visible: false
      }]);
    });
  });
});
