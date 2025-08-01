/**
* DevExtreme (esm/__internal/pagination/drop_down_editors/select_box.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { createComponentVNode } from "inferno";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseInfernoComponent } from '../../core/r1/runtime/inferno/index';
import LegacySelectBox from '../../../ui/select_box';
import { DomComponentWrapper } from '../../core/r1/dom_component_wrapper';
import { EditorLabelDefaultProps } from '../editors/common/editor_label_props';
import { EditorDefaultProps } from '../editors/common/editor_props';
import { EditorStateDefaultProps } from '../editors/common/editor_state_props';
export const NumberBoxDefaultProps = _extends({}, EditorDefaultProps, EditorStateDefaultProps, EditorLabelDefaultProps, {
  placeholder: '',
  hoverStateEnabled: true,
  searchEnabled: false,
  value: null,
  isReactComponentWrapper: true
});
export class SelectBox extends BaseInfernoComponent {
  constructor() {
    super(...arguments);
    this.state = {};
    this.refs = null;
  }
  /* istanbul ignore next: WA for Angular */
  get componentProps() {
    return this.props;
  }
  render() {
    return createComponentVNode(2, DomComponentWrapper, {
      "componentType": LegacySelectBox,
      "componentProps": this.componentProps,
      "templateNames": ['dropDownButtonTemplate', 'groupTemplate', 'itemTemplate']
    });
  }
}
SelectBox.defaultProps = NumberBoxDefaultProps;
