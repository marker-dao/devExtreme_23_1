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
        name: 'toolbarItem1'
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
        name: 'toolbarItem1'
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
        name: 'toolbarItem1'
      }], undefined, ['toolbarItem1'])).toStrictEqual([{
        name: 'toolbarItem1'
      }]);
    });
  });
  (0, _globals.describe)('when only custom items are specified', () => {
    (0, _globals.it)('should return processed custom items', () => {
      (0, _globals.expect)((0, _utils.normalizeToolbarItems)([], [{
        name: 'customToolbarItem1'
      }], ['toolbarItem1'])).toStrictEqual([{
        name: 'customToolbarItem1',
        location: 'after'
      }]);
    });
  });
  (0, _globals.describe)('when default items and custom items are specified', () => {
    (0, _globals.it)('should return processed custom items', () => {
      (0, _globals.expect)((0, _utils.normalizeToolbarItems)([{
        name: 'toolbarItem1'
      }], [{
        name: 'customToolbarItem1'
      }], ['toolbarItem1'])).toStrictEqual([{
        name: 'customToolbarItem1',
        location: 'after'
      }]);
    });
  });
  (0, _globals.describe)('when custom items override default items', () => {
    (0, _globals.it)('should return default items merged with custom items', () => {
      (0, _globals.expect)((0, _utils.normalizeToolbarItems)([{
        name: 'toolbarItem1',
        location: 'before'
      }], [{
        name: 'toolbarItem1',
        location: 'after'
      }], ['toolbarItem1'])).toStrictEqual([{
        name: 'toolbarItem1',
        location: 'after'
      }]);
    });
  });
  (0, _globals.describe)('when default items are set in custom items', () => {
    (0, _globals.it)('should return both default and custom items', () => {
      (0, _globals.expect)((0, _utils.normalizeToolbarItems)([{
        name: 'toolbarItem1',
        location: 'before'
      }], ['toolbarItem1', {
        name: 'customToolbarItem1'
      }], ['toolbarItem1'])).toStrictEqual([{
        name: 'toolbarItem1',
        location: 'before'
      }, {
        name: 'customToolbarItem1',
        location: 'after'
      }]);
    });
  });
  (0, _globals.describe)('when there are no default items but they are specified in custom items', () => {
    (0, _globals.it)('should return processed default items', () => {
      (0, _globals.expect)((0, _utils.normalizeToolbarItems)([], ['toolbarItem1'], ['toolbarItem1'])).toStrictEqual([{
        name: 'toolbarItem1',
        location: 'after',
        visible: false
      }]);
    });
  });
});