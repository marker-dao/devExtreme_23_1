import { createVNode, createFragment, createComponentVNode } from "inferno";
import { isCommandKeyPressed } from '../../../../../../../common/core/events/utils/index';
import messageLocalization from '../../../../../../../localization/message';
import { isDefined } from '../../../../../../core/utils/m_type';
import { Toolbar } from '../../../../../../grids/new/grid_core/inferno_wrappers/toolbar';
import { normalizeToolbarItems } from '../../../../../../grids/new/grid_core/toolbar/utils';
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
        name: 'selectionCheckBox',
        widget: 'dxCheckBox',
        cssClass: CLASSES.cardSelectCheckBox,
        options: {
          elementAttr: {
            'aria-label': messageLocalization.format('dxCardView-ariaSelectCard')
          },
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
  getDefaultToolbarItems() {
    const {
      captionExpr,
      card,
      allowUpdating,
      allowDeleting,
      onEdit,
      onDelete
    } = this.props;
    const checkBoxItem = this.getCheckBoxItem();
    const captionItem = !!captionExpr && (card === null || card === void 0 ? void 0 : card[captionExpr]) && {
      name: 'caption',
      location: 'before',
      text: card[captionExpr]
    };
    const updateButton = allowUpdating && {
      name: 'updateButton',
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'edit',
        onClick: onEdit,
        stylingMode: 'text'
      }
    };
    const deleteButton = allowDeleting && {
      name: 'deleteButton',
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'trash',
        onClick: onDelete,
        stylingMode: 'text'
      }
    };
    const items = [checkBoxItem, captionItem, updateButton, deleteButton].filter(item => !!item);
    // TODO: fix typings
    return items;
  }
  render() {
    const {
      visible: visibleProp,
      items: userToolbarItems,
      template: Template,
      card
    } = this.props;
    const toolbarItems = normalizeToolbarItems(this.getDefaultToolbarItems(), userToolbarItems, ['caption', 'selectionCheckBox', 'updateButton', 'deleteButton']);
    const visible = isDefined(visibleProp) ? visibleProp : !!toolbarItems.length;
    if (!visible) {
      return createFragment();
    }
    return createVNode(1, "div", CLASSES.cardHeader, Template ? createComponentVNode(2, Template, {
      "card": card
    }) : createComponentVNode(2, Toolbar, {
      "items": toolbarItems
    }), 0);
  }
}