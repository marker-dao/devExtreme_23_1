/**
* DevExtreme (cjs/__internal/grids/new/card_view/content_view/content/card/header.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardHeader = exports.CLASSES = void 0;
var _inferno = require("inferno");
var _index = require("../../../../../../../common/core/events/utils/index");
var _message = _interopRequireDefault(require("../../../../../../../localization/message"));
var _m_type = require("../../../../../../core/utils/m_type");
var _toolbar = require("../../../../../../grids/new/grid_core/inferno_wrappers/toolbar");
var _utils = require("../../../../../../grids/new/grid_core/toolbar/utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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
        name: 'selectionCheckBox',
        widget: 'dxCheckBox',
        cssClass: CLASSES.cardSelectCheckBox,
        options: {
          elementAttr: {
            'aria-label': _message.default.format('dxCardView-ariaSelectCard')
          },
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
    const toolbarItems = (0, _utils.normalizeToolbarItems)(this.getDefaultToolbarItems(), userToolbarItems, ['caption', 'selectionCheckBox', 'updateButton', 'deleteButton']);
    const visible = (0, _m_type.isDefined)(visibleProp) ? visibleProp : !!toolbarItems.length;
    if (!visible) {
      return (0, _inferno.createFragment)();
    }
    return (0, _inferno.createVNode)(1, "div", CLASSES.cardHeader, Template ? (0, _inferno.createComponentVNode)(2, Template, {
      "card": card
    }) : (0, _inferno.createComponentVNode)(2, _toolbar.Toolbar, {
      "items": toolbarItems
    }), 0);
  }
}
exports.CardHeader = CardHeader;
