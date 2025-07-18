/**
* DevExtreme (cjs/__internal/ui/hierarchical_collection/data_converter.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _iterator = require("../../../core/utils/iterator");
var _type = require("../../../core/utils/type");
var _ui = _interopRequireDefault(require("../../../ui/widget/ui.errors"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
class DataConverter {
  constructor() {
    this._dataStructure = [];
    this._itemsCount = 0;
    this._visibleItemsCount = 0;
    this._indexByKey = {};
  }
  _convertItemsToNodes(items, parentKey) {
    (0, _iterator.each)(items, (_, item) => {
      const parentId = (0, _type.isDefined)(parentKey) ? parentKey : this._getParentId(item);
      const node = this._convertItemToNode(item, parentId);
      this._dataStructure.push(node);
      this._checkForDuplicateId(node.internalFields.key);
      this._indexByKey[String(node.internalFields.key)] = this._dataStructure.length - 1;
      if (this._itemHasChildren(item)) {
        this._convertItemsToNodes(this._dataAccessors.getters.items(item), node.internalFields.key);
      }
    });
  }
  _checkForDuplicateId(key) {
    if ((0, _type.isDefined)(this._indexByKey[String(key)])) {
      throw _ui.default.Error('E1040', key);
    }
  }
  _getParentId(item) {
    return this._dataType === 'plain' ? this._dataAccessors.getters.parentKey(item) : undefined;
  }
  _itemHasChildren(item) {
    if (this._dataType === 'plain') {
      return false;
    }
    const items = this._dataAccessors.getters.items(item);
    return Boolean(items === null || items === void 0 ? void 0 : items.length);
  }
  _getUniqueKey(item) {
    const keyGetter = this._dataAccessors.getters.key;
    const itemKey = keyGetter(item);
    const isCorrectKey = (itemKey || itemKey === 0) && (0, _type.isPrimitive)(itemKey);
    return isCorrectKey ? itemKey : this.getItemsCount();
  }
  _convertItemToNode(item, parentKey) {
    this._itemsCount += 1;
    if (item.visible !== false) {
      this._visibleItemsCount += 1;
    }
    const node = _extends({
      internalFields: {
        disabled: this._dataAccessors.getters.disabled(item, {
          defaultValue: false
        }),
        expanded: this._dataAccessors.getters.expanded(item, {
          defaultValue: false
        }),
        selected: this._dataAccessors.getters.selected(item, {
          defaultValue: false
        }),
        key: this._getUniqueKey(item),
        parentKey: (0, _type.isDefined)(parentKey) ? parentKey : this._rootValue,
        item: this._makeObjectFromPrimitive(item),
        childrenKeys: []
      }
    }, item);
    delete node.items;
    return node;
  }
  setChildrenKeys() {
    (0, _iterator.each)(this._dataStructure, (_, node) => {
      if (node.internalFields.parentKey === this._rootValue) return;
      const parent = this.getParentNode(node);
      if (parent) {
        parent.internalFields.childrenKeys.push(node.internalFields.key);
      }
    });
  }
  _makeObjectFromPrimitive(item) {
    if ((0, _type.isPrimitive)(item)) {
      const key = item;
      const newItem = {};
      this._dataAccessors.setters.key(newItem, key);
      return newItem;
    }
    return item;
  }
  _convertToPublicNode(node, parent) {
    if (!node) {
      return null;
    }
    const publicNode = {
      text: this._dataAccessors.getters.display(node),
      key: node.internalFields.key,
      selected: node.internalFields.selected,
      expanded: node.internalFields.expanded,
      disabled: node.internalFields.disabled,
      parent: parent ?? null,
      itemData: node.internalFields.item,
      children: [],
      items: []
    };
    if (publicNode.parent) {
      publicNode.parent.children.push(publicNode);
      publicNode.parent.items.push(publicNode);
    }
    return publicNode;
  }
  convertToPublicNodes(data, parent) {
    if (!data.length) return [];
    const publicNodes = [];
    (0, _iterator.each)(data, (_, node) => {
      const internalNode = (0, _type.isPrimitive)(node) ? this._getByKey(node) : node;
      if (!internalNode) {
        return;
      }
      const publicNode = this._convertToPublicNode(internalNode, parent);
      if (!publicNode) {
        return;
      }
      publicNode.children = this.convertToPublicNodes(internalNode.internalFields.childrenKeys, publicNode);
      publicNodes.push(publicNode);
      internalNode.internalFields.publicNode = publicNode;
    });
    return publicNodes;
  }
  setDataAccessors(accessors) {
    this._dataAccessors = accessors;
  }
  _getByKey(key) {
    return this._dataStructure[this.getIndexByKey(key)] || null;
  }
  getParentNode(node) {
    // @ts-expect-error ts-error
    return this._getByKey(node.internalFields.parentKey);
  }
  getByKey(data, key) {
    if (!(0, _type.isDefined)(key)) {
      return null;
    }
    const findByKey = function findByKey(searchData, searchKey) {
      let result = null;
      (0, _iterator.each)(searchData, (_, element) => {
        var _element$internalFiel;
        const currentElementKey = ((_element$internalFiel = element.internalFields) === null || _element$internalFiel === void 0 ? void 0 : _element$internalFiel.key) ?? element.key;
        if ((currentElementKey === null || currentElementKey === void 0 ? void 0 : currentElementKey.toString()) === searchKey.toString()) {
          result = element;
          return false;
        }
        return true;
      });
      return result;
    };
    return findByKey(data, key);
  }
  getItemsCount() {
    return this._itemsCount;
  }
  getVisibleItemsCount() {
    return this._visibleItemsCount;
  }
  updateIndexByKey() {
    this._indexByKey = {};
    (0, _iterator.each)(this._dataStructure, (index, node) => {
      this._checkForDuplicateId(node.internalFields.key);
      this._indexByKey[node.internalFields.key] = index;
    });
  }
  updateChildrenKeys() {
    this._indexByKey = {};
    this.removeChildrenKeys();
    this.updateIndexByKey();
    this.setChildrenKeys();
  }
  removeChildrenKeys() {
    this._indexByKey = {};
    (0, _iterator.each)(this._dataStructure, (index, node) => {
      node.internalFields.childrenKeys = [];
    });
  }
  getIndexByKey(key) {
    return this._indexByKey[key];
  }
  createPlainStructure(items, rootValue, dataType) {
    this._itemsCount = 0;
    this._visibleItemsCount = 0;
    this._rootValue = rootValue;
    this._dataType = dataType;
    this._indexByKey = {};
    this._convertItemsToNodes(items);
    this.setChildrenKeys();
    return this._dataStructure;
  }
}
var _default = exports.default = DataConverter;
