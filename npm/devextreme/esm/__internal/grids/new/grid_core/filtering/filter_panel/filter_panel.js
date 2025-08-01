/**
* DevExtreme (esm/__internal/grids/new/grid_core/filtering/filter_panel/filter_panel.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createVNode, createFragment } from "inferno";
import $ from '../../../../../../core/renderer';
import { Component, createRef } from 'inferno';
import { CLASSES } from '../../const';
export class FilterPanelComponent extends Component {
  constructor() {
    super(...arguments);
    this.filterPanelRef = createRef();
    this.filterBuilderRef = createRef();
  }
  render() {
    return createFragment([createVNode(1, "div", null, null, 1, null, null, this.filterPanelRef), createVNode(1, "div", CLASSES.excludeFlexBox, null, 1, null, null, this.filterBuilderRef)], 4);
  }
  componentDidMount() {
    this.props.oldFilterPanelView.render($(this.filterPanelRef.current));
    this.props.oldFilterBuilderView.render($(this.filterBuilderRef.current));
  }
  componentDidUpdate() {
    this.props.oldFilterPanelView.render($(this.filterPanelRef.current));
    this.props.oldFilterBuilderView.render($(this.filterBuilderRef.current));
  }
}
