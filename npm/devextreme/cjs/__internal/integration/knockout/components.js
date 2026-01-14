/**
* DevExtreme (cjs/__internal/integration/knockout/components.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _m_icon = require("../../core/utils/m_icon");
var _knockout = _interopRequireDefault(require("knockout"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line import/no-extraneous-dependencies

if (_knockout.default) {
  _knockout.default.bindingHandlers.dxControlsDescendantBindings = {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    init(_, valueAccessor) {
      return {
        controlsDescendantBindings: _knockout.default.unwrap(valueAccessor())
      };
    }
  };
  _knockout.default.bindingHandlers.dxIcon = {
    init(element, valueAccessor) {
      const options = _knockout.default.utils.unwrapObservable(valueAccessor()) || {};
      const iconElement = (0, _m_icon.getImageContainer)(options);
      _knockout.default.virtualElements.emptyNode(element);
      if (iconElement) {
        _knockout.default.virtualElements.prepend(element, iconElement.get(0));
      }
    },
    update(element, valueAccessor) {
      const options = _knockout.default.utils.unwrapObservable(valueAccessor()) || {};
      const iconElement = (0, _m_icon.getImageContainer)(options);
      _knockout.default.virtualElements.emptyNode(element);
      if (iconElement) {
        _knockout.default.virtualElements.prepend(element, iconElement.get(0));
      }
    }
  };
  _knockout.default.virtualElements.allowedBindings.dxIcon = true;
}
