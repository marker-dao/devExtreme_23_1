/**
* DevExtreme (cjs/__internal/ui/hierarchical_collection/data_adapter.js)
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
exports.default = void 0;
var _query = _interopRequireDefault(require("../../../common/data/query"));
var _store_helper = _interopRequireDefault(require("../../../common/data/store_helper"));
var _common = require("../../../core/utils/common");
var _extend = require("../../../core/utils/extend");
var _iterator = require("../../../core/utils/iterator");
var _type = require("../../../core/utils/type");
var _ui = _interopRequireDefault(require("../../../ui/widget/ui.errors"));
var _m_search_box_mixin = _interopRequireWildcard(require("../../ui/collection/m_search_box_mixin"));
var _m_text_box = _interopRequireDefault(require("../../ui/text_box/m_text_box"));
var _data_converter = _interopRequireDefault(require("./data_converter"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const EXPANDED = 'expanded';
const SELECTED = 'selected';
const DISABLED = 'disabled';
_m_search_box_mixin.default.setEditorClass(_m_text_box.default);
class DataAdapter {
  constructor(options) {
    this._initialDataStructure = [];
    this.options = {};
    (0, _extend.extend)(this.options, this._defaultOptions(), options);
    this.options.dataConverter.setDataAccessors(this.options.dataAccessors);
    this._selectedNodesKeys = [];
    this._expandedNodesKeys = [];
    this._dataStructure = [];
    this._createInternalDataStructure();
    this.getTreeNodes();
  }
  setOption(name, value) {
    this.options[name] = value;
    if (name === 'recursiveSelection') {
      this._updateSelection();
    }
  }
  _defaultOptions() {
    return {
      dataAccessors: {},
      items: [],
      multipleSelection: true,
      recursiveSelection: false,
      recursiveExpansion: false,
      rootValue: 0,
      searchValue: '',
      dataType: 'tree',
      searchMode: 'contains',
      dataConverter: new _data_converter.default(),
      onNodeChanged: _common.noop,
      sort: null
    };
  }
  _createInternalDataStructure() {
    this._initialDataStructure = this.options.dataConverter.createPlainStructure(this.options.items, this.options.rootValue, this.options.dataType);
    this._dataStructure = this.options.searchValue.length ? this.search(this.options.searchValue) : this._initialDataStructure;
    // @ts-expect-error ts-error
    this.options.dataConverter._dataStructure = this._dataStructure;
    this._updateSelection();
    this._updateExpansion();
  }
  _updateSelection() {
    if (this.options.recursiveSelection) {
      this._setChildrenSelection();
      this._setParentSelection();
    }
    this._selectedNodesKeys = this._updateNodesKeysArray(SELECTED);
  }
  _updateExpansion(key) {
    if (this.options.recursiveExpansion) {
      if (key) {
        this._updateOneBranch(key);
      } else {
        this._setParentExpansion();
      }
    }
    this._expandedNodesKeys = this._updateNodesKeysArray(EXPANDED);
  }
  _updateNodesKeysArray(property) {
    let array = [];
    (0, _iterator.each)(this._getDataBySelectionMode(), (_, node) => {
      if (!this._isNodeVisible(node)) {
        return;
      }
      if (node.internalFields[property]) {
        if (property === EXPANDED || this.options.multipleSelection) {
          array.push(node.internalFields.key);
        } else {
          if (array.length) {
            this.toggleSelection(array[0], false, true);
          }
          array = [node.internalFields.key];
        }
      }
    });
    return array;
  }
  _getDataBySelectionMode() {
    return this.options.multipleSelection ? this.getData() : this.getFullData();
  }
  _isNodeVisible(node) {
    return node.internalFields.item.visible !== false;
  }
  _getByKey(data, key) {
    return data === this._dataStructure ? this.options.dataConverter._getByKey(key) : this.options.dataConverter.getByKey(data.filter(Boolean), key);
  }
  _setChildrenSelection() {
    (0, _iterator.each)(this._dataStructure, (_, node) => {
      if (!(node !== null && node !== void 0 && node.internalFields.childrenKeys.length)) {
        return;
      }
      const isSelected = node.internalFields.selected;
      if (isSelected === true) {
        this._toggleChildrenSelection(node, isSelected);
      }
    });
  }
  _setParentSelection() {
    (0, _iterator.each)(this._dataStructure, (_, node) => {
      if (!node) return;
      const parent = this.options.dataConverter.getParentNode(node);
      if (parent && node.internalFields.parentKey !== this.options.rootValue) {
        this._iterateParents(node, parentNode => {
          const newParentState = this._calculateSelectedState(parentNode);
          this._setFieldState(parentNode, SELECTED, newParentState);
        });
      }
    });
  }
  _setParentExpansion() {
    (0, _iterator.each)(this._dataStructure, (_, node) => {
      if (!(node !== null && node !== void 0 && node.internalFields.expanded)) {
        return;
      }
      this._updateOneBranch(node.internalFields.key);
    });
  }
  _updateOneBranch(key) {
    const node = this.getNodeByKey(key);
    this._iterateParents(node, parent => {
      this._setFieldState(parent, EXPANDED, true);
    });
  }
  _iterateChildren(node, recursive, callback, processedKeys) {
    if (!(0, _type.isFunction)(callback) || !node) {
      return;
    }
    const nodeKey = node.internalFields.key;
    const keys = processedKeys ?? [];
    if (nodeKey !== undefined && !keys.includes(nodeKey)) {
      keys.push(nodeKey);
      (0, _iterator.each)(node.internalFields.childrenKeys, (_, key) => {
        const child = this.getNodeByKey(key);
        callback(child);
        if (child !== null && child !== void 0 && child.internalFields.childrenKeys.length && recursive) {
          this._iterateChildren(child, recursive, callback, keys);
        }
      });
    }
  }
  _iterateParents(node, callback, processedKeys) {
    if (!node || node.internalFields.parentKey === this.options.rootValue || !(0, _type.isFunction)(callback)) {
      return;
    }
    const keys = processedKeys ?? [];
    const {
      key
    } = node.internalFields;
    if (!keys.includes(key)) {
      keys.push(key);
      const parent = this.options.dataConverter.getParentNode(node);
      if (parent) {
        callback(parent);
        if (parent.internalFields.parentKey !== this.options.rootValue) {
          this._iterateParents(parent, callback, keys);
        }
      }
    }
  }
  _calculateSelectedState(node) {
    const itemsCount = node.internalFields.childrenKeys.length;
    let selectedItemsCount = 0;
    let invisibleItemsCount = 0;
    let result = false;
    for (let i = 0; i <= itemsCount - 1; i += 1) {
      const childNode = this.getNodeByKey(node.internalFields.childrenKeys[i]);
      const isChildInvisible = (childNode === null || childNode === void 0 ? void 0 : childNode.internalFields.item.visible) === false;
      const childState = childNode === null || childNode === void 0 ? void 0 : childNode.internalFields.selected;
      if (isChildInvisible) {
        invisibleItemsCount += 1;
      } else if (childState) {
        selectedItemsCount += 1;
      } else if (childState === undefined) {
        selectedItemsCount += 0.5;
      }
    }
    if (selectedItemsCount) {
      result = selectedItemsCount === itemsCount - invisibleItemsCount ? true : undefined;
    }
    return result;
  }
  _toggleChildrenSelection(node, state) {
    this._iterateChildren(node, true, child => {
      if (child && this._isNodeVisible(child)) {
        this._setFieldState(child, SELECTED, state);
      }
    });
  }
  _setFieldState(node, field, state) {
    if (node.internalFields[field] === state) {
      return;
    }
    // @ts-expect-error ts-error
    node.internalFields[field] = state;
    if (node.internalFields.publicNode) {
      // @ts-expect-error ts-error
      node.internalFields.publicNode[field] = state;
    }
    // @ts-expect-error ts-error
    this.options.dataAccessors.setters[field](node.internalFields.item, state);
    this.options.onNodeChanged(node);
  }
  _markChildren(keys) {
    (0, _iterator.each)(keys, (_, key) => {
      const index = this.getIndexByKey(key);
      const node = this.getNodeByKey(key);
      this._dataStructure[index] = null;
      if (node !== null && node !== void 0 && node.internalFields.childrenKeys.length) {
        this._markChildren(node.internalFields.childrenKeys);
      }
    });
  }
  _removeNode(key) {
    const node = this.getNodeByKey(key);
    this._dataStructure[this.getIndexByKey(key)] = null;
    if (node !== null && node !== void 0 && node.internalFields.childrenKeys.length) {
      this._markChildren(node.internalFields.childrenKeys);
    }
    let counter = 0;
    const items = (0, _extend.extend)([], this._dataStructure);
    (0, _iterator.each)(items, (index, item) => {
      if (!item) {
        this._dataStructure.splice(index - counter, 1);
        counter += 1;
      }
    });
  }
  _addNode(item) {
    const {
      dataConverter
    } = this.options;
    const node = dataConverter._convertItemToNode(item, this.options.dataAccessors.getters.parentKey(item));
    this._dataStructure = this._dataStructure.concat(node);
    this._initialDataStructure = this._initialDataStructure.concat(node);
    dataConverter._dataStructure = dataConverter._dataStructure.concat(node);
  }
  _updateFields() {
    this.options.dataConverter.updateChildrenKeys();
    this._updateSelection();
    this._updateExpansion();
  }
  getSelectedNodesKeys() {
    return this._selectedNodesKeys;
  }
  getExpandedNodesKeys() {
    return this._expandedNodesKeys;
  }
  getData() {
    return this._dataStructure;
  }
  getFullData() {
    return this._initialDataStructure;
  }
  getNodeByItem(item) {
    let result = null;
    (0, _iterator.each)(this._dataStructure, (_, node) => {
      if ((node === null || node === void 0 ? void 0 : node.internalFields.item) === item) {
        result = node;
        return false;
      }
      return true;
    });
    return result;
  }
  getNodesByItems(items) {
    const nodes = [];
    (0, _iterator.each)(items, (_, item) => {
      const node = this.getNodeByItem(item);
      if (node) {
        nodes.push(node);
      }
    });
    return nodes;
  }
  getNodeByKey(key, data) {
    return this._getByKey(data ?? this._getDataBySelectionMode(), key);
  }
  getTreeNodes() {
    const rootNodes = this.getRootNodes();
    const rootKeys = rootNodes.map(node => node.internalFields.key);
    return this.options.dataConverter.convertToPublicNodes(rootKeys, null);
  }
  getItemsCount() {
    return this.options.dataConverter.getItemsCount();
  }
  getVisibleItemsCount() {
    return this.options.dataConverter.getVisibleItemsCount();
  }
  getPublicNode(node) {
    return node.internalFields.publicNode;
  }
  getRootNodes() {
    return this.getChildrenNodes(this.options.rootValue);
  }
  getChildrenNodes(parentKey) {
    // @ts-expect-error ts-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (0, _query.default)(this._dataStructure, {
      langParams: this.options.langParams
    }).filter(['internalFields.parentKey', parentKey]).toArray();
  }
  getIndexByKey(key) {
    return this.options.dataConverter.getIndexByKey(key);
  }
  addItem(item) {
    this._addNode(item);
    this._updateFields();
  }
  removeItem(key) {
    this._removeNode(key);
    this._updateFields();
  }
  toggleSelection(key, state, selectRecursive) {
    const isSingleModeUnselect = this._isSingleModeUnselect(state);
    const dataArray = selectRecursive || isSingleModeUnselect ? this._initialDataStructure : this._dataStructure;
    const node = this._getByKey(dataArray, key);
    if (node) {
      this._setFieldState(node, SELECTED, state);
      if (this.options.recursiveSelection && !selectRecursive) {
        if (state) {
          this._setChildrenSelection();
        } else {
          this._toggleChildrenSelection(node, state);
        }
        this._setParentSelection();
      }
    }
    this._selectedNodesKeys = this._updateNodesKeysArray(SELECTED);
  }
  _isSingleModeUnselect(selectionState) {
    return !this.options.multipleSelection && !selectionState;
  }
  toggleNodeDisabledState(key, state) {
    const node = this.getNodeByKey(key);
    if (node) {
      this._setFieldState(node, DISABLED, state);
    }
  }
  toggleSelectAll(state) {
    if (!(0, _type.isDefined)(state)) {
      return;
    }
    const lastSelectedKey = this._selectedNodesKeys[this._selectedNodesKeys.length - 1];
    const dataStructure = this._isSingleModeUnselect(state) ? this._initialDataStructure : this._dataStructure;
    (0, _iterator.each)(dataStructure, (index, node) => {
      if (node && this._isNodeVisible(node)) {
        this._setFieldState(node, SELECTED, state);
      }
    });
    this._selectedNodesKeys = this._updateNodesKeysArray(SELECTED);
    if (!state && this.options.selectionRequired) {
      this.toggleSelection(lastSelectedKey, true);
    }
  }
  isAllSelected() {
    if (this.getSelectedNodesKeys().length) {
      return this.getSelectedNodesKeys().length === this.getVisibleItemsCount() ? true : undefined;
    }
    return false;
  }
  toggleExpansion(key, state) {
    const node = this.getNodeByKey(key);
    if (node) {
      this._setFieldState(node, EXPANDED, state);
      if (state) {
        this._updateExpansion(key);
      }
    }
    this._expandedNodesKeys = this._updateNodesKeysArray(EXPANDED);
  }
  isFiltered(item) {
    return !this.options.searchValue.length
    // @ts-expect-error ts-error
    || !!this._filterDataStructure(this.options.searchValue, [item]).length;
  }
  static _createCriteria(selector, value, operation) {
    const searchFilter = [];
    if (!Array.isArray(selector)) {
      return [selector, operation, value];
    }
    (0, _iterator.each)(selector, (i, item) => {
      searchFilter.push([item, operation, value], 'or');
    });
    searchFilter.pop();
    return searchFilter;
  }
  _filterDataStructure(filterValue, dataStructure) {
    const selector = this.options.searchExpr ?? this.options.dataAccessors.getters.display;
    const operation = (0, _m_search_box_mixin.getOperationBySearchMode)(this.options.searchMode);
    // @ts-expect-error
    const criteria = DataAdapter._createCriteria(selector, filterValue, operation);
    const data = dataStructure ?? this._initialDataStructure;
    // @ts-expect-error ts-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (0, _query.default)(data, {
      langParams: this.options.langParams
    }).filter(criteria).toArray();
  }
  search(searchValue) {
    let matches = this._filterDataStructure(searchValue);
    const {
      dataConverter
    } = this.options;
    const lookForParents = (matchesArray, startIndex) => {
      const {
        length
      } = matchesArray;
      let index = startIndex;
      while (index < length) {
        const node = matchesArray[index];
        if (node.internalFields.parentKey === this.options.rootValue) {
          index += 1;
        } else {
          const parent = dataConverter.getParentNode(node);
          if (!parent) {
            _ui.default.log('W1007', node.internalFields.parentKey, node.internalFields.key);
            index += 1;
          } else {
            // eslint-disable-next-line max-depth
            if (!parent.internalFields.expanded) {
              this._setFieldState(parent, EXPANDED, true);
            }
            // eslint-disable-next-line max-depth
            if (matchesArray.includes(parent)) {
              index += 1;
            } else {
              matchesArray.splice(index, 0, parent);
              lookForParents(matchesArray, index);
              return;
            }
          }
        }
      }
    };
    lookForParents(matches, 0);
    if (this.options.sort) {
      matches = _store_helper.default
      // @ts-expect-error ts-error
      .queryByOptions((0, _query.default)(matches), {
        sort: this.options.sort,
        langParams: this.options.langParams
      }).toArray();
    }
    dataConverter._indexByKey = {};
    (0, _iterator.each)(matches, (index, node) => {
      node.internalFields.childrenKeys = [];
      dataConverter._indexByKey[node.internalFields.key] = index;
    });
    dataConverter._dataStructure = matches;
    dataConverter.setChildrenKeys();
    return dataConverter._dataStructure;
  }
}
var _default = exports.default = DataAdapter;
