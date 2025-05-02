"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolbarController = void 0;
var _signalsCore = require("@preact/signals-core");
var _options_controller = require("../options_controller/options_controller");
var _defaults = require("./defaults");
var _utils = require("./utils");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
class ToolbarController {
  constructor(options) {
    this.options = options;
    this.itemSubscriptions = {};
    this.defaultItems = (0, _signalsCore.signal)({});
    this.userItems = this.options.oneWay('toolbar.items');
    this.items = (0, _signalsCore.computed)(() => (0, _utils.normalizeToolbarItems)(Object.values(this.defaultItems.value), this.userItems.value, _defaults.DEFAULT_TOOLBAR_ITEMS));
  }
  addDefaultItem(item) {
    let needRender = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _signalsCore.signal)(true);
    const {
      name
    } = item.peek();
    this.itemSubscriptions[name] = (0, _signalsCore.effect)(() => {
      const newDefaultItems = _extends({}, this.defaultItems.peek());
      if (needRender.value) {
        newDefaultItems[name] = item.value;
      } else {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete newDefaultItems[name];
      }
      this.defaultItems.value = newDefaultItems;
    });
  }
}
exports.ToolbarController = ToolbarController;
ToolbarController.dependencies = [_options_controller.OptionsController];