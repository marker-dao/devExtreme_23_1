/**
* DevExtreme (cjs/ui/scheduler/expressionUtils.js)
* Version: 23.2.0
* Build date: Thu Jun 29 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.ExpressionUtils = void 0;
var _type = require("../../core/utils/type");
var ExpressionUtils = {
  getField: function getField(dataAccessors, field, obj) {
    if (!(0, _type.isDefined)(dataAccessors.getter[field])) {
      return;
    }
    return dataAccessors.getter[field](obj);
  },
  setField: function setField(dataAccessors, field, obj, value) {
    if (!(0, _type.isDefined)(dataAccessors.setter[field])) {
      return;
    }
    dataAccessors.setter[field](obj, value);
    return obj;
  }
};
exports.ExpressionUtils = ExpressionUtils;
