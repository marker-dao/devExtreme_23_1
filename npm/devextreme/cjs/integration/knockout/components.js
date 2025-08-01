/**
* DevExtreme (cjs/integration/knockout/components.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _knockout = _interopRequireDefault(require("knockout"));
var _icon = require("../../core/utils/icon");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line no-restricted-imports

if (_knockout.default) {
  _knockout.default.bindingHandlers.dxControlsDescendantBindings = {
    init: function (_, valueAccessor) {
      return {
        controlsDescendantBindings: _knockout.default.unwrap(valueAccessor())
      };
    }
  };
  _knockout.default.bindingHandlers.dxIcon = {
    init: function (element, valueAccessor) {
      const options = _knockout.default.utils.unwrapObservable(valueAccessor()) || {};
      const iconElement = (0, _icon.getImageContainer)(options);
      _knockout.default.virtualElements.emptyNode(element);
      if (iconElement) {
        _knockout.default.virtualElements.prepend(element, iconElement.get(0));
      }
    },
    update: function (element, valueAccessor) {
      const options = _knockout.default.utils.unwrapObservable(valueAccessor()) || {};
      const iconElement = (0, _icon.getImageContainer)(options);
      _knockout.default.virtualElements.emptyNode(element);
      if (iconElement) {
        _knockout.default.virtualElements.prepend(element, iconElement.get(0));
      }
    }
  };
  _knockout.default.virtualElements.allowedBindings.dxIcon = true;
}
