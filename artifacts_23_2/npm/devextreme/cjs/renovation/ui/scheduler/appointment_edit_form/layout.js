/**
* DevExtreme (cjs/renovation/ui/scheduler/appointment_edit_form/layout.js)
* Version: 23.2.2
* Build date: Wed Nov 22 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.AppointmentEditFormProps = exports.AppointmentEditForm = void 0;
exports.defaultOptions = defaultOptions;
exports.viewFunction = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _popup = require("../../overlays/popup");
var _popup_config = require("./popup_config");
var _layout = require("./edit_form/layout");
var _utils = require("../../../../core/options/utils");
const _excluded = ["allowTimeZoneEditing", "allowUpdating", "appointmentData", "dataAccessors", "firstDayOfWeek", "formContentTemplate", "fullScreen", "maxWidth", "onVisibleChange", "visible"];
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const APPOINTMENT_POPUP_CLASS = 'dx-scheduler-appointment-popup';
const wrapperAttr = {
  class: APPOINTMENT_POPUP_CLASS
};
const viewFunction = _ref => {
  let {
    props: {
      allowTimeZoneEditing,
      allowUpdating,
      appointmentData,
      dataAccessors,
      firstDayOfWeek,
      fullScreen,
      maxWidth,
      onVisibleChange,
      visible
    },
    toolbarItems
  } = _ref;
  return (0, _inferno.createComponentVNode)(2, _popup.Popup, {
    "className": APPOINTMENT_POPUP_CLASS,
    "wrapperAttr": wrapperAttr,
    "visible": visible,
    "visibleChange": onVisibleChange,
    "height": "auto",
    "fullScreen": fullScreen,
    "maxWidth": maxWidth,
    "showCloseButton": false,
    "showTitle": false,
    "toolbarItems": toolbarItems,
    "animation": _popup_config.defaultAnimation,
    children: (0, _inferno.createComponentVNode)(2, _layout.EditForm, {
      "appointmentData": appointmentData,
      "dataAccessors": dataAccessors,
      "allowUpdating": allowUpdating,
      "firstDayOfWeek": firstDayOfWeek,
      "allowTimeZoneEditing": allowTimeZoneEditing
    })
  });
};
exports.viewFunction = viewFunction;
const AppointmentEditFormProps = {};
exports.AppointmentEditFormProps = AppointmentEditFormProps;
const getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props))) : TemplateProp);
let AppointmentEditForm = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(AppointmentEditForm, _BaseInfernoComponent);
  function AppointmentEditForm(props) {
    var _this;
    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.__getterCache = {};
    _this.state = {
      isFullScreen: (0, _popup_config.isPopupFullScreenNeeded)(),
      maxWidth: (0, _popup_config.getMaxWidth)((0, _popup_config.isPopupFullScreenNeeded)())
    };
    return _this;
  }
  var _proto = AppointmentEditForm.prototype;
  _proto.componentWillUpdate = function componentWillUpdate(nextProps, nextState, context) {
    if (this.props['allowUpdating'] !== nextProps['allowUpdating']) {
      this.__getterCache['toolbarItems'] = undefined;
    }
  };
  _proto.render = function render() {
    const props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        formContentTemplate: getTemplate(props.formContentTemplate)
      }),
      isFullScreen: this.state.isFullScreen,
      maxWidth: this.state.maxWidth,
      toolbarItems: this.toolbarItems,
      restAttributes: this.restAttributes
    });
  };
  _createClass(AppointmentEditForm, [{
    key: "toolbarItems",
    get: function () {
      if (this.__getterCache['toolbarItems'] !== undefined) {
        return this.__getterCache['toolbarItems'];
      }
      return this.__getterCache['toolbarItems'] = (() => {
        return (0, _popup_config.getPopupToolbarItems)(this.props.allowUpdating);
      })();
    }
  }, {
    key: "restAttributes",
    get: function () {
      const _this$props = this.props,
        restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
      return restProps;
    }
  }]);
  return AppointmentEditForm;
}(_inferno2.BaseInfernoComponent);
exports.AppointmentEditForm = AppointmentEditForm;
AppointmentEditForm.defaultProps = AppointmentEditFormProps;
const __defaultOptionRules = [];
function defaultOptions(rule) {
  __defaultOptionRules.push(rule);
  AppointmentEditForm.defaultProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(AppointmentEditForm.defaultProps), Object.getOwnPropertyDescriptors((0, _utils.convertRulesToOptions)(__defaultOptionRules))));
}
