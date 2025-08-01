/**
* DevExtreme (cjs/__internal/core/license/trial_panel.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerTrialPanelComponents = registerTrialPanelComponents;
exports.showTrialPanel = showTrialPanel;
var _trial_panel = require("./trial_panel.client");
function showTrialPanel(buyNowUrl, licensingDocUrl, version, customStyles) {
  if ((0, _trial_panel.isClient)()) {
    (0, _trial_panel.renderTrialPanel)(buyNowUrl, licensingDocUrl, version, customStyles);
  }
}
function registerTrialPanelComponents(customStyles) {
  if ((0, _trial_panel.isClient)()) {
    (0, _trial_panel.registerCustomComponents)(customStyles);
  }
}
