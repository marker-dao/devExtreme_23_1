"use strict";

var _m_variable_wrapper = require("../../core/utils/m_variable_wrapper");
var _knockout = _interopRequireDefault(require("knockout"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line import/no-extraneous-dependencies

if (_knockout.default) {
  _m_variable_wrapper.variableWrapper.inject({
    isWrapped: _knockout.default.isObservable,
    isWritableWrapped: _knockout.default.isWritableObservable,
    wrap: _knockout.default.observable,
    unwrap(value) {
      if (_knockout.default.isObservable(value)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return _knockout.default.utils.unwrapObservable(value);
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this.callBase(value);
    },
    assign(variable, value) {
      if (_knockout.default.isObservable(variable)) {
        variable(value);
      } else {
        this.callBase(variable, value);
      }
    }
  });
}