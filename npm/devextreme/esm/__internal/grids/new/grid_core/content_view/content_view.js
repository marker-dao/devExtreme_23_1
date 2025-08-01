/**
* DevExtreme (esm/__internal/grids/new/grid_core/content_view/content_view.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { createVNode, createComponentVNode, normalizeProps } from "inferno";
import { resizeObserverSingleton } from '../../../../core/m_resize_observer';
import { ErrorRow } from '../../../../grids/new/grid_core/content_view/error_row';
import { NoDataText } from '../../../../grids/new/grid_core/content_view/no_data_text';
import { LoadPanel } from '../../../../grids/new/grid_core/inferno_wrappers/load_panel';
import { Scrollable } from '../../../../grids/new/grid_core/inferno_wrappers/scrollable';
import { Component, createRef } from 'inferno';
export const CLASSES = {
  contentView: 'dx-gridcore-contentview'
};
export class ContentView extends Component {
  constructor() {
    super(...arguments);
    this.scrollableRef = createRef();
    this.containerRef = createRef();
    this.resizeObserverTimeout = null;
  }
  render() {
    return createVNode(1, "div", CLASSES.contentView, [normalizeProps(createComponentVNode(2, LoadPanel, _extends({}, this.props.loadPanelProps))), this.props.noDataTextProps.visible ? normalizeProps(createComponentVNode(2, NoDataText, _extends({}, this.props.noDataTextProps))) : normalizeProps(createComponentVNode(2, Scrollable, _extends({
      "componentRef": this.props.scrollableRef
    }, this.props.scrollableProps, {
      children: this.props.children
    }), null, this.scrollableRef)), normalizeProps(createComponentVNode(2, ErrorRow, _extends({}, this.props.errorRowProps)))], 0, {
      "oncontextmenu": this.props.showContextMenu
    }, null, this.containerRef);
  }
  updateSizesInfo() {
    if (this.scrollableRef.current) {
      var _this$props, _this$props$onViewpor;
      const clientHeight = this.scrollableRef.current.clientHeight();
      (_this$props = this.props) === null || _this$props === void 0 || (_this$props$onViewpor = _this$props.onViewportHeightChange) === null || _this$props$onViewpor === void 0 || _this$props$onViewpor.call(_this$props, clientHeight);
    }
  }
  componentDidMount() {
    var _this$props$onRendere, _this$props3;
    this.updateSizesInfo();
    resizeObserverSingleton.observe(this.containerRef.current, entry => {
      // NOTE: Hotfix for demos test resize windows issue
      this.resizeObserverTimeout = setTimeout(() => {
        var _this$props$onWidthCh, _this$props2;
        this.resizeObserverTimeout = null;
        (_this$props$onWidthCh = (_this$props2 = this.props).onWidthChange) === null || _this$props$onWidthCh === void 0 || _this$props$onWidthCh.call(_this$props2, entry.contentRect.width);
      }, 0);
    });
    (_this$props$onRendere = (_this$props3 = this.props).onRendered) === null || _this$props$onRendere === void 0 || _this$props$onRendere.call(_this$props3);
  }
  componentDidUpdate() {
    var _this$props$onRendere2, _this$props4;
    this.updateSizesInfo();
    (_this$props$onRendere2 = (_this$props4 = this.props).onRendered) === null || _this$props$onRendere2 === void 0 || _this$props$onRendere2.call(_this$props4);
  }
  componentWillUnmount() {
    resizeObserverSingleton.unobserve(this.containerRef.current);
    if (this.resizeObserverTimeout !== null) {
      clearTimeout(this.resizeObserverTimeout);
    }
  }
}
