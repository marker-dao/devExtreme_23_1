"use strict";

exports.viewFunction = exports.AppointmentListProps = exports.AppointmentList = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _list = require("../../list");
var _item_layout = require("./item_layout");
var _get_current_appointment = _interopRequireDefault(require("./utils/get_current_appointment"));
var _default_functions = require("./utils/default_functions");
const _excluded = ["appointments", "checkAndDeleteAppointment", "focusStateEnabled", "getSingleAppointmentData", "getTextAndFormatDate", "isEditingAllowed", "itemContentTemplate", "onHide", "showAppointmentPopup", "target"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const viewFunction = viewModel => (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _list.List, _extends({
  "itemTemplate": _ref => {
    let {
      index,
      item
    } = _ref;
    return (0, _inferno.createComponentVNode)(2, _item_layout.TooltipItemLayout, {
      "item": item,
      "index": index,
      "onDelete": viewModel.props.checkAndDeleteAppointment,
      "onHide": viewModel.props.onHide,
      "itemContentTemplate": viewModel.props.itemContentTemplate,
      "getTextAndFormatDate": viewModel.props.getTextAndFormatDate,
      "singleAppointment": viewModel.props.getSingleAppointmentData(item.data, viewModel.props.target),
      "showDeleteButton": viewModel.props.isEditingAllowed && !item.data.disabled
    });
  },
  "dataSource": viewModel.props.appointments,
  "focusStateEnabled": viewModel.props.focusStateEnabled,
  "onItemClick": viewModel.onItemClick
}, viewModel.restAttributes)));
exports.viewFunction = viewFunction;
const AppointmentListProps = {
  isEditingAllowed: true,
  focusStateEnabled: false,
  getTextAndFormatDate: _default_functions.defaultGetTextAndFormatDate,
  getSingleAppointmentData: _default_functions.defaultGetSingleAppointment
};
exports.AppointmentListProps = AppointmentListProps;
const getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props))) : TemplateProp);
let AppointmentList = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(AppointmentList, _BaseInfernoComponent);
  function AppointmentList(props) {
    var _this;
    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {};
    return _this;
  }
  var _proto = AppointmentList.prototype;
  _proto.render = function render() {
    const props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        itemContentTemplate: getTemplate(props.itemContentTemplate)
      }),
      onItemClick: this.onItemClick,
      restAttributes: this.restAttributes
    });
  };
  _createClass(AppointmentList, [{
    key: "onItemClick",
    get: function () {
      return _ref2 => {
        let {
          itemData
        } = _ref2;
        const {
          showAppointmentPopup
        } = this.props;
        showAppointmentPopup === null || showAppointmentPopup === void 0 ? void 0 : showAppointmentPopup(itemData.data, false, (0, _get_current_appointment.default)(itemData));
      };
    }
  }, {
    key: "restAttributes",
    get: function () {
      const _this$props = this.props,
        restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
      return restProps;
    }
  }]);
  return AppointmentList;
}(_inferno2.BaseInfernoComponent);
exports.AppointmentList = AppointmentList;
AppointmentList.defaultProps = AppointmentListProps;