/**
* DevExtreme (renovation/component_wrapper/common/mutations_recording.js)
* Version: 23.1.3
* Build date: Thu Jun 08 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.recordMutations = recordMutations;
function isChildNode(node) {
  return typeof node.remove === 'function';
}
function revertMutation(_ref) {
  var addedNodes = _ref.addedNodes,
    type = _ref.type;
  switch (type) {
    case 'childList':
      addedNodes.forEach(function (n) {
        return isChildNode(n) && n.remove();
      });
      break;
    default:
      break;
  }
}
function recordMutations(target, func) {
  var observer = new MutationObserver(function () {});
  observer.observe(target, {
    childList: true,
    subtree: false
  });
  func();
  var mutations = observer.takeRecords();
  observer.disconnect();
  return function () {
    return mutations.forEach(revertMutation);
  };
}
