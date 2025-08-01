/**
* DevExtreme (cjs/__internal/ui/html_editor/matchers/m_wordLists.js)
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
function getListType(matches) {
  const prefix = matches[1];
  return prefix.match(/\S+\./) ? 'ordered' : 'bullet';
}
function getIndent(node, msStyleAttributeName) {
  const style = node.getAttribute(msStyleAttributeName);
  if (style) {
    const level = style.replace(/\n+/g, '').match(/level(\d+)/);
    return level ? level[1] - 1 : 0;
  }
  return false;
}
function removeNewLineChar(operations) {
  const newLineOperation = operations[operations.length - 1];
  newLineOperation.insert = newLineOperation.insert.trim();
}
const getMatcher = quill => {
  const Delta = quill.import('delta');
  const msStyleAttributeName = quill.MS_LIST_DATA_KEY;
  return (node, delta) => {
    const ops = delta.ops.slice();
    const insertOperation = ops[0];
    if (!(0, _type.isString)(insertOperation.insert)) {
      return delta;
    }
    insertOperation.insert = insertOperation.insert.replace(/^\s+/, '');
    const listDecoratorMatches = insertOperation.insert.match(/^(\S+)\s+/);
    const indent = listDecoratorMatches && getIndent(node, msStyleAttributeName);
    if (!listDecoratorMatches || indent === false) {
      return delta;
    }
    insertOperation.insert = insertOperation.insert.substring(listDecoratorMatches[0].length, insertOperation.insert.length);
    removeNewLineChar(ops);
    ops.push({
      insert: '\n',
      attributes: {
        list: getListType(listDecoratorMatches),
        indent
      }
    });
    return new Delta(ops);
  };
};
var _default = exports.default = getMatcher;
