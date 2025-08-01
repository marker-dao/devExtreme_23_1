/**
* DevExtreme (cjs/__internal/grids/new/card_view/content_view/content/card/field.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Field = exports.CLASSES = void 0;
var _inferno = require("inferno");
var _caption = require("./caption");
var _value_text = require("./value_text");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* eslint-disable @typescript-eslint/no-non-null-assertion */
const CLASSES = exports.CLASSES = {
  fieldTemplate: 'dx-cardview-field-template',
  overflowHint: 'dx-cardview-overflow-hint'
};
class Field extends _inferno.Component {
  constructor(props) {
    super(props);
    this.containerRef = this.props.elementRef ?? (0, _inferno.createRef)();
  }
  componentDidMount() {
    var _this$props$onPrepare, _this$props;
    (_this$props$onPrepare = (_this$props = this.props).onPrepared) === null || _this$props$onPrepare === void 0 || _this$props$onPrepare.call(_this$props, this.containerRef.current);
  }
  render() {
    const Template = this.props.template;
    if (Template) {
      return (0, _inferno.createVNode)(1, "div", CLASSES.fieldTemplate, (0, _inferno.createComponentVNode)(2, Template, {
        "field": this.props.field
      }), 2);
    }
    return (0, _inferno.createFragment)([(0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _caption.Caption, _extends({
      "field": this.props.field,
      "template": this.props.captionTemplate
    }, this.props.captionProps))), (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _value_text.ValueText, _extends({
      "fieldHintEnabled": this.props.fieldHintEnabled,
      "field": this.props.field,
      "template": this.props.valueTemplate
    }, this.props.valueProps)))], 4);
  }
}
exports.Field = Field;
