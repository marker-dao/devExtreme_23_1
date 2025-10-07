/**
* DevExtreme (esm/__internal/grids/new/card_view/content_view/content/card/value_text.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createVNode, createComponentVNode } from "inferno";
import { getPublicElement } from '../../../../../../../core/element';
import $ from '../../../../../../../core/renderer';
import { Component, createRef } from 'inferno';
const ROOT_CLASS = 'dx-cardview-field-value';
const CLASS = {
  root: ROOT_CLASS,
  textPartHighlighted: `${ROOT_CLASS}__text-part--highlighted`
};
export class ValueText extends Component {
  constructor() {
    super(...arguments);
    this.ref = createRef();
    this.onClick = e => {
      var _this$props$onClick, _this$props;
      const args = {
        event: e,
        fieldValueElement: getPublicElement($(this.ref.current)),
        field: this.props.field
      };
      (_this$props$onClick = (_this$props = this.props).onClick) === null || _this$props$onClick === void 0 || _this$props$onClick.call(_this$props, args);
    };
    this.onDblClick = e => {
      var _this$props$onDblClic, _this$props2;
      const args = {
        event: e,
        fieldValueElement: getPublicElement($(this.ref.current)),
        field: this.props.field
      };
      (_this$props$onDblClic = (_this$props2 = this.props).onDblClick) === null || _this$props$onDblClic === void 0 || _this$props$onDblClic.call(_this$props2, args);
    };
  }
  render() {
    const classNames = [CLASS.root, `${CLASS.root}--text-align-${this.props.field.column.alignment}`].join(' ');
    const content = this.props.field.highlightedText ? this.props.field.highlightedText.map(_ref => {
      let {
        type,
        text: textPart
      } = _ref;
      return createVNode(1, "span", type === 'highlighted' ? CLASS.textPartHighlighted : '', textPart, 0);
    }) : this.props.field.text;
    const Template = this.props.template;
    return createVNode(1, "div", classNames, Template ? createComponentVNode(2, Template, {
      "field": this.props.field
    }) : content, 0, {
      "onClick": this.onClick,
      "onDblClick": this.onDblClick,
      "title": this.props.fieldHintEnabled ? this.props.field.text : undefined
    }, null, this.ref);
  }
  componentDidMount() {
    var _this$props$onPrepare, _this$props3;
    const args = {
      fieldValueElement: getPublicElement($(this.ref.current)),
      field: this.props.field
    };
    (_this$props$onPrepare = (_this$props3 = this.props).onPrepared) === null || _this$props$onPrepare === void 0 || _this$props$onPrepare.call(_this$props3, args);
  }
}
