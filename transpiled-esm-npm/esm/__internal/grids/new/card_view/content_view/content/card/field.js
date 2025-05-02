import { createVNode, createFragment, createComponentVNode } from "inferno";
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, createRef } from 'inferno';
import { Caption } from './caption';
import { ValueText } from './value_text';
export const CLASSES = {
  fieldTemplate: 'dx-cardview-field-template',
  overflowHint: 'dx-cardview-overflow-hint'
};
export class Field extends Component {
  constructor(props) {
    super(props);
    this.containerRef = this.props.elementRef ?? createRef();
  }
  componentDidMount() {
    var _this$props$onPrepare, _this$props;
    (_this$props$onPrepare = (_this$props = this.props).onPrepared) === null || _this$props$onPrepare === void 0 || _this$props$onPrepare.call(_this$props, this.containerRef.current);
  }
  render() {
    const Template = this.props.template;
    if (Template) {
      return createVNode(1, "div", CLASSES.fieldTemplate, createComponentVNode(2, Template, {
        "field": this.props.field
      }), 2);
    }
    return createFragment([createComponentVNode(2, Caption, {
      "field": this.props.field,
      "template": this.props.captionTemplate
    }), createComponentVNode(2, ValueText, {
      "fieldHintEnabled": this.props.fieldHintEnabled,
      "field": this.props.field,
      "template": this.props.valueTemplate
    })], 4);
  }
}