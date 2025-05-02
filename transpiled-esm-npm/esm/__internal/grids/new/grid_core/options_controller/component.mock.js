import { Component } from '../../../../../core/component';
import { extend } from '../../../../core/utils/m_extend';
// NOTE: We cannot modify the base "_getDefaultOptions" method with Component base class params
// So, we use closure here to modify this method during class creation
export const createComponentMock = (options, defaultOptions) => new class ComponentMock extends Component {
  // NOTE: Add default option values to base Component for merging them
  // with Component's algorithms
  _getDefaultOptions() {
    // @ts-expect-error badly typed base Component class
    const baseDefaultOptions = super._getDefaultOptions();
    return extend(true, {}, baseDefaultOptions, defaultOptions);
  }
}(extend(true, {}, options));