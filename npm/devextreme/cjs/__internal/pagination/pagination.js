/**
* DevExtreme (cjs/__internal/pagination/pagination.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pagination = void 0;
var _inferno = require("inferno");
var _index = require("../core/r1/runtime/inferno/index");
var _render_utils = require("../core/r1/utils/render_utils");
var _pagination_props = require("./common/pagination_props");
var _content = require("./content");
var _resizable_container = require("./resizable_container");
var _compatibility_utils = require("./utils/compatibility_utils");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
class Pagination extends _index.InfernoWrapperComponent {
  constructor(props) {
    super(props);
    this.__getterCache = {};
    this.pageIndexChangedInternal = this.pageIndexChangedInternal.bind(this);
    this.pageSizeChangedInternal = this.pageSizeChangedInternal.bind(this);
  }
  createEffects() {
    return [(0, _index.createReRenderEffect)()];
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
    return (0, _render_utils.combineClasses)({
      'dx-datagrid-pager': (0, _compatibility_utils.isGridCompatibilityMode)(this.context),
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
    return (0, _inferno.createComponentVNode)(2, _resizable_container.ResizableContainer, {
      "contentTemplate": _content.PaginationContent,
      "paginationProps": this.getPaginationProps()
    });
  }
}
exports.Pagination = Pagination;
Pagination.defaultProps = _pagination_props.PaginationDefaultProps;
