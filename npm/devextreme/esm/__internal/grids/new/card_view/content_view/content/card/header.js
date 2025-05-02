/**
* DevExtreme (esm/__internal/grids/new/card_view/content_view/content/card/header.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createVNode, createFragment, createComponentVNode } from "inferno";
import { isCommandKeyPressed } from '../../../../../../../common/core/events/utils/index';
import { isDefined } from '../../../../../../core/utils/m_type';
import { Toolbar } from '../../../../../../grids/new/grid_core/inferno_wrappers/toolbar';
import { Component } from 'inferno';
export const CLASSES = {
  cardHeader: 'dx-cardview-card-header',
  cardSelectCheckBox: 'dx-cardview-select-checkbox'
};
export class CardHeader extends Component {
  getCheckBoxItem() {
    const {
      isCheckBoxesRendered,
      selectCard,
      card
    } = this.props;
    if (card && isCheckBoxesRendered) {
      return {
        location: 'before',
        widget: 'dxCheckBox',
        cssClass: CLASSES.cardSelectCheckBox,
        options: {
          value: card.isSelected,
          onValueChanged: e => {
            const event = e.event;
            selectCard === null || selectCard === void 0 || selectCard(card, {
              control: isCommandKeyPressed(event),
              shift: event.shiftKey,
              needToUpdateCheckboxes: true
            });
            event.stopPropagation();
          }
        }
      };
    }
    return null;
  }
  render() {
    const {
      visible: visibleProp,
      items = [],
      captionExpr,
      template: Template,
      card,
      allowUpdating,
      allowDeleting,
      onEdit,
      onDelete
    } = this.props;
    const checkBoxItem = this.getCheckBoxItem();
    const captionItem = captionExpr && card !== null && card !== void 0 && card[captionExpr] ? {
      location: 'before',
      text: card[captionExpr]
    } : null;
    const updateButton = allowUpdating ? {
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'edit',
        onClick: onEdit,
        stylingMode: 'text'
      }
    } : null;
    const deleteButton = allowDeleting ? {
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'remove',
        onClick: onDelete,
        stylingMode: 'text'
      }
    } : null;
    const finalItems = [checkBoxItem, captionItem, updateButton, deleteButton, ...items].filter(item => !!item);
    const visible = isDefined(visibleProp) ? visibleProp : !!finalItems.length;
    if (!visible) {
      return createFragment();
    }
    return createVNode(1, "div", CLASSES.cardHeader, Template ? createComponentVNode(2, Template, {
      "card": card
    }) : createComponentVNode(2, Toolbar, {
      "items": finalItems
    }), 0);
  }
}
