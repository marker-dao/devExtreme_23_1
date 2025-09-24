"use strict";

var _globals = require("@jest/globals");
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _sorted_index_utils = require("./sorted_index_utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const createContainer = () => {
  const container = document.createElement('div');
  const $element = (0, _renderer.default)(container);
  _globals.jest.spyOn($element, 'is').mockImplementation(selector => selector === ':visible');
  return $element;
};
const createDisabledContainer = () => {
  const $container = createContainer();
  $container.addClass('dx-state-disabled');
  return $container;
};
(0, _globals.describe)('sorted index utils', () => {
  (0, _globals.describe)('isElementCanBeFocused', () => {
    (0, _globals.it)('should return true for pure div', () => {
      (0, _globals.expect)((0, _sorted_index_utils.isElementCanBeFocused)(createContainer())).toBe(true);
    });
    (0, _globals.it)('should return false for invisible div', () => {
      const container = document.createElement('div');
      (0, _globals.expect)((0, _sorted_index_utils.isElementCanBeFocused)((0, _renderer.default)(container))).toBe(false);
    });
    (0, _globals.it)('should return false for disabled div', () => {
      (0, _globals.expect)((0, _sorted_index_utils.isElementCanBeFocused)(createDisabledContainer())).toBe(false);
    });
  });
  (0, _globals.describe)('getPrevElement', () => {
    (0, _globals.it)('should return prev element', () => {
      const elements = [createContainer(), createContainer(), createContainer()];
      (0, _globals.expect)((0, _sorted_index_utils.getPrevElement)(2, elements)).toBe(elements[1]);
    });
    (0, _globals.it)('should return prev element that exist and not disabled', () => {
      const elements = [createContainer(), undefined, createDisabledContainer(), createContainer()];
      (0, _globals.expect)((0, _sorted_index_utils.getPrevElement)(3, elements)).toBe(elements[0]);
    });
    (0, _globals.it)('should return undefined', () => {
      const elements = [createContainer()];
      (0, _globals.expect)((0, _sorted_index_utils.getPrevElement)(0, elements)).toBe(undefined);
    });
  });
  (0, _globals.describe)('getNextElement', () => {
    (0, _globals.it)('should return next element', () => {
      const elements = [createContainer(), createContainer(), createContainer()];
      (0, _globals.expect)((0, _sorted_index_utils.getNextElement)(2, elements)).toBe(elements[3]);
    });
    (0, _globals.it)('should return next element that exist and not disabled', () => {
      const elements = [createContainer(), undefined, createDisabledContainer(), createContainer()];
      (0, _globals.expect)((0, _sorted_index_utils.getNextElement)(0, elements)).toBe(elements[3]);
    });
    (0, _globals.it)('should return undefined', () => {
      const elements = [createContainer()];
      (0, _globals.expect)((0, _sorted_index_utils.getNextElement)(0, elements)).toBe(undefined);
    });
  });
});