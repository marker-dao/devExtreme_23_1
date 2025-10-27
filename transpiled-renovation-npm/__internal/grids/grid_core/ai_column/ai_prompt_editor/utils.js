"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPromptChanged = exports.getPrompt = void 0;
const getPrompt = prompt => prompt ?? '';
exports.getPrompt = getPrompt;
const isPromptChanged = (initialPrompt, currentPrompt) => getPrompt(initialPrompt) !== getPrompt(currentPrompt);
exports.isPromptChanged = isPromptChanged;