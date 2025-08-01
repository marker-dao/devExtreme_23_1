/**
* DevExtreme (esm/__internal/core/license/trial_panel.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isClient, registerCustomComponents, renderTrialPanel } from './trial_panel.client';
export function showTrialPanel(buyNowUrl, licensingDocUrl, version, customStyles) {
  if (isClient()) {
    renderTrialPanel(buyNowUrl, licensingDocUrl, version, customStyles);
  }
}
export function registerTrialPanelComponents(customStyles) {
  if (isClient()) {
    registerCustomComponents(customStyles);
  }
}
