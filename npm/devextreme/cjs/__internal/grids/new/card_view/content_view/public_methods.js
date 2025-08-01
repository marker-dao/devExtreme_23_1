/**
* DevExtreme (cjs/__internal/grids/new/card_view/content_view/public_methods.js)
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
var _element = require("../../../../../core/element");
var _renderer = _interopRequireDefault(require("../../../../../core/renderer"));
var Base = _interopRequireWildcard(require("../../grid_core/content_view/public_methods"));
var _items_controller = require("../../grid_core/items_controller/items_controller");
var cardModule = _interopRequireWildcard(require("./content/card/card"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function PublicMethods(GridCore) {
  return class CardViewWithContentView extends Base.PublicMethods(GridCore) {
    getCardElement(cardIndex) {
      const card = (0, _renderer.default)(this.element()).find(`.${cardModule.CLASSES.card}`).eq(cardIndex);
      return (0, _element.getPublicElement)(card);
    }
    getVisibleCards() {
      const itemsController = this.diContext.get(_items_controller.ItemsController);
      return itemsController.items.peek();
    }
    getCardIndexByKey(key) {
      const itemsController = this.diContext.get(_items_controller.ItemsController);
      const cards = itemsController.items.peek();
      return cards.findIndex(card => card.key === key);
    }
    getKeyByCardIndex(cardIndex) {
      var _this$getVisibleCards;
      return (_this$getVisibleCards = this.getVisibleCards()[cardIndex]) === null || _this$getVisibleCards === void 0 ? void 0 : _this$getVisibleCards.key;
    }
  };
}
