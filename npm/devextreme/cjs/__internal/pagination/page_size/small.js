/**
* DevExtreme (cjs/__internal/pagination/page_size/small.js)
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
exports.PageSizeSmall = void 0;
var _inferno = require("inferno");
var _index = require("../../core/r1/runtime/inferno/index");
var _pagination_props = require("../common/pagination_props");
var _select_box = require("../drop_down_editors/select_box");
var _calculate_values_fitted_width = require("../utils/calculate_values_fitted_width");
var _compatibility_utils = require("../utils/compatibility_utils");
var _get_element_width = require("../utils/get_element_width");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const PaginationSmallDefaultProps = {
  allowedPageSizes: []
};
const PageSizeSmallDefaultProps = _extends({}, PaginationSmallDefaultProps, {
  pageSize: _pagination_props.PaginationDefaultProps.pageSize,
  pageSizeChangedInternal: _pagination_props.PaginationDefaultProps.pageSizeChangedInternal
});
class PageSizeSmall extends _index.InfernoComponent {
  constructor(props) {
    super(props);
    this.state = {
      minWidth: 10
    };
    this.refs = null;
    this.updateWidth = this.updateWidth.bind(this);
  }
  componentWillUpdate(nextProps, nextState, context) {
    super.componentWillUpdate(nextProps, nextState, context);
  }
  createEffects() {
    const dependency = [this.props, this.state.minWidth, this.props.pageSize, this.props.pageSizeChangedInternal, this.props.allowedPageSizes];
    return [new _index.InfernoEffect(this.updateWidth, dependency)];
  }
  updateEffects() {
    var _this$_effects$;
    const dependency = [this.props, this.state.minWidth, this.props.pageSize, this.props.pageSizeChangedInternal, this.props.allowedPageSizes];
    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 || _this$_effects$.update(dependency);
  }
  updateWidth() {
    var _this$props$parentRef;
    const minWidth = (0, _get_element_width.getElementMinWidth)((_this$props$parentRef = this.props.parentRef) === null || _this$props$parentRef === void 0 ? void 0 : _this$props$parentRef.current);
    this.setState(state => ({
      minWidth: minWidth > 0 ? minWidth : state.minWidth
    }));
  }
  getWidth() {
    var _this$props$allowedPa;
    return (0, _calculate_values_fitted_width.calculateValuesFittedWidth)(this.state.minWidth, (_this$props$allowedPa = this.props.allowedPageSizes) === null || _this$props$allowedPa === void 0 ? void 0 : _this$props$allowedPa.map(p => p.value));
  }
  getInputAttributes() {
    return {
      'aria-label': (0, _compatibility_utils.getLocalizationMessage)(this.context, 'dxPagination-ariaPageSize')
    };
  }
  render() {
    const {
      allowedPageSizes,
      pageSize,
      pageSizeChangedInternal
    } = this.props;
    return (0, _inferno.createComponentVNode)(2, _select_box.SelectBox, {
      "displayExpr": "text",
      "valueExpr": "value",
      "dataSource": allowedPageSizes,
      "value": pageSize,
      "valueChange": pageSizeChangedInternal,
      "width": this.getWidth(),
      "inputAttr": this.getInputAttributes()
    });
  }
}
exports.PageSizeSmall = PageSizeSmall;
PageSizeSmall.defaultProps = PageSizeSmallDefaultProps;
