/**
* DevExtreme (esm/__internal/core/r1/runtime/inferno/create_context.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-plusplus */
import { Component } from 'inferno';
let contextId = 0;
export const createContext = function (defaultValue) {
  const id = contextId++;
  return {
    id,
    defaultValue,
    Provider: class extends Component {
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
