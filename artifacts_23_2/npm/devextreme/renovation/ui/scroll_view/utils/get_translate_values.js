/**
* DevExtreme (renovation/ui/scroll_view/utils/get_translate_values.js)
* Version: 23.2.2
* Build date: Mon Nov 20 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getTranslateValues = getTranslateValues;
var _get_element_style = require("./get_element_style");
function getTranslateValues(el) {
  const matrix = (0, _get_element_style.getElementTransform)(el);
  const regex = /matrix.*\((.+)\)/;
  const matrixValues = regex.exec(matrix);
  if (matrixValues) {
    const result = matrixValues[1].split(', ');
    return {
      left: Number(result[4]),
      top: Number(result[5])
    };
  }
  return {
    left: 0,
    top: 0
  };
}