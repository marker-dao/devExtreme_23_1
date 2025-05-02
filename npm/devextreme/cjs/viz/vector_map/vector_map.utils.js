/**
* DevExtreme (cjs/viz/vector_map/vector_map.utils.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.generateDataKey = generateDataKey;
let nextDataKey = 1;
function generateDataKey() {
  return 'vectormap-data-' + nextDataKey++;
}
