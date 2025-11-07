/**
* DevExtreme (esm/__internal/ui/responsive_box.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import registerComponent from '../../core/component_registrator';
import $ from '../../core/renderer';
// @ts-expect-error ts-error
import { grep } from '../../core/utils/common';
import { extend } from '../../core/utils/extend';
import { each, map } from '../../core/utils/iterator';
import { getWidth } from '../../core/utils/size';
import { isDefined, isEmptyObject, isPlainObject } from '../../core/utils/type';
import {
// @ts-expect-error ts-error
defaultScreenFactorFunc, getWindow, hasWindow } from '../../core/utils/window';
import CollectionWidget from '../../ui/collection/ui.collection_widget.edit';
import errors from '../../ui/widget/ui.errors';
import Box from '../ui/box';
// STYLE responsiveBox
const RESPONSIVE_BOX_CLASS = 'dx-responsivebox';
const SCREEN_SIZE_CLASS_PREFIX = `${RESPONSIVE_BOX_CLASS}-screen-`;
const BOX_ITEM_CLASS = 'dx-box-item';
const BOX_ITEM_DATA_KEY = 'dxBoxItemData';
const HD_SCREEN_WIDTH = 1920;
class ResponsiveBox extends CollectionWidget {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      rows: [],
      cols: [],
      singleColumnScreen: '',
      // @ts-expect-error ts-error
      screenByWidth: null,
      height: '100%',
      width: '100%',
      activeStateEnabled: false,
      focusStateEnabled: false,
      onLayoutChanged: null
    });
  }
  _init() {
    const {
      screenByWidth
    } = this.option();
    if (!screenByWidth) {
      this._options.silent('screenByWidth', defaultScreenFactorFunc);
    }
    super._init();
    this._initLayoutChangedAction();
  }
  _initLayoutChangedAction() {
    this._layoutChangedAction = this._createActionByOption('onLayoutChanged', {
      excludeValidators: ['disabled', 'readOnly']
    });
  }
  _itemClass() {
    return BOX_ITEM_CLASS;
  }
  _itemDataKey() {
    return BOX_ITEM_DATA_KEY;
  }
  _initMarkup() {
    super._initMarkup();
    this.$element().addClass(RESPONSIVE_BOX_CLASS);
  }
  _renderItems() {
    this._setScreenSize();
    this._screenItems = this._itemsByScreen();
    this._prepareGrid();
    this._spreadItems();
    this._layoutItems();
    this._linkNodeToItem();
  }
  _itemOptionChanged(item) {
    const $item = this._findItemElementByItem(item);
    if (!$item.length) {
      return;
    }
    this._refreshItem($item, item);
    this._clearItemNodeTemplates();
    this._update(true);
  }
  _setScreenSize() {
    const currentScreen = this._getCurrentScreen();
    this._removeScreenSizeClass();
    this.$element().addClass(SCREEN_SIZE_CLASS_PREFIX + currentScreen);
    this.option('currentScreenFactor', currentScreen);
  }
  _removeScreenSizeClass() {
    const {
      currentScreenFactor
    } = this.option();
    if (currentScreenFactor) {
      this.$element().removeClass(SCREEN_SIZE_CLASS_PREFIX + currentScreenFactor);
    }
  }
  _prepareGrid() {
    this._grid = [];
    this._prepareRowsAndCols();
    each(this._rows, () => {
      const row = [];
      this._grid.push(row);
      each(this._cols, () => {
        row.push(this._createEmptyCell());
      });
    });
  }
  getSingleColumnRows() {
    const {
      rows
    } = this.option();
    // @ts-expect-error ts-error
    const screenItemsLength = this._screenItems.length;
    if (rows !== null && rows !== void 0 && rows.length) {
      const filteredRows = this._filterByScreen(rows);
      const result = [];
      for (let i = 0; i < screenItemsLength; i += 1) {
        const sizeConfig = this._defaultSizeConfig();
        if (i < filteredRows.length && isDefined(filteredRows[i].shrink)) {
          sizeConfig.shrink = filteredRows[i].shrink;
        }
        result.push(sizeConfig);
      }
      return result;
    }
    return this._defaultSizeConfig(screenItemsLength);
  }
  _prepareRowsAndCols() {
    if (this._isSingleColumnScreen()) {
      this._prepareSingleColumnScreenItems();
      this._rows = this.getSingleColumnRows();
      this._cols = this._defaultSizeConfig(1);
    } else {
      const {
        rows,
        cols
      } = this.option();
      this._rows = this._sizesByScreen(rows);
      this._cols = this._sizesByScreen(cols);
    }
  }
  _isSingleColumnScreen() {
    const {
      singleColumnScreen,
      rows,
      cols
    } = this.option();
    // @ts-expect-error ts-error
    return this._screenRegExp().test(singleColumnScreen) || !(rows !== null && rows !== void 0 && rows.length) || !(cols !== null && cols !== void 0 && cols.length);
  }
  _prepareSingleColumnScreenItems() {
    // @ts-expect-error ts-error
    this._screenItems.sort((item1, item2) => item1.location.row - item2.location.row || item1.location.col - item2.location.col);
    each(this._screenItems, (index, item) => {
      Object.assign(item.location, {
        row: index,
        col: 0,
        rowspan: 1,
        colspan: 1
      });
    });
  }
  _sizesByScreen(sizeConfigs) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return map(this._filterByScreen(sizeConfigs),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    sizeConfig => extend(this._defaultSizeConfig(), sizeConfig));
  }
  _createDefaultSizeConfig() {
    return {
      ratio: 1,
      baseSize: 0,
      minSize: 0,
      maxSize: 0
    };
  }
  _defaultSizeConfig(size) {
    const defaultSizeConfig = this._createDefaultSizeConfig();
    if (!arguments.length) {
      return defaultSizeConfig;
    }
    const result = [];
    // @ts-expect-error ts-error
    for (let i = 0; i < size; i += 1) {
      result.push(defaultSizeConfig);
    }
    return result;
  }
  _filterByScreen(items) {
    const screenRegExp = this._screenRegExp();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return grep(items, item => !item.screen || screenRegExp.test(item.screen));
  }
  _screenRegExp() {
    const screen = this._getCurrentScreen();
    return new RegExp(`(^|\\s)${screen}($|\\s)`, 'i');
  }
  _getCurrentScreen() {
    const width = this._screenWidth();
    const {
      screenByWidth
    } = this.option();
    return screenByWidth === null || screenByWidth === void 0 ? void 0 : screenByWidth(width);
  }
  _screenWidth() {
    if (hasWindow()) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return getWidth(getWindow());
    }
    return HD_SCREEN_WIDTH;
  }
  _createEmptyCell() {
    return {
      item: {},
      location: {
        colspan: 1,
        rowspan: 1
      }
    };
  }
  _spreadItems() {
    each(this._screenItems, (_, itemInfo) => {
      const location = itemInfo.location || {};
      const itemCol = location.col;
      const itemRow = location.row;
      const row = this._grid[itemRow];
      const itemCell = row === null || row === void 0 ? void 0 : row[itemCol];
      this._occupyCells(itemCell, itemInfo);
    });
  }
  _itemsByScreen() {
    const {
      items = []
    } = this.option();
    return items.reduce((result, item) => {
      let locations = item.location ?? {};
      locations = isPlainObject(locations) ? [locations] : locations;
      this._filterByScreen(locations).forEach(location => {
        result.push({
          // @ts-expect-error ts-error
          item,
          location: _extends({
            rowspan: 1,
            colspan: 1
          }, location)
        });
      });
      return result;
    }, []);
  }
  _occupyCells(itemCell, itemInfo) {
    if (!itemCell || this._isItemCellOccupied(itemCell, itemInfo)) {
      return;
    }
    extend(itemCell, itemInfo);
    this._markSpanningCell(itemCell);
  }
  _isItemCellOccupied(itemCell, itemInfo) {
    if (!isEmptyObject(itemCell.item)) {
      return true;
    }
    let result = false;
    this._loopOverSpanning(itemInfo.location, cell => {
      result = result || !isEmptyObject(cell.item);
    });
    return result;
  }
  _loopOverSpanning(
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  location, callback) {
    const rowEnd = location.row + location.rowspan - 1;
    const colEnd = location.col + location.colspan - 1;
    const boundRowEnd = Math.min(rowEnd, this._rows.length - 1);
    const boundColEnd = Math.min(colEnd, this._cols.length - 1);
    location.rowspan -= rowEnd - boundRowEnd;
    location.colspan -= colEnd - boundColEnd;
    for (let rowIndex = location.row; rowIndex <= boundRowEnd; rowIndex += 1) {
      for (let colIndex = location.col; colIndex <= boundColEnd; colIndex += 1) {
        if (rowIndex !== location.row || colIndex !== location.col) {
          callback(this._grid[rowIndex][colIndex]);
        }
      }
    }
  }
  _markSpanningCell(itemCell) {
    this._loopOverSpanning(itemCell.location, cell => {
      cell.item = itemCell.item;
      cell.spanningCell = itemCell;
    });
  }
  _linkNodeToItem() {
    each(this._itemElements(), (_, itemNode) => {
      const $item = $(itemNode);
      // @ts-expect-error ts-error
      const item = $item.data(BOX_ITEM_DATA_KEY);
      if (!item.box) {
        item.node = $item.children();
      }
    });
  }
  _layoutItems() {
    const rowsCount = this._grid.length;
    const colsCount = rowsCount && this._grid[0].length;
    if (!rowsCount && !colsCount) {
      return;
    }
    const result = this._layoutBlock({
      direction: 'col',
      row: {
        start: 0,
        end: rowsCount - 1
      },
      col: {
        start: 0,
        end: colsCount - 1
      }
    });
    const rootBox = this._prepareBoxConfig((result === null || result === void 0 ? void 0 : result.box) ?? {
      direction: 'row',
      items: [extend(result, {
        ratio: 1
      })]
    });
    extend(rootBox, this._rootBoxConfig(rootBox.items));
    this._$root = $('<div>').appendTo(this._itemContainer());
    this._createComponent(this._$root, Box, rootBox);
  }
  _rootBoxConfig(items) {
    const rootItems = each(items, (index, item) => {
      if (this._needApplyAutoBaseSize(item)) {
        item.baseSize = 'auto';
      }
    });
    const {
      itemHoldTimeout
    } = this.option();
    return {
      width: '100%',
      height: '100%',
      items: rootItems,
      itemTemplate: this._getTemplateByOption('itemTemplate'),
      itemHoldTimeout,
      onItemHold: this._createActionByOption('onItemHold'),
      onItemClick: this._createActionByOption('onItemClick'),
      onItemContextMenu: this._createActionByOption('onItemContextMenu'),
      onItemRendered: this._createActionByOption('onItemRendered')
    };
  }
  _needApplyAutoBaseSize(item) {
    return !item.baseSize && (!item.minSize || item.minSize === 'auto') && (!item.maxSize || item.maxSize === 'auto');
  }
  _prepareBoxConfig(config) {
    const {
      onItemStateChanged
    } = this.option();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return extend(config || {}, {
      crossAlign: 'stretch',
      onItemStateChanged
    });
  }
  _layoutBlock(options) {
    if (this._isSingleItem(options)) {
      return this._itemByCell(options.row.start, options.col.start);
    }
    return this._layoutDirection(options);
  }
  _isSingleItem(options) {
    const {
      row,
      col
    } = options;
    const firstCellLocation = this._grid[row.start][col.start].location;
    const isItemRowSpanned = row.end - row.start === firstCellLocation.rowspan - 1;
    const isItemColSpanned = col.end - col.start === firstCellLocation.colspan - 1;
    return isItemRowSpanned && isItemColSpanned;
  }
  _itemByCell(rowIndex, colIndex) {
    const itemCell = this._grid[rowIndex][colIndex];
    return itemCell.spanningCell ? null : itemCell.item;
  }
  _layoutDirection(options) {
    const items = [];
    const {
      direction
    } = options;
    const crossDirection = this._crossDirection(direction);
    let block = null;
    // eslint-disable-next-line no-cond-assign
    while (block = this._nextBlock(options)) {
      if (this._isBlockIndivisible(options.prevBlockOptions, block)) {
        throw errors.Error('E1025');
      }
      const item = this._layoutBlock({
        direction: crossDirection,
        row: block.row,
        col: block.col,
        prevBlockOptions: options
      });
      if (item) {
        extend(item, this._blockSize(block, crossDirection));
        items.push(item);
      }
      options[crossDirection].start = block[crossDirection].end + 1;
    }
    return {
      box: this._prepareBoxConfig({
        direction,
        items
      })
    };
  }
  _isBlockIndivisible(options, block) {
    return !!options && options.col.start === block.col.start && options.col.end === block.col.end && options.row.start === block.row.start && options.row.end === block.row.end;
  }
  _crossDirection(direction) {
    return direction === 'col' ? 'row' : 'col';
  }
  _nextBlock(options) {
    const {
      direction
    } = options;
    const crossDirection = this._crossDirection(direction);
    const startIndex = options[direction].start;
    const endIndex = options[direction].end;
    const crossStartIndex = options[crossDirection].start;
    if (crossStartIndex > options[crossDirection].end) {
      return null;
    }
    let crossSpan = 1;
    for (let crossIndex = crossStartIndex; crossIndex < crossStartIndex + crossSpan; crossIndex += 1) {
      let lineCrossSpan = 1;
      for (let index = startIndex; index <= endIndex; index += 1) {
        const cell = this._cellByDirection(direction, index, crossIndex);
        lineCrossSpan = Math.max(lineCrossSpan, cell.location[`${crossDirection}span`]);
      }
      const lineCrossEndIndex = crossIndex + lineCrossSpan;
      const crossEndIndex = crossStartIndex + crossSpan;
      if (lineCrossEndIndex > crossEndIndex) {
        crossSpan += lineCrossEndIndex - crossEndIndex;
      }
    }
    // @ts-expect-error ts-error
    const result = {};
    result[direction] = {
      start: startIndex,
      end: endIndex
    };
    result[crossDirection] = {
      start: crossStartIndex,
      end: crossStartIndex + crossSpan - 1
    };
    return result;
  }
  _cellByDirection(direction, index, crossIndex) {
    return direction === 'col' ? this._grid[crossIndex][index] : this._grid[index][crossIndex];
  }
  _blockSize(block, direction) {
    const defaultMinSize = direction === 'row' ? 'auto' : 0;
    const sizeConfigs = direction === 'row' ? this._rows : this._cols;
    const result = _extends({}, this._createDefaultSizeConfig(), {
      ratio: 0
    });
    for (let index = block[direction].start; index <= block[direction].end; index += 1) {
      const sizeConfig = sizeConfigs[index];
      // @ts-expect-error ts-error
      result.ratio += sizeConfig.ratio;
      // @ts-expect-error ts-error
      result.baseSize += sizeConfig.baseSize;
      // @ts-expect-error ts-error
      result.minSize += sizeConfig.minSize;
      // @ts-expect-error ts-error
      result.maxSize += sizeConfig.maxSize;
      if (isDefined(sizeConfig.shrink)) {
        result.shrink = sizeConfig.shrink;
      }
    }
    if (!result.minSize) {
      result.minSize = defaultMinSize;
    }
    if (!result.maxSize) {
      result.maxSize = 'auto';
    }
    if (this._isSingleColumnScreen()) {
      result.baseSize = 'auto';
    }
    return result;
  }
  _update(forceRemoveRoot) {
    var _this$_layoutChangedA;
    const $existingRoot = this._$root;
    this._renderItems();
    if ($existingRoot) {
      if (forceRemoveRoot) {
        $existingRoot.remove();
      } else {
        $existingRoot.detach();
        this._saveAssistantRoot($existingRoot);
      }
    }
    (_this$_layoutChangedA = this._layoutChangedAction) === null || _this$_layoutChangedA === void 0 || _this$_layoutChangedA.call(this);
  }
  _saveAssistantRoot($root) {
    this._assistantRoots = this._assistantRoots ?? [];
    this._assistantRoots.push($root);
  }
  _dispose() {
    this._clearItemNodeTemplates();
    this._cleanUnusedRoots();
    super._dispose();
  }
  _cleanUnusedRoots() {
    if (!this._assistantRoots) {
      return;
    }
    each(this._assistantRoots, (_, item) => {
      $(item).remove();
    });
  }
  _clearItemNodeTemplates() {
    const {
      items
    } = this.option();
    each(items, function clearTemplates() {
      // eslint-disable-next-line @typescript-eslint/no-invalid-this
      delete this.node;
    });
  }
  _attachClickEvent() {}
  _optionChanged(args) {
    const {
      name
    } = args;
    switch (name) {
      case 'rows':
      case 'cols':
      case 'screenByWidth':
      case 'singleColumnScreen':
        this._clearItemNodeTemplates();
        this._invalidate();
        break;
      case 'width':
      case 'height':
        super._optionChanged(args);
        this._update();
        break;
      case 'onLayoutChanged':
        this._initLayoutChangedAction();
        break;
      case 'itemTemplate':
        this._clearItemNodeTemplates();
        super._optionChanged(args);
        break;
      case 'currentScreenFactor':
        break;
      default:
        super._optionChanged(args);
    }
  }
  _dimensionChanged() {
    const {
      currentScreenFactor
    } = this.option();
    if (this._getCurrentScreen() !== currentScreenFactor) {
      this._update();
    }
  }
  repaint() {
    this._update();
  }
}
registerComponent('dxResponsiveBox', ResponsiveBox);
export default ResponsiveBox;
