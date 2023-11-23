/**
* DevExtreme (esm/viz/vector_map/vector_map.utils.js)
* Version: 23.2.3
* Build date: Fri Nov 24 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
var nextDataKey = 1;
export function generateDataKey() {
  return 'vectormap-data-' + nextDataKey++;
}
