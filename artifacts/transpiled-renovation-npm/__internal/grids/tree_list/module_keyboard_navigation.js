"use strict";

var _extend = require("../../../core/utils/extend");
var _uiGrid_core = require("../../../ui/grid_core/ui.grid_core.keyboard_navigation");
var _module_core = _interopRequireDefault(require("./module_core"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_module_core.default.registerModule('keyboardNavigation', (0, _extend.extend)(true, {}, _uiGrid_core.keyboardNavigationModule, {
  extenders: {
    controllers: {
      keyboardNavigation: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _leftRightKeysHandler: function _leftRightKeysHandler(eventArgs, isEditing) {
          var rowIndex = this.getVisibleRowIndex();
          var dataController = this._dataController;
          if (eventArgs.ctrl) {
            var directionCode = this._getDirectionCodeByKey(eventArgs.keyName);
            var key = dataController.getKeyByRowIndex(rowIndex);
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