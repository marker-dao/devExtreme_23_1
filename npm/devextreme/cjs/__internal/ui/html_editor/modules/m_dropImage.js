/**
* DevExtreme (cjs/__internal/ui/html_editor/modules/m_dropImage.js)
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
var _browser = _interopRequireDefault(require("../../../../core/utils/browser"));
var _iterator = require("../../../../core/utils/iterator");
var _window = require("../../../../core/utils/window");
var _devextremeQuill = _interopRequireDefault(require("devextreme-quill"));
var _m_base = _interopRequireDefault(require("./m_base"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line import/no-mutable-exports
let DropImageModule = _m_base.default;
if (_devextremeQuill.default) {
  // @ts-expect-error
  DropImageModule = class DropImageModule extends _m_base.default {
    constructor(quill, options) {
      // @ts-expect-error
      super(quill, options);
      const widgetName = this.editorInstance.NAME;
      _events_engine.default.on(this.quill.root, (0, _index.addNamespace)('drop', widgetName), this._dropHandler.bind(this));
      _events_engine.default.on(this.quill.root, (0, _index.addNamespace)('paste', widgetName), this._pasteHandler.bind(this));
    }
    _dropHandler(e) {
      var _dataTransfer$files;
      const {
        dataTransfer
      } = e.originalEvent;
      const hasFiles = dataTransfer === null || dataTransfer === void 0 || (_dataTransfer$files = dataTransfer.files) === null || _dataTransfer$files === void 0 ? void 0 : _dataTransfer$files.length;
      // @ts-expect-error
      this.saveValueChangeEvent(e);
      e.preventDefault();
      if (hasFiles) {
        this._getImage(dataTransfer.files, this._addImage.bind(this));
      }
    }
    _pasteHandler(e) {
      var _clipboardData$items;
      const {
        clipboardData
      } = e.originalEvent;
      // @ts-expect-error
      this.saveValueChangeEvent(e);
      if (!clipboardData) {
        return;
      }
      const hasDataItems = (_clipboardData$items = clipboardData.items) === null || _clipboardData$items === void 0 ? void 0 : _clipboardData$items.length;
      const isHtmlData = clipboardData.getData('text/html');
      if (!isHtmlData && hasDataItems) {
        this._getImage(clipboardData.items, imageData => {
          if (_browser.default.mozilla) {
            return;
          }
          this._addImage(imageData);
        });
      }
    }
    _isImage(file) {
      return !!file.type.match(/^image\/(a?png|bmp|gif|p?jpe?g|svg|vnd\.microsoft\.icon|webp)/i);
    }
    _getImage(files, callback) {
      const window = (0, _window.getWindow)();
      (0, _iterator.each)(files, (index, file) => {
        if (!this._isImage(file)) {
          return;
        }
        // @ts-expect-error
        const reader = new window.FileReader();
        reader.onload = _ref => {
          let {
            target
          } = _ref;
          callback(target.result);
        };
        const readableFile = file.getAsFile ? file.getAsFile() : file;
        // @ts-expect-error
        if (readableFile instanceof window.Blob) {
          reader.readAsDataURL(readableFile);
        }
      });
    }
    _addImage(data) {
      const selection = this.quill.getSelection();
      const pasteIndex = selection ? selection.index : this.quill.getLength();
      this.quill.insertEmbed(pasteIndex, 'extendedImage', data, 'user');
    }
  };
}
var _default = exports.default = DropImageModule;
