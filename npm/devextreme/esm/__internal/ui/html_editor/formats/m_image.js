/**
* DevExtreme (esm/__internal/ui/html_editor/formats/m_image.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isObject } from '../../../../core/utils/type';
import Quill from 'devextreme-quill';
// eslint-disable-next-line import/no-mutable-exports
let ExtImage = {};
if (Quill) {
  const Image = Quill.import('formats/image');
  ExtImage = class ExtImage extends Image {
    static create(data) {
      const SRC = data && data.src || data;
      const node = super.create(SRC);
      if (isObject(data)) {
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
export default ExtImage;
