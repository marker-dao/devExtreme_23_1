/**
* DevExtreme (cjs/__internal/grids/new/grid_core/options_controller/component.mock.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createComponentMock = void 0;
var _component = require("../../../../../core/component");
var _m_extend = require("../../../../core/utils/m_extend");
// NOTE: We cannot modify the base "_getDefaultOptions" method with Component base class params
// So, we use closure here to modify this method during class creation
const createComponentMock = (options, defaultOptions) => new class ComponentMock extends _component.Component {
  // NOTE: Add default option values to base Component for merging them
  // with Component's algorithms
  _getDefaultOptions() {
    // @ts-expect-error badly typed base Component class
    const baseDefaultOptions = super._getDefaultOptions();
    return (0, _m_extend.extend)(true, {}, baseDefaultOptions, defaultOptions);
  }
}((0, _m_extend.extend)(true, {}, options));
exports.createComponentMock = createComponentMock;
