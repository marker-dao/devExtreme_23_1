"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getClosestNodeWithKoCreation = exports.getClosestNodeWithContext = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _knockout = _interopRequireDefault(require("knockout"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line import/no-extraneous-dependencies

// eslint-disable-next-line @stylistic/max-len
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/explicit-function-return-type
const getClosestNodeWithContext = node => {
  const context = _knockout.default.contextFor(node);
  if (!context && node.parentNode) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return getClosestNodeWithContext(node.parentNode);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return node;
};
// eslint-disable-next-line @stylistic/max-len
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/explicit-function-return-type
exports.getClosestNodeWithContext = getClosestNodeWithContext;
const getClosestNodeWithKoCreation = node => {
  const $el = (0, _renderer.default)(node);
  // @ts-expect-error
  const data = $el.data();
  // @ts-expect-error
  const hasFlag = data === null || data === void 0 ? void 0 : data.dxKoCreation;
  if (hasFlag) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return node;
  }
  if (node.parentNode) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return getClosestNodeWithKoCreation(node.parentNode);
  }
  return null;
};
exports.getClosestNodeWithKoCreation = getClosestNodeWithKoCreation;