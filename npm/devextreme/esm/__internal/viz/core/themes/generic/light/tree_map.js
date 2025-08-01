/**
* DevExtreme (esm/__internal/viz/core/themes/generic/light/tree_map.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { SECONDARY_TITLE_COLOR } from './contants';
export default {
  treeMap: {
    tile: {
      border: {
        width: 1,
        opacity: 0.2,
        color: '#000000'
      },
      color: '#5f8b95',
      hoverStyle: {
        hatching: {
          opacity: 0.75,
          step: 6,
          width: 2,
          direction: 'right'
        },
        border: {}
      },
      selectionStyle: {
        hatching: {
          opacity: 0.5,
          step: 6,
          width: 2,
          direction: 'right'
        },
        border: {
          opacity: 1
        }
      },
      label: {
        visible: true,
        paddingLeftRight: 5,
        paddingTopBottom: 4,
        font: {
          color: '#ffffff',
          weight: 600
        },
        shadow: {
          opacity: 0.6,
          offsetX: 0,
          offsetY: 1,
          blur: 2,
          color: '#000000'
        },
        wordWrap: 'normal',
        textOverflow: 'ellipsis'
      }
    },
    group: {
      padding: 4,
      border: {
        width: 1
      },
      color: '#eeeeee',
      hoverStyle: {
        hatching: {
          opacity: 0,
          step: 6,
          width: 2,
          direction: 'right'
        },
        border: {}
      },
      selectionStyle: {
        hatching: {
          opacity: 0,
          step: 6,
          width: 2,
          direction: 'right'
        },
        border: {}
      },
      label: {
        visible: true,
        paddingLeftRight: 5,
        paddingTopBottom: 4,
        font: {
          color: SECONDARY_TITLE_COLOR,
          weight: 600
        },
        textOverflow: 'ellipsis'
      }
    },
    title: {
      subtitle: {}
    },
    tooltip: {},
    loadingIndicator: {}
  }
};
