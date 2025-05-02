"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardHeader = exports.CLASSES = void 0;
var _inferno = require("inferno");
var _index = require("../../../../../../../common/core/events/utils/index");
var _m_type = require("../../../../../../core/utils/m_type");
var _toolbar = require("../../../../../../grids/new/grid_core/inferno_wrappers/toolbar");
const CLASSES = exports.CLASSES = {
  cardHeader: 'dx-cardview-card-header',
  cardSelectCheckBox: 'dx-cardview-select-checkbox'
};
class CardHeader extends _inferno.Component {
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
              control: (0, _index.isCommandKeyPressed)(event),
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
    const visible = (0, _m_type.isDefined)(visibleProp) ? visibleProp : !!finalItems.length;
    if (!visible) {
      return (0, _inferno.createFragment)();
    }
    return (0, _inferno.createVNode)(1, "div", CLASSES.cardHeader, Template ? (0, _inferno.createComponentVNode)(2, Template, {
      "card": card
    }) : (0, _inferno.createComponentVNode)(2, _toolbar.Toolbar, {
      "items": finalItems
    }), 0);
  }
}
exports.CardHeader = CardHeader;