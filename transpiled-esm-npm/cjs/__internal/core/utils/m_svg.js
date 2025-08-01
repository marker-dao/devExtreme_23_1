"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.HIDDEN_FOR_EXPORT = void 0;
exports.getSvgElement = getSvgElement;
exports.getSvgMarkup = getSvgMarkup;
var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _type = require("../../../core/utils/type");
var _window = require("../../../core/utils/window");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const window = (0, _window.getWindow)();
function getMarkup(element, backgroundColor) {
  const clone = element.cloneNode(true);
  const serializer = new XMLSerializer();
  if (backgroundColor) {
    (0, _renderer.default)(clone).css('backgroundColor', backgroundColor);
  }
  return serializer.serializeToString(clone);
}
function fixNamespaces(markup) {
  if (markup.indexOf('xmlns:xlink') === -1) {
    markup = markup.replace('<svg', '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
  }
  return markup.replace(/xmlns:NS1="[\s\S]*?"/gi, '').replace(/NS1:xmlns:xlink="([\s\S]*?)"/gi, 'xmlns:xlink="$1"');
}
// T428345 we decode only restricted HTML entities, looks like other entities do not cause problems
// as they presented as symbols itself, not named entities
function decodeHtmlEntities(markup) {
  return markup.replace(/&quot;/gi, '&#34;').replace(/&amp;/gi, '&#38;').replace(/&apos;/gi, '&#39;').replace(/&lt;/gi, '&#60;').replace(/&gt;/gi, '&#62;').replace(/&nbsp;/gi, '&#160;').replace(/\u00A0/g, '&#160;').replace(/&shy;/gi, '&#173;').replace(/\u00AD/g, '&#173;');
}
const HIDDEN_FOR_EXPORT = exports.HIDDEN_FOR_EXPORT = 'hidden-for-export';
function getSvgMarkup(element, backgroundColor) {
  return fixNamespaces(decodeHtmlEntities(getMarkup(element, backgroundColor)));
}
function getSvgElement(markup) {
  if ((0, _type.isString)(markup)) {
    // @ts-expect-error DOMParser do not exist in std window type
    const parsedMarkup = new window.DOMParser().parseFromString(markup, 'image/svg+xml').childNodes[0];
    return parsedMarkup;
  }
  if (_dom_adapter.default.isNode(markup)) {
    return markup;
  }
  if ((0, _type.isRenderer)(markup)) {
    return markup.get(0);
  }
}
var _default = exports.default = {
  getSvgElement,
  getSvgMarkup,
  HIDDEN_FOR_EXPORT
};