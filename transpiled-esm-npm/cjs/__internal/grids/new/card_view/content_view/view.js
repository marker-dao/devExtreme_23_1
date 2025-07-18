"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContentView = void 0;
var _data = require("../../../../../core/utils/data");
var _type = require("../../../../../core/utils/type");
var _signalsCore = require("@preact/signals-core");
var _index = require("../../../../grids/new/grid_core/keyboard_navigation/index");
var _view = require("../../grid_core/content_view/view");
var _content_view = require("./content_view");
var _utils = require("./utils");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* eslint-disable @typescript-eslint/no-explicit-any */ /* eslint-disable
  @typescript-eslint/explicit-function-return-type,
  @typescript-eslint/explicit-module-boundary-types,
  spellcheck/spell-checker
*/
class ContentView extends _view.ContentView {
  constructor() {
    // @ts-expect-error
    super(...arguments);
    this.cardMinWidth = this.options.oneWay('cardMinWidth');
    this.rowHeight = (0, _signalsCore.signal)(0);
    this.columnGap = (0, _signalsCore.signal)(0);
    this.cardsPerRowProp = this.options.oneWay('cardsPerRow');
    this.cardsPerRow = (0, _signalsCore.computed)(() => {
      const width = this.width.value;
      const cardMinWidth = this.cardMinWidth.value;
      const pageSize = this.dataController.pageSize.value;
      const cardsPerRowProp = this.cardsPerRowProp.value;
      if (cardsPerRowProp !== 'auto') {
        return cardsPerRowProp;
      }
      const result = (0, _utils.factors)(pageSize).reverse().find(cardsPerRow => {
        const cardWidth = (width - this.columnGap.value * (cardsPerRow - 1)) / cardsPerRow;
        return cardMinWidth <= cardWidth;
      });
      return result ?? 1;
    });
    this.navigationStrategy = new _index.NavigationStrategyMatrix(this.cardsPerRow.peek());
    this.component = _content_view.ContentView;
    this.items = (0, _signalsCore.computed)(() => this.itemsController.items.value.filter(item => item.visible));
    (0, _signalsCore.effect)(() => {
      this.navigationStrategy.updateColumnsCount(this.cardsPerRow.value);
    });
  }
  getProps() {
    return (0, _signalsCore.computed)(() => _extends({}, this.getBaseProps(), {
      contentProps: {
        items: this.items.value,
        kbnEnabled: this.keyboardNavigationController.enabled.value,
        navigationStrategy: this.navigationStrategy,
        isLoading: this.dataController.isReloading.value,
        needToHiddenCheckBoxes: this.selectionController.needToHiddenCheckBoxes.value,
        cardsPerRow: this.cardsPerRow.value,
        onRowHeightChange: height => {
          this.rowHeight.value = height;
        },
        onFirstElementChange: firstElement => {
          this.keyboardNavigationController.setFirstCardElement(firstElement);
        },
        onColumnGapChange: gap => {
          this.columnGap.value = gap;
        },
        onPageChange: this.onPageChange.bind(this),
        showCardContextMenu: this.showCardContextMenu.bind(this),
        wordWrapEnabled: this.options.oneWay('wordWrapEnabled').value,
        cardProps: {
          minWidth: this.cardMinWidth.value,
          maxWidth: this.options.oneWay('cardMaxWidth').value,
          fieldHintEnabled: this.options.oneWay('fieldHintEnabled').value,
          isCheckBoxesRendered: this.selectionController.isCheckBoxesRendered.value,
          allowSelectOnClick: this.selectionController.allowSelectOnClick.value,
          onHold: this.onCardHold.bind(this),
          onClick: this.options.action('onCardClick').value,
          onDblClick: this.options.action('onCardDblClick').value,
          onHoverChanged: this.options.action('onCardHoverChanged').value,
          onPrepared: this.options.action('onCardPrepared').value,
          fieldProps: {
            captionProps: {
              onClick: this.options.action('onFieldCaptionClick').value,
              onDblClick: this.options.action('onFieldCaptionDblClick').value,
              onPrepared: this.options.action('onFieldCaptionPrepared').value
            },
            valueProps: {
              onClick: this.options.action('onFieldValueClick').value,
              onDblClick: this.options.action('onFieldValueDblClick').value,
              onPrepared: this.options.action('onFieldValuePrepared').value
            }
          },
          onEdit: (key, returnFocusTo) => {
            this.keyboardNavigationController.setReturnFocusTo(returnFocusTo);
            this.editingController.editCard(key);
          },
          onDelete: (key, returnFocusTo) => {
            this.keyboardNavigationController.setReturnFocusTo(returnFocusTo);
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this.editingController.deleteCard(key);
          },
          allowUpdating: this.editingController.allowUpdating.value,
          allowDeleting: this.editingController.allowDeleting.value,
          footerTemplate: this.options.template('cardFooterTemplate').value,
          template: this.options.template('cardTemplate').value,
          contentTemplate: this.options.template('cardContentTemplate').value,
          cover: {
            imageExpr: this.processExpr(this.options.oneWay('cardCover.imageExpr').value),
            altExpr: this.processExpr(this.options.oneWay('cardCover.altExpr').value),
            // NOTE: Default value set in SCSS (180px / 140px)
            maxHeight: this.options.oneWay('cardCover.maxHeight').value,
            ratio: this.options.oneWay('cardCover.aspectRatio').value,
            template: this.options.template('cardCover.template').value
          },
          header: {
            visible: this.options.oneWay('cardHeader.visible').value,
            items: this.options.oneWay('cardHeader.items').value,
            template: this.options.template('cardHeader.template').value
          },
          toolbar: this.options.oneWay('cardHeader.items').value,
          selectCard: this.selectCard.bind(this),
          onSelectAllCards: this.onSelectAllCards.bind(this),
          onSearchFocus: () => {
            this.searchUIController.doUIAction('focusSearchTextBox');
          },
          onFocusedCardChanged: (card, cardIdx, element) => {
            this.keyboardNavigationController.onFocusedCardChanged(card, cardIdx, element);
          }
        }
      }
    }));
  }
  processExpr(expr) {
    if (!(0, _type.isDefined)(expr)) {
      return undefined;
    }
    // @ts-expect-error
    return (0, _data.compileGetter)(expr);
  }
  selectCard(card, options) {
    if (options.needToUpdateCheckboxes) {
      this.selectionController.updateSelectionCheckBoxesVisible(true);
    }
    this.selectionController.changeCardSelection(card.index, options);
  }
  onCardHold(e) {
    this.selectionController.processLongTap(e.card);
  }
  showCardContextMenu(e, card, cardIndex) {
    this.contextMenuController.show(e, 'content', {
      card,
      cardIndex
    });
  }
  onSelectAllCards() {
    this.selectionController.selectAll();
  }
  onPageChange(value) {
    if (value < 0) {
      this.dataController.decreasePageIndex();
    } else {
      this.dataController.increasePageIndex();
    }
  }
}
exports.ContentView = ContentView;