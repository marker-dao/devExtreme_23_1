import _extends from "@babel/runtime/helpers/esm/extends";
import { createVNode, createFragment, createComponentVNode, normalizeProps } from "inferno";
import { Component } from 'inferno';
import { CLASSES } from '../../const';
import { Form } from '../../inferno_wrappers/form';
import { Popup } from '../../inferno_wrappers/popup';
import { Scrollable } from '../../inferno_wrappers/scrollable';
export class EditPopup extends Component {
  render() {
    if (!this.props.data) {
      return createFragment();
    }
    const toolbarItems = [{
      toolbar: 'bottom',
      location: 'after',
      widget: 'dxButton',
      options: {
        text: 'Save',
        onClick: this.props.onSave,
        stylingMode: 'contained',
        type: 'default'
      }
    }, {
      toolbar: 'bottom',
      location: 'after',
      widget: 'dxButton',
      options: {
        text: 'Cancel',
        onClick: this.props.onCancel,
        stylingMode: 'contained',
        type: 'default'
      }
    }];
    return createVNode(1, "div", CLASSES.excludeFlexBox, createComponentVNode(2, Popup, {
      "visible": true,
      "toolbarItems": toolbarItems,
      "onHidden": this.props.onHide,
      "showTitle": false,
      children: createComponentVNode(2, Scrollable, {
        children: normalizeProps(createComponentVNode(2, Form, _extends({
          "componentRef": this.props.formRef,
          "colCount": 2,
          "formData": this.props.data,
          "customizeItem": this.props.customizeItem,
          "items": this.props.items
        }, this.props.formProps)))
      })
    }), 2);
  }
}