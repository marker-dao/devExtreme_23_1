/**
* DevExtreme (cjs/renovation/ui/scheduler/workspaces/base/group_panel/vertical/layout.js)
* Version: 23.2.2
* Build date: Mon Nov 20 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.viewFunction = exports.VerticalGroupPanelLayoutProps = exports.GroupPanelVerticalLayout = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _row = require("./row");
var _utils = require("../../../utils");
var _group_panel_layout_props = require("../group_panel_layout_props");
const _excluded = ["className", "elementRef", "groupByDate", "groupPanelData", "height", "resourceCellTemplate", "styles"];
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const viewFunction = _ref => {
  let {
    props: {
      className,
      elementRef,
      groupPanelData,
      resourceCellTemplate
    },
    style
  } = _ref;
  return (0, _inferno.createVNode)(1, "div", className, (0, _inferno.createVNode)(1, "div", "dx-scheduler-group-flex-container", groupPanelData.groupPanelItems.map(group => (0, _inferno.createComponentVNode)(2, _row.Row, {
    "groupItems": group,
    "cellTemplate": resourceCellTemplate
  }, group[0].key)), 0), 2, {
    "style": (0, _inferno2.normalizeStyles)(style)
  }, null, elementRef);
};
exports.viewFunction = viewFunction;
const VerticalGroupPanelLayoutProps = _group_panel_layout_props.GroupPanelLayoutProps;
exports.VerticalGroupPanelLayoutProps = VerticalGroupPanelLayoutProps;
const getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props))) : TemplateProp);
let GroupPanelVerticalLayout = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(GroupPanelVerticalLayout, _BaseInfernoComponent);
  function GroupPanelVerticalLayout(props) {
    var _this;
    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {};
    return _this;
  }
  var _proto = GroupPanelVerticalLayout.prototype;
  _proto.render = function render() {
    const props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        resourceCellTemplate: getTemplate(props.resourceCellTemplate)
      }),
      style: this.style,
      restAttributes: this.restAttributes
    });
  };
  _createClass(GroupPanelVerticalLayout, [{
    key: "style",
    get: function () {
      const {
        height,
        styles
      } = this.props;
      return (0, _utils.addHeightToStyle)(height, styles);
    }
  }, {
    key: "restAttributes",
    get: function () {
      const _this$props = this.props,
        restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
      return restProps;
    }
  }]);
  return GroupPanelVerticalLayout;
}(_inferno2.BaseInfernoComponent);
exports.GroupPanelVerticalLayout = GroupPanelVerticalLayout;
GroupPanelVerticalLayout.defaultProps = VerticalGroupPanelLayoutProps;