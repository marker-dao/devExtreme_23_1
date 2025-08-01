/**
* DevExtreme (esm/__internal/grids/new/grid_core/content_view/no_data_text.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createVNode, createComponentVNode } from "inferno";
import { Component } from 'inferno';
import { Icon } from '../icon';
export const CLASSES = {
  container: 'dx-gridcore-nodata-container',
  element: 'dx-gridcore-nodata-element',
  iconContainer: 'dx-gridcore-nodata-icon-container',
  text: 'dx-gridcore-nodata-text'
};
export class NoDataText extends Component {
  render() {
    const Template = this.props.template;
    return createVNode(1, "div", CLASSES.container, Template ? createComponentVNode(2, Template, {
      "text": this.props.text
    }) : createVNode(1, "div", CLASSES.element, [createVNode(1, "div", CLASSES.iconContainer, createComponentVNode(2, Icon, {
      "name": 'cardcontent'
    }), 2), createVNode(1, "div", CLASSES.text, this.props.text, 0)], 4), 0);
  }
}
