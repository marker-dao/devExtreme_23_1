/**
* DevExtreme (cjs/exporter/jspdf/export_gantt.js)
* Version: 23.2.2
* Build date: Mon Nov 20 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.exportGantt = exportGantt;
function exportGantt(options) {
  const component = options.component;
  return component === null || component === void 0 ? void 0 : component.exportToPdf(options);
}