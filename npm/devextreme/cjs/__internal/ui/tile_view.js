/**
* DevExtreme (cjs/__internal/ui/tile_view.js)
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
exports.default = void 0;
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _devices = _interopRequireDefault(require("../../core/devices"));
var _element = require("../../core/element");
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _common = require("../../core/utils/common");
var _iterator = require("../../core/utils/iterator");
var _size = require("../../core/utils/size");
var _type = require("../../core/utils/type");
var _window = require("../../core/utils/window");
var _collection_widget = _interopRequireDefault(require("../ui/collection/collection_widget.edit"));
var _scroll_view = _interopRequireDefault(require("../ui/scroll_view/scroll_view"));
var _m_support = _interopRequireDefault(require("../core/utils/m_support"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
class TileView extends _collection_widget.default {
  _activeStateUnit() {
    return TILEVIEW_ITEM_SELECTOR;
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
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
        return _devices.default.real().deviceType === 'desktop' && !_devices.default.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }, {
      device() {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return _m_support.default.nativeScrolling;
      },
      options: {
        showScrollbar: 'onScroll'
      }
    }]);
  }
  _itemClass() {
    return TILEVIEW_ITEM_CLASS;
  }
  _itemDataKey() {
    return TILEVIEW_ITEM_DATA_KEY;
  }
  _itemContainer() {
    return this._$container;
  }
  _init() {
    super._init();
    this.$element().addClass(TILEVIEW_CLASS);
    this._initScrollView();
  }
  _dataSourceLoadingChangedHandler(isLoading) {
    const scrollView = this._scrollView;
    if (!(scrollView !== null && scrollView !== void 0 && scrollView.startLoading)) {
      return;
    }
    const {
      indicateLoading
    } = this.option();
    if (isLoading && indicateLoading) {
      scrollView.startLoading();
    } else {
      scrollView.finishLoading();
    }
  }
  _hideLoadingIfLoadIndicationOff() {
    const {
      indicateLoading
    } = this.option();
    if (!indicateLoading) {
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
    this._scrollView = this._createComponent(this.$element(), _scroll_view.default, {
      direction,
      width,
      height,
      scrollByContent: true,
      useKeyboard: false,
      showScrollbar
    });
    this._$container = (0, _renderer.default)(this._scrollView.content());
    this._$container.addClass(TILEVIEW_CONTAINER_CLASS);
    this._scrollView.option('onUpdated', this._renderGeometry.bind(this));
  }
  _initMarkup() {
    super._initMarkup();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (0, _common.deferRender)(() => {
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
      direction = 'horizontal'
    } = this.option();
    this._config = CONFIGS[direction];
    const {
      items = [],
      itemMargin = 0
    } = this.option();
    const config = this._config;
    const maxItemCrossRatio = items.reduce((max, item) => {
      const ratio = Math.round(item[config.itemCrossRatio] ?? 1);
      return Math.max(max, ratio);
    }, 1);
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let crossDimensionValue;
    // @ts-expect-error ts-error
    if (_window.hasWindow) {
      crossDimensionValue = (config.crossDimension === 'width' ? _size.getWidth : _size.getHeight)(this.$element());
    } else {
      crossDimensionValue = parseInt(this.$element()[0].style[config.crossDimension], 10);
    }
    const options = this.option();
    const baseItemCrossDimension = options[config.baseItemCrossDimension] ?? 0;
    this._cellsPerDimension = Math.floor(crossDimensionValue / (baseItemCrossDimension + itemMargin));
    this._cellsPerDimension = Math.max(this._cellsPerDimension, maxItemCrossRatio);
    this._cells = [];
    this._cells.push(new Array(this._cellsPerDimension));
    this._arrangeItems(items);
    this._renderContentSize(config, itemMargin);
  }
  _renderContentSize(config) {
    let itemMargin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    const {
      mainDimension,
      baseItemMainDimension
    } = config;
    if ((0, _window.hasWindow)()) {
      const actualContentSize = this._cells.length * (this.option()[baseItemMainDimension] ?? 0) + (this._cells.length + 1) * itemMargin;
      const elementSize = (mainDimension === 'width' ? _size.getWidth : _size.getHeight)(this.$element());
      (mainDimension === 'width' ? _size.setWidth : _size.setHeight)(this._$container, Math.max(actualContentSize, elementSize));
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
    (0, _iterator.each)(items, (index, item) => {
      const currentItem = {
        index
      };
      currentItem[itemMainRatio] = item[itemMainRatio] ?? 1;
      currentItem[itemCrossRatio] = item[itemCrossRatio] ?? 1;
      // @ts-expect-error ts-error
      currentItem[itemMainRatio] = currentItem[itemMainRatio] <= 0 ? 0
      // @ts-expect-error ts-error
      : Math.round(currentItem[config.itemMainRatio]);
      // @ts-expect-error ts-error
      currentItem[itemCrossRatio] = currentItem[itemCrossRatio] <= 0 ? 0
      // @ts-expect-error ts-error
      : Math.round(currentItem[config.itemCrossRatio]);
      const itemPosition = this._getItemPosition(currentItem);
      if (itemPosition[mainPosition] === -1) {
        itemPosition[mainPosition] = this._cells.push(new Array(this._cellsPerDimension)) - 1;
      }
      this._occupyCells(currentItem, itemPosition);
      this._arrangeItem(currentItem, itemPosition);
      this._itemsPositions.push(itemPosition);
    });
  }
  _refreshActiveDescendant() {}
  _getItemPosition(item) {
    const {
      mainPosition,
      crossPosition
    } = this._config;
    // @ts-expect-error ts-error
    const position = {
      [mainPosition]: -1,
      [crossPosition]: 0
    };
    for (let main = 0; main < this._cells.length; main += 1) {
      for (let cross = 0; cross < this._cellsPerDimension; cross += 1) {
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
    const itemRatioMain = item[config.itemMainRatio] ?? 0;
    const itemRatioCross = item[config.itemCrossRatio] ?? 0;
    if (crossPosition + itemRatioCross > this._cellsPerDimension) {
      return false;
    }
    for (let main = mainPosition; main < mainPosition + itemRatioMain; main += 1) {
      for (let cross = crossPosition; cross < crossPosition + itemRatioCross; cross += 1) {
        if (this._cells.length - 1 < main) {
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
    const itemRatioMain = item[config.itemMainRatio] ?? 0;
    const itemRatioCross = item[config.itemCrossRatio] ?? 0;
    for (let main = itemPositionMain; main < itemPositionMain + itemRatioMain; main += 1) {
      for (let cross = itemPositionCross; cross < itemPositionCross + itemRatioCross; cross += 1) {
        this._cells[main][cross] = item.index;
      }
    }
  }
  _arrangeItem(item, itemPosition) {
    const config = this._config;
    const itemPositionMain = itemPosition[config.mainPosition];
    const itemPositionCross = itemPosition[config.crossPosition];
    const itemRatioMain = item[config.itemMainRatio] ?? 0;
    const itemRatioCross = item[config.itemCrossRatio] ?? 0;
    const baseItemCross = this.option()[config.baseItemCrossDimension] ?? 0;
    const baseItemMain = this.option()[config.baseItemMainDimension] ?? 0;
    const {
      itemMargin = 0,
      rtlEnabled
    } = this.option();
    const cssProps = {
      display: itemRatioMain <= 0 || itemRatioCross <= 0 ? 'none' : ''
    };
    const mainDimension = itemRatioMain * baseItemMain + (itemRatioMain - 1) * itemMargin;
    const crossDimension = itemRatioCross * baseItemCross + (itemRatioCross - 1) * itemMargin;
    cssProps[config.mainDimension] = mainDimension < 0 ? 0 : mainDimension;
    cssProps[config.crossDimension] = crossDimension < 0 ? 0 : crossDimension;
    cssProps[config.mainPosition] = itemPositionMain * baseItemMain + (itemPositionMain + 1) * itemMargin;
    cssProps[config.crossPosition] = itemPositionCross * baseItemCross + (itemPositionCross + 1) * itemMargin;
    if (rtlEnabled) {
      const offsetCorrection = (0, _size.getWidth)(this._$container);
      const {
        baseItemWidth = 0
      } = this.option();
      const itemPositionX = itemPosition.left;
      const offsetPosition = itemPositionX * baseItemWidth;
      const itemBaseOffset = baseItemWidth + itemMargin;
      // @ts-expect-error ts-error
      const itemWidth = itemBaseOffset * item.widthRatio;
      const subItemMargins = itemPositionX * itemMargin;
      // @ts-expect-error ts-error
      cssProps.left = offsetCorrection - (offsetPosition + itemWidth + subItemMargins);
    }
    // @ts-expect-error ts-error
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
    const index = (0, _renderer.default)(focusedElement).index();
    let targetCol = this._itemsPositions[index].left;
    let targetRow = this._itemsPositions[index].top;
    const colCount = (horizontalDirection ? cells : cells[0]).length;
    const rowCount = (horizontalDirection ? cells[0] : cells).length;
    const getCell = (col, row) => {
      if (horizontalDirection) {
        return cells[col][row];
      }
      return cells[row][col];
    };
    switch (location) {
      case FOCUS_PAGE_UP:
      case FOCUS_UP:
        while (targetRow > 0 && index === getCell(targetCol, targetRow)) {
          targetRow -= 1;
        }
        if (targetRow < 0) {
          targetRow = 0;
        }
        break;
      case FOCUS_PAGE_DOWN:
      case FOCUS_DOWN:
        while (targetRow < rowCount && index === getCell(targetCol, targetRow)) {
          targetRow += 1;
        }
        if (targetRow === rowCount) {
          targetRow = rowCount - 1;
        }
        break;
      case FOCUS_RIGHT:
        while (targetCol < colCount && index === getCell(targetCol, targetRow)) {
          targetCol += 1;
        }
        if (targetCol === colCount) {
          targetCol = colCount - 1;
        }
        break;
      case FOCUS_LEFT:
        while (targetCol >= 0 && index === getCell(targetCol, targetRow)) {
          targetCol -= 1;
        }
        if (targetCol < 0) {
          targetCol = 0;
        }
        break;
      default:
        super._moveFocus(location);
        return;
    }
    const newTargetIndex = getCell(targetCol, targetRow);
    if (!(0, _type.isDefined)(newTargetIndex)) {
      return;
    }
    const $newTarget = this._itemElements().eq(newTargetIndex);
    this.option('focusedElement', (0, _element.getPublicElement)($newTarget));
    this._scrollToItem($newTarget);
  }
  _scrollToItem($itemElement) {
    if (!$itemElement.length) {
      return;
    }
    const config = this._config;
    const outerMainGetter = config.mainDimension === 'width' ? _size.getOuterWidth : _size.getOuterHeight;
    const {
      itemMargin = 0
    } = this.option();
    // @ts-expect-error ts-error
    const itemPosition = $itemElement.position()[config.mainPosition];
    const itemDimension = outerMainGetter($itemElement);
    const itemTail = itemPosition + itemDimension;
    const scrollPosition = this.scrollPosition();
    const clientWidth = outerMainGetter(this.$element());
    if (scrollPosition <= itemPosition && itemTail <= scrollPosition + clientWidth) {
      return;
    }
    if (scrollPosition > itemPosition) {
      this._scrollView.scrollTo(itemPosition - itemMargin);
    } else {
      this._scrollView.scrollTo(itemPosition + itemDimension - clientWidth + itemMargin);
    }
  }
  _optionChanged(args) {
    const {
      name,
      value
    } = args;
    switch (name) {
      case 'items':
        super._optionChanged(args);
        this._renderGeometry();
        this._updateScrollView();
        break;
      case 'showScrollbar':
        this._initScrollView();
        break;
      case 'disabled':
        this._scrollView.option('disabled', value);
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
        this._scrollView.option(name, value);
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
(0, _component_registrator.default)('dxTileView', TileView);
var _default = exports.default = TileView;
