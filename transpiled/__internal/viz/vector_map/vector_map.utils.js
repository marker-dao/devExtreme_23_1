"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateDataKey = generateDataKey;
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
let nextDataKey = 1;
function generateDataKey() {
  return `vectormap-data-${nextDataKey++}`;
}
/// #DEBUG
exports._TESTS_resetDataKey = function () {
  nextDataKey = 1;
};
/// #ENDDEBUG