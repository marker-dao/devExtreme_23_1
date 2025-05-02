import _extends from "@babel/runtime/helpers/esm/extends";
import { createComponentVNode } from "inferno";
import { InfernoComponent, InfernoEffect } from '../../core/r1/runtime/inferno/index';
import { PaginationDefaultProps } from '../common/pagination_props';
import { SelectBox } from '../drop_down_editors/select_box';
import { calculateValuesFittedWidth } from '../utils/calculate_values_fitted_width';
import { getLocalizationMessage } from '../utils/compatibility_utils';
import { getElementMinWidth } from '../utils/get_element_width';
const PaginationSmallDefaultProps = {
  allowedPageSizes: []
};
const PageSizeSmallDefaultProps = _extends({}, PaginationSmallDefaultProps, {
  pageSize: PaginationDefaultProps.pageSize,
  pageSizeChangedInternal: PaginationDefaultProps.pageSizeChangedInternal
});
export class PageSizeSmall extends InfernoComponent {
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
    return [new InfernoEffect(this.updateWidth, dependency)];
  }
  updateEffects() {
    var _this$_effects$;
    const dependency = [this.props, this.state.minWidth, this.props.pageSize, this.props.pageSizeChangedInternal, this.props.allowedPageSizes];
    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 || _this$_effects$.update(dependency);
  }
  updateWidth() {
    var _this$props$parentRef;
    const minWidth = getElementMinWidth((_this$props$parentRef = this.props.parentRef) === null || _this$props$parentRef === void 0 ? void 0 : _this$props$parentRef.current);
    this.setState(state => ({
      minWidth: minWidth > 0 ? minWidth : state.minWidth
    }));
  }
  getWidth() {
    var _this$props$allowedPa;
    return calculateValuesFittedWidth(this.state.minWidth, (_this$props$allowedPa = this.props.allowedPageSizes) === null || _this$props$allowedPa === void 0 ? void 0 : _this$props$allowedPa.map(p => p.value));
  }
  getInputAttributes() {
    return {
      'aria-label': getLocalizationMessage(this.context, 'dxPagination-ariaPageSize')
    };
  }
  render() {
    const {
      allowedPageSizes,
      pageSize,
      pageSizeChangedInternal
    } = this.props;
    return createComponentVNode(2, SelectBox, {
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
PageSizeSmall.defaultProps = PageSizeSmallDefaultProps;