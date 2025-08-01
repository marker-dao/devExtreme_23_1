/**
* DevExtreme (esm/__internal/pagination/pages/page.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createComponentVNode } from "inferno";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { BaseInfernoComponent } from '../../core/r1/runtime/inferno/index';
import { format } from '../../../core/utils/string';
import { combineClasses } from '../../core/r1/utils/render_utils';
import { PAGINATION_PAGE_CLASS, PAGINATION_SELECTION_CLASS } from '../common/consts';
import { LightButton } from '../common/light_button';
import { getLocalizationMessage } from '../utils/compatibility_utils';
/* istanbul ignore next: class has only props default */
export const PageDefaultProps = {
  index: 0,
  selected: false,
  className: PAGINATION_PAGE_CLASS
};
export class Page extends BaseInfernoComponent {
  constructor() {
    super(...arguments);
    this.state = {};
    this.refs = null;
  }
  getLabel() {
    return format(getLocalizationMessage(this.context, 'dxPagination-page'), this.getValue());
  }
  getValue() {
    return this.props.index + 1;
  }
  getClassName() {
    return combineClasses({
      [`${this.props.className}`]: !!this.props.className,
      [PAGINATION_SELECTION_CLASS]: !!this.props.selected
    });
  }
  render() {
    return createComponentVNode(2, LightButton, {
      "className": this.getClassName(),
      "label": this.getLabel(),
      "onClick": this.props.onClick,
      "selected": this.props.selected,
      children: this.getValue()
    });
  }
}
Page.defaultProps = PageDefaultProps;
