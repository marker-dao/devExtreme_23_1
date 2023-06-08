"use strict";

var _extend = require("../../../core/utils/extend");
var _module = require("../grid_core/columns_controller/module");
var _module_core = _interopRequireDefault(require("./module_core"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_module_core.default.registerModule('columns', {
  defaultOptions: function defaultOptions() {
    return (0, _extend.extend)(true, {}, _module.columnsControllerModule.defaultOptions(), {
      commonColumnSettings: {
        allowExporting: true
      }
    });
  },
  controllers: _module.columnsControllerModule.controllers
});