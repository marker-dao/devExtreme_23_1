/**
* DevExtreme (esm/__internal/ui/hierarchical_collection/hierarchical_collection_widget.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import devices from '../../../core/devices';
import $ from '../../../core/renderer';
import { BindableTemplate } from '../../../core/templates/bindable_template';
import { noop } from '../../../core/utils/common';
import { compileGetter, compileSetter } from '../../../core/utils/data';
import { extend } from '../../../core/utils/extend';
import { getImageContainer } from '../../../core/utils/icon';
import { each } from '../../../core/utils/iterator';
import { isFunction, isObject } from '../../../core/utils/type';
import CollectionWidgetAsync from '../../../ui/collection/ui.collection_widget.async';
import DataAdapter from './data_adapter';
const DISABLED_STATE_CLASS = 'dx-state-disabled';
const ITEM_URL_CLASS = 'dx-item-url';
class HierarchicalCollectionWidget extends CollectionWidgetAsync {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      keyExpr: 'id',
      displayExpr: 'text',
      selectedExpr: 'selected',
      disabledExpr: 'disabled',
      itemsExpr: 'items',
      hoverStateEnabled: true,
      parentIdExpr: 'parentId',
      expandedExpr: 'expanded'
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device() {
        return devices.real().deviceType === 'desktop' && !devices.isSimulator();
      },
      // @ts-expect-error ts-error
      options: {
        focusStateEnabled: true
      }
    }]);
  }
  _init() {
    super._init();
    this._initAccessors();
    this._initDataAdapter();
    this._initDynamicTemplates();
  }
  _initDataSource() {
    var _this$_dataSource;
    // @ts-expect-error ts-error
    super._initDataSource();
    // @ts-expect-error ts-error
    (_this$_dataSource = this._dataSource) === null || _this$_dataSource === void 0 || _this$_dataSource.paginate(false);
  }
  _initDataAdapter() {
    const accessors = this._createDataAdapterAccessors();
    this._dataAdapter = new DataAdapter(extend({
      dataAccessors: {
        getters: accessors.getters,
        setters: accessors.setters
      },
      items: this.option('items')
    }, this._getDataAdapterOptions()));
  }
  _getDataAdapterOptions() {
    return {};
  }
  _getItemExtraPropNames() {
    return [];
  }
  _initDynamicTemplates() {
    const fields = ['text', 'html', 'items', 'icon'].concat(this._getItemExtraPropNames());
    this._templateManager.addDefaultTemplates({
      item: new BindableTemplate(this._addContent.bind(this), fields, this.option('integrationOptions.watchMethod'), {
        text: this._displayGetter,
        // @ts-expect-error ts-error
        items: this._itemsGetter
      })
    });
  }
  _addContent($container, itemData) {
    $container
    // @ts-expect-error ts-error
    .html(itemData.html)
    // @ts-expect-error ts-error
    .append(this._getIconContainer(itemData)).append(this._getTextContainer(itemData));
  }
  _getLinkContainer(iconContainer, textContainer, itemData) {
    // @ts-expect-error ts-error
    const {
      linkAttr,
      url
    } = itemData;
    const linkAttributes = isObject(linkAttr) ? linkAttr : {};
    return $('<a>').addClass(ITEM_URL_CLASS)
    // @ts-expect-error ts-error
    .attr(_extends({}, linkAttributes, {
      href: url
    }))
    // @ts-expect-error ts-error
    .append(iconContainer).append(textContainer);
  }
  _clickByLink(link) {
    link.addEventListener('click', e => {
      e.stopPropagation();
    }, {
      once: true
    });
    link.click();
  }
  _getIconContainer(itemData) {
    // @ts-expect-error ts-error
    if (!itemData.icon) {
      return undefined;
    }
    // @ts-expect-error ts-error
    const $imageContainer = getImageContainer(itemData.icon);
    // @ts-expect-error ts-error
    if ($imageContainer.is('img')) {
      var _this$NAME;
      const componentName = (_this$NAME = this.NAME) !== null && _this$NAME !== void 0 && _this$NAME.startsWith('dxPrivateComponent') ? '' : `${this.NAME} `;
      // @ts-expect-error ts-error
      $imageContainer.attr('alt', `${componentName}item icon`);
    }
    return $imageContainer;
  }
  _getTextContainer(itemData) {
    // @ts-expect-error ts-error
    return $('<span>').text(itemData.text);
  }
  _initAccessors() {
    each(this._getAccessors(), (_, accessor) => {
      this._compileAccessor(accessor);
    });
    this._compileDisplayGetter();
  }
  _getAccessors() {
    return ['key', 'selected', 'items', 'disabled', 'parentId', 'expanded'];
  }
  _getChildNodes(node) {
    const arr = [];
    // @ts-expect-error ts-error
    each(node.internalFields.childrenKeys, (_, key) => {
      var _this$_dataAdapter;
      const childNode = (_this$_dataAdapter = this._dataAdapter) === null || _this$_dataAdapter === void 0 ? void 0 : _this$_dataAdapter.getNodeByKey(key);
      arr.push(childNode);
    });
    return arr;
  }
  _hasChildren(node) {
    var _node$internalFields;
    // @ts-expect-error ts-error
    return Boolean(node === null || node === void 0 || (_node$internalFields = node.internalFields) === null || _node$internalFields === void 0 || (_node$internalFields = _node$internalFields.childrenKeys) === null || _node$internalFields === void 0 ? void 0 : _node$internalFields.length);
  }
  _compileAccessor(optionName) {
    const getter = `_${optionName}Getter`;
    const setter = `_${optionName}Setter`;
    const optionExpr = this.option(`${optionName}Expr`);
    if (!optionExpr) {
      this[getter] = noop;
      this[setter] = noop;
      return;
    }
    if (isFunction(optionExpr)) {
      this[setter] = (obj, value) => {
        obj[optionExpr()] = value;
      };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      this[getter] = obj => obj[optionExpr()];
      return;
    }
    // @ts-expect-error ts-error
    this[getter] = compileGetter(optionExpr);
    // @ts-expect-error ts-error
    this[setter] = compileSetter(optionExpr);
  }
  _createDataAdapterAccessors() {
    const accessors = {
      getters: {},
      setters: {}
    };
    each(this._getAccessors(), (_, accessor) => {
      const getterName = `_${accessor}Getter`;
      const setterName = `_${accessor}Setter`;
      const newAccessor = accessor === 'parentId' ? 'parentKey' : accessor;
      accessors.getters[newAccessor] = this[getterName];
      accessors.setters[newAccessor] = this[setterName];
    });
    // @ts-expect-error ts-error
    accessors.getters.display = !this._displayGetter
    // @ts-expect-error ts-error
    ? itemData => itemData.text : this._displayGetter;
    return accessors;
  }
  _initMarkup() {
    super._initMarkup();
    this._addWidgetClass();
  }
  _addWidgetClass() {
    this._focusTarget().addClass(this._widgetClass());
  }
  _widgetClass() {
    return '';
  }
  _renderItemFrame(index, itemData, $itemContainer) {
    const $itemFrame = super._renderItemFrame(index, itemData, $itemContainer);
    // @ts-expect-error ts-error
    $itemFrame.toggleClass(DISABLED_STATE_CLASS, !!this._disabledGetter(itemData));
    return $itemFrame;
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'displayExpr':
      case 'keyExpr':
        this._initAccessors();
        this._initDynamicTemplates();
        this.repaint();
        break;
      case 'itemsExpr':
      case 'selectedExpr':
      case 'disabledExpr':
      case 'expandedExpr':
      case 'parentIdExpr':
        this._initAccessors();
        this._initDataAdapter();
        this.repaint();
        break;
      case 'items':
        this._initDataAdapter();
        super._optionChanged(args);
        break;
      default:
        super._optionChanged(args);
    }
  }
}
export default HierarchicalCollectionWidget;
