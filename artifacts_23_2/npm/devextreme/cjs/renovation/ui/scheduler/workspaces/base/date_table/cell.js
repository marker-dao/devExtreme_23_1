/**
* DevExtreme (cjs/renovation/ui/scheduler/workspaces/base/date_table/cell.js)
* Version: 23.2.3
* Build date: Fri Nov 24 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.viewFunction = exports.DateTableCellBaseProps = exports.DateTableCellBase = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _cell = require("../cell");
var _combine_classes = require("../../../../../utils/combine_classes");
var _const = require("../../const");
const _excluded = ["allDay", "ariaLabel", "children", "className", "contentTemplateProps", "dataCellTemplate", "endDate", "firstDayOfMonth", "groupIndex", "groups", "index", "isFirstGroupCell", "isFocused", "isLastGroupCell", "isSelected", "otherMonth", "startDate", "text", "today"];
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const ADD_APPOINTMENT_LABEL = 'Add appointment';
const viewFunction = _ref => {
  let {
    ariaLabel,
    classes,
    dataCellTemplateProps,
    props: {
      children,
      dataCellTemplate: DataCellTemplate,
      isFirstGroupCell,
      isLastGroupCell
    }
  } = _ref;
  return (0, _inferno.createComponentVNode)(2, _cell.CellBase, {
    "isFirstGroupCell": isFirstGroupCell,
    "isLastGroupCell": isLastGroupCell,
    "className": classes,
    "ariaLabel": ariaLabel,
    children: [!DataCellTemplate && children, !!DataCellTemplate && DataCellTemplate({
      index: dataCellTemplateProps.index,
      data: dataCellTemplateProps.data
    })]
  });
};
exports.viewFunction = viewFunction;
const DateTableCellBaseProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(_cell.CellBaseProps), Object.getOwnPropertyDescriptors({
  otherMonth: false,
  today: false,
  firstDayOfMonth: false,
  isSelected: false,
  isFocused: false
})));
exports.DateTableCellBaseProps = DateTableCellBaseProps;
const getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props))) : TemplateProp);
let DateTableCellBase = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(DateTableCellBase, _BaseInfernoComponent);
  function DateTableCellBase(props) {
    var _this;
    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {};
    _this.__getterCache = {};
    return _this;
  }
  var _proto = DateTableCellBase.prototype;
  _proto.componentWillUpdate = function componentWillUpdate(nextProps, nextState, context) {
    if (this.props['allDay'] !== nextProps['allDay'] || this.props['contentTemplateProps'] !== nextProps['contentTemplateProps'] || this.props['endDate'] !== nextProps['endDate'] || this.props['groupIndex'] !== nextProps['groupIndex'] || this.props['groups'] !== nextProps['groups'] || this.props['index'] !== nextProps['index'] || this.props['startDate'] !== nextProps['startDate']) {
      this.__getterCache['dataCellTemplateProps'] = undefined;
    }
  };
  _proto.render = function render() {
    const props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        dataCellTemplate: getTemplate(props.dataCellTemplate)
      }),
      classes: this.classes,
      dataCellTemplateProps: this.dataCellTemplateProps,
      ariaLabel: this.ariaLabel,
      restAttributes: this.restAttributes
    });
  };
  _createClass(DateTableCellBase, [{
    key: "classes",
    get: function () {
      const {
        allDay,
        className,
        isFocused,
        isSelected
      } = this.props;
      return (0, _combine_classes.combineClasses)({
        'dx-scheduler-cell-sizes-horizontal': true,
        'dx-scheduler-cell-sizes-vertical': !allDay,
        [_const.DATE_TABLE_CELL_CLASS]: !allDay,
        'dx-state-focused': isSelected,
        'dx-scheduler-focused-cell': isFocused,
        [className]: true
      });
    }
  }, {
    key: "dataCellTemplateProps",
    get: function () {
      if (this.__getterCache['dataCellTemplateProps'] !== undefined) {
        return this.__getterCache['dataCellTemplateProps'];
      }
      return this.__getterCache['dataCellTemplateProps'] = (() => {
        const {
          allDay,
          contentTemplateProps,
          endDate,
          groupIndex,
          groups,
          index,
          startDate
        } = this.props;
        return {
          data: _extends({
            startDate,
            endDate,
            groups,
            groupIndex: groups ? groupIndex : undefined,
            text: '',
            allDay: !!allDay || undefined
          }, contentTemplateProps.data),
          index
        };
      })();
    }
  }, {
    key: "ariaLabel",
    get: function () {
      return this.props.isSelected ? ADD_APPOINTMENT_LABEL : undefined;
    }
  }, {
    key: "restAttributes",
    get: function () {
      const _this$props = this.props,
        restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
      return restProps;
    }
  }]);
  return DateTableCellBase;
}(_inferno2.BaseInfernoComponent);
exports.DateTableCellBase = DateTableCellBase;
DateTableCellBase.defaultProps = DateTableCellBaseProps;
