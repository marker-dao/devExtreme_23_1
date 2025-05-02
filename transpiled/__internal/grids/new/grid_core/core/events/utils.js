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