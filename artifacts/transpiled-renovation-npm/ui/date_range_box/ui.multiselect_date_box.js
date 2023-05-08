"use strict";

exports.default = void 0;
var _uiDate_box = _interopRequireDefault(require("../date_box/ui.date_box.mask"));
var _rangeCalendar = _interopRequireDefault(require("./strategy/rangeCalendar"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var MultiselectDateBox = /*#__PURE__*/function (_DateBox) {
  _inheritsLoose(MultiselectDateBox, _DateBox);
  function MultiselectDateBox() {
    return _DateBox.apply(this, arguments) || this;
  }
  var _proto = MultiselectDateBox.prototype;
  _proto._initStrategy = function _initStrategy() {
    this._strategy = new _rangeCalendar.default(this);
  };
  _proto._applyButtonHandler = function _applyButtonHandler(e) {
    var value = this._strategy.getValue();
    this._strategy.dateRangeBox.updateValue(value);
    this.close();
    this.option('focusStateEnabled') && this.focus();
  };
  return MultiselectDateBox;
}(_uiDate_box.default);
var _default = MultiselectDateBox;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;