"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exportGantt = exportGantt;
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
function exportGantt(options) {
  const {
    component
  } = options;
  return component === null || component === void 0 ? void 0 : component.exportToPdf(options);
}