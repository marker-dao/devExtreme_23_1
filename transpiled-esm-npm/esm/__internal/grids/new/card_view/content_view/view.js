import _extends from "@babel/runtime/helpers/esm/extends";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable
  @typescript-eslint/explicit-function-return-type,
  @typescript-eslint/explicit-module-boundary-types,
  spellcheck/spell-checker
*/
import { compileGetter } from '../../../../../core/utils/data';
import { isDefined } from '../../../../../core/utils/type';
import { computed, effect, signal } from '../../../../core/state_manager/index';
import { NavigationStrategyMatrix } from '../../../../grids/new/grid_core/keyboard_navigation/index';
import { ContentView as ContentViewBase } from '../../grid_core/content_view/view';
import { ContentView as ContentViewComponent } from './content_view';
import { factors } from './utils';
export class ContentView extends ContentViewBase {
  constructor() {
    // @ts-expect-error
    super(...arguments);
    this.cardMinWidth = this.options.oneWay('cardMinWidth');
    this.rowHeight = signal(0);
    this.columnGap = signal(0);
    this.cardsPerRowProp = this.options.oneWay('cardsPerRow');
    this.cardsPerRow = computed(() => {
      const width = this.width.value;
      const cardMinWidth = this.cardMinWidth.value;
      const pageSize = this.dataController.pageSize.value;
      const cardsPerRowProp = this.cardsPerRowProp.value;
      if (cardsPerRowProp !== 'auto') {
        return cardsPerRowProp;
      }
      const result = factors(pageSize).reverse().find(cardsPerRow => {
        const cardWidth = (width - this.columnGap.value * (cardsPerRow - 1)) / cardsPerRow;
        return cardMinWidth <= cardWidth;
      });
      return result ?? 1;
    });
    this.navigationStrategy = new NavigationStrategyMatrix(this.cardsPerRow.peek());
    this.component = ContentViewComponent;
    this.items = computed(() => this.itemsController.items.value.filter(item => item.visible));
    effect(() => {
      this.navigationStrategy.updateColumnsCount(this.cardsPerRow.value);
    });
  }
  getProps() {
    return computed(() => _extends({}, this.getBaseProps(), {
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
    if (!isDefined(expr)) {
      return undefined;
    }
    // @ts-expect-error
    return compileGetter(expr);
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