/**
* DevExtreme (esm/__internal/viz/core/themes/material/index.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
const FONT_FAMILY = '\'Roboto\', \'RobotoFallback\', \'Helvetica\', \'Arial\', sans-serif';
const LIGHT_TITLE_COLOR = 'rgba(0,0,0,0.87)';
const LIGHT_LABEL_COLOR = 'rgba(0,0,0,0.54)';
const DARK_TITLE_COLOR = 'rgba(255,255,255,0.87)';
const DARK_LABEL_COLOR = 'rgba(255,255,255,0.54)';
const DARK_BACKGROUND_COLOR = '#363640';
const WHITE = '#ffffff';
const BLACK = '#000000';
const RANGE_COLOR = '#b5b5b5';
const AREA_LAYER_COLOR = '#686868';
const LINE_COLOR = '#c7c7c7';
const TARGET_COLOR = '#8e8e8e';
const POSITIVE_COLOR = '#b8b8b8';
const LABEL_BORDER_COLOR = '#494949';
const BREAK_STYLE_COLOR = '#818181';
const themes = [{
  baseThemeName: 'generic.light',
  theme: {
    name: 'material',
    defaultPalette: 'Material',
    font: {
      family: FONT_FAMILY
    },
    title: {
      margin: {
        top: 20,
        bottom: 20,
        left: 0,
        right: 0
      },
      font: {
        size: 20,
        family: FONT_FAMILY,
        weight: 500
      },
      horizontalAlignment: 'left',
      subtitle: {
        font: {
          size: 14
        },
        horizontalAlignment: 'left'
      }
    },
    tooltip: {
      shadow: {
        opacity: 0
      },
      border: {
        visible: false
      },
      paddingLeftRight: 8,
      paddingTopBottom: 6,
      arrowLength: 0,
      location: 'edge',
      color: '#616161',
      font: {
        color: WHITE
      },
      cornerRadius: 4
    },
    chart: {
      commonAxisSettings: {
        minorTick: {
          opacity: 0.5
        },
        label: {
          font: {
            size: 11
          }
        }
      },
      commonAnnotationSettings: {
        font: {
          color: WHITE
        },
        border: {
          color: '#616161'
        },
        color: '#616161',
        arrowLength: 14,
        arrowWidth: 0,
        shadow: {
          opacity: 0.08,
          offsetY: 4,
          blur: 8
        },
        cornerRadius: 4
      }
    },
    pie: {
      title: {
        horizontalAlignment: 'center',
        subtitle: {
          horizontalAlignment: 'center'
        }
      }
    },
    polar: {
      commonAxisSettings: {
        minorTick: {
          opacity: 0.5
        }
      },
      title: {
        horizontalAlignment: 'center',
        subtitle: {
          horizontalAlignment: 'center'
        }
      }
    },
    funnel: {
      title: {
        horizontalAlignment: 'center',
        subtitle: {
          horizontalAlignment: 'center'
        }
      }
    },
    gauge: {
      title: {
        horizontalAlignment: 'center',
        subtitle: {
          horizontalAlignment: 'center'
        }
      }
    },
    barGauge: {
      title: {
        horizontalAlignment: 'center',
        subtitle: {
          horizontalAlignment: 'center'
        }
      }
    },
    rangeSelector: {
      sliderHandle: {
        opacity: 0.5
      }
    },
    treeMap: {
      group: {
        label: {
          font: {
            weight: 500
          }
        }
      }
    }
  }
}, {
  baseThemeName: 'material',
  theme: {
    name: 'material.light',
    gridColor: '#e0e0e0',
    axisColor: LIGHT_LABEL_COLOR,
    primaryTitleColor: LIGHT_TITLE_COLOR,
    legend: {
      font: {
        color: LIGHT_LABEL_COLOR
      }
    },
    chart: {
      scrollBar: {
        color: '#bfbfbf',
        opacity: 0.7
      }
    },
    gauge: {
      rangeContainer: {
        backgroundColor: 'rgba(0,0,0,0.2)'
      }
    },
    barGauge: {
      backgroundColor: '#efefef'
    }
  }
}, {
  baseThemeName: 'material',
  theme: {
    name: 'material.dark',
    gridColor: '#515159',
    backgroundColor: DARK_BACKGROUND_COLOR,
    axisColor: DARK_LABEL_COLOR,
    font: {
      color: DARK_LABEL_COLOR
    },
    primaryTitleColor: DARK_TITLE_COLOR,
    secondaryTitleColor: DARK_TITLE_COLOR,
    tooltip: {
      color: '#000'
    },
    export: {
      backgroundColor: DARK_BACKGROUND_COLOR,
      font: {
        color: '#dbdbdb'
      },
      button: {
        default: {
          color: '#dedede',
          borderColor: '#4d4d4d',
          backgroundColor: DARK_BACKGROUND_COLOR
        },
        hover: {
          color: '#dedede',
          borderColor: '#6c6c6c',
          backgroundColor: '#3f3f4b'
        },
        focus: {
          color: '#dedede',
          borderColor: '#8d8d8d',
          backgroundColor: '#494956'
        },
        active: {
          color: '#dedede',
          borderColor: '#8d8d8d',
          backgroundColor: '#494956'
        }
      },
      shadowColor: '#292929'
    },
    'chart:common': {
      commonSeriesSettings: {
        label: {
          border: {
            color: LABEL_BORDER_COLOR
          }
        },
        valueErrorBar: {
          color: WHITE
        }
      }
    },
    'chart:common:axis': {
      constantLineStyle: {
        color: WHITE
      }
    },
    'chart:common:annotation': {
      border: {
        color: '#000'
      },
      color: '#000'
    },
    chart: {
      commonPaneSettings: {
        border: {
          color: LABEL_BORDER_COLOR
        }
      },
      commonAxisSettings: {
        breakStyle: {
          color: BREAK_STYLE_COLOR
        }
      },
      zoomAndPan: {
        dragBoxStyle: {
          color: WHITE
        }
      }
    },
    gauge: {
      rangeContainer: {
        backgroundColor: RANGE_COLOR
      },
      valueIndicators: {
        _default: {
          color: RANGE_COLOR
        },
        rangebar: {
          color: '#84788b'
        },
        // eslint-disable-next-line spellcheck/spell-checker
        twocolorneedle: {
          secondColor: '#ba544d'
        },
        // eslint-disable-next-line spellcheck/spell-checker
        trianglemarker: {
          color: '#b7918f'
        },
        // eslint-disable-next-line spellcheck/spell-checker
        textcloud: {
          color: '#ba544d'
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
          opacity: 0.32
        },
        minorTick: {
          color: WHITE,
          opacity: 0.1
        },
        breakStyle: {
          color: BREAK_STYLE_COLOR
        }
      },
      selectedRangeColor: RANGE_COLOR,
      sliderMarker: {
        color: RANGE_COLOR,
        font: {
          color: DARK_BACKGROUND_COLOR
        }
      },
      sliderHandle: {
        color: WHITE,
        opacity: 0.2
      },
      shutter: {
        color: WHITE,
        opacity: 0.1
      }
    },
    map: {
      background: {
        borderColor: '#3f3f3f'
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
        borderColor: DARK_BACKGROUND_COLOR,
        color: AREA_LAYER_COLOR,
        hoveredBorderColor: WHITE,
        selectedBorderColor: WHITE
      },
      'layer:line': {
        color: '#c77244',
        hoveredColor: '#ff5d04',
        selectedColor: '#ff784f'
      },
      'layer:marker:bubble': {
        hoveredBorderColor: WHITE,
        selectedBorderColor: WHITE
      },
      'layer:marker:pie': {
        hoveredBorderColor: WHITE,
        selectedBorderColor: WHITE
      },
      legend: {
        border: {
          color: '#3f3f3f'
        },
        font: {
          color: WHITE
        }
      },
      controlBar: {
        borderColor: LINE_COLOR,
        color: DARK_BACKGROUND_COLOR
      }
    },
    treeMap: {
      group: {
        color: '#4c4c4c',
        label: {
          font: {
            color: '#a3a3a3'
          }
        }
      }
    },
    sparkline: {
      lineColor: LINE_COLOR,
      firstLastColor: LINE_COLOR,
      barPositiveColor: POSITIVE_COLOR,
      barNegativeColor: TARGET_COLOR,
      winColor: POSITIVE_COLOR,
      lossColor: TARGET_COLOR,
      pointColor: DARK_BACKGROUND_COLOR
    },
    bullet: {
      targetColor: TARGET_COLOR
    },
    funnel: {
      item: {
        border: {
          color: DARK_BACKGROUND_COLOR
        }
      }
    },
    sankey: {
      label: {
        font: {
          color: WHITE
        }
      }
    }
  }
}];
function getMaterialColorScheme(accentName, themeName, accentColor) {
  return {
    theme: {
      name: `material.${accentName}.${themeName}`,
      rangeSelector: {
        selectedRangeColor: accentColor,
        sliderMarker: {
          color: accentColor
        },
        sliderHandle: {
          color: accentColor
        }
      },
      map: {
        'layer:marker:dot': {
          color: accentColor
        },
        'layer:marker:bubble': {
          color: accentColor
        },
        legend: {
          markerColor: accentColor
        }
      },
      bullet: {
        color: accentColor
      },
      gauge: {
        valueIndicators: {
          rangebar: {
            color: accentColor
          },
          // eslint-disable-next-line spellcheck/spell-checker
          textcloud: {
            color: accentColor
          }
        }
      }
    },
    baseThemeName: `material.${themeName}`
  };
}
const materialAccents = {
  blue: '#03a9f4',
  lime: '#cddc39',
  orange: '#ff5722',
  purple: '#9c27b0',
  teal: '#009688'
};
Object.keys(materialAccents).forEach(accent => {
  const color = materialAccents[accent];
  themes.push(getMaterialColorScheme(accent, 'light', color), getMaterialColorScheme(accent, 'dark', color), {
    theme: {
      name: `material.${accent}.light.compact`
    },
    baseThemeName: `material.${accent}.light`
  }, {
    theme: {
      name: `material.${accent}.dark.compact`
    },
    baseThemeName: `material.${accent}.dark`
  });
});
export default themes;
