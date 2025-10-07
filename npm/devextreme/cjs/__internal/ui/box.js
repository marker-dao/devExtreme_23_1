/**
* DevExtreme (cjs/__internal/ui/box.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
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
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _inflector = require("../../core/utils/inflector");
var _iterator = require("../../core/utils/iterator");
var _style = require("../../core/utils/style");
var _type = require("../../core/utils/type");
var _window = require("../../core/utils/window");
var _collection_widget = _interopRequireDefault(require("../ui/collection/collection_widget.edit"));
var _item = _interopRequireDefault(require("../ui/collection/item"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // eslint-disable-next-line max-classes-per-file
const BOX_CLASS = 'dx-box';
const BOX_FLEX_CLASS = 'dx-box-flex';
const BOX_ITEM_CLASS = 'dx-box-item';
const BOX_ITEM_DATA_KEY = 'dxBoxItemData';
const SHRINK = 1;
const MINSIZE_MAP = {
  row: 'minWidth',
  col: 'minHeight'
};
const MAXSIZE_MAP = {
  row: 'maxWidth',
  col: 'maxHeight'
};
const FLEX_JUSTIFY_CONTENT_MAP = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  'space-between': 'space-between',
  'space-around': 'space-around'
};
const FLEX_ALIGN_ITEMS_MAP = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  stretch: 'stretch'
};
const FLEX_DIRECTION_MAP = {
  row: 'row',
  col: 'column'
};
const setFlexProp = (element, prop, value) => {
  // NOTE: workaround for jQuery version < 1.11.1 (T181692)
  const normalizedValue = (0, _style.normalizeStyleProp)(prop, value);
  element.style[(0, _style.styleProp)(prop)] = normalizedValue;
  // NOTE: workaround for Domino issue https://github.com/fgnass/domino/issues/119
  if (!(0, _window.hasWindow)()) {
    if (normalizedValue === '' || !(0, _type.isDefined)(normalizedValue)) {
      return;
    }
    const cssName = (0, _inflector.dasherize)(prop);
    const styleExpr = `${cssName}: ${normalizedValue};`;
    (0, _style.setStyle)(element, styleExpr, false);
  }
};
class BoxItem extends _item.default {
  _renderVisible(value, oldValue) {
    super._renderVisible(value);
    if ((0, _type.isDefined)(oldValue)) {
      this._options.fireItemStateChangedAction({
        name: 'visible',
        state: value,
        oldState: oldValue
      });
    }
  }
}
class LayoutStrategy {
  constructor($element, option) {
    this._$element = $element;
    this._option = option;
  }
  renderBox() {
    this._$element.css({
      display: `${(0, _style.stylePropPrefix)('flexDirection')}flex`
    });
    const direction = this._option('direction') ?? 'row';
    setFlexProp(this._$element.get(0), 'flexDirection', FLEX_DIRECTION_MAP[direction]);
  }
  renderAlign() {
    this._$element.css({
      justifyContent: this._normalizedAlign()
    });
  }
  _normalizedAlign() {
    const align = this._option('align') ?? 'start';
    return align in FLEX_JUSTIFY_CONTENT_MAP ? FLEX_JUSTIFY_CONTENT_MAP[align] : align;
  }
  renderCrossAlign() {
    this._$element.css({
      alignItems: this._normalizedCrossAlign()
    });
  }
  _normalizedCrossAlign() {
    const crossAlign = this._option('crossAlign') ?? 'start';
    return crossAlign in FLEX_ALIGN_ITEMS_MAP ? FLEX_ALIGN_ITEMS_MAP[crossAlign] : crossAlign;
  }
  renderItems($items) {
    const flexPropPrefix = (0, _style.stylePropPrefix)('flexDirection');
    const direction = this._option('direction') ?? 'row';
    (0, _iterator.each)($items, function renderEachItem() {
      const $item = (0, _renderer.default)(this);
      const item = $item.data(BOX_ITEM_DATA_KEY);
      $item.css({
        display: `${flexPropPrefix}flex`
      }).css(MAXSIZE_MAP[direction], item.maxSize ?? 'none').css(MINSIZE_MAP[direction], item.minSize ?? '0');
      setFlexProp($item.get(0), 'flexBasis', item.baseSize ?? 0);
      setFlexProp($item.get(0), 'flexGrow', item.ratio ?? 0);
      setFlexProp($item.get(0), 'flexShrink', (0, _type.isDefined)(item.shrink) ? item.shrink : SHRINK);
      $item.children().each((index, element) => {
        (0, _renderer.default)(element).css({
          width: 'auto',
          height: 'auto',
          display: `${(0, _style.stylePropPrefix)('flexDirection')}flex`,
          flexBasis: 0
        });
        setFlexProp(element, 'flexGrow', 1);
        setFlexProp(element, 'flexDirection', (0, _renderer.default)(element)[0].style.flexDirection ?? 'column');
        return true;
      });
    });
  }
}
class Box extends _collection_widget.default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      direction: 'row',
      align: 'start',
      crossAlign: 'stretch',
      activeStateEnabled: false,
      focusStateEnabled: false
    });
  }
  _itemClass() {
    return BOX_ITEM_CLASS;
  }
  _itemDataKey() {
    return BOX_ITEM_DATA_KEY;
  }
  _itemElements() {
    return this._itemContainer().children(this._itemSelector());
  }
  _init() {
    super._init();
    this.$element().addClass(BOX_FLEX_CLASS);
    this._initLayout();
    this._initializeRenderQueue();
  }
  _initLayout() {
    this._layout = new LayoutStrategy(this.$element(), name => this.option(name));
  }
  _initializeRenderQueue() {
    const {
      _queue: queue
    } = this.option();
    this._queue = queue ?? [];
  }
  _queueIsNotEmpty() {
    return this.option('_queue') ? false : !!this._queue.length;
  }
  _pushItemToQueue($item, config) {
    this._queue.push({
      $item,
      config
    });
  }
  _shiftItemFromQueue() {
    return this._queue.shift();
  }
  _initMarkup() {
    this.$element().addClass(BOX_CLASS);
    this._layout.renderBox();
    super._initMarkup();
    this._renderAlign();
    this._renderActions();
  }
  _renderActions() {
    this._onItemStateChanged = this._createActionByOption('onItemStateChanged');
  }
  _renderAlign() {
    this._layout.renderAlign();
    this._layout.renderCrossAlign();
  }
  _renderItems(items) {
    super._renderItems(items);
    this._processRenderQueue();
    this._layout.renderItems(this._itemElements());
  }
  _processRenderQueue() {
    if (this._queueIsNotEmpty()) {
      const item = this._shiftItemFromQueue();
      const {
        itemTemplate,
        itemHoldTimeout,
        onItemHold,
        onItemClick,
        onItemContextMenu,
        onItemRendered
      } = this.option();
      if (item) {
        this._createComponent(item.$item, Box, _extends({
          itemTemplate,
          itemHoldTimeout,
          onItemHold,
          onItemClick,
          onItemContextMenu,
          onItemRendered,
          _queue: this._queue
        }, item.config));
      }
      this._processRenderQueue();
    }
  }
  _renderItemContent(args) {
    var _args$itemData;
    const $itemNode = (_args$itemData = args.itemData) === null || _args$itemData === void 0 ? void 0 : _args$itemData.node;
    if ($itemNode) {
      return this._renderItemContentByNode(args, $itemNode);
    }
    return super._renderItemContent(args);
  }
  _postprocessRenderItem(args) {
    var _args$itemData2;
    const boxConfig = (_args$itemData2 = args.itemData) === null || _args$itemData2 === void 0 ? void 0 : _args$itemData2.box;
    if (!boxConfig) {
      return;
    }
    this._pushItemToQueue(args.itemContent, boxConfig);
  }
  _createItemByTemplate(itemTemplate, args) {
    const {
      itemData
    } = args;
    if (itemData.box) {
      // @ts-expect-error
      return itemTemplate.source ? itemTemplate.source() : (0, _renderer.default)();
    }
    return super._createItemByTemplate(itemTemplate, args);
  }
  _itemOptionChanged(item, property, value, prevValue) {
    if (property === 'visible') {
      this._onItemStateChanged({
        name: property,
        state: value,
        oldState: prevValue !== false
      });
    }
    super._itemOptionChanged(item, property, value, prevValue);
  }
  _optionChanged(args) {
    const {
      name
    } = args;
    switch (name) {
      case '_queue':
      case 'direction':
        this._invalidate();
        break;
      case 'align':
        this._layout.renderAlign();
        break;
      case 'crossAlign':
        this._layout.renderCrossAlign();
        break;
      default:
        super._optionChanged(args);
    }
  }
  _itemOptions() {
    const options = super._itemOptions();
    options.fireItemStateChangedAction = e => {
      this._onItemStateChanged(e);
    };
    return options;
  }
}
Box.ItemClass = BoxItem;
(0, _component_registrator.default)('dxBox', Box);
var _default = exports.default = Box;
