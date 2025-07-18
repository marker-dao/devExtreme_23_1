/**
* DevExtreme (esm/__internal/core/utils/m_html_parser.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import domAdapter from '../../../core/dom_adapter';
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
export const parseHTML = function (html) {
  if (typeof html !== 'string') {
    return null;
  }
  const fragment = domAdapter.createDocumentFragment();
  let container = fragment.appendChild(domAdapter.createElement('div'));
  const tags = isTagName.exec(html);
  const firstRootTag = tags === null || tags === void 0 ? void 0 : tags[1].toLowerCase();
  const tagWrapper = tagWrappers[firstRootTag] || tagWrappers.default;
  container.innerHTML = tagWrapper.startTags + html + tagWrapper.endTags;
  for (let i = 0; i < tagWrapper.tagsCount; i++) {
    container = container.lastChild;
  }
  return [...container.childNodes];
};
export const isTablePart = function (html) {
  const tags = isTagName.exec(html);
  return tags && tags[1] in tagWrappers;
};
