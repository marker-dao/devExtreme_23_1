"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("../../../ui/toolbar");
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _ui = _interopRequireDefault(require("../../../ui/popup/ui.popup"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class PopupFull extends _ui.default {
  _getDefaultOptions() {
    return Object.assign({}, super._getDefaultOptions(), {
      preventScrollEvents: false
    });
  }
  // eslint-disable-next-line class-methods-use-this
  _getToolbarName() {
    return 'dxToolbar';
  }
}
exports.default = PopupFull;
PopupFull.defaultOptions = function (rule) {
  _ui.default.defaultOptions(rule);
};
(0, _component_registrator.default)('dxPopup', PopupFull);