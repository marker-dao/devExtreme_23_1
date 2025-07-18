/**
* DevExtreme (cjs/__internal/grids/new/grid_core/core/events/utils.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eventUtils = void 0;
const markIgnored = event => {
  event.dxIgnore = true;
};
const markHandled = event => {
  event.dxHandled = true;
};
const eventUtils = exports.eventUtils = {
  markHandled,
  markIgnored
};
