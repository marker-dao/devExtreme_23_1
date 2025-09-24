"use strict";

var _common = require("../../../core/utils/common");
var _extend2 = require("../../../core/utils/extend");
var _node = _interopRequireDefault(require("../../viz/tree_map/node"));
var _tree_map = _interopRequireDefault(require("../../viz/tree_map/tree_map.base"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable no-bitwise */
/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable no-plusplus */
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const proto = _tree_map.default.prototype;
const nodeProto = _node.default.prototype;
const handlers = proto._handlers;
const _calculateState = handlers.calculateState;
const {
  _buildState
} = nodeProto;
handlers.calculateState = function (options) {
  const states = {
    0: _calculateState(options)
  };
  handlers.calculateAdditionalStates(states, options);
  return states;
};
handlers.calculateAdditionalStates = _common.noop;
nodeProto.code = 0;
nodeProto.statesMap = {
  0: 0
};
nodeProto.additionalStates = [];
nodeProto._buildState = function (state, extra) {
  const states = {
    0: _buildState(state[0], extra)
  };
  if (this.additionalStates.length) {
    buildAdditionalStates(states, states[0], state, this.additionalStates);
  }
  return states;
};
nodeProto._getState = function () {
  return this.state[this.statesMap[this.code]];
};
nodeProto.setState = function (code, state) {
  if (state) {
    this.code |= code;
  } else {
    this.code &= ~code;
  }
  this.ctx.change(['TILES']);
};
function buildAdditionalStates(states, base, source, list) {
  let i;
  const ii = list.length;
  for (i = 0; i < ii; ++i) {
    states[list[i]] = (0, _extend2.extend)({}, base, source[list[i]]);
  }
}