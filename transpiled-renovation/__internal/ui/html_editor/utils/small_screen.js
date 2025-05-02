"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSmallScreen = void 0;
var _devices = _interopRequireDefault(require("../../../../core/devices"));
var _window = require("../../../../core/utils/window");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const isSmallScreen = () => {
  const screenFactor = (0, _window.hasWindow)() ? (0, _window.getCurrentScreenFactor)() : null;
  return _devices.default.real().deviceType === 'phone' || screenFactor === 'xs';
};
exports.isSmallScreen = isSmallScreen;