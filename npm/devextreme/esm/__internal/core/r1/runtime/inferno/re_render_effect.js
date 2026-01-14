/**
* DevExtreme (esm/__internal/core/r1/runtime/inferno/re_render_effect.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable spellcheck/spell-checker */
import { rerender as reRender } from 'inferno';
import { InfernoEffect } from './effect';
export const createReRenderEffect = () => new InfernoEffect(() => {
  reRender();
}, []);
