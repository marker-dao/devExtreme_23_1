/**
* DevExtreme (bundles/__internal/grids/tree_list/m_keyboard_navigation.js)
* Version: 23.2.2
* Build date: Mon Nov 20 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _extend = require("../../../core/utils/extend");
var _m_keyboard_navigation = require("../../grids/grid_core/keyboard_navigation/m_keyboard_navigation");
var _m_core = _interopRequireDefault(require("./m_core"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_m_core.default.registerModule('keyboardNavigation', (0, _extend.extend)(true, {}, _m_keyboard_navigation.keyboardNavigationModule, {
  extenders: {
    controllers: {
      keyboardNavigation: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _leftRightKeysHandler(eventArgs, isEditing) {
          const rowIndex = this.getVisibleRowIndex();
          const dataController = this._dataController;
          if (eventArgs.ctrl) {
            const directionCode = this._getDirectionCodeByKey(eventArgs.keyName);
            const key = dataController.getKeyByRowIndex(rowIndex);
            if (directionCode === 'nextInRow') {
              dataController.expandRow(key);
            } else {
              dataController.collapseRow(key);
            }
          } else {
            return this.callBase.apply(this, arguments);
          }
        }
      }
    }
  }
}));