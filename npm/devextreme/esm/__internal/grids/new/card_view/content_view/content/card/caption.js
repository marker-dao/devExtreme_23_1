/**
* DevExtreme (esm/__internal/grids/new/card_view/content_view/content/card/caption.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createVNode, createFragment, createComponentVNode, createTextVNode } from "inferno";
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getPublicElement } from '../../../../../../../core/element';
import $ from '../../../../../../../core/renderer';
import { Component, createRef } from 'inferno';
export class Caption extends Component {
  constructor() {
    super(...arguments);
    this.ref = createRef();
    this.onClick = e => {
      var _this$props$onClick, _this$props;
      const args = {
        event: e,
        fieldCaptionElement: getPublicElement($(this.ref.current)),
        field: this.props.field
      };
      (_this$props$onClick = (_this$props = this.props).onClick) === null || _this$props$onClick === void 0 || _this$props$onClick.call(_this$props, args);
    };
    this.onDblClick = e => {
      var _this$props$onDblClic, _this$props2;
      const args = {
        event: e,
        fieldCaptionElement: getPublicElement($(this.ref.current)),
        field: this.props.field
      };
      (_this$props$onDblClic = (_this$props2 = this.props).onDblClick) === null || _this$props$onDblClic === void 0 || _this$props$onDblClic.call(_this$props2, args);
    };
  }
  render() {
    const Template = this.props.template;
    return createVNode(1, "div", "dx-cardview-field-caption", Template ? createComponentVNode(2, Template, {
      "field": this.props.field
    }) : createFragment([this.props.field.column.caption, createTextVNode(":")], 0), 0, {
      "onClick": this.onClick,
      "onDblClick": this.onDblClick
    }, null, this.ref);
  }
  componentDidMount() {
    var _this$props$onPrepare, _this$props3;
    const args = {
      fieldCaptionElement: getPublicElement($(this.ref.current)),
      field: this.props.field
    };
    (_this$props$onPrepare = (_this$props3 = this.props).onPrepared) === null || _this$props$onPrepare === void 0 || _this$props$onPrepare.call(_this$props3, args);
  }
}
