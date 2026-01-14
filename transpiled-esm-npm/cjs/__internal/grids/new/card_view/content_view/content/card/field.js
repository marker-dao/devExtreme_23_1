"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Field = exports.CLASSES = void 0;
var _inferno = require("inferno");
var _caption = require("./caption");
var _value_text = require("./value_text");
/* eslint-disable @typescript-eslint/no-non-null-assertion */

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
    return (0, _inferno.createFragment)([(0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _caption.Caption, Object.assign({
      "field": this.props.field,
      "template": this.props.captionTemplate
    }, this.props.captionProps))), (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _value_text.ValueText, Object.assign({
      "fieldHintEnabled": this.props.fieldHintEnabled,
      "field": this.props.field,
      "template": this.props.valueTemplate
    }, this.props.valueProps)))], 4);
  }
}
exports.Field = Field;