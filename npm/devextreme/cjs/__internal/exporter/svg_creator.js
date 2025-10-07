/**
* DevExtreme (cjs/__internal/exporter/svg_creator.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getData = getData;
exports.svgCreator = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _ajax = _interopRequireDefault(require("../../core/utils/ajax"));
var _deferred = require("../../core/utils/deferred");
var _iterator = require("../../core/utils/iterator");
var _type = require("../../core/utils/type");
var _window = require("../../core/utils/window");
var _m_svg = _interopRequireDefault(require("../core/utils/m_svg"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-dynamic-delete */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

const window = (0, _window.getWindow)();
const svgCreator = exports.svgCreator = {
  _markup: '',
  _imageArray: {},
  _imageDeferreds: [],
  _getBinaryFile(src, callback) {
    _ajax.default.sendRequest({
      url: src,
      method: 'GET',
      responseType: 'arraybuffer'
    }).done(callback).fail(() => {
      callback(false);
    });
  },
  _loadImages() {
    const that = this;
    (0, _iterator.each)(that._imageArray, src => {
      const deferred = (0, _deferred.Deferred)();
      that._imageDeferreds.push(deferred);
      that._getBinaryFile(src, response => {
        if (!response) {
          delete that._imageArray[src]; // ToDo Warning
          deferred.resolve();
          return;
        }
        let i;
        let binary = '';
        const bytes = new Uint8Array(response);
        const length = bytes.byteLength;
        for (i = 0; i < length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        that._imageArray[src] = `data:image/png;base64,${window.btoa(binary)}`;
        deferred.resolve();
      });
    });
  },
  _parseImages(element) {
    let href;
    const that = this;
    if (element.tagName === 'image') {
      href = (0, _renderer.default)(element).attr('href') || (0, _renderer.default)(element).attr('xlink:href');
      if (!that._imageArray[href]) {
        that._imageArray[href] = '';
      }
    }
    (0, _iterator.each)(element.childNodes, (_, element) => {
      that._parseImages(element);
    });
  },
  _prepareImages(svgElem) {
    this._parseImages(svgElem);
    this._loadImages();
    return _deferred.when.apply(_renderer.default, this._imageDeferreds);
  },
  getData(data, options) {
    let markup;
    const that = this;
    const xmlVersion = '<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>';
    const svgElem = _m_svg.default.getSvgElement(data);
    const $svgObject = (0, _renderer.default)(svgElem);
    $svgObject.find(`[${_m_svg.default.HIDDEN_FOR_EXPORT}]`).remove();
    markup = xmlVersion + _m_svg.default.getSvgMarkup($svgObject.get(0), options.backgroundColor);
    return that._prepareImages(svgElem).then(() => {
      (0, _iterator.each)(that._imageArray, (href, dataURI) => {
        const regexpString = `href=['|"]${href}['|"]`;
        markup = markup.replace(new RegExp(regexpString, 'gi'), `href="${dataURI}"`);
      });
      // @ts-expect-error
      return (0, _type.isFunction)(window.Blob) ? that._getBlob(markup) : that._getBase64(markup);
    });
  },
  _getBlob(markup) {
    // @ts-expect-error
    return new window.Blob([markup], {
      type: 'image/svg+xml'
    });
  },
  _getBase64(markup) {
    return window.btoa(markup);
  }
};
function getData(data, options) {
  return svgCreator.getData(data, options);
}
