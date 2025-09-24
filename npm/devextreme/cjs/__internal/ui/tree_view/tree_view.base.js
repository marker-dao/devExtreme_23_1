/**
* DevExtreme (cjs/__internal/ui/tree_view/tree_view.base.js)
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
exports.default = exports.ITEM_CLASS = exports.EXPANDER_ICON_STUB_CLASS = void 0;
var _animation = require("../../../common/core/animation");
var _click = require("../../../common/core/events/click");
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _double_click = require("../../../common/core/events/double_click");
var _pointer = _interopRequireDefault(require("../../../common/core/events/pointer"));
var _utils = require("../../../common/core/events/utils");
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));
var _element = require("../../../core/element");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _deferred = require("../../../core/utils/deferred");
var _extend = require("../../../core/utils/extend");
var _icon = require("../../../core/utils/icon");
var _iterator = require("../../../core/utils/iterator");
var _size = require("../../../core/utils/size");
var _type = require("../../../core/utils/type");
var _window = require("../../../core/utils/window");
var _m_support = _interopRequireDefault(require("../../core/utils/m_support"));
var _index2 = _interopRequireDefault(require("../../ui/check_box/index"));
var _hierarchical_collection_widget = _interopRequireDefault(require("../../ui/hierarchical_collection/hierarchical_collection_widget"));
var _load_indicator = _interopRequireDefault(require("../../ui/load_indicator"));
var _consts = require("../../ui/scroll_view/consts");
var _scrollable = _interopRequireDefault(require("../../ui/scroll_view/scrollable"));
var _get_relative_offset = require("../../ui/scroll_view/utils/get_relative_offset");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const WIDGET_CLASS = 'dx-treeview';
const NODE_CLASS = `${WIDGET_CLASS}-node`;
const NODE_CONTAINER_CLASS = `${NODE_CLASS}-container`;
const NODE_LOAD_INDICATOR_CLASS = `${NODE_CLASS}-loadindicator`;
const OPENED_NODE_CONTAINER_CLASS = `${NODE_CLASS}-container-opened`;
const IS_LEAF = `${NODE_CLASS}-is-leaf`;
const ITEM_CLASS = exports.ITEM_CLASS = `${WIDGET_CLASS}-item`;
const ITEM_WITH_CHECKBOX_CLASS = `${ITEM_CLASS}-with-checkbox`;
const ITEM_WITH_CUSTOM_EXPANDER_ICON_CLASS = `${ITEM_CLASS}-with-custom-expander-icon`;
const CUSTOM_EXPANDER_ICON_ITEM_CONTAINER_CLASS = `${WIDGET_CLASS}-custom-expander-icon-item-container`;
const ITEM_WITHOUT_CHECKBOX_CLASS = `${ITEM_CLASS}-without-checkbox`;
const ITEM_DATA_KEY = `${ITEM_CLASS}-data`;
const TOGGLE_ITEM_VISIBILITY_CLASS = `${WIDGET_CLASS}-toggle-item-visibility`;
const CUSTOM_COLLAPSE_ICON_CLASS = `${WIDGET_CLASS}-custom-collapse-icon`;
const CUSTOM_EXPAND_ICON_CLASS = `${WIDGET_CLASS}-custom-expand-icon`;
const LOAD_INDICATOR_CLASS = `${WIDGET_CLASS}-loadindicator`;
const LOAD_INDICATOR_WRAPPER_CLASS = `${WIDGET_CLASS}-loadindicator-wrapper`;
const TOGGLE_ITEM_VISIBILITY_OPENED_CLASS = `${WIDGET_CLASS}-toggle-item-visibility-opened`;
const SELECT_ALL_ITEM_CLASS = `${WIDGET_CLASS}-select-all-item`;
const INVISIBLE_STATE_CLASS = 'dx-state-invisible';
const DISABLED_STATE_CLASS = 'dx-state-disabled';
const SELECTED_ITEM_CLASS = 'dx-state-selected';
const EXPAND_EVENT_NAMESPACE = 'dxTreeView_expand';
const DATA_ITEM_ID = 'data-item-id';
const ITEM_URL_CLASS = 'dx-item-url';
const CHECK_BOX_CLASS = 'dx-checkbox';
const CHECK_BOX_ICON_CLASS = 'dx-checkbox-icon';
const ROOT_NODE_CLASS = `${WIDGET_CLASS}-root-node`;
const EXPANDER_ICON_STUB_CLASS = exports.EXPANDER_ICON_STUB_CLASS = `${WIDGET_CLASS}-expander-icon-stub`;
class TreeViewBase extends _hierarchical_collection_widget.default {
  _activeStateUnit() {
    return `.${ITEM_CLASS}`;
  }
  _supportedKeys() {
    const click = e => {
      const {
        focusedElement
      } = this.option();
      const $itemElement = (0, _renderer.default)(focusedElement);
      if (!$itemElement.length) {
        return;
      }
      e.target = $itemElement.get(0);
      e.currentTarget = $itemElement.get(0);
      this._processItemClick(e, $itemElement.children(`.${ITEM_CLASS}`));
      const {
        expandEvent
      } = this.option();
      const expandEventName = this._getEventNameByOption(expandEvent);
      const expandByClick = expandEventName === (0, _utils.addNamespace)(_click.name, EXPAND_EVENT_NAMESPACE);
      if (expandByClick) {
        this._expandEventHandler(e);
      }
    };
    const select = e => {
      e.preventDefault();
      const {
        focusedElement
      } = this.option();
      const $focusedElement = (0, _renderer.default)(focusedElement);
      const checkboxInstance = this._getCheckBoxInstance($focusedElement);
      const {
        disabled,
        value
      } = checkboxInstance.option();
      if (!disabled) {
        const currentState = value;
        this._updateItemSelection(!currentState, $focusedElement.find(`.${ITEM_CLASS}`).get(0), e);
      }
    };
    const toggleExpandedNestedItems = (state, e) => {
      const {
        expandAllEnabled
      } = this.option();
      if (!expandAllEnabled) {
        return;
      }
      e.preventDefault();
      const {
        focusedElement
      } = this.option();
      const $rootElement = (0, _renderer.default)(focusedElement);
      if (!$rootElement.length) {
        return;
      }
      const rootItem = this._getItemData($rootElement.find(`.${ITEM_CLASS}`));
      this._toggleExpandedNestedItems([rootItem], state);
    };
    return _extends({}, super._supportedKeys(), {
      enter: this._showCheckboxes() ? select : click,
      space: this._showCheckboxes() ? select : click,
      asterisk: e => {
        toggleExpandedNestedItems(true, e);
      },
      minus: e => {
        toggleExpandedNestedItems(false, e);
      }
    });
  }
  _toggleExpandedNestedItems(items, state) {
    if (!items) {
      return;
    }
    for (let i = 0, len = items.length; i < len; i += 1) {
      const item = items[i];
      const node = this._dataAdapter.getNodeByItem(item);
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this._toggleExpandedState(node, state);
      this._toggleExpandedNestedItems(item.items, state);
    }
  }
  _getNodeElement(node, cache) {
    const key = this._encodeString(node.internalFields.key);
    if (cache) {
      if (!cache.$nodeByKey) {
        cache.$nodeByKey = {};
        const $nodes = this.$element().find(`.${NODE_CLASS}`);
        $nodes.each((_index, element) => {
          const $node = (0, _renderer.default)(element);
          const nodeKey = $node.attr(DATA_ITEM_ID);
          // @ts-expect-error ts-error
          cache.$nodeByKey[nodeKey] = $node;
          return true;
        });
      }
      return cache.$nodeByKey[key] || (0, _renderer.default)();
    }
    const element = this.$element().get(0).querySelector(`[${DATA_ITEM_ID}="${key}"]`);
    return (0, _renderer.default)(element);
  }
  _widgetClass() {
    return WIDGET_CLASS;
  }
  _getDefaultOptions() {
    const defaultOptions = _extends({}, super._getDefaultOptions(), {
      animationEnabled: true,
      dataStructure: 'tree',
      deferRendering: true,
      expandAllEnabled: false,
      hasItemsExpr: 'hasItems',
      selectNodesRecursive: true,
      expandNodesRecursive: true,
      showCheckBoxesMode: 'none',
      expandIcon: null,
      collapseIcon: null,
      selectAllText: _message.default.format('dxList-selectAll'),
      onItemSelectionChanged: null,
      onItemExpanded: null,
      onItemCollapsed: null,
      scrollDirection: 'vertical',
      useNativeScrolling: true,
      virtualModeEnabled: false,
      rootValue: 0,
      focusStateEnabled: false,
      selectionMode: 'multiple',
      expandEvent: 'dblclick',
      selectByClick: false,
      createChildren: null,
      onSelectAllValueChanged: null,
      _supportItemUrl: false
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (0, _extend.extend)(true, defaultOptions, {
      integrationOptions: {
        useDeferUpdateForTemplates: false
      }
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device() {
        return !_m_support.default.nativeScrolling;
      },
      options: {
        useNativeScrolling: false
      }
    }]);
  }
  _initSelectedItems() {}
  // @ts-expect-error ts-error
  _syncSelectionOptions() {
    return (0, _deferred.Deferred)().resolve().promise();
  }
  _fireSelectionChanged() {
    this._createActionByOption('onSelectionChanged', {
      excludeValidators: ['disabled', 'readOnly']
    })();
  }
  _createSelectAllValueChangedAction() {
    this._selectAllValueChangedAction = this._createActionByOption('onSelectAllValueChanged', {
      excludeValidators: ['disabled', 'readOnly']
    });
  }
  _fireSelectAllValueChanged(value) {
    var _this$_selectAllValue;
    (_this$_selectAllValue = this._selectAllValueChangedAction) === null || _this$_selectAllValue === void 0 || _this$_selectAllValue.call(this, {
      value
    });
  }
  _checkBoxModeChange(value, previousValue) {
    var _this$_$selectAllItem;
    const {
      searchEnabled
    } = this.option();
    const previousSelectAllEnabled = this._selectAllEnabled(previousValue);
    const previousItemsContainer = this._itemContainer(searchEnabled, previousSelectAllEnabled);
    this._detachClickEvent(previousItemsContainer);
    this._detachExpandEvent(previousItemsContainer);
    if (previousValue === 'none' || value === 'none') {
      return;
    }
    const selectAllExists = (_this$_$selectAllItem = this._$selectAllItem) === null || _this$_$selectAllItem === void 0 ? void 0 : _this$_$selectAllItem.length;
    switch (value) {
      case 'selectAll':
        if (!selectAllExists) {
          this._createSelectAllValueChangedAction();
          this._renderSelectAllItem();
        }
        break;
      case 'normal':
        if (selectAllExists) {
          var _this$_$selectAllItem2;
          (_this$_$selectAllItem2 = this._$selectAllItem) === null || _this$_$selectAllItem2 === void 0 || _this$_$selectAllItem2.remove();
          delete this._$selectAllItem;
        }
        break;
      default:
        break;
    }
  }
  _removeSelection() {
    (0, _iterator.each)(this._dataAdapter.getFullData(), (_index, node) => {
      if (!this._hasChildren(node)) {
        return;
      }
      this._dataAdapter.toggleSelection(node.internalFields.key, false, true);
    });
  }
  _optionChanged(args) {
    const {
      name,
      value,
      previousValue
    } = args;
    switch (name) {
      case 'selectAllText':
        if (this._$selectAllItem) {
          // @ts-expect-error ts-error
          this._$selectAllItem.dxCheckBox('instance').option('text', value);
        }
        break;
      case 'showCheckBoxesMode':
        this._checkBoxModeChange(value, previousValue);
        this._invalidate();
        break;
      case 'scrollDirection':
        this.getScrollable().option('direction', value);
        break;
      case 'useNativeScrolling':
        this.getScrollable().option('useNative', value);
        break;
      case 'items':
        delete this._$selectAllItem;
        super._optionChanged(args);
        break;
      case 'dataSource':
        super._optionChanged(args);
        this._initDataAdapter();
        this._filter = {};
        break;
      case 'hasItemsExpr':
        this._initAccessors();
        this.repaint();
        break;
      case 'expandEvent':
        this._attachExpandEvent();
        break;
      case 'deferRendering':
      case 'dataStructure':
      case 'rootValue':
      case 'createChildren':
      case 'expandNodesRecursive':
      case 'onItemSelectionChanged':
      case 'onItemExpanded':
      case 'onItemCollapsed':
      case 'expandAllEnabled':
      case 'animationEnabled':
      case 'virtualModeEnabled':
      case 'selectByClick':
      case '_supportItemUrl':
        break;
      case 'selectionMode':
        this._initDataAdapter();
        super._optionChanged(args);
        break;
      case 'onSelectAllValueChanged':
        this._createSelectAllValueChangedAction();
        break;
      case 'selectNodesRecursive':
        this._dataAdapter.setOption('recursiveSelection', args.value ?? false);
        this.repaint();
        break;
      case 'expandIcon':
      case 'collapseIcon':
        this.repaint();
        break;
      default:
        super._optionChanged(args);
    }
  }
  _initDataSource() {
    if (this._useCustomChildrenLoader()) {
      // @ts-expect-error ts-error
      this._loadChildrenByCustomLoader(null).done(newItems => {
        if (newItems !== null && newItems !== void 0 && newItems.length) {
          this.option('items', newItems);
        }
      });
    } else {
      super._initDataSource();
      if (this._isVirtualMode()) {
        this._initVirtualMode();
      }
    }
  }
  _initVirtualMode() {
    const filter = this._filter;
    if (!filter.custom) {
      filter.custom = this._dataSource.filter();
    }
    if (!filter.internal) {
      const {
        parentIdExpr,
        rootValue
      } = this.option();
      filter.internal = [parentIdExpr, rootValue];
    }
  }
  _useCustomChildrenLoader() {
    const {
      createChildren
    } = this.option();
    return (0, _type.isFunction)(createChildren) && this._isDataStructurePlain();
  }
  _loadChildrenByCustomLoader(parentNode) {
    const {
      createChildren
    } = this.option();
    const invocationResult = createChildren === null || createChildren === void 0 ? void 0 : createChildren.call(this, parentNode);
    if (Array.isArray(invocationResult)) {
      return (0, _deferred.Deferred)().resolve(invocationResult).promise();
    }
    if (invocationResult && (0, _type.isFunction)(invocationResult.then)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return (0, _deferred.fromPromise)(invocationResult);
    }
    return (0, _deferred.Deferred)().resolve([]).promise();
  }
  _combineFilter() {
    var _this$_filter$custom;
    if (!((_this$_filter$custom = this._filter.custom) !== null && _this$_filter$custom !== void 0 && _this$_filter$custom.length)) {
      return this._filter.internal;
    }
    return [this._filter.custom, this._filter.internal];
  }
  _dataSourceLoadErrorHandler() {
    this._renderEmptyMessage();
  }
  _init() {
    this._filter = {};
    super._init();
    this._initStoreChangeHandlers();
  }
  _dataSourceChangedHandler(newItems) {
    const {
      items = []
    } = this.option();
    if (this._initialized && this._isVirtualMode() && items.length) {
      return;
    }
    this.option('items', newItems);
  }
  _removeTreeViewLoadIndicator() {
    if (!this._treeViewLoadIndicator) return;
    this._treeViewLoadIndicator.remove();
    // @ts-expect-error ts-error
    this._treeViewLoadIndicator = null;
  }
  _createTreeViewLoadIndicator() {
    this._treeViewLoadIndicator = (0, _renderer.default)('<div>').addClass(LOAD_INDICATOR_CLASS);
    this._createComponent(this._treeViewLoadIndicator, _load_indicator.default, {});
    return this._treeViewLoadIndicator;
  }
  _dataSourceLoadingChangedHandler(isLoading) {
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let resultFilter;
    if (this._isVirtualMode()) {
      resultFilter = this._combineFilter();
      this._dataSource.filter(resultFilter);
    }
    if (isLoading && !this._dataSource.isLoaded()) {
      this.option('items', []);
      const $wrapper = (0, _renderer.default)('<div>').addClass(LOAD_INDICATOR_WRAPPER_CLASS);
      this._createTreeViewLoadIndicator().appendTo($wrapper);
      this.itemsContainer().append($wrapper);
      if (this._isVirtualMode() && this._dataSource.filter() !== resultFilter) {
        this._dataSource.filter([]);
      }
    } else {
      this._removeTreeViewLoadIndicator();
    }
  }
  _initStoreChangeHandlers() {
    var _this$_dataSource;
    const {
      dataStructure
    } = this.option();
    if (dataStructure !== 'plain') {
      return;
    }
    (_this$_dataSource = this._dataSource) === null || _this$_dataSource === void 0 || _this$_dataSource.store().on('inserted', newItem => {
      const {
        items = []
      } = this.option();
      this.option().items = items.concat(newItem);
      this._dataAdapter.addItem(newItem);
      if (!this._dataAdapter.isFiltered(newItem)) {
        return;
      }
      // @ts-expect-error ts-error
      this._updateLevel(this._parentIdGetter(newItem));
    }).on('removed', removedKey => {
      const node = this._dataAdapter.getNodeByKey(removedKey);
      if ((0, _type.isDefined)(node)) {
        const {
          items = []
        } = this.option();
        const index = this._dataAdapter.getIndexByKey(node.internalFields.key);
        // @ts-expect-error ts-error
        items[index] = 0;
        this._markChildrenItemsToRemove(node);
        this._removeItems();
        this._dataAdapter.removeItem(removedKey);
        // @ts-expect-error ts-error
        this._updateLevel(this._parentIdGetter(node));
      }
    });
  }
  _markChildrenItemsToRemove(node) {
    const keys = node === null || node === void 0 ? void 0 : node.internalFields.childrenKeys;
    (0, _iterator.each)(keys, (_index, key) => {
      const {
        items = []
      } = this.option();
      const index = this._dataAdapter.getIndexByKey(key);
      // @ts-expect-error ts-error
      items[index] = 0;
      this._markChildrenItemsToRemove(this._dataAdapter.getNodeByKey(key));
    });
  }
  _removeItems() {
    const items = (0, _extend.extend)(true, [], this.option('items'));
    let counter = 0;
    (0, _iterator.each)(items, (index, item) => {
      if (!item) {
        // @ts-expect-error ts-error
        this.option('items').splice(index - counter, 1);
        counter += 1;
      }
    });
  }
  _updateLevel(parentId) {
    const $container = this._getContainerByParentKey(parentId);
    this._renderNodes(this._dataAdapter.getChildrenNodes(parentId), $container);
  }
  _getOldContainer($itemElement) {
    if ($itemElement.length) {
      return $itemElement.children(`.${NODE_CONTAINER_CLASS}`);
    }
    const scrollable = this.getScrollable();
    if (scrollable) {
      return (0, _renderer.default)(scrollable.content()).children();
    }
    return (0, _renderer.default)();
  }
  _getContainerByParentKey(parentId) {
    const node = this._dataAdapter.getNodeByKey(parentId);
    const $itemElement = node ? this._getNodeElement(node) : (0, _renderer.default)();
    this._getOldContainer($itemElement).remove();
    const $container = this._renderNodeContainer($itemElement);
    if (this._isRootLevel(parentId)) {
      const scrollable = this.getScrollable();
      if (!scrollable) {
        this._renderScrollableContainer();
      }
      (0, _renderer.default)(scrollable.content()).append($container);
    }
    return $container;
  }
  _isRootLevel(parentId) {
    const {
      rootValue
    } = this.option();
    return parentId === rootValue;
  }
  _getAccessors() {
    const accessors = super._getAccessors();
    accessors.push('hasItems');
    return accessors;
  }
  _getDataAdapterOptions() {
    var _this$_dataSource2, _this$_dataSource3, _this$_dataSource3$lo;
    const {
      rootValue,
      expandNodesRecursive = true,
      selectionRequired = false,
      dataStructure = 'tree'
    } = this.option();
    return {
      rootValue,
      multipleSelection: !this._isSingleSelection(),
      recursiveSelection: this._isRecursiveSelection(),
      recursiveExpansion: expandNodesRecursive,
      searchValue: '',
      selectionRequired,
      dataType: dataStructure,
      sort: (_this$_dataSource2 = this._dataSource) === null || _this$_dataSource2 === void 0 ? void 0 : _this$_dataSource2.sort(),
      langParams: (_this$_dataSource3 = this._dataSource) === null || _this$_dataSource3 === void 0 || (_this$_dataSource3$lo = _this$_dataSource3.loadOptions) === null || _this$_dataSource3$lo === void 0 || (_this$_dataSource3$lo = _this$_dataSource3$lo.call(_this$_dataSource3)) === null || _this$_dataSource3$lo === void 0 ? void 0 : _this$_dataSource3$lo.langParams
    };
  }
  _initMarkup() {
    this._renderScrollableContainer();
    this._renderEmptyMessage(this._dataAdapter.getRootNodes());
    super._initMarkup();
    this._setAriaRole();
  }
  _setAriaRole() {
    const {
      items
    } = this.option();
    if (items !== null && items !== void 0 && items.length) {
      this.setAria({
        role: 'tree'
      });
    }
  }
  _renderContentImpl() {
    const $nodeContainer = this._renderNodeContainer();
    (0, _renderer.default)(this.getScrollable().content()).append($nodeContainer);
    const {
      items
    } = this.option();
    if (!(items !== null && items !== void 0 && items.length)) {
      return;
    }
    this._renderNodes(this._dataAdapter.getRootNodes(), $nodeContainer);
    this._attachExpandEvent();
    if (this._selectAllEnabled()) {
      this._createSelectAllValueChangedAction();
      this._renderSelectAllItem($nodeContainer);
    }
  }
  _isVirtualMode() {
    const {
      virtualModeEnabled,
      dataSource
    } = this.option();
    return !!virtualModeEnabled && this._isDataStructurePlain() && !!dataSource;
  }
  _isDataStructurePlain() {
    const {
      dataStructure
    } = this.option();
    return dataStructure === 'plain';
  }
  _fireContentReadyAction() {
    // @ts-expect-error ts-error
    const dataSource = this.getDataSource();
    const skipContentReadyAction = dataSource && !dataSource.isLoaded() || this._skipContentReadyAndItemExpanded;
    const scrollable = this.getScrollable();
    if (scrollable && (0, _window.hasWindow)()) {
      scrollable.update();
    }
    if (!skipContentReadyAction) {
      super._fireContentReadyAction();
    }
    if (scrollable && (0, _window.hasWindow)()) {
      scrollable.update();
    }
  }
  _renderScrollableContainer() {
    const {
      useNativeScrolling,
      scrollDirection
    } = this.option();
    this._scrollable = this._createComponent((0, _renderer.default)('<div>').appendTo(this.$element()), _scrollable.default, {
      useNative: useNativeScrolling,
      direction: scrollDirection,
      useKeyboard: false
    });
  }
  _renderNodeContainer($parent) {
    const $container = (0, _renderer.default)('<ul>').addClass(NODE_CONTAINER_CLASS);
    this.setAria('role', 'group', $container);
    if ($parent !== null && $parent !== void 0 && $parent.length) {
      const itemData = this._getItemData($parent.children(`.${ITEM_CLASS}`));
      // @ts-expect-error ts-error
      if (this._expandedGetter(itemData)) {
        $container.addClass(OPENED_NODE_CONTAINER_CLASS);
      }
      $container.appendTo($parent);
    }
    return $container;
  }
  _createDOMElement($nodeContainer, node) {
    var _this$_displayGetter, _node$internalFields;
    const $node = (0, _renderer.default)('<li>').addClass(NODE_CLASS).attr(DATA_ITEM_ID, this._encodeString(node.internalFields.key)).prependTo($nodeContainer);
    const attrs = {
      role: 'treeitem',
      // @ts-expect-error ts-error
      label: ((_this$_displayGetter = this._displayGetter) === null || _this$_displayGetter === void 0 ? void 0 : _this$_displayGetter.call(this, node.internalFields.item)) ?? '',
      level: this._getLevel($nodeContainer)
    };
    const hasChildNodes = !!(node !== null && node !== void 0 && (_node$internalFields = node.internalFields) !== null && _node$internalFields !== void 0 && (_node$internalFields = _node$internalFields.childrenKeys) !== null && _node$internalFields !== void 0 && _node$internalFields.length);
    if (hasChildNodes) {
      attrs.expanded = node.internalFields.expanded ?? false;
    }
    this.setAria(attrs, $node);
    return $node;
  }
  _getLevel($nodeContainer) {
    const parent = $nodeContainer.parent();
    return parent.hasClass('dx-scrollable-content') ? 1 : parseInt(parent.attr('aria-level') ?? '0', 10) + 1;
  }
  _showCheckboxes() {
    const {
      showCheckBoxesMode
    } = this.option();
    return showCheckBoxesMode !== 'none';
  }
  _hasCustomExpanderIcons() {
    const {
      expandIcon,
      collapseIcon
    } = this.option();
    return !!expandIcon || !!collapseIcon;
  }
  _selectAllEnabled(showCheckBoxesMode) {
    const {
      showCheckBoxesMode: currentShowCheckBoxesMode
    } = this.option();
    const mode = showCheckBoxesMode ?? currentShowCheckBoxesMode;
    return mode === 'selectAll' && !this._isSingleSelection();
  }
  _renderNodes(nodes, $nodeContainer) {
    const length = nodes.length - 1;
    for (let i = length; i >= 0; i -= 1) {
      this._renderItem(i, nodes[i], $nodeContainer);
    }
    this._renderedItemsCount += nodes.length;
  }
  _renderItem(nodeIndex, node, $nodeContainer) {
    const $node = this._createDOMElement($nodeContainer, node);
    const nodeData = node.internalFields;
    const showCheckBox = this._showCheckboxes();
    $node.addClass(showCheckBox ? ITEM_WITH_CHECKBOX_CLASS : ITEM_WITHOUT_CHECKBOX_CLASS);
    $node.toggleClass(INVISIBLE_STATE_CLASS, nodeData.item.visible === false);
    if (this._hasCustomExpanderIcons()) {
      $node.addClass(ITEM_WITH_CUSTOM_EXPANDER_ICON_CLASS);
      $nodeContainer.addClass(CUSTOM_EXPANDER_ICON_ITEM_CONTAINER_CLASS);
    }
    this.setAria('selected', nodeData.selected, $node);
    this._toggleSelectedClass($node, nodeData.selected);
    if (nodeData.disabled) {
      this.setAria('disabled', nodeData.disabled, $node);
    }
    super._renderItem(this._renderedItemsCount + nodeIndex,
    // @ts-expect-error ts-error
    nodeData.item, $node);
    const parent = this._getNode(node.internalFields.parentKey);
    if (!parent) {
      $node.addClass(ROOT_NODE_CLASS);
    }
    if (nodeData.item.visible !== false) {
      this._renderChildren($node, node);
    }
    return $node;
  }
  _setAriaSelectionAttribute() {}
  _renderChildren($node, node) {
    if (!this._hasChildren(node)) {
      this._addLeafClass($node);
      (0, _renderer.default)('<div>').addClass(EXPANDER_ICON_STUB_CLASS).appendTo(this._getItem($node));
      return;
    }
    if (this._hasCustomExpanderIcons()) {
      this._renderCustomExpanderIcons($node, node);
    } else {
      this._renderDefaultExpanderIcons($node, node);
    }
    if (this._shouldRenderSublevel(node.internalFields.expanded)) {
      // @ts-expect-error ts-error
      this._loadSublevel(node).done(childNodes => {
        this._renderSublevel($node,
        // @ts-expect-error ts-error
        this._getActualNode(node), childNodes);
      });
    }
  }
  _shouldRenderSublevel(expanded) {
    const {
      deferRendering
    } = this.option();
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    return expanded || !deferRendering;
  }
  _getActualNode(cachedNode) {
    return this._dataAdapter.getNodeByKey(cachedNode.internalFields.key);
  }
  _hasChildren(node) {
    if (this._isVirtualMode() || this._useCustomChildrenLoader()) {
      // @ts-expect-error ts-error
      return this._hasItemsGetter(node.internalFields.item) !== false;
    }
    return super._hasChildren(node);
  }
  _loadSublevel(node) {
    const deferred = (0, _deferred.Deferred)();
    const childrenNodes = this._getChildNodes(node);
    if (childrenNodes.length) {
      deferred.resolve(childrenNodes);
    } else {
      this._loadNestedItems(node).done(items => {
        deferred.resolve(this._dataAdapter.getNodesByItems(items));
      });
    }
    return deferred.promise();
  }
  _getItemExtraPropNames() {
    return ['url', 'linkAttr'];
  }
  _addContent($container, itemData) {
    const {
      html,
      url
    } = itemData;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const {
      _supportItemUrl
    } = this.option();
    if (_supportItemUrl && url) {
      $container.html(html);
      const link = this._getLinkContainer(this._getIconContainer(itemData), this._getTextContainer(itemData), itemData);
      $container.append(link);
    } else {
      super._addContent($container, itemData);
    }
  }
  _postprocessRenderItem(args) {
    const {
      itemData,
      itemElement
    } = args;
    if (this._showCheckboxes()) {
      this._renderCheckBox(itemElement, this._getNode(itemData));
    }
    super._postprocessRenderItem(args);
  }
  _renderSublevel($node, node, childNodes) {
    const $nestedNodeContainer = this._renderNodeContainer($node);
    const keySet = new Set(node.internalFields.childrenKeys);
    const childNodesByChildrenKeys = childNodes.filter(childNode => keySet.has(childNode.internalFields.key));
    this._renderNodes(childNodesByChildrenKeys, $nestedNodeContainer);
    if (childNodesByChildrenKeys.length && !node.internalFields.selected) {
      const firstChild = childNodesByChildrenKeys[0];
      this._updateParentsState(firstChild, this._getNodeElement(firstChild));
    }
    this._normalizeIconState($node, childNodesByChildrenKeys.length);
    if (node.internalFields.expanded) {
      $nestedNodeContainer.addClass(OPENED_NODE_CONTAINER_CLASS);
    }
  }
  _executeItemRenderAction(itemIndex, itemData, itemElement) {
    const node = this._getNode(itemElement);
    this._getItemRenderAction()({
      itemElement,
      itemIndex,
      itemData,
      node: this._dataAdapter.getPublicNode(node)
    });
  }
  _addLeafClass($node) {
    $node.addClass(IS_LEAF);
  }
  _expandEventHandler(e) {
    const $nodeElement = (0, _renderer.default)(e.currentTarget.parentNode);
    if (!$nodeElement.hasClass(IS_LEAF)) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this._toggleExpandedState(e.currentTarget, undefined, e);
    }
  }
  _attachExpandEvent() {
    const {
      expandEvent
    } = this.option();
    const expandedEventName = this._getEventNameByOption(expandEvent);
    const $itemsContainer = this._itemContainer();
    this._detachExpandEvent($itemsContainer);
    _events_engine.default.on($itemsContainer, expandedEventName, this._itemSelector(), this._expandEventHandler.bind(this));
  }
  _detachExpandEvent(itemsContainer) {
    _events_engine.default.off(itemsContainer, `.${EXPAND_EVENT_NAMESPACE}`, this._itemSelector());
  }
  _getEventNameByOption(name) {
    const event = name === 'click' ? _click.name : _double_click.name;
    return (0, _utils.addNamespace)(event, EXPAND_EVENT_NAMESPACE);
  }
  _getNode(identifier) {
    if (!(0, _type.isDefined)(identifier)) {
      return null;
    }
    if ((0, _type.isPrimitive)(identifier)) {
      return this._dataAdapter.getNodeByKey(identifier);
    }
    if ((0, _type.isPlainObject)(identifier) && 'internalFields' in identifier) {
      return identifier;
    }
    // @ts-expect-error ts-error
    const itemElement = (0, _renderer.default)(identifier).get(0);
    if (!itemElement) {
      return null;
    }
    if (_dom_adapter.default.isElementNode(itemElement)) {
      return this._getNodeByElement(itemElement);
    }
    // @ts-expect-error ts-error
    return this._dataAdapter.getNodeByItem(itemElement);
  }
  _getNodeByElement(itemElement) {
    const $node = (0, _renderer.default)(itemElement).closest(`.${NODE_CLASS}`);
    const itemKeyAttr = $node.attr(DATA_ITEM_ID);
    if (!(0, _type.isDefined)(itemKeyAttr)) {
      return null;
    }
    const key = this._decodeString(itemKeyAttr);
    return this._dataAdapter.getNodeByKey(key);
  }
  _toggleExpandedState(itemElement, state, e) {
    const node = this._getNode(itemElement);
    if (!node) {
      return (0, _deferred.Deferred)().reject().promise();
    }
    if (node.internalFields.disabled) {
      return (0, _deferred.Deferred)().reject().promise();
    }
    const currentState = node.internalFields.expanded;
    if (currentState === state) {
      return (0, _deferred.Deferred)().resolve().promise();
    }
    if (this._hasChildren(node)) {
      const $node = this._getNodeElement(node);
      if ($node.find(`.${NODE_LOAD_INDICATOR_CLASS}:not(.${INVISIBLE_STATE_CLASS})`).length) {
        return (0, _deferred.Deferred)().reject().promise();
      }
      if (!currentState && !this._nodeHasRenderedChildren($node)) {
        this._createLoadIndicator($node);
      }
    }
    const newState = state ?? !currentState;
    this._dataAdapter.toggleExpansion(node.internalFields.key, newState);
    return this._updateExpandedItemsUI(node, newState, e);
  }
  _nodeHasRenderedChildren($node) {
    const $nodeContainer = $node.children(`.${NODE_CONTAINER_CLASS}`);
    return $nodeContainer.not(':empty').length;
  }
  _getItem($node) {
    return $node.children(`.${ITEM_CLASS}`).eq(0);
  }
  _createLoadIndicator($node) {
    const $treeviewItem = this._getItem($node);
    this._createComponent((0, _renderer.default)('<div>').addClass(NODE_LOAD_INDICATOR_CLASS), _load_indicator.default, {}).$element().appendTo($treeviewItem);
    const $icon = $treeviewItem.children(`.${TOGGLE_ITEM_VISIBILITY_CLASS},.${CUSTOM_EXPAND_ICON_CLASS}`);
    $icon.hide();
  }
  _renderExpanderIcon($node, node, $icon, iconClass) {
    $icon.appendTo(this._getItem($node));
    $icon.addClass(iconClass);
    if (node.internalFields.disabled) {
      $icon.addClass(DISABLED_STATE_CLASS);
    }
    this._renderToggleItemVisibilityIconClick($icon, node);
  }
  _renderDefaultExpanderIcons($node, node) {
    const $treeViewItem = this._getItem($node);
    const $icon = (0, _renderer.default)('<div>').addClass(TOGGLE_ITEM_VISIBILITY_CLASS).appendTo($treeViewItem);
    if (node.internalFields.expanded) {
      $icon.addClass(TOGGLE_ITEM_VISIBILITY_OPENED_CLASS);
      $node.parent().addClass(OPENED_NODE_CONTAINER_CLASS);
    }
    if (node.internalFields.disabled) {
      $icon.addClass(DISABLED_STATE_CLASS);
    }
    this._renderToggleItemVisibilityIconClick($icon, node);
  }
  _renderCustomExpanderIcons($node, node) {
    const {
      expandIcon,
      collapseIcon
    } = this.option();
    const $expandIcon = (0, _icon.getImageContainer)(expandIcon ?? collapseIcon) ?? (0, _renderer.default)();
    const $collapseIcon = (0, _icon.getImageContainer)(collapseIcon ?? expandIcon) ?? (0, _renderer.default)();
    this._renderExpanderIcon($node, node, $expandIcon, CUSTOM_EXPAND_ICON_CLASS);
    this._renderExpanderIcon($node, node, $collapseIcon, CUSTOM_COLLAPSE_ICON_CLASS);
    const isNodeExpanded = node.internalFields.expanded;
    if (isNodeExpanded) {
      $node.parent().addClass(OPENED_NODE_CONTAINER_CLASS);
    }
    this._toggleCustomExpanderIcons($expandIcon, $collapseIcon, isNodeExpanded);
  }
  _renderToggleItemVisibilityIconClick($icon, node) {
    // @ts-expect-error ts-error
    const eventName = (0, _utils.addNamespace)(_click.name, this.NAME);
    _events_engine.default.off($icon, eventName);
    _events_engine.default.on($icon, eventName, e => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this._toggleExpandedState(node.internalFields.key, undefined, e);
      return false;
    });
  }
  _toggleCustomExpanderIcons($expandIcon, $collapseIcon, isNodeExpanded) {
    $collapseIcon.toggle(isNodeExpanded);
    $expandIcon.toggle(!isNodeExpanded);
  }
  _updateExpandedItemsUI(node, state, e) {
    const $node = this._getNodeElement(node);
    const isHiddenNode = !$node.length || state && $node.is(':hidden');
    const {
      expandNodesRecursive
    } = this.option();
    if (expandNodesRecursive && isHiddenNode) {
      const parentNode = this._getNode(node.internalFields.parentKey);
      if (parentNode) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this._updateExpandedItemsUI(parentNode, state, e);
      }
    }
    if (!this._hasCustomExpanderIcons()) {
      const $icon = this._getItem($node).children(`.${TOGGLE_ITEM_VISIBILITY_CLASS}`);
      $icon.toggleClass(TOGGLE_ITEM_VISIBILITY_OPENED_CLASS, state);
    } else if (this._nodeHasRenderedChildren($node)) {
      const $item = this._getItem($node);
      const $childExpandIcons = $item.children(`.${CUSTOM_EXPAND_ICON_CLASS}`);
      const $childCollapseIcons = $item.children(`.${CUSTOM_COLLAPSE_ICON_CLASS}`);
      this._toggleCustomExpanderIcons($childExpandIcons, $childCollapseIcons, state);
    }
    const $nodeContainer = $node.children(`.${NODE_CONTAINER_CLASS}`);
    const nodeContainerExists = $nodeContainer.length > 0;
    const completionCallback = (0, _deferred.Deferred)();
    if (!state || nodeContainerExists && !$nodeContainer.is(':empty')) {
      this._animateNodeContainer(node, state, e, completionCallback);
      return completionCallback.promise();
    }
    if (node.internalFields.childrenKeys.length === 0 && (this._isVirtualMode() || this._useCustomChildrenLoader())) {
      this._loadNestedItemsWithUpdate(node, state, e, completionCallback);
      return completionCallback.promise();
    }
    this._renderSublevel($node, node, this._getChildNodes(node));
    this._fireContentReadyAction();
    this._animateNodeContainer(node, state, e, completionCallback);
    return completionCallback.promise();
  }
  _loadNestedItemsWithUpdate(node, state, e, completionCallback) {
    const $node = this._getNodeElement(node);
    this._loadNestedItems(node).done(items => {
      // @ts-expect-error ts-error
      const actualNodeData = this._getActualNode(node);
      this._renderSublevel($node, actualNodeData, this._dataAdapter.getNodesByItems(items));
      if (!(items !== null && items !== void 0 && items.length)) {
        completionCallback.resolve();
        return;
      }
      this._fireContentReadyAction();
      this._animateNodeContainer(actualNodeData, state, e, completionCallback);
    });
  }
  _loadNestedItems(node) {
    if (this._useCustomChildrenLoader()) {
      const publicNode = this._dataAdapter.getPublicNode(node);
      // @ts-expect-error ts-error
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this._loadChildrenByCustomLoader(publicNode).done(newItems => {
        if (!this._areNodesExists(newItems)) {
          this._appendItems(newItems);
        }
      });
    }
    if (!this._isVirtualMode()) {
      // @ts-expect-error ts-error
      return (0, _deferred.Deferred)().resolve([]).promise();
    }
    const {
      parentIdExpr
    } = this.option();
    this._filter.internal = [parentIdExpr, node.internalFields.key];
    this._dataSource.filter(this._combineFilter());
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._dataSource.load().done(newItems => {
      if (!this._areNodesExists(newItems)) {
        this._appendItems(newItems);
      }
    });
  }
  _areNodesExists(newItems) {
    const keyOfRootItem = this.keyOf(newItems[0]);
    const fullData = this._dataAdapter.getFullData();
    return !!this._dataAdapter.getNodeByKey(keyOfRootItem, fullData);
  }
  _appendItems(newItems) {
    const {
      items = []
    } = this.option();
    this.option().items = items.concat(newItems);
    this._initDataAdapter();
  }
  _animateNodeContainer(node, state, e, completionCallback) {
    const $node = this._getNodeElement(node);
    const $nodeContainer = $node.children(`.${NODE_CONTAINER_CLASS}`);
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    if (node && completionCallback && $nodeContainer.length === 0) {
      completionCallback.resolve();
    }
    // NOTE: The height of node container is should be used when the container is shown (T606878)
    $nodeContainer.addClass(OPENED_NODE_CONTAINER_CLASS);
    const nodeHeight = (0, _size.getHeight)($nodeContainer);
    const {
      animationEnabled
    } = this.option();
    _animation.fx.stop($nodeContainer.get(0), true);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    _animation.fx.animate($nodeContainer.get(0), {
      // @ts-expect-error ts-error
      type: 'custom',
      duration: animationEnabled ? 400 : 0,
      from: {
        // @ts-expect-error ts-error
        maxHeight: state ? 0 : nodeHeight
      },
      to: {
        // @ts-expect-error ts-error
        maxHeight: state ? nodeHeight : 0
      },
      complete: () => {
        $nodeContainer.css('maxHeight', 'none');
        $nodeContainer.toggleClass(OPENED_NODE_CONTAINER_CLASS, state);
        this.setAria('expanded', state, $node);
        this.getScrollable().update();
        this._fireExpandedStateUpdatedEvent(state, node, e);
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        if (completionCallback) {
          completionCallback.resolve();
        }
      }
    });
  }
  _fireExpandedStateUpdatedEvent(isExpanded, node, e) {
    if (!this._hasChildren(node) || this._skipContentReadyAndItemExpanded) {
      return;
    }
    const optionName = isExpanded ? 'onItemExpanded' : 'onItemCollapsed';
    if ((0, _type.isDefined)(e)) {
      this._itemDXEventHandler(e, optionName, {
        node: this._dataAdapter.getPublicNode(node)
      });
    } else {
      const target = this._getNodeElement(node);
      const actionArgs = {
        event: e,
        node: this._dataAdapter.getPublicNode(node)
      };
      this._itemEventHandler(target, optionName, actionArgs);
    }
  }
  _normalizeIconState($node, hasNewItems) {
    const $loadIndicator = $node.find(`.${NODE_LOAD_INDICATOR_CLASS}`);
    if ($loadIndicator.length) {
      var _LoadIndicator$getIns;
      (_LoadIndicator$getIns = _load_indicator.default.getInstance($loadIndicator)) === null || _LoadIndicator$getIns === void 0 || _LoadIndicator$getIns.option('visible', false);
    }
    const $treeViewItem = this._getItem($node);
    const $toggleItem = $treeViewItem.children(`.${CUSTOM_COLLAPSE_ICON_CLASS},.${TOGGLE_ITEM_VISIBILITY_CLASS}`);
    if (hasNewItems) {
      $toggleItem.show();
      return;
    }
    $toggleItem.removeClass(TOGGLE_ITEM_VISIBILITY_CLASS);
    $node.addClass(IS_LEAF);
  }
  _emptyMessageContainer() {
    const scrollable = this.getScrollable();
    return scrollable ? (0, _renderer.default)(scrollable.content()) : super._emptyMessageContainer();
  }
  _renderContent() {
    const {
      items
    } = this.option();
    if (items !== null && items !== void 0 && items.length) {
      this._contentAlreadyRendered = true;
    }
    super._renderContent();
  }
  _renderSelectAllItem($container) {
    const {
      selectAllText,
      focusStateEnabled
    } = this.option();
    const $selectAllContainer = $container ?? this.$element().find(`.${NODE_CONTAINER_CLASS}`).first();
    this._$selectAllItem = (0, _renderer.default)('<div>').addClass(SELECT_ALL_ITEM_CLASS);
    const isAllSelected = this._dataAdapter.isAllSelected();
    this._createComponent(this._$selectAllItem, _index2.default, {
      value: isAllSelected,
      elementAttr: {
        'aria-label': _message.default.format('dxList-selectAll')
      },
      text: selectAllText,
      focusStateEnabled,
      onValueChanged: event => {
        this._onSelectAllCheckboxValueChanged(event);
      },
      onInitialized: event => {
        const {
          component
        } = event;
        component.registerKeyHandler('enter', () => {
          const {
            value
          } = component.option();
          component.option('value', !value);
        });
      }
    });
    this._toggleSelectedClass(this._$selectAllItem, isAllSelected);
    $selectAllContainer.before(this._$selectAllItem);
  }
  _onSelectAllCheckboxValueChanged(args) {
    this._toggleSelectAll(args);
    this._fireSelectAllValueChanged(args.value);
  }
  _toggleSelectAll(args) {
    this._dataAdapter.toggleSelectAll(args.value);
    this._updateItemsUI();
    this._fireSelectionChanged();
  }
  _renderCheckBox($node, node) {
    const $checkbox = (0, _renderer.default)('<div>').appendTo($node);
    this._createComponent($checkbox, _index2.default, {
      value: node === null || node === void 0 ? void 0 : node.internalFields.selected,
      onValueChanged: e => {
        this._changeCheckboxValue(e);
      },
      focusStateEnabled: false,
      elementAttr: {
        'aria-label': _message.default.format('CheckState')
      },
      // @ts-expect-error ts-error
      disabled: this._disabledGetter(node)
    });
  }
  _toggleSelectedClass($node, value) {
    $node.toggleClass(SELECTED_ITEM_CLASS, !!value);
  }
  _toggleNodeDisabledState(node, state) {
    const $node = this._getNodeElement(node);
    const $item = $node.find(`.${ITEM_CLASS}`).eq(0);
    this._dataAdapter.toggleNodeDisabledState(node.internalFields.key, state);
    $item.toggleClass(DISABLED_STATE_CLASS, !!state);
    if (this._showCheckboxes()) {
      const checkbox = this._getCheckBoxInstance($node);
      checkbox.option('disabled', !!state);
    }
  }
  _itemOptionChanged(item, property, value) {
    const node = this._dataAdapter.getNodeByItem(item);
    const {
      disabledExpr
    } = this.option();
    if (node && property === disabledExpr) {
      this._toggleNodeDisabledState(node, Boolean(value));
    }
  }
  _changeCheckboxValue(e) {
    const $node = (0, _renderer.default)(e.element).closest(`.${NODE_CLASS}`);
    const $item = this._getItem($node);
    const item = this._getItemData($item);
    const node = this._getNodeByElement($item);
    const {
      value
    } = e;
    if (node && node.internalFields.selected === value) {
      return;
    }
    this._updateItemSelection(value, item, e.event);
  }
  _isSingleSelection() {
    const {
      selectionMode
    } = this.option();
    return selectionMode === 'single';
  }
  _isRecursiveSelection() {
    const {
      selectionMode,
      selectNodesRecursive
    } = this.option();
    return !!selectNodesRecursive && selectionMode !== 'single';
  }
  _isLastSelectedBranch(publicNode, selectedNodesKeys, deep) {
    const keyIndex = selectedNodesKeys.indexOf(publicNode.key);
    if (keyIndex >= 0) {
      selectedNodesKeys.splice(keyIndex, 1);
    }
    if (deep) {
      (0, _iterator.each)(publicNode.children, (_index, childNode) => {
        this._isLastSelectedBranch(childNode, selectedNodesKeys, true);
      });
    }
    if (publicNode.parent) {
      this._isLastSelectedBranch(publicNode.parent, selectedNodesKeys);
    }
    return selectedNodesKeys.length === 0;
  }
  _isLastRequired(node) {
    const {
      selectionRequired
    } = this.option();
    const isSingleMode = this._isSingleSelection();
    const selectedNodesKeys = this.getSelectedNodeKeys();
    if (!selectionRequired) {
      return false;
    }
    if (isSingleMode) {
      return selectedNodesKeys.length === 1;
    }
    return this._isLastSelectedBranch(node.internalFields.publicNode, selectedNodesKeys.slice(), true);
  }
  _updateItemSelection(value, itemElement, event) {
    const node = this._getNode(itemElement);
    if (!node || node.visible === false) {
      return false;
    }
    if (node.internalFields.selected === value) {
      return true;
    }
    if (!value && this._isLastRequired(node)) {
      if (this._showCheckboxes()) {
        const $node = this._getNodeElement(node);
        this._getCheckBoxInstance($node).option('value', true);
      }
      return false;
    }
    if (value && this._isSingleSelection()) {
      const selectedKeys = this.getSelectedNodeKeys();
      (0, _iterator.each)(selectedKeys, (_index, key) => {
        this._dataAdapter.toggleSelection(key, false);
        this._updateItemsUI();
        // @ts-expect-error ts-error
        this._fireItemSelectionChanged(this._getNode(key));
      });
    }
    this._dataAdapter.toggleSelection(node.internalFields.key, value);
    const isAllSelected = this._dataAdapter.isAllSelected();
    // @ts-expect-error ts-error
    const needFireSelectAllChanged = this._selectAllEnabled() && this._$selectAllItem.dxCheckBox('instance').option('value') !== isAllSelected;
    this._updateItemsUI();
    this._fireItemSelectionChanged(node, event);
    this._fireSelectionChanged();
    if (needFireSelectAllChanged) {
      this._fireSelectAllValueChanged(isAllSelected);
    }
    return true;
  }
  _fireItemSelectionChanged(node, event) {
    // @ts-expect-error ts-error
    const initiator = event ?? this._findItemElementByItem(node.internalFields.item);
    const handler = event ? this._itemDXEventHandler : this._itemEventHandler;
    // @ts-expect-error ts-error
    handler.call(this, initiator, 'onItemSelectionChanged', {
      node: this._dataAdapter.getPublicNode(node),
      itemData: node === null || node === void 0 ? void 0 : node.internalFields.item
    });
  }
  _getCheckBoxInstance($node) {
    const $treeViewItem = this._getItem($node);
    // @ts-expect-error ts-error
    return $treeViewItem.children(`.${CHECK_BOX_CLASS}`).dxCheckBox('instance');
  }
  _updateItemsUI() {
    const cache = {};
    (0, _iterator.each)(this._dataAdapter.getData(), (_index, node) => {
      const $node = this._getNodeElement(node, cache);
      const nodeSelection = node.internalFields.selected;
      if (!$node.length) {
        return;
      }
      this._toggleSelectedClass($node, nodeSelection);
      this.setAria('selected', nodeSelection, $node);
      if (this._showCheckboxes()) {
        var _this$_getCheckBoxIns;
        (_this$_getCheckBoxIns = this._getCheckBoxInstance($node)) === null || _this$_getCheckBoxIns === void 0 || _this$_getCheckBoxIns.option('value', nodeSelection);
      }
    });
    if (this._selectAllEnabled()) {
      // @ts-expect-error ts-error
      const selectAllCheckbox = this._$selectAllItem.dxCheckBox('instance');
      selectAllCheckbox.option('onValueChanged', undefined);
      selectAllCheckbox.option('value', this._dataAdapter.isAllSelected());
      selectAllCheckbox.option('onValueChanged', this._onSelectAllCheckboxValueChanged.bind(this));
    }
  }
  _updateParentsState(node, $node) {
    if (!$node || !node) {
      return;
    }
    const parentNode = this._dataAdapter.getNodeByKey(node.internalFields.parentKey);
    const $parentNode = (0, _renderer.default)($node.parents(`.${NODE_CLASS}`)[0]);
    if (this._showCheckboxes()) {
      var _this$_getCheckBoxIns2;
      const parentValue = parentNode === null || parentNode === void 0 ? void 0 : parentNode.internalFields.selected;
      (_this$_getCheckBoxIns2 = this._getCheckBoxInstance($parentNode)) === null || _this$_getCheckBoxIns2 === void 0 || _this$_getCheckBoxIns2.option('value', parentValue);
      this._toggleSelectedClass($parentNode, parentValue);
    }
    const {
      rootValue
    } = this.option();
    if ((parentNode === null || parentNode === void 0 ? void 0 : parentNode.internalFields.parentKey) !== rootValue) {
      this._updateParentsState(parentNode, $parentNode);
    }
  }
  _itemEventHandlerImpl(initiator, action, actionArgs) {
    const $itemElement = (0, _renderer.default)(initiator).closest(`.${NODE_CLASS}`).children(`.${ITEM_CLASS}`);
    return action((0, _extend.extend)(this._extendActionArgs($itemElement), actionArgs));
  }
  _itemContextMenuHandler(e) {
    this._createEventHandler('onItemContextMenu', e);
  }
  _itemHoldHandler(e) {
    this._createEventHandler('onItemHold', e);
  }
  _createEventHandler(eventName, e) {
    const node = this._getNodeByElement(e.currentTarget);
    this._itemDXEventHandler(e, eventName, {
      node: this._dataAdapter.getPublicNode(node)
    });
  }
  _itemClass() {
    return ITEM_CLASS;
  }
  _itemDataKey() {
    return ITEM_DATA_KEY;
  }
  _attachClickEvent() {
    const $itemContainer = this._itemContainer();
    this._detachClickEvent($itemContainer);
    const {
      clickEventNamespace,
      itemSelector,
      pointerDownEventNamespace,
      nodeSelector
    } = this._getItemClickEventData();
    _events_engine.default.on($itemContainer, clickEventNamespace, itemSelector, e => {
      if ((0, _renderer.default)(e.target).hasClass(CHECK_BOX_ICON_CLASS) || (0, _renderer.default)(e.target).hasClass(CHECK_BOX_CLASS)) {
        return;
      }
      this._processItemClick(e, (0, _renderer.default)(e.currentTarget));
    });
    _events_engine.default.on($itemContainer, pointerDownEventNamespace, nodeSelector, e => {
      this._itemPointerHandler(e);
    });
  }
  _detachClickEvent(itemsContainer) {
    const {
      clickEventNamespace,
      itemSelector,
      pointerDownEventNamespace,
      nodeSelector
    } = this._getItemClickEventData();
    _events_engine.default.off(itemsContainer, clickEventNamespace, itemSelector);
    _events_engine.default.off(itemsContainer, pointerDownEventNamespace, nodeSelector);
  }
  _getItemClickEventData() {
    const itemSelector = `.${this._itemClass()}`;
    const nodeSelector = `.${NODE_CLASS}, .${SELECT_ALL_ITEM_CLASS}`;
    // @ts-expect-error ts-error
    const clickEventNamespace = (0, _utils.addNamespace)(_click.name, this.NAME);
    // @ts-expect-error ts-error
    const pointerDownEventNamespace = (0, _utils.addNamespace)(_pointer.default.down, this.NAME);
    return {
      clickEventNamespace,
      itemSelector,
      pointerDownEventNamespace,
      nodeSelector
    };
  }
  _itemClick(args) {
    const {
      event,
      itemData
    } = args;
    const target = (event === null || event === void 0 ? void 0 : event.target[0]) || (event === null || event === void 0 ? void 0 : event.target);
    const link = target.getElementsByClassName(ITEM_URL_CLASS)[0];
    if (itemData.url && link) {
      this._clickByLink(link);
    }
  }
  _processItemClick(e, $item) {
    const itemData = this._getItemData($item);
    const node = this._getNodeByElement($item);
    if (!node) return;
    this._itemDXEventHandler(e, 'onItemClick', {
      node: this._dataAdapter.getPublicNode(node)
    }, {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      beforeExecute: e => {
        // @ts-expect-error ts-error
        this._itemClick(e.args[0]);
      }
    });
    const {
      selectByClick
    } = this.option();
    if (selectByClick && !e.isDefaultPrevented()) {
      this._updateItemSelection(!node.internalFields.selected, itemData, e);
    }
  }
  _updateSelectionToFirstItem($items, startIndex) {
    let itemIndex = startIndex;
    while (itemIndex >= 0) {
      const $item = (0, _renderer.default)($items[itemIndex]);
      this._updateItemSelection(true, $item.find(`.${ITEM_CLASS}`).get(0));
      itemIndex -= 1;
    }
  }
  _updateSelectionToLastItem($items, startIndex) {
    const {
      length
    } = $items;
    let itemIndex = startIndex;
    while (itemIndex < length) {
      const $item = (0, _renderer.default)($items[itemIndex]);
      this._updateItemSelection(true, $item.find(`.${ITEM_CLASS}`).get(0));
      itemIndex += 1;
    }
  }
  focus() {
    const {
      items = []
    } = this.option();
    if (this._selectAllEnabled() && items.length) {
      // @ts-expect-error ts-error
      _events_engine.default.trigger(this._$selectAllItem, 'focus');
      return;
    }
    super.focus();
  }
  _focusInHandler(e) {
    this._updateFocusState(e, true);
    const isSelectAllItem = (0, _renderer.default)(e.target).hasClass(SELECT_ALL_ITEM_CLASS);
    if (isSelectAllItem || this.option('focusedElement')) {
      clearTimeout(this._setFocusedItemTimeout);
      // eslint-disable-next-line no-restricted-globals
      this._setFocusedItemTimeout = setTimeout(() => {
        const {
          focusedElement
        } = this.option();
        const element = isSelectAllItem ? (0, _element.getPublicElement)((0, _renderer.default)(this._$selectAllItem)) : (0, _renderer.default)(focusedElement);
        this._setFocusedItem((0, _renderer.default)(element));
      });
      return;
    }
    const $activeItem = this._getActiveItem();
    this.option('focusedElement', (0, _element.getPublicElement)($activeItem.closest(`.${NODE_CLASS}`)));
  }
  _itemPointerHandler(e) {
    const {
      focusStateEnabled
    } = this.option();
    if (!focusStateEnabled) {
      return;
    }
    const $target = (0, _renderer.default)(e.target).closest(`.${NODE_CLASS}, .${SELECT_ALL_ITEM_CLASS}`);
    if (!$target.length) {
      return;
    }
    const itemElement = $target.hasClass(DISABLED_STATE_CLASS) ? null : $target;
    // @ts-expect-error ts-error
    this.option('focusedElement', (0, _element.getPublicElement)(itemElement));
  }
  _findNonDisabledNodes($nodes) {
    return $nodes.not(`:has(>.${ITEM_CLASS}.${DISABLED_STATE_CLASS})`);
  }
  _moveFocus(location, e) {
    const {
      rtlEnabled
    } = this.option();
    const FOCUS_UP = 'up';
    const FOCUS_DOWN = 'down';
    const FOCUS_FIRST = 'first';
    const FOCUS_LAST = 'last';
    const FOCUS_LEFT = rtlEnabled ? 'right' : 'left';
    const FOCUS_RIGHT = rtlEnabled ? 'left' : 'right';
    this.$element().find(`.${NODE_CONTAINER_CLASS}`).each((_index, nodeContainer) => {
      _animation.fx.stop(nodeContainer, true);
      return true;
    });
    const $items = this._nodeElements();
    if (!($items !== null && $items !== void 0 && $items.length)) {
      return;
    }
    switch (location) {
      case FOCUS_UP:
        {
          const $prevItem = this._prevItem($items);
          this.option('focusedElement', (0, _element.getPublicElement)($prevItem));
          const prevItemElement = this._getNodeItemElement($prevItem);
          this.getScrollable().scrollToElement(prevItemElement);
          if (e.shiftKey && this._showCheckboxes()) {
            this._updateItemSelection(true, prevItemElement);
          }
          break;
        }
      case FOCUS_DOWN:
        {
          const $nextItem = this._nextItem($items);
          this.option('focusedElement', (0, _element.getPublicElement)($nextItem));
          const nextItemElement = this._getNodeItemElement($nextItem);
          this.getScrollable().scrollToElement(nextItemElement);
          if (e.shiftKey && this._showCheckboxes()) {
            this._updateItemSelection(true, nextItemElement);
          }
          break;
        }
      case FOCUS_FIRST:
        {
          const $firstItem = $items.first();
          if (e.shiftKey && this._showCheckboxes()) {
            this._updateSelectionToFirstItem($items, $items.index(this._prevItem($items)));
          }
          this.option('focusedElement', (0, _element.getPublicElement)($firstItem));
          this.getScrollable().scrollToElement(this._getNodeItemElement($firstItem));
          break;
        }
      case FOCUS_LAST:
        {
          const $lastItem = $items.last();
          if (e.shiftKey && this._showCheckboxes()) {
            this._updateSelectionToLastItem($items, $items.index(this._nextItem($items)));
          }
          this.option('focusedElement', (0, _element.getPublicElement)($lastItem));
          this.getScrollable().scrollToElement(this._getNodeItemElement($lastItem));
          break;
        }
      case FOCUS_RIGHT:
        {
          this._expandFocusedContainer();
          break;
        }
      case FOCUS_LEFT:
        {
          this._collapseFocusedContainer();
          break;
        }
      default:
        super._moveFocus(location, e);
    }
  }
  _getNodeItemElement($node) {
    return $node.find(`.${ITEM_CLASS}`).get(0);
  }
  _nodeElements() {
    return this.$element().find(`.${NODE_CLASS}`).not(':hidden');
  }
  _expandFocusedContainer() {
    const {
      focusedElement
    } = this.option();
    const $focusedNode = (0, _renderer.default)(focusedElement);
    if (!$focusedNode.length || $focusedNode.hasClass(IS_LEAF)) {
      return;
    }
    const $node = $focusedNode.find(`.${NODE_CONTAINER_CLASS}`).eq(0);
    if ($node.hasClass(OPENED_NODE_CONTAINER_CLASS)) {
      const $nextItem = this._nextItem(this._findNonDisabledNodes(this._nodeElements()));
      this.option('focusedElement', (0, _element.getPublicElement)($nextItem));
      this.getScrollable().scrollToElement(this._getNodeItemElement($nextItem));
      return;
    }
    const node = this._getNodeByElement(this._getItem($focusedNode));
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this._toggleExpandedState(node, true);
  }
  _getClosestNonDisabledNode($node) {
    const isNodeDisabled = $el => $el.children(`.${ITEM_CLASS}.${DISABLED_STATE_CLASS}`).length > 0;
    let currentNode = $node;
    do {
      currentNode = currentNode.parent().closest(`.${NODE_CLASS}`);
    } while (currentNode.length && isNodeDisabled(currentNode));
    return currentNode;
  }
  _collapseFocusedContainer() {
    const {
      focusedElement
    } = this.option();
    const $focusedNode = (0, _renderer.default)(focusedElement);
    if (!$focusedNode.length) {
      return;
    }
    const nodeElement = $focusedNode.find(`.${NODE_CONTAINER_CLASS}`).eq(0);
    if (!$focusedNode.hasClass(IS_LEAF) && nodeElement.hasClass(OPENED_NODE_CONTAINER_CLASS)) {
      const node = this._getNodeByElement(this._getItem($focusedNode));
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this._toggleExpandedState(node, false);
    } else {
      const collapsedNode = this._getClosestNonDisabledNode($focusedNode);
      if (collapsedNode.length) {
        this.option('focusedElement', (0, _element.getPublicElement)(collapsedNode));
      }
      this.getScrollable().scrollToElement(this._getNodeItemElement(collapsedNode));
    }
  }
  _encodeString(value) {
    return (0, _type.isString)(value) ? encodeURI(value) : value;
  }
  _decodeString(value) {
    return (0, _type.isString)(value) ? decodeURI(value) : value;
  }
  getScrollable() {
    return this._scrollable;
  }
  updateDimensions() {
    const deferred = (0, _deferred.Deferred)();
    const scrollable = this.getScrollable();
    if (scrollable) {
      scrollable.update().done(() => {
        // @ts-expect-error ts-error
        deferred.resolveWith(this);
      });
    } else {
      // @ts-expect-error ts-error
      deferred.resolveWith(this);
    }
    return deferred.promise();
  }
  // @ts-expect-error ts-error
  selectItem(itemElement) {
    return this._updateItemSelection(true, itemElement);
  }
  unselectItem(itemElement) {
    return this._updateItemSelection(false, itemElement);
  }
  expandItem(itemElement) {
    return this._toggleExpandedState(itemElement, true);
  }
  collapseItem(itemElement) {
    return this._toggleExpandedState(itemElement, false);
  }
  getNodes() {
    return this._dataAdapter.getTreeNodes();
  }
  getSelectedNodes() {
    return this.getSelectedNodeKeys().map(key => {
      const node = this._dataAdapter.getNodeByKey(key);
      return this._dataAdapter.getPublicNode(node);
    });
  }
  getSelectedNodeKeys() {
    return this._dataAdapter.getSelectedNodesKeys();
  }
  selectAll() {
    if (this._selectAllEnabled()) {
      // @ts-expect-error ts-error
      this._$selectAllItem.dxCheckBox('instance').option('value', true);
    } else {
      this._toggleSelectAll({
        value: true
      });
    }
  }
  unselectAll() {
    if (this._selectAllEnabled()) {
      // @ts-expect-error ts-error
      this._$selectAllItem.dxCheckBox('instance').option('value', false);
    } else {
      this._toggleSelectAll({
        value: false
      });
    }
  }
  _allItemsExpandedHandler() {
    this._skipContentReadyAndItemExpanded = false;
    this._fireContentReadyAction();
  }
  expandAll() {
    const nodes = this._dataAdapter.getData();
    const expandingPromises = [];
    this._skipContentReadyAndItemExpanded = true;
    // NOTE: This is needed to support animation on expandAll,
    //  but stop triggering multiple contentReady/itemExpanded events.
    nodes.forEach(node => expandingPromises.push(this._toggleExpandedState((node === null || node === void 0 ? void 0 : node.internalFields.key) ?? null, true)));
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    Promise.allSettled(expandingPromises).then(() => {
      var _this$_allItemsExpand;
      return (_this$_allItemsExpand = this._allItemsExpandedHandler) === null || _this$_allItemsExpand === void 0 ? void 0 : _this$_allItemsExpand.call(this);
    });
  }
  collapseAll() {
    (0, _iterator.each)(this._dataAdapter.getExpandedNodesKeys(), (_index, key) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this._toggleExpandedState(key, false);
    });
  }
  scrollToItem(keyOrItemOrElement) {
    const node = this._getNode(keyOrItemOrElement);
    if (!node) {
      return (0, _deferred.Deferred)().reject().promise();
    }
    const nodeKeysToExpand = [];
    let parentNode = node.internalFields.publicNode.parent;
    while (parentNode != null) {
      if (!parentNode.expanded) {
        nodeKeysToExpand.push(parentNode.key);
      }
      parentNode = parentNode.parent;
    }
    const scrollCallback = (0, _deferred.Deferred)();
    // @ts-expect-error ts-error
    this._expandNodes(nodeKeysToExpand.reverse()).always(() => {
      const $element = this._getNodeElement(node);
      if ($element !== null && $element !== void 0 && $element.length) {
        this.scrollToElementTopLeft($element[0]);
        scrollCallback.resolve();
      } else {
        scrollCallback.reject();
      }
    });
    return scrollCallback.promise();
  }
  scrollToElementTopLeft(targetElement) {
    const scrollable = this.getScrollable();
    const {
      scrollDirection,
      rtlEnabled
    } = this.option();
    const targetLocation = {
      top: 0,
      left: 0
    };
    const relativeOffset = (0, _get_relative_offset.getRelativeOffset)(_consts.SCROLLABLE_CONTENT_CLASS, targetElement);
    if (scrollDirection !== _consts.DIRECTION_VERTICAL) {
      const containerElement = (0, _renderer.default)(scrollable.container()).get(0);
      targetLocation.left = rtlEnabled ? relativeOffset.left + targetElement.offsetWidth - containerElement.clientWidth : relativeOffset.left;
    }
    if (scrollDirection !== _consts.DIRECTION_HORIZONTAL) {
      targetLocation.top = relativeOffset.top;
    }
    scrollable.scrollTo(targetLocation);
  }
  _expandNodes(keysToExpand) {
    if (!keysToExpand || keysToExpand.length === 0) {
      return (0, _deferred.Deferred)().resolve().promise();
    }
    const resultCallback = (0, _deferred.Deferred)();
    const callbacksByNodes = keysToExpand.map(key => this.expandItem(key));
    _deferred.when.apply(_renderer.default, callbacksByNodes)
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    .done(() => resultCallback.resolve())
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    .fail(() => resultCallback.reject());
    return resultCallback.promise();
  }
  _dispose() {
    super._dispose();
    clearTimeout(this._setFocusedItemTimeout);
    // @ts-expect-error ts-error
    this._allItemsExpandedHandler = null;
  }
}
var _default = exports.default = TreeViewBase;
