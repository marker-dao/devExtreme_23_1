/**
* DevExtreme (esm/__internal/viz/core/themes/generic/light/sparkline.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { WHITE } from './contants';
export default {
  sparkline: {
    lineColor: '#666666',
    lineWidth: 2,
    areaOpacity: 0.2,
    minColor: '#e8c267',
    maxColor: '#e55253',
    barPositiveColor: '#a9a9a9',
    barNegativeColor: '#d7d7d7',
    winColor: '#a9a9a9',
    lossColor: '#d7d7d7',
    firstLastColor: '#666666',
    pointSymbol: 'circle',
    pointColor: WHITE,
    pointSize: 4,
    type: 'line',
    argumentField: 'arg',
    valueField: 'val',
    winlossThreshold: 0,
    showFirstLast: true,
    showMinMax: false,
    tooltip: {
      enabled: true
    }
  }
};
