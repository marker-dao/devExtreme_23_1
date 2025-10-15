"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addCollector = void 0;
var _add_collector_by_level = require("./add_collector_by_level");
var _add_level = require("./add_level");
const addCollector = (entities, options) => {
  const step1 = (0, _add_level.addLevel)(entities, options);
  const step2 = (0, _add_collector_by_level.addCollectorByLevel)(step1, options);
  return step2;
};
exports.addCollector = addCollector;