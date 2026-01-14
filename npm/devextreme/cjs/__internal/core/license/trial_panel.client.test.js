/**
* DevExtreme (cjs/__internal/core/license/trial_panel.client.test.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _trial_panel = require("./trial_panel.client");
/**
 * @jest-environment jsdom
 */

(0, _globals.describe)('trial panel client', () => {
  (0, _globals.beforeEach)(() => {
    document.body.innerHTML = '';
  });
  (0, _globals.it)('should not display subscription text when subscriptions parameter is empty string', () => {
    (0, _trial_panel.renderTrialPanel)('https://example.com/buy', 'https://example.com/docs', '25.2.0', '');
    const triggerElement = document.querySelector('dx-license-trigger');
    (0, _globals.expect)(triggerElement).not.toBeNull();
    const panelElement = document.querySelector('dx-license');
    if (panelElement) {
      const text = panelElement.textContent ?? '';
      (0, _globals.expect)(text).not.toContain('Included in Subscriptions:');
    }
  });
  (0, _globals.it)('should set subscriptions attribute when parameter is a valid string', () => {
    (0, _trial_panel.renderTrialPanel)('https://example.com/buy', 'https://example.com/docs', '25.2.0', 'Universal, DXperience');
    const triggerElement = document.querySelector('dx-license-trigger');
    (0, _globals.expect)(triggerElement).not.toBeNull();
    const subscriptionsAttr = triggerElement === null || triggerElement === void 0 ? void 0 : triggerElement.getAttribute('subscriptions');
    (0, _globals.expect)(subscriptionsAttr).toBe('Universal, DXperience');
  });
  (0, _globals.it)('should not display subscription text when subscriptions parameter is actual null', () => {
    (0, _trial_panel.renderTrialPanel)('https://example.com/buy', 'https://example.com/docs', '25.2.0', null);
    const triggerElement = document.querySelector('dx-license-trigger');
    (0, _globals.expect)(triggerElement).not.toBeNull();
    // When null is passed, it gets converted to string "null" as HTML attribute
    const subscriptionsAttr = triggerElement === null || triggerElement === void 0 ? void 0 : triggerElement.getAttribute('subscriptions');
    (0, _globals.expect)(subscriptionsAttr).toBe('');
    // Ensure the panel element doesn't show "Included in Subscriptions: null"
    // This is the key test - our fix should prevent displaying "null"
    const panelElement = document.querySelector('dx-license');
    if (panelElement) {
      const text = panelElement.textContent ?? '';
      (0, _globals.expect)(text).not.toContain('Included in Subscriptions: null');
    }
  });
});
