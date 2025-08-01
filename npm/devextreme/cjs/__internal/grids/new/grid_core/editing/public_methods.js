/**
* DevExtreme (cjs/__internal/grids/new/grid_core/editing/public_methods.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PublicMethods = PublicMethods;
var _m_type = require("../../../../core/utils/m_type");
var _items_controller = require("../items_controller/items_controller");
var _controller = require("./controller");
/* eslint-disable spellcheck/spell-checker */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

function PublicMethods(GridCore) {
  return class GridCoreWithEditing extends GridCore {
    addCard() {
      const controller = this.diContext.get(_controller.EditingController);
      return controller.addCard();
    }
    cancelEditData() {
      const controller = this.diContext.get(_controller.EditingController);
      controller.clear();
    }
    deleteCard(cardIndex) {
      var _itemsController$item;
      const controller = this.diContext.get(_controller.EditingController);
      const itemsController = this.diContext.get(_items_controller.ItemsController);
      const cardKey = (_itemsController$item = itemsController.items.peek()[cardIndex]) === null || _itemsController$item === void 0 ? void 0 : _itemsController$item.key;
      if ((0, _m_type.isDefined)(cardKey)) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        controller.deleteCard(cardKey);
      }
    }
    editCard(cardIndex) {
      var _itemsController$item2;
      const controller = this.diContext.get(_controller.EditingController);
      const itemsController = this.diContext.get(_items_controller.ItemsController);
      const cardKey = (_itemsController$item2 = itemsController.items.peek()[cardIndex]) === null || _itemsController$item2 === void 0 ? void 0 : _itemsController$item2.key;
      if ((0, _m_type.isDefined)(cardKey)) {
        controller.editCard(cardKey);
      }
    }
    hasEditData() {
      const controller = this.diContext.get(_controller.EditingController);
      return controller.changes.peek().length > 0;
    }
    saveEditData() {
      const controller = this.diContext.get(_controller.EditingController);
      return controller.save();
    }
  };
}
