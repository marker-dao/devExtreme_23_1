"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _extend = require("../../../core/utils/extend");
var _button = _interopRequireDefault(require("../../../ui/button"));
var _m_button = _interopRequireDefault(require("../text_box/texteditor_button_collection/m_button"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const DROP_DOWN_EDITOR_BUTTON_CLASS = 'dx-dropdowneditor-button';
const DROP_DOWN_EDITOR_BUTTON_VISIBLE = 'dx-dropdowneditor-button-visible';
const BUTTON_MESSAGE = 'dxDropDownEditor-selectLabel';
class DropDownButton extends _m_button.default {
  constructor(name, editor, options) {
    super(name, editor, options);
    this.currentTemplate = null;
  }
  _attachEvents(instance) {
    instance.option('onClick', e => {
      var _this$editor, _this$editor$_shouldC, _this$editor3;
      // @ts-expect-error _shouldCallOpenHandler should be typed
      if ((_this$editor = this.editor) !== null && _this$editor !== void 0 && (_this$editor$_shouldC = _this$editor._shouldCallOpenHandler) !== null && _this$editor$_shouldC !== void 0 && _this$editor$_shouldC.call(_this$editor)) {
        var _this$editor2;
        // @ts-expect-error _openHandler should be typed
        (_this$editor2 = this.editor) === null || _this$editor2 === void 0 || _this$editor2._openHandler(e);
        return;
      }
      // @ts-expect-error openOnFieldClick should be typed
      const {
        openOnFieldClick
      } = ((_this$editor3 = this.editor) === null || _this$editor3 === void 0 ? void 0 : _this$editor3.option()) ?? {};
      if (!openOnFieldClick) {
        var _this$editor4;
        // @ts-expect-error _openHandler should be typed
        (_this$editor4 = this.editor) === null || _this$editor4 === void 0 || _this$editor4._openHandler(e);
      }
    });
    _events_engine.default.on(instance.$element(), 'mousedown', e => {
      var _this$editor5;
      if ((_this$editor5 = this.editor) !== null && _this$editor5 !== void 0 && _this$editor5.$element().is('.dx-state-focused')) {
        e.preventDefault();
      }
    });
  }
  _create() {
    const {
      editor
    } = this;
    if (!editor) {
      return undefined;
    }
    const $element = (0, _renderer.default)('<div>');
    const options = this._getOptions();
    this._addToContainer($element);
    const instance = editor._createComponent($element, _button.default, (0, _extend.extend)({}, options, {
      elementAttr: {
        'aria-label': _message.default.format(BUTTON_MESSAGE)
      }
    }));
    this._legacyRender(editor.$element(), $element, options.visible);
    return {
      $element,
      instance
    };
  }
  _getOptions() {
    const {
      editor
    } = this;
    const visible = this._isVisible();
    const isReadOnly = editor === null || editor === void 0 ? void 0 : editor.option('readOnly');
    const options = {
      focusStateEnabled: false,
      hoverStateEnabled: false,
      activeStateEnabled: false,
      useInkRipple: false,
      disabled: isReadOnly,
      visible
    };
    this._addTemplate(options);
    return options;
  }
  _isVisible() {
    const {
      editor
    } = this;
    // @ts-expect-error
    return super._isVisible() && (editor === null || editor === void 0 ? void 0 : editor.option('showDropDownButton'));
  }
  // TODO: get rid of it
  _legacyRender($editor, $element, isVisible) {
    $editor.toggleClass(DROP_DOWN_EDITOR_BUTTON_VISIBLE, isVisible);
    if ($element) {
      $element.removeClass('dx-button').removeClass('dx-button-mode-contained').addClass(DROP_DOWN_EDITOR_BUTTON_CLASS);
    }
  }
  _isSameTemplate() {
    var _this$editor6;
    return ((_this$editor6 = this.editor) === null || _this$editor6 === void 0 ? void 0 : _this$editor6.option('dropDownButtonTemplate')) === this.currentTemplate;
  }
  _addTemplate(options) {
    if (!this._isSameTemplate()) {
      var _this$editor7, _this$editor8;
      options.template = (_this$editor7 = this.editor) === null || _this$editor7 === void 0 ? void 0 : _this$editor7._getTemplateByOption('dropDownButtonTemplate');
      this.currentTemplate = (_this$editor8 = this.editor) === null || _this$editor8 === void 0 ? void 0 : _this$editor8.option('dropDownButtonTemplate');
    }
  }
  // @ts-expect-error
  update() {
    const shouldUpdate = super.update();
    if (shouldUpdate) {
      const {
        editor,
        instance
      } = this;
      const $editor = editor === null || editor === void 0 ? void 0 : editor.$element();
      const options = this._getOptions();
      // @ts-expect-error
      instance === null || instance === void 0 || instance.option(options);
      this._legacyRender($editor, instance === null || instance === void 0 ? void 0 : instance.$element(), options.visible);
    }
  }
}
exports.default = DropDownButton;