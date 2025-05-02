import _extends from "@babel/runtime/helpers/esm/extends";
import registerComponent from '../../core/component_registrator';
import devices from '../../core/devices';
import { getPublicElement } from '../../core/element';
import $ from '../../core/renderer';
import { deferRender } from '../../core/utils/common';
import { each, map } from '../../core/utils/iterator';
import { getHeight, getOuterHeight, getOuterWidth, getWidth, setHeight, setWidth } from '../../core/utils/size';
import { isDefined } from '../../core/utils/type';
import { hasWindow } from '../../core/utils/window';
import CollectionWidget from '../ui/collection/m_collection_widget.edit';
import ScrollView from '../ui/scroll_view/m_scroll_view';
import supportUtils from '../core/utils/m_support';
const TILEVIEW_CLASS = 'dx-tileview';
const TILEVIEW_CONTAINER_CLASS = 'dx-tileview-wrapper';
const TILEVIEW_ITEM_CLASS = 'dx-tile';
const TILEVIEW_ITEM_SELECTOR = `.${TILEVIEW_ITEM_CLASS}`;
const TILEVIEW_ITEM_DATA_KEY = 'dxTileData';
const CONFIGS = {
  horizontal: {
    itemMainRatio: 'widthRatio',
    itemCrossRatio: 'heightRatio',
    baseItemMainDimension: 'baseItemWidth',
    baseItemCrossDimension: 'baseItemHeight',
    mainDimension: 'width',
    crossDimension: 'height',
    mainPosition: 'left',
    crossPosition: 'top'
  },
  vertical: {
    itemMainRatio: 'heightRatio',
    itemCrossRatio: 'widthRatio',
    baseItemMainDimension: 'baseItemHeight',
    baseItemCrossDimension: 'baseItemWidth',
    mainDimension: 'height',
    crossDimension: 'width',
    mainPosition: 'top',
    crossPosition: 'left'
  }
};
class TileView extends CollectionWidget {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      // @ts-expect-error ts-error
      items: null,
      direction: 'horizontal',
      hoverStateEnabled: true,
      showScrollbar: 'never',
      height: 500,
      baseItemWidth: 100,
      baseItemHeight: 100,
      itemMargin: 20,
      activeStateEnabled: true,
      indicateLoading: true
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device() {
        return devices.real().deviceType === 'desktop' && !devices.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }, {
      device() {
        return supportUtils.nativeScrolling;
      },
      options: {
        showScrollbar: 'onScroll'
      }
    }]);
  }
  // eslint-disable-next-line class-methods-use-this
  _itemClass() {
    return TILEVIEW_ITEM_CLASS;
  }
  // eslint-disable-next-line class-methods-use-this
  _itemDataKey() {
    return TILEVIEW_ITEM_DATA_KEY;
  }
  _itemContainer() {
    return this._$container;
  }
  _init() {
    super._init();
    this._activeStateUnit = TILEVIEW_ITEM_SELECTOR;
    this.$element().addClass(TILEVIEW_CLASS);
    this._initScrollView();
  }
  _dataSourceLoadingChangedHandler(isLoading) {
    const scrollView = this._scrollView;
    // @ts-expect-error ts-error
    if (!(scrollView !== null && scrollView !== void 0 && scrollView.startLoading)) {
      return;
    }
    if (isLoading && this.option('indicateLoading')) {
      // @ts-expect-error ts-error
      scrollView.startLoading();
    } else {
      scrollView.finishLoading();
    }
  }
  _hideLoadingIfLoadIndicationOff() {
    if (!this.option('indicateLoading')) {
      this._dataSourceLoadingChangedHandler(false);
    }
  }
  _initScrollView() {
    const {
      width,
      height,
      direction,
      showScrollbar
    } = this.option();
    this._scrollView = this._createComponent(this.$element(), ScrollView, {
      direction,
      width,
      height,
      scrollByContent: true,
      useKeyboard: false,
      showScrollbar
    });
    this._$container = $(this._scrollView.content());
    this._$container.addClass(TILEVIEW_CONTAINER_CLASS);
    this._scrollView.option('onUpdated', this._renderGeometry.bind(this));
  }
  _initMarkup() {
    super._initMarkup();
    deferRender(() => {
      this._cellsPerDimension = 1;
      this._renderGeometry();
      this._updateScrollView();
      this._fireContentReadyAction();
    });
  }
  _updateScrollView() {
    this._scrollView.option('direction', this.option('direction'));
    this._scrollView.update();
    this._indicateLoadingIfAlreadyStarted();
  }
  _indicateLoadingIfAlreadyStarted() {
    // @ts-expect-error ts-error
    if (this._isDataSourceLoading()) {
      this._dataSourceLoadingChangedHandler(true);
    }
  }
  _renderGeometry() {
    const {
      direction
    } = this.option();
    // @ts-expect-error ts-error
    this._config = CONFIGS[direction];
    const items = this.option('items') || [];
    const config = this._config;
    const itemMargin = this.option('itemMargin');
    const maxItemCrossRatio = Math.max.apply(Math, map(items || [], item => Math.round(item[config.itemCrossRatio] || 1)));
    let crossDimensionValue;
    // @ts-expect-error
    if (hasWindow) {
      crossDimensionValue = (config.crossDimension === 'width' ? getWidth : getHeight)(this.$element());
    } else {
      // @ts-expect-error ts-error
      // eslint-disable-next-line radix
      crossDimensionValue = parseInt(this.$element().get(0).style[config.crossDimension]);
    }
    // @ts-expect-error ts-error
    this._cellsPerDimension = Math.floor(crossDimensionValue / (this.option(config.baseItemCrossDimension) + itemMargin));
    this._cellsPerDimension = Math.max(this._cellsPerDimension, maxItemCrossRatio);
    this._cells = [];
    // @ts-expect-error ts-error
    this._cells.push(new Array(this._cellsPerDimension));
    this._arrangeItems(items);
    this._renderContentSize(config, itemMargin);
  }
  _renderContentSize(config, itemMargin) {
    const {
      mainDimension,
      baseItemMainDimension
    } = config;
    if (hasWindow()) {
      // @ts-expect-error ts-error
      const actualContentSize = this._cells.length * this.option(baseItemMainDimension) + (this._cells.length + 1) * itemMargin;
      const elementSize = (mainDimension === 'width' ? getWidth : getHeight)(this.$element());
      (mainDimension === 'width' ? setWidth : setHeight)(this._$container, Math.max(actualContentSize, elementSize));
    }
  }
  _arrangeItems(items) {
    const config = this._config;
    const {
      itemMainRatio
    } = config;
    const {
      itemCrossRatio
    } = config;
    const {
      mainPosition
    } = config;
    this._itemsPositions = [];
    each(items, (index, item) => {
      const currentItem = {};
      currentItem[itemMainRatio] = item[itemMainRatio] || 1;
      currentItem[itemCrossRatio] = item[itemCrossRatio] || 1;
      // @ts-expect-error ts-error
      currentItem.index = index;
      currentItem[itemMainRatio] = currentItem[itemMainRatio] <= 0 ? 0 : Math.round(currentItem[config.itemMainRatio]);
      currentItem[itemCrossRatio] = currentItem[itemCrossRatio] <= 0 ? 0 : Math.round(currentItem[config.itemCrossRatio]);
      const itemPosition = this._getItemPosition(currentItem);
      if (itemPosition[mainPosition] === -1) {
        // @ts-expect-error ts-error
        itemPosition[mainPosition] = this._cells.push(new Array(this._cellsPerDimension)) - 1;
      }
      this._occupyCells(currentItem, itemPosition);
      this._arrangeItem(currentItem, itemPosition);
      this._itemsPositions.push(itemPosition);
    });
  }
  _refreshActiveDescendant() {}
  _getItemPosition(item) {
    const config = this._config;
    const {
      mainPosition
    } = config;
    const {
      crossPosition
    } = config;
    const position = {};
    position[mainPosition] = -1;
    position[crossPosition] = 0;
    for (let main = 0; main < this._cells.length; main++) {
      for (let cross = 0; cross < this._cellsPerDimension; cross++) {
        if (this._itemFit(main, cross, item)) {
          position[mainPosition] = main;
          position[crossPosition] = cross;
          break;
        }
      }
      if (position[mainPosition] > -1) {
        break;
      }
    }
    return position;
  }
  _itemFit(mainPosition, crossPosition, item) {
    let result = true;
    const config = this._config;
    const itemRatioMain = item[config.itemMainRatio];
    const itemRatioCross = item[config.itemCrossRatio];
    if (crossPosition + itemRatioCross > this._cellsPerDimension) {
      return false;
    }
    for (let main = mainPosition; main < mainPosition + itemRatioMain; main++) {
      for (let cross = crossPosition; cross < crossPosition + itemRatioCross; cross++) {
        if (this._cells.length - 1 < main) {
          // @ts-expect-error ts-error
          this._cells.push(new Array(this._cellsPerDimension));
        } else if (this._cells[main][cross] !== undefined) {
          result = false;
          break;
        }
      }
    }
    return result;
  }
  _occupyCells(item, itemPosition) {
    const config = this._config;
    const itemPositionMain = itemPosition[config.mainPosition];
    const itemPositionCross = itemPosition[config.crossPosition];
    const itemRatioMain = item[config.itemMainRatio];
    const itemRatioCross = item[config.itemCrossRatio];
    for (let main = itemPositionMain; main < itemPositionMain + itemRatioMain; main++) {
      for (let cross = itemPositionCross; cross < itemPositionCross + itemRatioCross; cross++) {
        this._cells[main][cross] = item.index;
      }
    }
  }
  _arrangeItem(item, itemPosition) {
    const config = this._config;
    const itemPositionMain = itemPosition[config.mainPosition];
    const itemPositionCross = itemPosition[config.crossPosition];
    const itemRatioMain = item[config.itemMainRatio];
    const itemRatioCross = item[config.itemCrossRatio];
    const baseItemCross = this.option(config.baseItemCrossDimension);
    const baseItemMain = this.option(config.baseItemMainDimension);
    const itemMargin = this.option('itemMargin');
    const cssProps = {
      display: itemRatioMain <= 0 || itemRatioCross <= 0 ? 'none' : ''
    };
    // @ts-expect-error ts-error
    const mainDimension = itemRatioMain * baseItemMain + (itemRatioMain - 1) * itemMargin;
    // @ts-expect-error ts-error
    const crossDimension = itemRatioCross * baseItemCross + (itemRatioCross - 1) * itemMargin;
    cssProps[config.mainDimension] = mainDimension < 0 ? 0 : mainDimension;
    cssProps[config.crossDimension] = crossDimension < 0 ? 0 : crossDimension;
    // @ts-expect-error ts-error
    cssProps[config.mainPosition] = itemPositionMain * baseItemMain + (itemPositionMain + 1) * itemMargin;
    // @ts-expect-error ts-error
    cssProps[config.crossPosition] = itemPositionCross * baseItemCross + (itemPositionCross + 1) * itemMargin;
    if (this.option('rtlEnabled')) {
      const offsetCorrection = getWidth(this._$container);
      const baseItemWidth = this.option('baseItemWidth');
      const itemPositionX = itemPosition.left;
      // @ts-expect-error ts-error
      const offsetPosition = itemPositionX * baseItemWidth;
      // @ts-expect-error ts-error
      const itemBaseOffset = baseItemWidth + itemMargin;
      const itemWidth = itemBaseOffset * item.widthRatio;
      // @ts-expect-error ts-error
      const subItemMargins = itemPositionX * itemMargin;
      // @ts-expect-error
      cssProps.left = offsetCorrection - (offsetPosition + itemWidth + subItemMargins);
    }
    this._itemElements().eq(item.index).css(cssProps);
  }
  _moveFocus(location) {
    const FOCUS_UP = 'up';
    const FOCUS_DOWN = 'down';
    const FOCUS_LEFT = this.option('rtlEnabled') ? 'right' : 'left';
    const FOCUS_RIGHT = this.option('rtlEnabled') ? 'left' : 'right';
    const FOCUS_PAGE_UP = 'pageup';
    const FOCUS_PAGE_DOWN = 'pagedown';
    const {
      direction,
      focusedElement
    } = this.option();
    const horizontalDirection = direction === 'horizontal';
    const cells = this._cells;
    const index = $(focusedElement).index();
    let targetCol = this._itemsPositions[index].left;
    let targetRow = this._itemsPositions[index].top;
    // @ts-expect-error ts-error
    const colCount = (horizontalDirection ? cells : cells[0]).length;
    // @ts-expect-error ts-error
    const rowCount = (horizontalDirection ? cells[0] : cells).length;
    const getCell = function (col, row) {
      if (horizontalDirection) {
        return cells[col][row];
      }
      return cells[row][col];
    };
    switch (location) {
      case FOCUS_PAGE_UP:
      case FOCUS_UP:
        // @ts-expect-error ts-error
        while (targetRow > 0 && index === getCell(targetCol, targetRow)) {
          // @ts-expect-error ts-error
          targetRow--;
        }
        // @ts-expect-error ts-error
        if (targetRow < 0) {
          targetRow = 0;
        }
        break;
      case FOCUS_PAGE_DOWN:
      case FOCUS_DOWN:
        // @ts-expect-error ts-error
        while (targetRow < rowCount && index === getCell(targetCol, targetRow)) {
          // @ts-expect-error ts-error
          targetRow++;
        }
        if (targetRow === rowCount) {
          targetRow = rowCount - 1;
        }
        break;
      case FOCUS_RIGHT:
        // @ts-expect-error ts-error
        while (targetCol < colCount && index === getCell(targetCol, targetRow)) {
          // @ts-expect-error ts-error
          targetCol++;
        }
        if (targetCol === colCount) {
          targetCol = colCount - 1;
        }
        break;
      case FOCUS_LEFT:
        // @ts-expect-error ts-error
        while (targetCol >= 0 && index === getCell(targetCol, targetRow)) {
          // @ts-expect-error ts-error
          targetCol--;
        }
        // @ts-expect-error ts-error
        if (targetCol < 0) {
          targetCol = 0;
        }
        break;
      default:
        // @ts-expect-error ts-error
        super._moveFocus.apply(this, arguments);
        return;
    }
    const newTargetIndex = getCell(targetCol, targetRow);
    if (!isDefined(newTargetIndex)) {
      return;
    }
    const $newTarget = this._itemElements().eq(newTargetIndex);
    this.option('focusedElement', getPublicElement($newTarget));
    this._scrollToItem($newTarget);
  }
  _scrollToItem($itemElement) {
    if (!$itemElement.length) {
      return;
    }
    const config = this._config;
    const outerMainGetter = config.mainDimension === 'width' ? getOuterWidth : getOuterHeight;
    const itemMargin = this.option('itemMargin');
    const itemPosition = $itemElement.position()[config.mainPosition];
    const itemDimension = outerMainGetter($itemElement);
    const itemTail = itemPosition + itemDimension;
    const scrollPosition = this.scrollPosition();
    const clientWidth = outerMainGetter(this.$element());
    if (scrollPosition <= itemPosition && itemTail <= scrollPosition + clientWidth) {
      return;
    }
    if (scrollPosition > itemPosition) {
      // @ts-expect-error ts-error
      this._scrollView.scrollTo(itemPosition - itemMargin);
    } else {
      // @ts-expect-error ts-error
      this._scrollView.scrollTo(itemPosition + itemDimension - clientWidth + itemMargin);
    }
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'items':
        super._optionChanged(args);
        this._renderGeometry();
        this._updateScrollView();
        break;
      case 'showScrollbar':
        this._initScrollView();
        break;
      case 'disabled':
        this._scrollView.option('disabled', args.value);
        super._optionChanged(args);
        break;
      case 'baseItemWidth':
      case 'baseItemHeight':
      case 'itemMargin':
        this._renderGeometry();
        break;
      case 'width':
      case 'height':
        super._optionChanged(args);
        this._renderGeometry();
        this._scrollView.option(args.name, args.value);
        this._updateScrollView();
        break;
      case 'direction':
        this._renderGeometry();
        this._updateScrollView();
        break;
      case 'indicateLoading':
        this._hideLoadingIfLoadIndicationOff();
        break;
      default:
        super._optionChanged(args);
    }
  }
  scrollPosition() {
    return this._scrollView.scrollOffset()[this._config.mainPosition];
  }
}
registerComponent('dxTileView', TileView);
export default TileView;