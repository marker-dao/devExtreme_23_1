/**
* DevExtreme (esm/__internal/common/m_charts.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { getNextDefsSvgId } from '../viz/core/utils';
const graphicObjects = {};
export const registerPattern = options => {
  const id = getNextDefsSvgId();
  graphicObjects[id] = Object.assign({
    type: 'pattern'
  }, options);
  return id;
};
export const registerGradient = (type, options) => {
  const id = getNextDefsSvgId();
  graphicObjects[id] = Object.assign({
    type
  }, options);
  return id;
};
const getGraphicObjects = () => graphicObjects;
export default {
  getGraphicObjects
};
