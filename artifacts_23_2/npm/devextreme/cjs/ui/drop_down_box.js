/**
* DevExtreme (cjs/ui/drop_down_box.js)
* Version: 23.2.2
* Build date: Mon Nov 20 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _ui = _interopRequireDefault(require("./drop_down_editor/ui.drop_down_editor"));
var _ui2 = _interopRequireDefault(require("./editor/ui.data_expression"));
var _common = require("../core/utils/common");
var _type = require("../core/utils/type");
var _iterator = require("../core/utils/iterator");
var _selectors = require("./widget/selectors");
var _deferred = require("../core/utils/deferred");
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _events_engine = _interopRequireDefault(require("../events/core/events_engine"));
var _extend = require("../core/utils/extend");
var _utils = require("../ui/overlay/utils");
var _component_registrator = _interopRequireDefault(require("../core/component_registrator"));
var _index = require("../events/utils/index");
var _devices = _interopRequireDefault(require("../core/devices"));
var _dom_adapter = _interopRequireDefault(require("../core/dom_adapter"));
var _element = require("../core/element");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// STYLE dropDownBox
const getActiveElement = _dom_adapter.default.getActiveElement;
const DROP_DOWN_BOX_CLASS = 'dx-dropdownbox';
const ANONYMOUS_TEMPLATE_NAME = 'content';
const realDevice = _devices.default.real();
const DropDownBox = _ui.default.inherit({
  _supportedKeys: function () {
    return (0, _extend.extend)({}, this.callBase(), {
      tab: function (e) {
        if (!this.option('opened')) {
          return;
        }
        const $tabbableElements = this._getTabbableElements();
        const $focusableElement = e.shiftKey ? $tabbableElements.last() : $tabbableElements.first();
        $focusableElement && _events_engine.default.trigger($focusableElement, 'focus');
        e.preventDefault();
      }
    });
  },
  _getTabbableElements: function () {
    return this._getElements().filter(_selectors.tabbable);
  },
  _getElements: function () {
    return (0, _renderer.default)(this.content()).find('*');
  },
  _getDefaultOptions: function () {
    return (0, _extend.extend)(this.callBase(), {
      /**
       * @name dxDropDownBoxOptions.attr
       * @hidden
       */

      acceptCustomValue: false,
      contentTemplate: ANONYMOUS_TEMPLATE_NAME,
      /**
      * @name dxDropDownBoxOptions.onContentReady
      * @hidden true
      * @action
      */

      /**
       * @name dxDropDownBoxOptions.spellcheck
       * @type boolean
       * @default false
       * @hidden
       */

      /**
       * @name dxDropDownBoxOptions.applyValueMode
       * @type string
       * @default "instantly"
       * @acceptValues 'useButtons'|'instantly'
       * @hidden
       */

      /**
       * @name dxDropDownBoxOptions.itemTemplate
       * @type template
       * @default "item"
       * @hidden
       */

      openOnFieldClick: true,
      displayValueFormatter: function (value) {
        return Array.isArray(value) ? value.join(', ') : value;
      },
      useHiddenSubmitElement: true
    });
  },
  _getAnonymousTemplateName: function () {
    return ANONYMOUS_TEMPLATE_NAME;
  },
  _initTemplates: function () {
    this.callBase();
  },
  _initMarkup: function () {
    this._initDataExpressions();
    this.$element().addClass(DROP_DOWN_BOX_CLASS);
    this.callBase();
  },
  _setSubmitValue: function () {
    const value = this.option('value');
    const submitValue = this._shouldUseDisplayValue(value) ? this._displayGetter(value) : value;
    this._getSubmitElement().val(submitValue);
  },
  _shouldUseDisplayValue: function (value) {
    return this.option('valueExpr') === 'this' && (0, _type.isObject)(value);
  },
  _sortValuesByKeysOrder(orderedKeys, values) {
    const sortedValues = values.sort((a, b) => {
      return orderedKeys.indexOf(a.itemKey) - orderedKeys.indexOf(b.itemKey);
    });
    return sortedValues.map(x => x.itemDisplayValue);
  },
  _renderInputValue: function () {
    this._rejectValueLoading();
    const values = [];
    if (!this._dataSource) {
      this.callBase(values);
      return new _deferred.Deferred().resolve();
    }
    const currentValue = this._getCurrentValue();
    let keys = currentValue !== null && currentValue !== void 0 ? currentValue : [];
    keys = Array.isArray(keys) ? keys : [keys];
    const itemLoadDeferreds = (0, _iterator.map)(keys, key => {
      const deferred = new _deferred.Deferred();
      this._loadItem(key).always(item => {
        const displayValue = this._displayGetter(item);
        if ((0, _type.isDefined)(displayValue)) {
          values.push({
            itemKey: key,
            itemDisplayValue: displayValue
          });
        } else if (this.option('acceptCustomValue')) {
          values.push({
            itemKey: key,
            itemDisplayValue: key
          });
        }
        deferred.resolve();
      });
      return deferred;
    });
    const callBase = this.callBase.bind(this);
    return _deferred.when.apply(this, itemLoadDeferreds).always(() => {
      const orderedValues = this._sortValuesByKeysOrder(keys, values);
      this.option('displayValue', orderedValues);
      callBase(values.length && orderedValues);
    });
  },
  _loadItem: function (value) {
    const deferred = new _deferred.Deferred();
    const that = this;
    const selectedItem = (0, _common.grep)(this.option('items') || [], function (item) {
      return this._isValueEquals(this._valueGetter(item), value);
    }.bind(this))[0];
    if (selectedItem !== undefined) {
      deferred.resolve(selectedItem);
    } else {
      this._loadValue(value).done(function (item) {
        deferred.resolve(item);
      }).fail(function (args) {
        if (args !== null && args !== void 0 && args.shouldSkipCallback) {
          return;
        }
        if (that.option('acceptCustomValue')) {
          deferred.resolve(value);
        } else {
          deferred.reject();
        }
      });
    }
    return deferred.promise();
  },
  _popupTabHandler: function (e) {
    if ((0, _index.normalizeKeyName)(e) !== 'tab') return;
    const $firstTabbable = this._getTabbableElements().first().get(0);
    const $lastTabbable = this._getTabbableElements().last().get(0);
    const $target = e.target;
    const moveBackward = !!($target === $firstTabbable && e.shiftKey);
    const moveForward = !!($target === $lastTabbable && !e.shiftKey);
    if (moveBackward || moveForward) {
      this.close();
      _events_engine.default.trigger(this._input(), 'focus');
      if (moveBackward) {
        e.preventDefault();
      }
    }
  },
  _renderPopupContent: function () {
    if (this.option('contentTemplate') === ANONYMOUS_TEMPLATE_NAME) {
      return;
    }
    const contentTemplate = this._getTemplateByOption('contentTemplate');
    if (!(contentTemplate && this.option('contentTemplate'))) {
      return;
    }
    const $popupContent = this._popup.$content();
    const templateData = {
      value: this._fieldRenderData(),
      component: this
    };
    $popupContent.empty();
    contentTemplate.render({
      container: (0, _element.getPublicElement)($popupContent),
      model: templateData
    });
  },
  _canShowVirtualKeyboard: function () {
    return realDevice.mac; // T845484
  },

  _isNestedElementActive: function () {
    const activeElement = getActiveElement();
    return activeElement && this._popup.$content().get(0).contains(activeElement);
  },
  _shouldHideOnParentScroll: function () {
    return realDevice.deviceType === 'desktop' && this._canShowVirtualKeyboard() && this._isNestedElementActive();
  },
  _popupHiddenHandler: function () {
    this.callBase();
    this._popupPosition = undefined;
  },
  _popupPositionedHandler: function (e) {
    this.callBase(e);
    this._popupPosition = e.position;
  },
  _getDefaultPopupPosition: function (isRtlEnabled) {
    const {
      my,
      at
    } = this.callBase(isRtlEnabled);
    return {
      my,
      at,
      offset: {
        v: -1
      },
      collision: 'flipfit'
    };
  },
  _popupConfig: function () {
    const {
      focusStateEnabled
    } = this.option();
    return (0, _extend.extend)(this.callBase(), {
      tabIndex: -1,
      dragEnabled: false,
      focusStateEnabled,
      contentTemplate: ANONYMOUS_TEMPLATE_NAME,
      hideOnParentScroll: this._shouldHideOnParentScroll.bind(this),
      position: (0, _extend.extend)(this.option('popupPosition'), {
        of: this.$element()
      }),
      _ignoreFunctionValueDeprecation: true,
      maxHeight: function () {
        var _this$_popupPosition;
        const popupLocation = (_this$_popupPosition = this._popupPosition) === null || _this$_popupPosition === void 0 ? void 0 : _this$_popupPosition.v.location;
        return (0, _utils.getElementMaxHeightByWindow)(this.$element(), popupLocation);
      }.bind(this)
    });
  },
  _popupShownHandler: function () {
    this.callBase();
    const $firstElement = this._getTabbableElements().first();
    _events_engine.default.trigger($firstElement, 'focus');
  },
  _setCollectionWidgetOption: _common.noop,
  _optionChanged: function (args) {
    this._dataExpressionOptionChanged(args);
    switch (args.name) {
      case 'dataSource':
        this._renderInputValue();
        break;
      case 'displayValue':
        this.option('text', args.value);
        break;
      case 'displayExpr':
        this._renderValue();
        break;
      case 'contentTemplate':
        this._invalidate();
        break;
      default:
        this.callBase(args);
    }
  }
}).include(_ui2.default);
(0, _component_registrator.default)('dxDropDownBox', DropDownBox);
var _default = DropDownBox;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;