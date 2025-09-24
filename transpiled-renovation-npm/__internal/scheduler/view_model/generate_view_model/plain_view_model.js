"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plainViewModel = void 0;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const plainViewModel = viewModel => viewModel.flatMap(appointment => appointment.settings.map(setting => _extends({}, setting, {
  itemData: appointment.itemData
})));
exports.plainViewModel = plainViewModel;