/**
* DevExtreme (esm/__internal/pagination/pagination.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { createComponentVNode } from "inferno";
import { createReRenderEffect, InfernoWrapperComponent } from '../core/r1/runtime/inferno/index';
import { combineClasses } from '../core/r1/utils/render_utils';
import { PaginationDefaultProps } from './common/pagination_props';
import { PaginationContent } from './content';
import { ResizableContainer } from './resizable_container';
import { isGridCompatibilityMode } from './utils/compatibility_utils';
export class Pagination extends InfernoWrapperComponent {
  constructor(props) {
    super(props);
    this.__getterCache = {};
    this.pageIndexChangedInternal = this.pageIndexChangedInternal.bind(this);
    this.pageSizeChangedInternal = this.pageSizeChangedInternal.bind(this);
  }
  createEffects() {
    return [createReRenderEffect()];
  }
  pageIndexChangedInternal(newPageIndex) {
    const newValue = newPageIndex + 1;
    this.setState(() => ({
      pageIndex: newValue
    }));
    this.props.pageIndexChangedInternal(newValue);
  }
  getPageIndex() {
    return this.props.pageIndex - 1;
  }
  pageSizeChangedInternal(newPageSize) {
    this.setState(() => ({
      pageSize: newPageSize
    }));
    this.props.pageSizeChangedInternal(newPageSize);
  }
  getClassName() {
    return combineClasses({
      'dx-datagrid-pager': isGridCompatibilityMode(this.context),
      [`${this.props.className}`]: !!this.props.className
    });
  }
  getPaginationProps() {
    return _extends({}, this.props, {
      className: this.getClassName(),
      pageIndex: this.getPageIndex(),
      // eslint-disable-next-line @stylistic/max-len
      pageIndexChangedInternal: pageIndex => this.pageIndexChangedInternal(pageIndex),
      pageSizeChangedInternal: pageSize => this.pageSizeChangedInternal(pageSize)
    });
  }
  render() {
    return createComponentVNode(2, ResizableContainer, {
      "contentTemplate": PaginationContent,
      "paginationProps": this.getPaginationProps()
    });
  }
}
Pagination.defaultProps = PaginationDefaultProps;
