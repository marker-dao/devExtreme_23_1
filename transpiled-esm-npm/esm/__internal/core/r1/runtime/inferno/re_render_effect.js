/* eslint-disable spellcheck/spell-checker */
import { rerender as reRender } from 'inferno';
import { InfernoEffect } from './effect';
export const createReRenderEffect = () => new InfernoEffect(() => {
  reRender();
}, []);