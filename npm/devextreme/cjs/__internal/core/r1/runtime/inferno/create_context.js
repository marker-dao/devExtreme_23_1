/**
* DevExtreme (cjs/__internal/core/r1/runtime/inferno/create_context.js)
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
exports.createContext = void 0;
var _inferno = require("inferno");
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-plusplus */

let contextId = 0;
const createContext = function (defaultValue) {
  const id = contextId++;
  return {
    id,
    defaultValue,
    Provider: class extends _inferno.Component {
      getChildContext() {
        return Object.assign({}, this.context, {
          [id]: this.props.value || defaultValue
        });
      }
      render() {
        return this.props.children;
      }
    }
  };
};
exports.createContext = createContext;
