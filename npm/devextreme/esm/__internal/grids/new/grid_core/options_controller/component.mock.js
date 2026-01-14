/**
* DevExtreme (esm/__internal/grids/new/grid_core/options_controller/component.mock.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { Component } from '../../../../../core/component';
import { signal } from '../../../../core/state_manager/index';
import { extend } from '../../../../core/utils/m_extend';
// NOTE: We cannot modify the base "_getDefaultOptions" method with Component base class params
// So, we use closure here to modify this method during class creation
export const createComponentMock = function (options, defaultOptions) {
  let isInitialized = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return new class ComponentMock extends Component {
    constructor() {
      super(...arguments);
      this.initialized = signal(isInitialized);
    }
    // NOTE: Add default option values to base Component for merging them
    // with Component's algorithms
    _getDefaultOptions() {
      // @ts-expect-error badly typed base Component class
      const baseDefaultOptions = super._getDefaultOptions();
      return extend(true, {}, baseDefaultOptions, defaultOptions);
    }
  }(extend(true, {}, options));
};
