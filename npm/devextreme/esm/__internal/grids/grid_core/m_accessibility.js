/**
* DevExtreme (esm/__internal/grids/grid_core/m_accessibility.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import * as accessibility from '../../../ui/shared/accessibility';
export const registerKeyboardAction = function (viewName, instance, $element, selector, action) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let executeKeyDown = args => {};
  const keyboardController = instance.getController('keyboardNavigation');
  if (instance.option('useLegacyKeyboardNavigation') || keyboardController && !keyboardController.isKeyboardEnabled()) {
    return;
  }
  if (viewName === 'filterPanel') {
    executeKeyDown = args => {
      instance.executeAction('onKeyDown', args);
    };
    instance.createAction('onKeyDown');
  }
  accessibility.registerKeyboardAction(viewName, instance, $element, selector, action, executeKeyDown);
};
