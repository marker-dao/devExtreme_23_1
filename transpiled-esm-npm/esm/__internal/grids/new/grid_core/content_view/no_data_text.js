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