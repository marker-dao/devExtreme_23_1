"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createComponentMock = void 0;
var _component = require("../../../../../core/component");
var _index = require("../../../../core/state_manager/index");
var _m_extend = require("../../../../core/utils/m_extend");
// NOTE: We cannot modify the base "_getDefaultOptions" method with Component base class params
// So, we use closure here to modify this method during class creation
const createComponentMock = function (options, defaultOptions) {
  let isInitialized = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return new class ComponentMock extends _component.Component {
    constructor() {
      super(...arguments);
      this.initialized = (0, _index.signal)(isInitialized);
    }
    // NOTE: Add default option values to base Component for merging them
    // with Component's algorithms
    _getDefaultOptions() {
      // @ts-expect-error badly typed base Component class
      const baseDefaultOptions = super._getDefaultOptions();
      return (0, _m_extend.extend)(true, {}, baseDefaultOptions, defaultOptions);
    }
  }((0, _m_extend.extend)(true, {}, options));
};
exports.createComponentMock = createComponentMock;