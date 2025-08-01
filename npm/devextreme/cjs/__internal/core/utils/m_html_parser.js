/**
* DevExtreme (cjs/__internal/core/utils/m_html_parser.js)
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
exports.parseHTML = exports.isTablePart = void 0;
var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const isTagName = /<([a-z][^/\0>\x20\t\r\n\f]+)/i;
const tagWrappers = {
  default: {
    tagsCount: 0,
    startTags: '',
    endTags: ''
  },
  thead: {
    tagsCount: 1,
    startTags: '<table>',
    endTags: '</table>'
  },
  td: {
    tagsCount: 3,
    startTags: '<table><tbody><tr>',
    endTags: '</tr></tbody></table>'
  },
  col: {
    tagsCount: 2,
    startTags: '<table><colgroup>',
    endTags: '</colgroup></table>'
  },
  tr: {
    tagsCount: 2,
    startTags: '<table><tbody>',
    endTags: '</tbody></table>'
  }
};
tagWrappers.tbody = tagWrappers.colgroup = tagWrappers.caption = tagWrappers.tfoot = tagWrappers.thead;
tagWrappers.th = tagWrappers.td;
const parseHTML = function (html) {
  if (typeof html !== 'string') {
    return null;
  }
  const fragment = _dom_adapter.default.createDocumentFragment();
  let container = fragment.appendChild(_dom_adapter.default.createElement('div'));
  const tags = isTagName.exec(html);
  const firstRootTag = tags === null || tags === void 0 ? void 0 : tags[1].toLowerCase();
  const tagWrapper = tagWrappers[firstRootTag] || tagWrappers.default;
  container.innerHTML = tagWrapper.startTags + html + tagWrapper.endTags;
  for (let i = 0; i < tagWrapper.tagsCount; i++) {
    container = container.lastChild;
  }
  return [...container.childNodes];
};
exports.parseHTML = parseHTML;
const isTablePart = function (html) {
  const tags = isTagName.exec(html);
  return tags && tags[1] in tagWrappers;
};
exports.isTablePart = isTablePart;
