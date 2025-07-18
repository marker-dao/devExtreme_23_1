import { Component } from '../../../../../core/component';
import { signal } from '@preact/signals-core';
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