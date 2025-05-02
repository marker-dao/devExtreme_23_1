import { createVNode, createFragment, createComponentVNode } from "inferno";
import messageLocalization from '../../../../../../../localization/message';
import { combineClasses } from '../../../../../../core/utils/combine_classes';
import { Icon } from '../../../../../../grids/new/grid_core/icon';
import { Component } from 'inferno';
export const CLASSES = {
  cover: 'dx-card-cover',
  image: 'dx-card-cover-image',
  noImage: 'dx-card-cover-noimage'
};
export class Cover extends Component {
  render() {
    const {
      imageSrc,
      alt,
      template: Template,
      card
    } = this.props;
    const src = imageSrc;
    const containerClasses = combineClasses({
      [CLASSES.cover]: true,
      [CLASSES.noImage]: !src
    });
    return createVNode(1, "div", containerClasses, Template ? createComponentVNode(2, Template, {
      "card": card
    }) : createFragment([src && createVNode(1, "img", CLASSES.image, null, 1, {
      "src": src,
      "alt": alt
    }), !src && createComponentVNode(2, Icon, {
      "name": 'imagethumbnail',
      "aria-label": messageLocalization.format('dxCardView-cardNoImageAriaLabel')
    })], 0), 0);
  }
}