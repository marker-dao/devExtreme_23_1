/**
* DevExtreme (esm/__internal/viz/vector_map/vector_map.utils.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
let nextDataKey = 1;
export function generateDataKey() {
  return `vectormap-data-${nextDataKey++}`;
}
