/**
* DevExtreme (cjs/__internal/ui/html_editor/formats/m_image.js)
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
var _type = require("../../../../core/utils/type");
var _devextremeQuill = _interopRequireDefault(require("devextreme-quill"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line import/no-mutable-exports
let ExtImage = {};
if (_devextremeQuill.default) {
  const Image = _devextremeQuill.default.import('formats/image');
  ExtImage = class ExtImage extends Image {
    static create(data) {
      const SRC = data && data.src || data;
      const node = super.create(SRC);
      if ((0, _type.isObject)(data)) {
        const setAttribute = (attr, value) => {
          data[attr] && node.setAttribute(attr, value);
        };
        // @ts-expect-error
        setAttribute('alt', data.alt);
        // @ts-expect-error
        setAttribute('width', data.width);
        // @ts-expect-error
        setAttribute('height', data.height);
      }
      return node;
    }
    static formats(domNode) {
      const formats = super.formats(domNode);
      formats.imageSrc = domNode.getAttribute('src');
      return formats;
    }
    formats() {
      const formats = super.formats();
      const floatValue = this.domNode.style.float;
      if (floatValue) {
        formats.float = floatValue;
      }
      return formats;
    }
    format(name, value) {
      if (name === 'float') {
        this.domNode.style[name] = value;
      } else {
        super.format(name, value);
      }
    }
    static value(domNode) {
      return {
        src: domNode.getAttribute('src'),
        width: domNode.getAttribute('width'),
        height: domNode.getAttribute('height'),
        alt: domNode.getAttribute('alt')
      };
    }
  };
  // @ts-expect-error
  ExtImage.blotName = 'extendedImage';
}
var _default = exports.default = ExtImage;
