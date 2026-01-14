"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaginationDefaultProps = void 0;
var _base_pagination_props = require("./base_pagination_props");
const PaginationDefaultProps = exports.PaginationDefaultProps = Object.assign({}, _base_pagination_props.BasePaginationDefaultProps, {
  pageSize: 5,
  pageIndex: 1,
  pageIndexChangedInternal: () => {},
  pageSizeChangedInternal: () => {}
});