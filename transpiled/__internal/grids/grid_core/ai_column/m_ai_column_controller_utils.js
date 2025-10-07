"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAiCommandColumnOptions = void 0;
var _const = require("./const");
const getAiCommandColumnOptions = () => ({
  type: _const.AI_COLUMN_NAME,
  command: _const.AI_COLUMN_NAME,
  cssClass: _const.CLASSES.aiColumn,
  fixed: false
});
exports.getAiCommandColumnOptions = getAiCommandColumnOptions;