/**
* DevExtreme (esm/__internal/grids/new/grid_core/editing/popup/component.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { createVNode, createFragment, createComponentVNode, normalizeProps } from "inferno";
import { Component } from 'inferno';
import { CLASSES } from '../../const';
import { Form } from '../../inferno_wrappers/form';
import { Popup } from '../../inferno_wrappers/popup';
import { getCancelButtonConfig, getSaveButtonConfig } from './buttons';
export class EditPopup extends Component {
  render() {
    if (!this.props.visible) {
      // TODO: research whether it is good approach
      // @ts-expect-error
      this.props.formRef.current = null;
      return createFragment();
    }
    const toolbarItems = [getSaveButtonConfig({
      onSave: this.props.onSave,
      text: this.props.texts.saveCard
    }), getCancelButtonConfig({
      onCancel: this.props.onCancel,
      text: this.props.texts.cancel
    })];
    return createVNode(1, "div", CLASSES.excludeFlexBox, normalizeProps(createComponentVNode(2, Popup, _extends({
      "visible": true,
      "toolbarItems": toolbarItems,
      "onHidden": this.props.onHide,
      "showTitle": false
    }, this.props.popupProps, {
      children: normalizeProps(createComponentVNode(2, Form, _extends({
        "componentRef": this.props.formRef,
        "colCount": 2,
        "labelLocation": 'top',
        "customizeItem": this.props.customizeItem,
        "items": this.props.items
      }, this.props.formProps)))
    }))), 2);
  }
}
