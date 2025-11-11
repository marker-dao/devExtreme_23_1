/**
* DevExtreme (esm/__internal/scheduler/view_model/generate_view_model/options/get_collector_size.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
const DEFAULT_COLLECTOR_HEIGHT = 20;
const MIN_COLLECTOR_SIZE = 20;
const getPxValue = function () {
  let value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  let defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  if (!value.endsWith('px')) {
    return defaultValue;
  }
  return parseInt(value, 10) || defaultValue;
};
export const getCollectorSize = (cellSize, collectorCSS, defaultCollectorWidth) => {
  const parsedSize = {
    height: getPxValue(collectorCSS.height, DEFAULT_COLLECTOR_HEIGHT),
    width: getPxValue(collectorCSS.width, defaultCollectorWidth),
    marginRight: getPxValue(collectorCSS.marginRight),
    marginLeft: getPxValue(collectorCSS.marginLeft),
    marginTop: getPxValue(collectorCSS.marginTop),
    marginBottom: getPxValue(collectorCSS.marginBottom)
  };
  const marginHeight = parsedSize.marginTop + parsedSize.marginBottom;
  const marginWidth = parsedSize.marginLeft + parsedSize.marginRight;
  const height = Math.max(MIN_COLLECTOR_SIZE, parsedSize.height);
  const width = Math.max(MIN_COLLECTOR_SIZE, parsedSize.width || cellSize.width - marginWidth);
  return {
    collectorSize: {
      width,
      height
    },
    collectorWithMarginsSize: {
      width: width + marginWidth,
      height: height + marginHeight
    }
  };
};
