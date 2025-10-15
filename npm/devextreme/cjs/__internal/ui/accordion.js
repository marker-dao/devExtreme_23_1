/**
* DevExtreme (cjs/__internal/ui/accordion.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _animation = require("../../common/core/animation");
var _click = require("../../common/core/events/click");
var _events_engine = _interopRequireDefault(require("../../common/core/events/core/events_engine"));
var _utils = require("../../common/core/events/utils");
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _devices = _interopRequireDefault(require("../../core/devices"));
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _element = require("../../core/element");
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _bindable_template = require("../../core/templates/bindable_template");
var _common = require("../../core/utils/common");
var _deferred = require("../../core/utils/deferred");
var _icon = require("../../core/utils/icon");
var iteratorUtils = _interopRequireWildcard(require("../../core/utils/iterator"));
var _size = require("../../core/utils/size");
var _type = require("../../core/utils/type");
var _themes = require("../../ui/themes");
var _collection_widget = _interopRequireDefault(require("../ui/collection/collection_widget.live_update"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const ACCORDION_CLASS = 'dx-accordion';
const ACCORDION_WRAPPER_CLASS = 'dx-accordion-wrapper';
const ACCORDION_ITEM_CLASS = 'dx-accordion-item';
const ACCORDION_ITEM_OPENED_CLASS = 'dx-accordion-item-opened';
const ACCORDION_ITEM_CLOSED_CLASS = 'dx-accordion-item-closed';
const ACCORDION_ITEM_TITLE_CLASS = 'dx-accordion-item-title';
const ACCORDION_ITEM_BODY_CLASS = 'dx-accordion-item-body';
const ACCORDION_ITEM_TITLE_CAPTION_CLASS = 'dx-accordion-item-title-caption';
const ACCORDION_ITEM_DATA_KEY = 'dxAccordionItemData';
class Accordion extends _collection_widget.default {
  _activeStateUnit() {
    return `.${ACCORDION_ITEM_CLASS}`;
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      hoverStateEnabled: true,
      itemTitleTemplate: 'title',
      // @ts-expect-error ts-error
      onItemTitleClick: null,
      selectedIndex: 0,
      collapsible: false,
      multiple: false,
      animationDuration: 300,
      deferRendering: true,
      selectByClick: true,
      activeStateEnabled: true,
      _itemAttributes: {
        role: 'tab'
      },
      _animationEasing: 'ease'
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
        return (0, _themes.isMaterialBased)((0, _themes.current)());
      },
      options: {
        animationDuration: 200,
        _animationEasing: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }
    }]);
  }
  _itemElements() {
    return this._itemContainer().children(this._itemSelector());
  }
  _init() {
    super._init();
    const {
      collapsible,
      multiple
    } = this.option();
    this.option('selectionRequired', !collapsible);
    this.option('selectionMode', multiple ? 'multiple' : 'single');
    const $element = this.$element();
    $element.addClass(ACCORDION_CLASS);
    this._$container = (0, _renderer.default)('<div>').addClass(ACCORDION_WRAPPER_CLASS);
    $element.append(this._$container);
  }
  _initTemplates() {
    super._initTemplates();
    this._templateManager.addDefaultTemplates({
      title: new _bindable_template.BindableTemplate(($container, data) => {
        if ((0, _type.isPlainObject)(data)) {
          const $iconElement = (0, _icon.getImageContainer)(data.icon);
          if ($iconElement) {
            $container.append($iconElement);
          }
          if ((0, _type.isDefined)(data.title) && !(0, _type.isPlainObject)(data.title)) {
            $container.append(_dom_adapter.default.createTextNode(data.title));
          }
        } else if ((0, _type.isDefined)(data)) {
          $container.text(String(data));
        }
        $container.wrapInner((0, _renderer.default)('<div>').addClass(ACCORDION_ITEM_TITLE_CAPTION_CLASS));
      }, ['title', 'icon'], this.option('integrationOptions.watchMethod'))
    });
  }
  _initMarkup() {
    this._deferredItems = [];
    super._initMarkup();
    const {
      multiple
    } = this.option();
    this.setAria({
      role: 'tablist',
      // eslint-disable-next-line spellcheck/spell-checker
      multiselectable: multiple
    });
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (0, _common.deferRender)(() => {
      const selectedItemIndices = this._getSelectedItemIndices();
      this._renderSelection(selectedItemIndices, []);
    });
  }
  _postProcessRenderItems() {
    this._updateItemHeights(true);
  }
  _itemDataKey() {
    return ACCORDION_ITEM_DATA_KEY;
  }
  _itemClass() {
    return ACCORDION_ITEM_CLASS;
  }
  _itemContainer() {
    return this._$container;
  }
  _itemTitles() {
    return this._itemElements().find(`.${ACCORDION_ITEM_TITLE_CLASS}`);
  }
  _itemContents() {
    return this._itemElements().find(`.${ACCORDION_ITEM_BODY_CLASS}`);
  }
  _getItemData(target) {
    // @ts-expect-error ts-error
    const itemData = (0, _renderer.default)(target).parent().data(this._itemDataKey());
    return itemData ?? super._getItemData(target);
  }
  _itemSelectHandler(e) {
    if ((0, _renderer.default)(e.target).closest(this._itemContents()).length) {
      return;
    }
    super._itemSelectHandler(e);
  }
  _afterItemElementDeleted($item, deletedActionArgs) {
    this._deferredItems.splice(deletedActionArgs.itemIndex, 1);
    super._afterItemElementDeleted($item, deletedActionArgs);
  }
  _renderItemContent(args) {
    const {
      itemTitleTemplate
    } = this.option();
    const itemTitleDeferred = super._renderItemContent(_extends({}, args, {
      contentClass: ACCORDION_ITEM_TITLE_CLASS,
      templateProperty: 'titleTemplate',
      defaultTemplateName: itemTitleTemplate
    }));
    const callBase = super._renderItemContent.bind(this);
    return itemTitleDeferred.done(itemTitle => {
      this._attachItemTitleClickAction(itemTitle);
      const deferred = (0, _deferred.Deferred)();
      if ((0, _type.isDefined)(this._deferredItems[args.index])) {
        this._deferredItems[args.index] = deferred;
      } else {
        this._deferredItems.push(deferred);
      }
      const {
        deferRendering
      } = this.option();
      if (!deferRendering || this._getSelectedItemIndices().includes(args.index)) {
        deferred.resolve();
      }
      deferred.done(() => {
        callBase(_extends({}, args, {
          contentClass: ACCORDION_ITEM_BODY_CLASS,
          container: (0, _element.getPublicElement)((0, _renderer.default)('<div>').appendTo((0, _renderer.default)(itemTitle).parent()))
        }));
      });
    });
  }
  _attachItemTitleClickAction($itemTitle) {
    // @ts-expect-error ts-error
    const eventName = (0, _utils.addNamespace)(_click.name, this.NAME);
    _events_engine.default.off($itemTitle, eventName);
    _events_engine.default.on($itemTitle, eventName, this._itemTitleClickHandler.bind(this));
  }
  _itemTitleClickHandler(e) {
    this._itemDXEventHandler(e, 'onItemTitleClick');
  }
  _renderSelection(addedSelection, removedSelection) {
    this._itemElements().addClass(ACCORDION_ITEM_CLOSED_CLASS);
    this.setAria('hidden', true, this._itemContents());
    this._updateItems(addedSelection, removedSelection);
  }
  _updateSelection(addedSelection, removedSelection) {
    this._updateItems(addedSelection, removedSelection);
    this._updateItemHeightsWrapper(false);
  }
  _updateItems(addedSelection, removedSelection) {
    const $items = this._itemElements();
    iteratorUtils.each(addedSelection, (_i, addedIndex) => {
      var _this$_deferredItems$;
      (_this$_deferredItems$ = this._deferredItems[addedIndex]) === null || _this$_deferredItems$ === void 0 || _this$_deferredItems$.resolve();
      const $item = $items.eq(addedIndex).addClass(ACCORDION_ITEM_OPENED_CLASS).removeClass(ACCORDION_ITEM_CLOSED_CLASS);
      this.setAria('hidden', false, $item.find(`.${ACCORDION_ITEM_BODY_CLASS}`));
    });
    iteratorUtils.each(removedSelection, (_i, removedIndex) => {
      const $item = $items.eq(removedIndex).removeClass(ACCORDION_ITEM_OPENED_CLASS);
      this.setAria('hidden', true, $item.find(`.${ACCORDION_ITEM_BODY_CLASS}`));
    });
  }
  _updateItemHeightsWrapper(skipAnimation) {
    const {
      templatesRenderAsynchronously
    } = this.option();
    // Note: require for proper animation in angularjs (T520346)
    if (templatesRenderAsynchronously) {
      // eslint-disable-next-line no-restricted-globals
      this._animationTimer = setTimeout(() => {
        this._updateItemHeights(skipAnimation);
      });
    } else {
      this._updateItemHeights(skipAnimation);
    }
  }
  _updateItemHeights(skipAnimation) {
    const deferredAnimate = this._deferredAnimate;
    const itemHeight = this._splitFreeSpace(this._calculateFreeSpace());
    clearTimeout(this._animationTimer);
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    return _deferred.when.apply(_renderer.default, [...this._itemElements().toArray()].map(item => that._updateItemHeight((0, _renderer.default)(item), itemHeight, skipAnimation))).done(() => {
      if (deferredAnimate) {
        // @ts-expect-error ts-error
        deferredAnimate.resolveWith(that);
      }
    });
  }
  _updateItemHeight($item, itemHeight, skipAnimation) {
    const $title = $item.children(`.${ACCORDION_ITEM_TITLE_CLASS}`);
    if (_animation.fx.isAnimating($item.get(0))) {
      _animation.fx.stop($item.get(0), false);
    }
    const startItemHeight = (0, _size.getOuterHeight)($item);
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let finalItemHeight;
    if ($item.hasClass(ACCORDION_ITEM_OPENED_CLASS)) {
      finalItemHeight = itemHeight + (0, _size.getOuterHeight)($title);
      if (!finalItemHeight) {
        (0, _size.setHeight)($item, 'auto');
        finalItemHeight = (0, _size.getOuterHeight)($item);
      }
    } else {
      finalItemHeight = (0, _size.getOuterHeight)($title);
    }
    return this._animateItem($item, startItemHeight, finalItemHeight, skipAnimation, !!itemHeight);
  }
  _animateItem($element, startHeight, endHeight, skipAnimation, fixedHeight) {
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let deferred;
    if (skipAnimation || startHeight === endHeight) {
      $element.css('height', endHeight);
      deferred = (0, _deferred.Deferred)().resolve();
    } else {
      const {
        animationDuration,
        _animationEasing: easing
      } = this.option();
      deferred = _animation.fx.animate($element.get(0), {
        // @ts-expect-error ts-error
        type: 'custom',
        // @ts-expect-error ts-error
        from: {
          height: startHeight
        },
        // @ts-expect-error ts-error,
        to: {
          height: endHeight
        },
        duration: animationDuration,
        easing
      });
    }
    // @ts-expect-error ts-error
    return deferred.done(() => {
      if ($element.hasClass(ACCORDION_ITEM_OPENED_CLASS) && !fixedHeight) {
        $element.css('height', '');
      }
      $element.not(`.${ACCORDION_ITEM_OPENED_CLASS}`).addClass(ACCORDION_ITEM_CLOSED_CLASS);
    });
  }
  _splitFreeSpace(freeSpace) {
    const {
      selectedItems
    } = this.option();
    if (!freeSpace || !(selectedItems !== null && selectedItems !== void 0 && selectedItems.length)) {
      return freeSpace;
    }
    return freeSpace / selectedItems.length;
  }
  _calculateFreeSpace() {
    const {
      height
    } = this.option();
    if (height === undefined || height === 'auto') {
      return undefined;
    }
    const $titles = this._itemTitles();
    let itemsHeight = 0;
    iteratorUtils.each($titles, (_index, title) => {
      itemsHeight += (0, _size.getOuterHeight)(title);
    });
    const elementHeight = (0, _size.getHeight)(this.$element());
    return elementHeight - itemsHeight;
  }
  _visibilityChanged(visible) {
    if (visible) {
      this._dimensionChanged();
    }
  }
  _dimensionChanged() {
    this._updateItemHeights(true);
  }
  _clean() {
    clearTimeout(this._animationTimer);
    super._clean();
  }
  _tryParseItemPropertyName(fullName) {
    // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
    const matches = fullName.match(/.*\.(.*)/);
    if ((0, _type.isDefined)(matches) && matches.length >= 1) {
      return matches[1];
    }
    return null;
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'items':
        {
          super._optionChanged(args);
          if (this._tryParseItemPropertyName(args.fullName) === 'title') {
            this._renderSelection(this._getSelectedItemIndices(), []);
          }
          if (this._tryParseItemPropertyName(args.fullName) === 'visible') {
            this._updateItemHeightsWrapper(true);
          }
          const {
            repaintChangesOnly
          } = this.option();
          if (repaintChangesOnly === true && args.fullName === 'items') {
            this._renderSelection(this._getSelectedItemIndices(), []);
            this._updateItemHeightsWrapper(true);
          }
          break;
        }
      case 'animationDuration':
      case 'onItemTitleClick':
      case '_animationEasing':
        break;
      case 'collapsible':
        this.option('selectionRequired', !this.option('collapsible'));
        break;
      case 'itemTitleTemplate':
      case 'height':
      case 'deferRendering':
        this._invalidate();
        break;
      case 'multiple':
        this.option('selectionMode', args.value ? 'multiple' : 'single');
        break;
      default:
        super._optionChanged(args);
    }
  }
  expandItem(index) {
    this._deferredAnimate = (0, _deferred.Deferred)();
    this.selectItem(index);
    return this._deferredAnimate.promise();
  }
  collapseItem(index) {
    this._deferredAnimate = (0, _deferred.Deferred)();
    this.unselectItem(index);
    return this._deferredAnimate.promise();
  }
  updateDimensions() {
    return this._updateItemHeights(false);
  }
}
(0, _component_registrator.default)('dxAccordion', Accordion);
var _default = exports.default = Accordion;
