/**
* DevExtreme (cjs/__internal/ui/drop_down_editor/m_drop_down_button.js)
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
    const {
      editor
    } = this;
    instance.option('onClick', e => {
      var _editor$_shouldCallOp;
      // @ts-expect-error
      if ((_editor$_shouldCallOp = editor._shouldCallOpenHandler) !== null && _editor$_shouldCallOp !== void 0 && _editor$_shouldCallOp.call(editor)) {
        // @ts-expect-error
        editor._openHandler(e);
        return;
      }
      // @ts-expect-error
      !editor.option('openOnFieldClick') && editor._openHandler(e);
    });
    _events_engine.default.on(instance.$element(), 'mousedown', e => {
      if (editor.$element().is('.dx-state-focused')) {
        e.preventDefault();
      }
    });
  }
  _create() {
    const {
      editor
    } = this;
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
    const isReadOnly = editor.option('readOnly');
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
    return super._isVisible() && editor.option('showDropDownButton');
  }
  // TODO: get rid of it
  _legacyRender($editor, $element, isVisible) {
    $editor.toggleClass(DROP_DOWN_EDITOR_BUTTON_VISIBLE, isVisible);
    if ($element) {
      $element.removeClass('dx-button').removeClass('dx-button-mode-contained').addClass(DROP_DOWN_EDITOR_BUTTON_CLASS);
    }
  }
  _isSameTemplate() {
    return this.editor.option('dropDownButtonTemplate') === this.currentTemplate;
  }
  _addTemplate(options) {
    if (!this._isSameTemplate()) {
      options.template = this.editor._getTemplateByOption('dropDownButtonTemplate');
      this.currentTemplate = this.editor.option('dropDownButtonTemplate');
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
      const $editor = editor.$element();
      const options = this._getOptions();
      // @ts-expect-error
      instance === null || instance === void 0 || instance.option(options);
      this._legacyRender($editor, instance === null || instance === void 0 ? void 0 : instance.$element(), options.visible);
    }
  }
}
exports.default = DropDownButton;
