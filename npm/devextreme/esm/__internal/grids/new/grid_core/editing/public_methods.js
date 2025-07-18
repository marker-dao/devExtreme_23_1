/**
* DevExtreme (esm/__internal/grids/new/grid_core/editing/public_methods.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable spellcheck/spell-checker */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { isDefined } from '../../../../core/utils/m_type';
import { ItemsController } from '../items_controller/items_controller';
import { EditingController } from './controller';
export function PublicMethods(GridCore) {
  return class GridCoreWithEditing extends GridCore {
    addCard() {
      const controller = this.diContext.get(EditingController);
      return controller.addCard();
    }
    cancelEditData() {
      const controller = this.diContext.get(EditingController);
      controller.clear();
    }
    deleteCard(cardIndex) {
      var _itemsController$item;
      const controller = this.diContext.get(EditingController);
      const itemsController = this.diContext.get(ItemsController);
      const cardKey = (_itemsController$item = itemsController.items.peek()[cardIndex]) === null || _itemsController$item === void 0 ? void 0 : _itemsController$item.key;
      if (isDefined(cardKey)) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        controller.deleteCard(cardKey);
      }
    }
    editCard(cardIndex) {
      var _itemsController$item2;
      const controller = this.diContext.get(EditingController);
      const itemsController = this.diContext.get(ItemsController);
      const cardKey = (_itemsController$item2 = itemsController.items.peek()[cardIndex]) === null || _itemsController$item2 === void 0 ? void 0 : _itemsController$item2.key;
      if (isDefined(cardKey)) {
        controller.editCard(cardKey);
      }
    }
    hasEditData() {
      const controller = this.diContext.get(EditingController);
      return controller.changes.peek().length > 0;
    }
    saveEditData() {
      const controller = this.diContext.get(EditingController);
      return controller.save();
    }
  };
}
