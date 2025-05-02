/**
* DevExtreme (esm/__internal/pagination/common/pagination_props.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { BasePaginationDefaultProps } from './base_pagination_props';
export const PaginationDefaultProps = _extends({}, BasePaginationDefaultProps, {
  pageSize: 5,
  pageIndex: 1,
  pageIndexChangedInternal: () => {},
  pageSizeChangedInternal: () => {}
});
