/**
* DevExtreme (esm/__internal/grids/new/grid_core/filtering/header_filter/view.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createVNode } from "inferno";
import $ from '../../../../../../core/renderer';
import { computed, effect } from '@preact/signals-core';
import { HeaderFilterView as OldHeaderFilterPopup } from '../../../../../grids/grid_core/header_filter/m_header_filter_core';
import { View } from '../../../../../grids/new/grid_core/core/view';
import { WidgetMock } from '../../../../../grids/new/grid_core/widget_mock';
import { Component, createRef } from 'inferno';
import { CLASSES } from '../../const';
import { HeaderFilterViewController } from './view_controller';
export class HeaderFilterPopupComponent extends Component {
  constructor() {
    super(...arguments);
    this.containerRef = createRef();
  }
  render() {
    return createVNode(1, "div", CLASSES.excludeFlexBox, null, 1, null, null, this.containerRef);
  }
  componentDidMount() {
    this.props.oldHeaderFilterPopup.render($(this.containerRef.current ?? undefined));
  }
  componentDidUpdate() {
    this.props.oldHeaderFilterPopup.render($(this.containerRef.current ?? undefined));
  }
  componentWillUnmount() {
    this.props.oldHeaderFilterPopup.dispose();
  }
}
export class HeaderFilterPopupView extends View {
  constructor(widget, headerFilterViewController) {
    super();
    this.widget = widget;
    this.headerFilterViewController = headerFilterViewController;
    this.component = HeaderFilterPopupComponent;
    this.oldHeaderFilterPopup = new OldHeaderFilterPopup(this.widget);
    this.oldHeaderFilterPopup.init();
    effect(() => {
      const popupState = this.headerFilterViewController.popupState.value;
      if (!popupState) {
        return;
      }
      this.oldHeaderFilterPopup.showHeaderFilterMenu($(popupState.element), popupState.options);
    });
  }
  getProps() {
    return computed(() => ({
      oldHeaderFilterPopup: this.oldHeaderFilterPopup
    }));
  }
}
HeaderFilterPopupView.dependencies = [WidgetMock, HeaderFilterViewController];
