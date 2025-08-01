/**
* DevExtreme (esm/__internal/pagination/page_size/selector.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createVNode, createComponentVNode } from "inferno";
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { InfernoComponent, InfernoEffect } from '../../core/r1/runtime/inferno/index';
import { createRef as infernoCreateRef } from 'inferno';
import { PAGINATION_PAGE_SIZES_CLASS } from '../common/consts';
import { PaginationDefaultProps } from '../common/pagination_props';
import { getLocalizationMessage } from '../utils/compatibility_utils';
import { PageSizeLarge } from './large';
import { PageSizeSmall } from './small';
const PageSizeSelectorDefaultProps = {
  isLargeDisplayMode: true,
  pageSize: PaginationDefaultProps.pageSize,
  pageSizeChangedInternal: PaginationDefaultProps.pageSizeChangedInternal,
  allowedPageSizes: PaginationDefaultProps.allowedPageSizes
};
export class PageSizeSelector extends InfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.refs = null;
    this.rootElementRef = infernoCreateRef();
    this.htmlRef = infernoCreateRef();
    this.__getterCache = {
      normalizedPageSizes: undefined
    };
    this.setRootElementRef = this.setRootElementRef.bind(this);
  }
  createEffects() {
    return [new InfernoEffect(this.setRootElementRef, [])];
  }
  setRootElementRef() {
    const {
      rootElementRef
    } = this.props;
    if (rootElementRef) {
      rootElementRef.current = this.htmlRef.current;
    }
  }
  getAllText() {
    return getLocalizationMessage(this.context, 'dxPagination-pageSizesAllText');
  }
  getNormalizedPageSizes() {
    if (this.__getterCache.normalizedPageSizes !== undefined) {
      return this.__getterCache.normalizedPageSizes;
    }
    const mapFunction = p => p === 'all' || p === 0 ? {
      text: this.getAllText(),
      value: 0
    } : {
      text: String(p),
      value: p
    };
    // eslint-disable-next-line @stylistic/max-len
    const result = this.props.allowedPageSizes.map(mapFunction);
    this.__getterCache.normalizedPageSizes = result;
    return result;
  }
  componentWillUpdate(nextProps) {
    super.componentWillUpdate();
    if (this.props.allowedPageSizes !== nextProps.allowedPageSizes) {
      this.__getterCache.normalizedPageSizes = undefined;
    }
  }
  render() {
    const normalizedPageSizes = this.getNormalizedPageSizes();
    const {
      pageSize,
      pageSizeChangedInternal,
      isLargeDisplayMode
    } = this.props;
    return createVNode(1, "div", PAGINATION_PAGE_SIZES_CLASS, [isLargeDisplayMode && createComponentVNode(2, PageSizeLarge, {
      "allowedPageSizes": normalizedPageSizes,
      "pageSize": pageSize,
      "pageSizeChangedInternal": pageSizeChangedInternal
    }), !isLargeDisplayMode && createComponentVNode(2, PageSizeSmall, {
      "parentRef": this.htmlRef,
      "allowedPageSizes": normalizedPageSizes,
      "pageSize": pageSize,
      "pageSizeChangedInternal": pageSizeChangedInternal
    })], 0, null, null, this.htmlRef);
  }
}
PageSizeSelector.defaultProps = PageSizeSelectorDefaultProps;
