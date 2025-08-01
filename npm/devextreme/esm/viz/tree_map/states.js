/**
* DevExtreme (esm/viz/tree_map/states.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import TreeMapBase from './tree_map.base';
import Node from './node';
import { noop } from '../../core/utils/common';
const proto = TreeMapBase.prototype;
const nodeProto = Node.prototype;
const handlers = proto._handlers;
const _calculateState = handlers.calculateState;
const _buildState = nodeProto._buildState;
import { extend as _extend } from '../../core/utils/extend';
handlers.calculateState = function (options) {
  const states = {
    0: _calculateState(options)
  };
  handlers.calculateAdditionalStates(states, options);
  return states;
};
handlers.calculateAdditionalStates = noop;
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
    states[list[i]] = _extend({}, base, source[list[i]]);
  }
}
