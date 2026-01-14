/**
* DevExtreme (cjs/__internal/core/r1/runtime/inferno/re_render_effect.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createReRenderEffect = void 0;
var _inferno = require("inferno");
var _effect = require("./effect");
/* eslint-disable spellcheck/spell-checker */

const createReRenderEffect = () => new _effect.InfernoEffect(() => {
  (0, _inferno.rerender)();
}, []);
exports.createReRenderEffect = createReRenderEffect;
