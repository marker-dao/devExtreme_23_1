/**
* DevExtreme (cjs/__internal/grids/grid_core/ai_column/ai_prompt_editor/utils.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPromptChanged = exports.getPrompt = void 0;
const getPrompt = prompt => prompt ?? '';
exports.getPrompt = getPrompt;
const isPromptChanged = (initialPrompt, currentPrompt) => getPrompt(initialPrompt) !== getPrompt(currentPrompt);
exports.isPromptChanged = isPromptChanged;
