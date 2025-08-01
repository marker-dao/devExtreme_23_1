/**
* DevExtreme (cjs/__internal/viz/core/themes/generic/contrast.js)
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
const WHITE = '#ffffff';
const BLACK = '#000000';
const CONTRAST_ACTIVE = '#cf00da';
const MARKER_COLOR = '#f8ca00';
const AREA_LAYER_COLOR = '#686868';
var _default = exports.default = [{
  baseThemeName: 'generic.light',
  theme: {
    name: 'generic.contrast',
    defaultPalette: 'Bright',
    font: {
      color: WHITE
    },
    backgroundColor: BLACK,
    primaryTitleColor: WHITE,
    secondaryTitleColor: WHITE,
    gridColor: WHITE,
    axisColor: WHITE,
    export: {
      backgroundColor: BLACK,
      font: {
        color: WHITE
      },
      button: {
        default: {
          color: WHITE,
          borderColor: WHITE,
          backgroundColor: BLACK
        },
        hover: {
          color: WHITE,
          borderColor: WHITE,
          backgroundColor: '#cf00d7'
        },
        focus: {
          color: WHITE,
          borderColor: '#cf00d7',
          backgroundColor: BLACK
        },
        active: {
          color: BLACK,
          borderColor: WHITE,
          backgroundColor: WHITE
        }
      },
      borderColor: WHITE,
      menuButtonColor: BLACK,
      activeBackgroundColor: WHITE,
      activeColor: BLACK,
      selectedBorderColor: CONTRAST_ACTIVE,
      selectedColor: CONTRAST_ACTIVE,
      shadowColor: 'none'
    },
    tooltip: {
      border: {
        color: WHITE
      },
      font: {
        color: WHITE
      },
      color: BLACK
    },
    'chart:common': {
      commonSeriesSettings: {
        valueErrorBar: {
          color: WHITE
        },
        hoverStyle: {
          hatching: {
            opacity: 0.5
          }
        },
        selectionStyle: {
          hatching: {
            opacity: 0.35
          }
        },
        label: {
          font: {
            color: WHITE
          },
          border: {
            color: WHITE
          }
        }
      }
    },
    'chart:common:axis': {
      constantLineStyle: {
        color: WHITE
      }
    },
    'chart:common:annotation': {
      font: {
        color: WHITE
      },
      border: {
        color: WHITE
      },
      color: BLACK
    },
    chart: {
      commonSeriesSettings: {},
      crosshair: {
        color: '#cf00d7'
      },
      commonPaneSettings: {
        backgroundColor: BLACK,
        border: {
          color: WHITE
        }
      },
      scrollBar: {
        color: WHITE
      },
      commonAxisSettings: {
        breakStyle: {
          color: '#cf00d7'
        }
      },
      zoomAndPan: {
        dragBoxStyle: {
          color: WHITE,
          opacity: 0.7
        }
      }
    },
    pie: {
      commonSeriesSettings: {
        pie: {
          hoverStyle: {
            hatching: {
              opacity: 0.5
            }
          },
          selectionStyle: {
            hatching: {
              opacity: 0.35
            }
          }
        },
        doughnut: {
          hoverStyle: {
            hatching: {
              opacity: 0.5
            }
          },
          selectionStyle: {
            hatching: {
              opacity: 0.35
            }
          }
        },
        donut: {
          hoverStyle: {
            hatching: {
              opacity: 0.5
            }
          },
          selectionStyle: {
            hatching: {
              opacity: 0.35
            }
          }
        }
      }
    },
    gauge: {
      rangeContainer: {
        backgroundColor: WHITE
      },
      valueIndicators: {
        _default: {
          color: WHITE
        },
        rangebar: {
          color: WHITE,
          backgroundColor: BLACK
        },
        // eslint-disable-next-line spellcheck/spell-checker
        twocolorneedle: {
          secondColor: WHITE
        },
        // eslint-disable-next-line spellcheck/spell-checker
        trianglemarker: {
          color: WHITE
        },
        // eslint-disable-next-line spellcheck/spell-checker
        textcloud: {
          color: WHITE,
          text: {
            font: {
              color: BLACK
            }
          }
        }
      }
    },
    barGauge: {
      backgroundColor: '#3c3c3c'
    },
    rangeSelector: {
      scale: {
        tick: {
          color: WHITE,
          opacity: 0.4
        },
        minorTick: {
          color: WHITE,
          opacity: 0.12
        },
        breakStyle: {
          color: '#cf00d7'
        }
      },
      selectedRangeColor: CONTRAST_ACTIVE,
      sliderMarker: {
        color: CONTRAST_ACTIVE
      },
      sliderHandle: {
        color: CONTRAST_ACTIVE,
        opacity: 1
      },
      shutter: {
        opacity: 0.75
      },
      background: {
        color: BLACK
      }
    },
    map: {
      background: {
        borderColor: WHITE
      },
      layer: {
        label: {
          stroke: BLACK,
          font: {
            color: WHITE
          }
        }
      },
      'layer:area': {
        borderColor: BLACK,
        color: AREA_LAYER_COLOR,
        hoveredBorderColor: WHITE,
        selectedBorderColor: WHITE,
        label: {
          font: {
            opacity: 1
          }
        }
      },
      'layer:line': {
        color: '#267cff',
        hoveredColor: '#f613ff',
        selectedColor: WHITE
      },
      'layer:marker:dot': {
        borderColor: BLACK,
        color: MARKER_COLOR,
        backColor: BLACK,
        backOpacity: 0.32
      },
      'layer:marker:bubble': {
        color: MARKER_COLOR,
        hoveredBorderColor: WHITE,
        selectedBorderColor: WHITE
      },
      'layer:marker:pie': {
        hoveredBorderColor: WHITE,
        selectedBorderColor: WHITE
      },
      controlBar: {
        borderColor: WHITE,
        color: BLACK,
        opacity: 0.3
      }
    },
    treeMap: {
      tile: {
        color: '#70c92f'
      },
      group: {
        color: '#797979',
        label: {
          font: {
            color: WHITE
          }
        }
      }
    },
    sparkline: {
      pointColor: BLACK
    },
    bullet: {},
    polar: {
      commonSeriesSettings: {}
    },
    funnel: {
      label: {
        connector: {
          opacity: 1
        }
      }
    },
    sankey: {
      label: {
        font: {
          color: WHITE
        },
        shadow: {
          opacity: 0
        }
      },
      node: {
        border: {
          visible: true,
          width: 1,
          color: WHITE
        }
      },
      link: {
        opacity: 0.5,
        border: {
          visible: true,
          width: 1,
          color: WHITE
        },
        hoverStyle: {
          opacity: 0.9
        }
      }
    }
  }
}, {
  baseThemeName: 'generic.contrast',
  theme: {
    name: 'generic.contrast.compact'
  }
}];
