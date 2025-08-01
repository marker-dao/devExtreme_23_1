/**
* DevExtreme (cjs/__internal/grids/new/grid_core/keyboard_navigation/const.js)
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
exports.ALL_FOCUSABLE_ELEMENTS_SELECTOR = void 0;
const notInert = ':not([inert]):not([inert] *)';
const notNegTabIndex = ':not([tabindex^="-"])';
const notDisabled = ':not(:disabled)';
const ALL_FOCUSABLE_ELEMENTS_SELECTOR = exports.ALL_FOCUSABLE_ELEMENTS_SELECTOR = [`a[href]${notInert}${notNegTabIndex}`, `area[href]${notInert}${notNegTabIndex}`, `input:not([type="hidden"]):not([type="radio"])${notInert}${notNegTabIndex}${notDisabled}`, `input[type="radio"]${notInert}${notNegTabIndex}${notDisabled}`, `select${notInert}${notNegTabIndex}${notDisabled}`, `textarea${notInert}${notNegTabIndex}${notDisabled}`, `button${notInert}${notNegTabIndex}${notDisabled}`, `details${notInert} > summary:first-of-type${notNegTabIndex}`, `iframe${notInert}${notNegTabIndex}`, `audio[controls]${notInert}${notNegTabIndex}`, `video[controls]${notInert}${notNegTabIndex}`, `[contenteditable]${notInert}${notNegTabIndex}`, `[tabindex]${notInert}${notNegTabIndex}`].join(',');
