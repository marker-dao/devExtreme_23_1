/**
* DevExtreme (esm/__internal/grids/grid_core/module_accessibility.js)
* Version: 23.1.3
* Build date: Thu Jun 08 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import * as accessibility from '../../../ui/shared/accessibility';
export var registerKeyboardAction = function registerKeyboardAction(viewName, instance, $element, selector, action) {
  var keyboardController = instance.getController('keyboardNavigation');
  if (instance.option('useLegacyKeyboardNavigation') || keyboardController && !keyboardController.isKeyboardEnabled()) {
    return;
  }
  var executeKeyDown = args => {
    instance.executeAction('onKeyDown', args);
  };
  instance.createAction('onKeyDown');
  accessibility.registerKeyboardAction(viewName, instance, $element, selector, action, executeKeyDown);
};
