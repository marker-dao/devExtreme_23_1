/**
* DevExtreme (cjs/__internal/ui/text_box/texteditor_button_collection/m_button.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isButtonInstance = exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _button = _interopRequireDefault(require("../../../../ui/button"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const isButtonInstance = instance => instance instanceof _button.default;
exports.isButtonInstance = isButtonInstance;
class TextEditorButton {
  constructor(name, editor, options) {
    this.instance = null;
    // @ts-expect-error ts-error
    this.$container = null;
    this.$placeMarker = null;
    this.editor = editor;
    this.name = name;
    this.options = options || {};
  }
  _addPlaceMarker($container) {
    this.$placeMarker = (0, _renderer.default)('<div>').appendTo($container);
  }
  _addToContainer($element) {
    const {
      $placeMarker,
      $container
    } = this;
    if ($placeMarker) {
      $placeMarker.replaceWith($element);
    } else {
      $element.appendTo($container);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, class-methods-use-this
  _attachEvents(instance, $element) {
    throw 'Not implemented';
  }
  // eslint-disable-next-line class-methods-use-this
  _create() {
    throw 'Not implemented';
  }
  _isRendered() {
    return !!this.instance;
  }
  _isVisible() {
    const {
      editor,
      options
    } = this;
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    return options.visible || !(editor !== null && editor !== void 0 && editor.option('readOnly'));
  }
  // eslint-disable-next-line class-methods-use-this
  _isDisabled() {
    throw 'Not implemented';
  }
  _shouldRender() {
    return this._isVisible() && !this._isRendered();
  }
  dispose() {
    var _this$$placeMarker;
    const {
      instance
    } = this;
    if (instance) {
      // TODO: instance.dispose()
      if (isButtonInstance(instance)) {
        instance.dispose();
        instance.$element().remove();
        // @ts-expect-error _$element is private
        instance._$element = null;
      } else {
        instance.remove();
      }
    }
    this.instance = null;
    this.editor = null;
    // @ts-expect-error $container can be null and undefined
    this.$container = null;
    (_this$$placeMarker = this.$placeMarker) === null || _this$$placeMarker === void 0 || _this$$placeMarker.remove();
    this.$placeMarker = null;
  }
  render() {
    let $container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.$container;
    this.$container = $container;
    if (this._isVisible()) {
      const {
        instance,
        $element
      } = this._create() ?? {};
      this.instance = instance;
      this._attachEvents(instance, $element);
    } else {
      this._addPlaceMarker($container);
    }
  }
  update() {
    if (this._shouldRender()) {
      this.render();
    }
    return !!this.instance;
  }
}
exports.default = TextEditorButton;
