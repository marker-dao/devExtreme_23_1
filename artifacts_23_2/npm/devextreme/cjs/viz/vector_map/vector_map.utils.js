/**
* DevExtreme (cjs/viz/vector_map/vector_map.utils.js)
* Version: 23.2.2
* Build date: Mon Nov 20 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.generateDataKey = generateDataKey;
let nextDataKey = 1;
function generateDataKey() {
  return 'vectormap-data-' + nextDataKey++;
}