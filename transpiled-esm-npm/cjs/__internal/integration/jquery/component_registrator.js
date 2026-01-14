"use strict";

var _m_component_registrator_callbacks = require("../../core/m_component_registrator_callbacks");
var _m_errors = _interopRequireDefault(require("../../core/m_errors"));
var _jquery = _interopRequireDefault(require("jquery"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line import/no-extraneous-dependencies

if (_jquery.default) {
  // eslint-disable-next-line func-names
  const registerJQueryComponent = function (name, componentClass) {
    // @ts-expect-error
    // eslint-disable-next-line func-names
    _jquery.default.fn[name] = function (options) {
      const isMemberInvoke = typeof options === 'string';
      // eslint-disable-next-line @typescript-eslint/init-declarations
      let result;
      if (isMemberInvoke) {
        const memberName = options;
        // eslint-disable-next-line prefer-rest-params
        const memberArgs = [].slice.call(arguments).slice(1);
        this.each(function () {
          const instance = componentClass.getInstance(this);
          if (!instance) {
            throw _m_errors.default.Error('E0009', name);
          }
          const member = instance[memberName];
          const memberValue = member.apply(instance, memberArgs);
          if (result === undefined) {
            result = memberValue;
          }
        });
      } else {
        this.each(function () {
          const instance = componentClass.getInstance(this);
          if (instance) {
            instance.option(options);
          } else {
            // eslint-disable-next-line no-new,new-cap
            new componentClass(this, options);
          }
        });
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        result = this;
      }
      return result;
    };
  };
  _m_component_registrator_callbacks.componentRegistratorCallbacks.add(registerJQueryComponent);
}