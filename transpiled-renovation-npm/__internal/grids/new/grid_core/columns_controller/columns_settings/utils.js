"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isCorrectColumnIdx = exports.isAllowedColumnValue = exports.getColumnOptionPathStr = exports.getColumnIdxFromPath = void 0;
var _type = require("../../../../../../core/utils/type");
const isAllowedColumnValue = value => (0, _type.isObject)(value) || typeof value === 'string';
exports.isAllowedColumnValue = isAllowedColumnValue;
const isCorrectColumnIdx = pathIdx => !isNaN(+pathIdx) && pathIdx !== null;
exports.isCorrectColumnIdx = isCorrectColumnIdx;
const getColumnIdxFromPath = path => +path[1];
exports.getColumnIdxFromPath = getColumnIdxFromPath;
const getColumnOptionPathStr = path => [...path].splice(2).join('.');
exports.getColumnOptionPathStr = getColumnOptionPathStr;