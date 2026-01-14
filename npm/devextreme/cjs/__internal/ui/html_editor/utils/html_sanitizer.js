/**
* DevExtreme (cjs/__internal/ui/html_editor/utils/html_sanitizer.js)
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
exports.sanitizeHtml = exports.default = exports.createNoScriptFrame = void 0;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const createNoScriptFrame = () => (0, _renderer.default)('<iframe>').css('display', 'none')
// @ts-expect-error
.attr({
  // eslint-disable-next-line spellcheck/spell-checker
  srcdoc: '',
  id: 'xss-frame',
  sandbox: 'allow-same-origin'
});
exports.createNoScriptFrame = createNoScriptFrame;
const sanitizeHtml = (quill, value) => {
  // NOTE: Script tags and inline handlers are removed to prevent XSS attacks.
  // "Blocked script execution in 'about:blank' because the document's frame is sandboxed
  // and the 'allow-scripts' permission is not set."
  // error can be logged to the console if the html value is XSS vulnerable.
  const $frame = createNoScriptFrame()
  // @ts-expect-error ts-error
  .appendTo('body');
  const frame = $frame.get(0);
  // @ts-expect-error ts-error
  const frameWindow = frame.contentWindow;
  const frameDocument = frameWindow.document;
  const frameDocumentBody = frameDocument.body;
  // NOTE: Operations with style attribute is required
  // to prevent a 'unsafe-inline' CSP error in DOMParser.
  const valueWithoutStyles = quill.replaceStyleAttribute(value);
  frameDocumentBody.innerHTML = valueWithoutStyles;
  const removeInlineHandlers = element => {
    if (element.attributes) {
      // eslint-disable-next-line @typescript-eslint/prefer-for-of, no-plusplus
      for (let i = 0; i < element.attributes.length; i++) {
        const {
          name
        } = element.attributes[i];
        if (name.startsWith('on')) {
          element.removeAttribute(name);
        }
      }
    }
    if (element.childNodes) {
      // eslint-disable-next-line @typescript-eslint/prefer-for-of, no-plusplus
      for (let i = 0; i < element.childNodes.length; i++) {
        removeInlineHandlers(element.childNodes[i]);
      }
    }
  };
  removeInlineHandlers(frameDocumentBody);
  // NOTE: Do not use jQuery to prevent an excess "Blocked script execution" error in Safari.
  frameDocumentBody.querySelectorAll('script').forEach(scriptNode => {
    scriptNode.remove();
  });
  const sanitizedHtml = frameDocumentBody.innerHTML;
  $frame.remove();
  return sanitizedHtml;
};
exports.sanitizeHtml = sanitizeHtml;
var _default = exports.default = {
  createNoScriptFrame
};
