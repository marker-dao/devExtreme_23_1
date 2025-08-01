/**
* DevExtreme (esm/__internal/viz/core/themes/generic/light/sankey.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { BLACK, CENTER, RIGHT, WHITE } from './contants';
export default {
  sankey: {
    sourceField: 'source',
    targetField: 'target',
    weightField: 'weight',
    hoverEnabled: true,
    alignment: CENTER,
    adaptiveLayout: {
      width: 80,
      height: 80,
      keepLabels: true
    },
    label: {
      visible: true,
      horizontalOffset: 8,
      verticalOffset: 0,
      overlappingBehavior: 'ellipsis',
      useNodeColors: false,
      font: {
        color: BLACK,
        weight: 500
      },
      border: {
        visible: false,
        width: 2,
        color: WHITE
      },
      customizeText(info) {
        return info.label;
      },
      shadow: {
        opacity: 0.2,
        offsetX: 0,
        offsetY: 1,
        blur: 1,
        color: WHITE
      }
    },
    title: {
      margin: 10,
      font: {
        size: 28,
        weight: 200
      },
      subtitle: {
        font: {
          size: 16
        }
      }
    },
    tooltip: {
      enabled: true
    },
    node: {
      padding: 30,
      width: 8,
      opacity: 1,
      border: {
        color: WHITE,
        width: 1,
        visible: false
      },
      hoverStyle: {
        hatching: {
          opacity: 0.75,
          step: 6,
          width: 2,
          direction: RIGHT
        },
        border: {}
      }
    },
    link: {
      color: '#888888',
      colorMode: 'none',
      opacity: 0.3,
      border: {
        color: WHITE,
        width: 1,
        visible: false
      },
      hoverStyle: {
        opacity: 0.5,
        hatching: {
          opacity: 0.75,
          step: 6,
          width: 2,
          direction: RIGHT
        },
        border: {}
      }
    }
  }
};
