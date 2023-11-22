/**
* DevExtreme (cjs/renovation/ui/scheduler/appointment_edit_form/edit_form/editors/dateEditor.js)
* Version: 23.2.2
* Build date: Wed Nov 22 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.DateEditorProps = exports.DateEditor = void 0;
exports.defaultOptions = defaultOptions;
exports.viewFunction = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _date_box = require("../../../../editors/drop_down_editors/date_box");
var _utils = require("../../utils");
var _utils2 = require("../../../../../../core/options/utils");
const _excluded = ["disabled", "firstDayOfWeek", "isAllDay", "value", "valueChange"];
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
const viewFunction = _ref => {
  let {
    calendarOptions,
    date,
    props: {
      disabled
    },
    type,
    updateDate
  } = _ref;
  return (0, _inferno.createComponentVNode)(2, _date_box.DateBox, {
    "width": "100%",
    "useMaskBehavior": true,
    "value": date,
    "valueChange": updateDate,
    "type": type,
    "calendarOptions": calendarOptions,
    "disabled": disabled
  });
};
exports.viewFunction = viewFunction;
const DateEditorProps = {};
exports.DateEditorProps = DateEditorProps;
let DateEditor = /*#__PURE__*/function (_InfernoComponent) {
  _inheritsLoose(DateEditor, _InfernoComponent);
  function DateEditor(props) {
    var _this;
    _this = _InfernoComponent.call(this, props) || this;
    _this.__getterCache = {};
    _this.state = {
      date: undefined
    };
    _this.initDate = _this.initDate.bind(_assertThisInitialized(_this));
    _this.updateDate = _this.updateDate.bind(_assertThisInitialized(_this));
    return _this;
  }
  var _proto = DateEditor.prototype;
  _proto.createEffects = function createEffects() {
    return [new _inferno2.InfernoEffect(this.initDate, [])];
  };
  _proto.initDate = function initDate() {
    if (!this.state.date) {
      this.setState(__state_argument => ({
        date: this.props.value
      }));
    }
  };
  _proto.updateDate = function updateDate(date) {
    this.setState(__state_argument => ({
      date: this.props.valueChange(date)
    }));
  };
  _proto.componentWillUpdate = function componentWillUpdate(nextProps, nextState, context) {
    _InfernoComponent.prototype.componentWillUpdate.call(this);
    if (this.props['firstDayOfWeek'] !== nextProps['firstDayOfWeek']) {
      this.__getterCache['calendarOptions'] = undefined;
    }
  };
  _proto.render = function render() {
    const props = this.props;
    return viewFunction({
      props: _extends({}, props),
      date: this.state.date,
      updateDate: this.updateDate,
      calendarOptions: this.calendarOptions,
      type: this.type,
      restAttributes: this.restAttributes
    });
  };
  _createClass(DateEditor, [{
    key: "calendarOptions",
    get: function () {
      if (this.__getterCache['calendarOptions'] !== undefined) {
        return this.__getterCache['calendarOptions'];
      }
      return this.__getterCache['calendarOptions'] = (() => {
        return {
          firstDayOfWeek: (0, _utils.getFirstDayOfWeek)(this.props.firstDayOfWeek)
        };
      })();
    }
  }, {
    key: "type",
    get: function () {
      return this.props.isAllDay ? 'date' : 'datetime';
    }
  }, {
    key: "restAttributes",
    get: function () {
      const _this$props = this.props,
        restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
      return restProps;
    }
  }]);
  return DateEditor;
}(_inferno2.InfernoComponent);
exports.DateEditor = DateEditor;
DateEditor.defaultProps = DateEditorProps;
const __defaultOptionRules = [];
function defaultOptions(rule) {
  __defaultOptionRules.push(rule);
  DateEditor.defaultProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(DateEditor.defaultProps), Object.getOwnPropertyDescriptors((0, _utils2.convertRulesToOptions)(__defaultOptionRules))));
}
