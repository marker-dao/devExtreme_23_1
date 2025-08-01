/**
* DevExtreme (cjs/__internal/ui/html_editor/modules/m_imageCursor.js)
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
var _events_engine = _interopRequireDefault(require("../../../../common/core/events/core/events_engine"));
var _index = require("../../../../common/core/events/utils/index");
var _devextremeQuill = _interopRequireDefault(require("devextreme-quill"));
var _m_base = _interopRequireDefault(require("./m_base"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const MODULE_NAMESPACE = 'dxHtmlEditorImageCursor';
const clickEvent = (0, _index.addNamespace)('dxclick', MODULE_NAMESPACE);
// eslint-disable-next-line import/no-mutable-exports
let ImageCursorModule = _m_base.default;
if (_devextremeQuill.default) {
  // @ts-expect-error
  ImageCursorModule = class ImageCursorModule extends _m_base.default {
    constructor(quill, options) {
      // @ts-expect-error
      super(quill, options);
      // @ts-expect-error
      this.addCleanCallback(this.clean.bind(this));
      this._attachEvents();
    }
    _attachEvents() {
      _events_engine.default.on(this.quill.root, clickEvent, this._clickHandler.bind(this));
    }
    _detachEvents() {
      _events_engine.default.off(this.quill.root, clickEvent);
    }
    _clickHandler(e) {
      if (this._isAllowedTarget(e.target)) {
        this._adjustSelection(e);
      }
    }
    _isAllowedTarget(targetElement) {
      return this._isImage(targetElement);
    }
    _isImage(targetElement) {
      return targetElement.tagName.toUpperCase() === 'IMG';
    }
    _adjustSelection(e) {
      const blot = this.quill.scroll.find(e.target);
      if (blot) {
        const index = blot.offset(this.quill.scroll);
        this.quill.setSelection(index + 1, 0);
      } else {
        this.quill.setSelection(0, 0);
      }
    }
    clean() {
      this._detachEvents();
    }
  };
}
var _default = exports.default = ImageCursorModule;
