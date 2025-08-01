/**
* DevExtreme (esm/__internal/common/m_charts.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { getNextDefsSvgId } from '../../viz/core/utils';
const graphicObjects = {};
export const registerPattern = options => {
  const id = getNextDefsSvgId();
  graphicObjects[id] = _extends({
    type: 'pattern'
  }, options);
  return id;
};
export const registerGradient = (type, options) => {
  const id = getNextDefsSvgId();
  graphicObjects[id] = _extends({
    type
  }, options);
  return id;
};
const getGraphicObjects = () => graphicObjects;
export default {
  getGraphicObjects
};
