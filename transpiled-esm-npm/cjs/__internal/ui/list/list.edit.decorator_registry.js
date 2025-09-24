"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = register;
exports.registry = void 0;
const registry = exports.registry = {};
function register(option, type, decoratorClass) {
  if (!registry[option]) {
    registry[option] = {};
  }
  registry[option][type] = decoratorClass;
}