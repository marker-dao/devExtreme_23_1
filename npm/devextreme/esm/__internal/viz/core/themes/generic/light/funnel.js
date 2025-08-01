/**
* DevExtreme (esm/__internal/viz/core/themes/generic/light/funnel.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { LEFT, LIGHT_GREY, RIGHT, SOLID, WHITE } from './contants';
export default {
  funnel: {
    sortData: true,
    valueField: 'val',
    colorField: 'color',
    argumentField: 'arg',
    hoverEnabled: true,
    selectionMode: 'single',
    item: {
      border: {
        visible: false,
        width: 2,
        color: WHITE
      },
      hoverStyle: {
        hatching: {
          opacity: 0.75,
          step: 6,
          width: 2,
          direction: RIGHT
        },
        border: {}
      },
      selectionStyle: {
        hatching: {
          opacity: 0.5,
          step: 6,
          width: 2,
          direction: RIGHT
        },
        border: {}
      }
    },
    title: {
      margin: 10
    },
    adaptiveLayout: {
      width: 80,
      height: 80,
      keepLabels: true
    },
    legend: {
      visible: false
    },
    _rtl: {
      legend: {
        itemTextPosition: LEFT
      }
    },
    tooltip: {
      customizeTooltip(info) {
        return {
          text: `${info.item.argument} ${info.valueText}`
        };
      }
    },
    inverted: false,
    algorithm: 'dynamicSlope',
    neckWidth: 0,
    neckHeight: 0,
    resolveLabelOverlapping: 'shift',
    label: {
      textOverflow: 'ellipsis',
      wordWrap: 'normal',
      visible: true,
      horizontalAlignment: RIGHT,
      horizontalOffset: 0,
      verticalOffset: 0,
      showForZeroValues: false,
      customizeText(info) {
        return `${info.item.argument} ${info.valueText}`;
      },
      position: 'columns',
      font: {
        color: WHITE
      },
      border: {
        visible: false,
        width: 1,
        color: LIGHT_GREY,
        dashStyle: SOLID
      },
      connector: {
        visible: true,
        width: 1,
        opacity: 0.5
      }
    }
  }
};
