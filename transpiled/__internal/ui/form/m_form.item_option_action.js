"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _class = _interopRequireDefault(require("../../../core/class"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ItemOptionAction {
  constructor(options) {
    this._options = options;
    this._itemsRunTimeInfo = this._options.itemsRunTimeInfo;
  }
  findInstance() {
    return this._itemsRunTimeInfo.findWidgetInstanceByItem(this._options.item);
  }
  findItemContainer() {
    return this._itemsRunTimeInfo.findItemContainerByItem(this._options.item);
  }
  findPreparedItem() {
    return this._itemsRunTimeInfo.findPreparedItemByItem(this._options.item);
  }
  // eslint-disable-next-line class-methods-use-this
  tryExecute() {
    _class.default.abstract();
  }
}
exports.default = ItemOptionAction;