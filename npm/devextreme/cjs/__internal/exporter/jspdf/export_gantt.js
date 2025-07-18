/**
* DevExtreme (cjs/__internal/exporter/jspdf/export_gantt.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
