/**
* DevExtreme (cjs/__internal/viz/core/themes/generic/softblue.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const ACCENT_COLOR = '#7ab8eb';
const BACKGROUND_COLOR = '#fff';
const TITLE_COLOR = '#333';
const SUBTITLE_COLOR = '#99a1a8';
const TEXT_COLOR = '#707070';
const BORDER_COLOR = '#e8eaeb';
var _default = exports.default = [{
  baseThemeName: 'generic.light',
  theme: {
    name: 'generic.softblue',
    defaultPalette: 'Soft Blue',
    backgroundColor: BACKGROUND_COLOR,
    primaryTitleColor: TITLE_COLOR,
    secondaryTitleColor: SUBTITLE_COLOR,
    gridColor: BORDER_COLOR,
    axisColor: TEXT_COLOR,
    export: {
      backgroundColor: BACKGROUND_COLOR,
      font: {
        color: TITLE_COLOR
      },
      button: {
        default: {
          color: TITLE_COLOR,
          borderColor: '#c9d0d4',
          backgroundColor: BACKGROUND_COLOR
        },
        hover: {
          color: TITLE_COLOR,
          borderColor: '#a7b2b9',
          backgroundColor: '#e6e6e6'
        },
        focus: {
          color: TITLE_COLOR,
          borderColor: '#82929b',
          backgroundColor: '#e6e6e6'
        },
        active: {
          color: TITLE_COLOR,
          borderColor: '#82929b',
          backgroundColor: '#d4d4d4'
        }
      }
    },
    legend: {
      font: {
        color: TEXT_COLOR
      }
    },
    tooltip: {
      color: BACKGROUND_COLOR,
      border: {
        color: BORDER_COLOR
      },
      font: {
        color: TITLE_COLOR
      }
    },
    'chart:common': {
      commonSeriesSettings: {
        label: {
          border: {
            color: BORDER_COLOR
          }
        }
      }
    },
    'chart:common:annotation': {
      color: BACKGROUND_COLOR,
      border: {
        color: BORDER_COLOR
      },
      font: {
        color: TITLE_COLOR
      }
    },
    chart: {
      commonPaneSettings: {
        border: {
          color: BORDER_COLOR
        }
      },
      commonAxisSettings: {
        breakStyle: {
          color: '#cfd2d3'
        }
      }
    },
    rangeSelector: {
      scale: {
        breakStyle: {
          color: '#cfd2d3'
        },
        tick: {
          opacity: 0.12
        }
      },
      selectedRangeColor: ACCENT_COLOR,
      sliderMarker: {
        color: ACCENT_COLOR
      },
      sliderHandle: {
        color: ACCENT_COLOR,
        opacity: 0.5
      }
    },
    sparkline: {
      pointColor: BACKGROUND_COLOR,
      minColor: '#f0ad4e',
      maxColor: '#d9534f'
    },
    treeMap: {
      group: {
        color: BORDER_COLOR,
        label: {
          font: {
            color: SUBTITLE_COLOR
          }
        }
      }
    },
    bullet: {
      color: ACCENT_COLOR
    },
    gauge: {
      valueIndicators: {
        rangebar: {
          color: ACCENT_COLOR
        },
        // eslint-disable-next-line spellcheck/spell-checker
        textcloud: {
          color: ACCENT_COLOR
        }
      }
    }
  }
}, {
  baseThemeName: 'generic.softblue',
  theme: {
    name: 'generic.softblue.compact'
  }
}];
