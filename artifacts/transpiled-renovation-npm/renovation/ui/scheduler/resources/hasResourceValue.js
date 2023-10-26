"use strict";

exports.hasResourceValue = void 0;
var _type = require("../../../../core/utils/type");
var _common = require("../../../../core/utils/common");
const hasResourceValue = (resourceValues, itemValue) => (0, _type.isDefined)(resourceValues.find(value => (0, _common.equalByValue)(value, itemValue)));
exports.hasResourceValue = hasResourceValue;