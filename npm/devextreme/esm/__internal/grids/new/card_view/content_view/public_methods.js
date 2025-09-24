/**
* DevExtreme (esm/__internal/grids/new/card_view/content_view/public_methods.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { getPublicElement } from '../../../../../core/element';
import $ from '../../../../../core/renderer';
import * as Base from '../../grid_core/content_view/public_methods';
import { ItemsController } from '../../grid_core/items_controller/items_controller';
import * as cardModule from './content/card/card';
export function PublicMethods(GridCore) {
  return class CardViewWithContentView extends Base.PublicMethods(GridCore) {
    getCardElement(cardIndex) {
      const card = $(this.element()).find(`.${cardModule.CLASSES.card}`).eq(cardIndex);
      return getPublicElement(card);
    }
    getVisibleCards() {
      const itemsController = this.diContext.get(ItemsController);
      return itemsController.items.peek();
    }
    getCardIndexByKey(key) {
      const itemsController = this.diContext.get(ItemsController);
      const cards = itemsController.items.peek();
      return cards.findIndex(card => card.key === key);
    }
    getKeyByCardIndex(cardIndex) {
      var _this$getVisibleCards;
      return (_this$getVisibleCards = this.getVisibleCards()[cardIndex]) === null || _this$getVisibleCards === void 0 ? void 0 : _this$getVisibleCards.key;
    }
  };
}
