"use strict";

exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _color = _interopRequireDefault(require("../../color"));
var _color_view = _interopRequireDefault(require("./color_view"));
var _extend = require("../../core/utils/extend");
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _ui = _interopRequireDefault(require("../drop_down_editor/ui.drop_down_editor"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// STYLE colorBox

const COLOR_BOX_CLASS = 'dx-colorbox';
const COLOR_BOX_INPUT_CLASS = COLOR_BOX_CLASS + '-input';
const COLOR_BOX_INPUT_CONTAINER_CLASS = COLOR_BOX_INPUT_CLASS + '-container';
const COLOR_BOX_COLOR_RESULT_PREVIEW_CLASS = COLOR_BOX_CLASS + '-color-result-preview';
const COLOR_BOX_COLOR_IS_NOT_DEFINED = COLOR_BOX_CLASS + '-color-is-not-defined';
const COLOR_BOX_OVERLAY_CLASS = COLOR_BOX_CLASS + '-overlay';
const COLOR_BOX_CONTAINER_CELL_CLASS = 'dx-colorview-container-cell';
const COLOR_BOX_BUTTON_CELL_CLASS = 'dx-colorview-button-cell';
const COLOR_BOX_BUTTONS_CONTAINER_CLASS = 'dx-colorview-buttons-container';
const COLOR_BOX_APPLY_BUTTON_CLASS = 'dx-colorview-apply-button';
const COLOR_BOX_CANCEL_BUTTON_CLASS = 'dx-colorview-cancel-button';
const colorEditorPrototype = _color_view.default.prototype;
const colorUtils = {
  makeTransparentBackground: colorEditorPrototype._makeTransparentBackground.bind(colorEditorPrototype),
  makeRgba: colorEditorPrototype._makeRgba.bind(colorEditorPrototype)
};
const ColorBox = _ui.default.inherit({
  _supportedKeys: function () {
    const arrowHandler = function (e) {
      e.stopPropagation();
      if (this.option('opened')) {
        e.preventDefault();
        return true;
      }
    };
    const upArrowHandler = function (e) {
      if (!this.option('opened')) {
        e.preventDefault();
        return false;
      }
      if (e.altKey) {
        this.close();
        return false;
      }
      return true;
    };
    const downArrowHandler = function (e) {
      if (!this.option('opened') && !e.altKey) {
        e.preventDefault();
        return false;
      }
      if (!this.option('opened') && e.altKey) {
        this._validatedOpening();
        return false;
      }
      return true;
    };
    return (0, _extend.extend)(this.callBase(), {
      enter: this._enterKeyHandler,
      leftArrow: arrowHandler,
      rightArrow: arrowHandler,
      upArrow: upArrowHandler,
      downArrow: downArrowHandler
    });
  },
  _getDefaultOptions: function () {
    return (0, _extend.extend)(this.callBase(), {
      editAlphaChannel: false,
      /**
      * @name dxColorBoxOptions.onContentReady
      * @hidden true
      * @action
      */

      applyValueMode: 'useButtons',
      keyStep: 1,
      fieldTemplate: null,
      buttonsLocation: 'bottom after'

      /**
      * @name dxColorBoxOptions.maxLength
      * @hidden
      */

      /**
      * @name dxColorBoxOptions.valueChangeEvent
      * @hidden
      */

      /**
      * @name dxColorBoxOptions.spellcheck
      * @hidden
      */
    });
  },

  _popupHidingHandler: function () {
    this.callBase();
    if (this.option('applyValueMode') === 'useButtons') {
      this._updateColorViewValue(this.option('value'));
    }
  },
  _popupConfig: function () {
    return (0, _extend.extend)(this.callBase(), {
      width: ''
    });
  },
  _contentReadyHandler: function () {
    this._createColorView();
    this._addPopupBottomClasses();
  },
  _addPopupBottomClasses: function () {
    const $popupBottom = this._popup.bottomToolbar();
    if ($popupBottom) {
      $popupBottom.addClass(COLOR_BOX_CONTAINER_CELL_CLASS).addClass(COLOR_BOX_BUTTON_CELL_CLASS).find('.dx-toolbar-items-container').addClass(COLOR_BOX_BUTTONS_CONTAINER_CLASS);
      $popupBottom.find('.dx-popup-done').addClass(COLOR_BOX_APPLY_BUTTON_CLASS);
      $popupBottom.find('.dx-popup-cancel').addClass(COLOR_BOX_CANCEL_BUTTON_CLASS);
    }
  },
  _createColorView: function () {
    this._popup.$overlayContent().addClass(COLOR_BOX_OVERLAY_CLASS);
    const $colorView = (0, _renderer.default)('<div>').appendTo(this._popup.$content());
    this._colorView = this._createComponent($colorView, _color_view.default, this._colorViewConfig());
  },
  _applyNewColor: function (value) {
    this.option('value', value);
    if (value) {
      colorUtils.makeTransparentBackground(this._$colorResultPreview, value);
    }
    if (this._colorViewEnterKeyPressed) {
      this.close();
      this._colorViewEnterKeyPressed = false;
    }
  },
  _colorViewConfig: function () {
    const that = this;
    return {
      value: that.option('value'),
      matchValue: that.option('value'),
      editAlphaChannel: that.option('editAlphaChannel'),
      applyValueMode: that.option('applyValueMode'),
      focusStateEnabled: that.option('focusStateEnabled'),
      stylingMode: this.option('stylingMode'),
      target: this._input(),
      onEnterKeyPressed: function (_ref) {
        let {
          event
        } = _ref;
        that._colorViewEnterKeyPressed = true;
        if (that._colorView.option('value') !== that.option('value')) {
          that._saveValueChangeEvent(event);
          that._applyNewColor(that._colorView.option('value'));
          that.close();
        }
      },
      onValueChanged: function (_ref2) {
        let {
          event,
          value,
          previousValue
        } = _ref2;
        const instantlyMode = that.option('applyValueMode') === 'instantly';
        const isOldValue = colorUtils.makeRgba(value) === previousValue;
        const changesApplied = instantlyMode || that._colorViewEnterKeyPressed;
        const valueCleared = that._shouldSaveEmptyValue;
        if (isOldValue || !changesApplied || valueCleared) {
          return;
        }
        if (event) {
          that._saveValueChangeEvent(event);
        }
        that._applyNewColor(value);
      }
    };
  },
  _enterKeyHandler: function (e) {
    const newValue = this._input().val();
    const {
      value,
      editAlphaChannel
    } = this.option();
    const oldValue = value && editAlphaChannel ? colorUtils.makeRgba(value) : value;
    if (!newValue) return false;
    const color = new _color.default(newValue);
    if (color.colorIsInvalid) {
      this._input().val(oldValue);
      return;
    }
    if (newValue !== oldValue) {
      this._applyColorFromInput(newValue);
      this._saveValueChangeEvent(e);
      this.option('value', this.option('editAlphaChannel') ? colorUtils.makeRgba(newValue) : newValue);
    }
    if (this._colorView) {
      const colorViewValue = this._colorView.option('value');
      if (value !== colorViewValue) {
        this._saveValueChangeEvent(e);
        this.option('value', colorViewValue);
      }
    }
    this.close();
    return false;
  },
  _applyButtonHandler: function (e) {
    this._saveValueChangeEvent(e.event);
    this._applyNewColor(this._colorView.option('value'));
    this.callBase();
  },
  _cancelButtonHandler: function () {
    this._resetInputValue();
    this.callBase();
  },
  _getKeyboardListeners() {
    return this.callBase().concat([this._colorView]);
  },
  _init: function () {
    this.callBase();
  },
  _initMarkup: function () {
    this.$element().addClass(COLOR_BOX_CLASS);
    this.callBase();
  },
  _renderInput: function () {
    this.callBase();
    this._input().addClass(COLOR_BOX_INPUT_CLASS);
    this._renderColorPreview();
  },
  _renderColorPreview: function () {
    this.$element().wrapInner((0, _renderer.default)('<div>').addClass(COLOR_BOX_INPUT_CONTAINER_CLASS));
    this._$colorBoxInputContainer = this.$element().children().eq(0);
    this._$colorResultPreview = (0, _renderer.default)('<div>').addClass(COLOR_BOX_COLOR_RESULT_PREVIEW_CLASS).appendTo(this._$textEditorInputContainer);
    if (!this.option('value')) {
      this._$colorBoxInputContainer.addClass(COLOR_BOX_COLOR_IS_NOT_DEFINED);
    } else {
      colorUtils.makeTransparentBackground(this._$colorResultPreview, this.option('value'));
    }
  },
  _renderValue: function () {
    const {
      value,
      editAlphaChannel
    } = this.option();
    const shouldConvertToColor = value && editAlphaChannel;
    const text = shouldConvertToColor ? colorUtils.makeRgba(value) : value;
    this.option('text', text);
    return this.callBase();
  },
  _resetInputValue: function () {
    const $input = this._input();
    const value = this.option('value');
    $input.val(value);
    this._updateColorViewValue(value);
  },
  _updateColorViewValue: function (value) {
    if (this._colorView) {
      this._colorView.option({
        'value': value,
        'matchValue': value
      });
    }
  },
  _valueChangeEventHandler: function (e) {
    let value = this._input().val();
    if (value) {
      value = this._applyColorFromInput(value);
      this._updateColorViewValue(value);
    }
    this.callBase(e, value);
  },
  _applyColorFromInput: function (value) {
    const {
      editAlphaChannel
    } = this.option();
    const newColor = new _color.default(value);
    if (newColor.colorIsInvalid) {
      this._resetInputValue();
      return this.option('value');
    }
    if (editAlphaChannel) {
      return colorUtils.makeRgba(value);
    }
    return value;
  },
  _clean: function () {
    this.callBase();
    delete this._shouldSaveEmptyValue;
  },
  _optionChanged: function (args) {
    const value = args.value;
    const name = args.name;
    switch (name) {
      case 'value':
        this._$colorBoxInputContainer.toggleClass(COLOR_BOX_COLOR_IS_NOT_DEFINED, !value);
        if (value) {
          colorUtils.makeTransparentBackground(this._$colorResultPreview, value);
        } else {
          this._$colorResultPreview.removeAttr('style');
        }
        if (value === null) {
          this._shouldSaveEmptyValue = true;
        }
        this._updateColorViewValue(value);
        this._shouldSaveEmptyValue = false;
        this.callBase(args);
        break;
      case 'applyButtonText':
      case 'cancelButtonText':
        this.callBase(args);
        this._popup && this._addPopupBottomClasses();
        break;
      case 'editAlphaChannel':
      case 'keyStep':
        if (this._colorView) {
          this._colorView.option(name, value);
        }
        break;
      default:
        this.callBase(args);
    }
  }
});
(0, _component_registrator.default)('dxColorBox', ColorBox);
var _default = ColorBox;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;