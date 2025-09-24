"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _bindable_template = require("../../../core/templates/bindable_template");
var _common = require("../../../core/utils/common");
var _data = require("../../../core/utils/data");
var _icon = require("../../../core/utils/icon");
var _iterator = require("../../../core/utils/iterator");
var _type = require("../../../core/utils/type");
var _uiCollection_widget = _interopRequireDefault(require("../../../ui/collection/ui.collection_widget.async"));
var _data_adapter = _interopRequireDefault(require("./data_adapter"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const DISABLED_STATE_CLASS = 'dx-state-disabled';
const ITEM_URL_CLASS = 'dx-item-url';
class HierarchicalCollectionWidget extends _uiCollection_widget.default {
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
        return _devices.default.real().deviceType === 'desktop' && !_devices.default.isSimulator();
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
    const {
      items = []
    } = this.option();
    this._dataAdapter = new _data_adapter.default(_extends({
      dataAccessors: {
        getters: accessors.getters,
        setters: accessors.setters
      },
      // @ts-expect-error
      items
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
      item: new _bindable_template.BindableTemplate(this._addContent.bind(this), fields, this.option('integrationOptions.watchMethod'), {
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
    const linkAttributes = (0, _type.isObject)(linkAttr) ? linkAttr : {};
    return (0, _renderer.default)('<a>').addClass(ITEM_URL_CLASS)
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
    const $imageContainer = (0, _icon.getImageContainer)(itemData.icon);
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
    return (0, _renderer.default)('<span>').text(itemData.text);
  }
  _initAccessors() {
    (0, _iterator.each)(this._getAccessors(), (_index, accessor) => {
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
    (0, _iterator.each)(node.internalFields.childrenKeys, (_, key) => {
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
      this[getter] = _common.noop;
      this[setter] = _common.noop;
      return;
    }
    if ((0, _type.isFunction)(optionExpr)) {
      this[setter] = (obj, value) => {
        obj[optionExpr()] = value;
      };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      this[getter] = obj => obj[optionExpr()];
      return;
    }
    // @ts-expect-error ts-error
    this[getter] = (0, _data.compileGetter)(optionExpr);
    // @ts-expect-error ts-error
    this[setter] = (0, _data.compileSetter)(optionExpr);
  }
  _createDataAdapterAccessors() {
    const accessors = {
      getters: {},
      setters: {}
    };
    (0, _iterator.each)(this._getAccessors(), (_index, accessor) => {
      const getterName = `_${accessor}Getter`;
      const setterName = `_${accessor}Setter`;
      const newAccessor = accessor === 'parentId' ? 'parentKey' : accessor;
      accessors.getters[newAccessor] = this[getterName];
      accessors.setters[newAccessor] = this[setterName];
    });
    // @ts-expect-error
    accessors.getters.display = this._displayGetter ?? (itemData => itemData.text);
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
var _default = exports.default = HierarchicalCollectionWidget;