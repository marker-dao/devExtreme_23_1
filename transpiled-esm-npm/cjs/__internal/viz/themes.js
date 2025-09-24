"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addCacheItem = addCacheItem;
exports.currentTheme = currentTheme;
exports.getTheme = getTheme;
exports.refreshTheme = refreshTheme;
exports.registerTheme = registerTheme;
exports.registerThemeSchemeAlias = registerThemeSchemeAlias;
exports.removeCacheItem = removeCacheItem;
var _extend2 = require("../../core/utils/extend");
var _type = require("../../core/utils/type");
var _themes = require("../../ui/themes");
var _index = _interopRequireDefault(require("../viz/core/themes/fluent/index"));
var _carmine = _interopRequireDefault(require("../viz/core/themes/generic/carmine"));
var _contrast = _interopRequireDefault(require("../viz/core/themes/generic/contrast"));
var _dark = _interopRequireDefault(require("../viz/core/themes/generic/dark"));
var _darkmoon = _interopRequireDefault(require("../viz/core/themes/generic/darkmoon"));
var _darkviolet = _interopRequireDefault(require("../viz/core/themes/generic/darkviolet"));
var _greenmist = _interopRequireDefault(require("../viz/core/themes/generic/greenmist"));
var _index2 = _interopRequireDefault(require("../viz/core/themes/generic/light/index"));
var _softblue = _interopRequireDefault(require("../viz/core/themes/generic/softblue"));
var _index3 = _interopRequireDefault(require("../viz/core/themes/material/index"));
var _utils = require("../viz/core/utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable import/no-import-module-exports */
/* eslint-disable @typescript-eslint/no-dynamic-delete */
/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-param-reassign */
/* eslint-disable @stylistic/max-len */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/prefer-optional-chain */

const themes = {};
const themesMapping = {};
const themesSchemeMapping = {};
const _extend = _extend2.extend;
let currentThemeName = null;
let defaultTheme;
let nextCacheUid = 0;
const widgetsCache = {};
function getTheme(themeName) {
  const name = (0, _utils.normalizeEnum)(themeName);
  // @ts-expect-error
  return themes[name] || themes[themesMapping[name] || currentTheme()];
}
function findThemeNameByName(name, scheme) {
  const fullThemeKey = `${name}.${scheme}`;
  return themesMapping[fullThemeKey] || themesSchemeMapping[fullThemeKey] || themesMapping[name];
}
function findThemeNameByPlatform(platform, version, scheme) {
  return findThemeNameByName(platform + version, scheme) || findThemeNameByName(platform, scheme);
}
function currentTheme(themeName, colorScheme) {
  if (!arguments.length) {
    return currentThemeName || findThemeNameByName((0, _themes.current)()) || defaultTheme;
  }
  const scheme = (0, _utils.normalizeEnum)(colorScheme);
  currentThemeName = (themeName !== null && themeName !== void 0 && themeName.platform ? findThemeNameByPlatform((0, _utils.normalizeEnum)(themeName.platform), themeName.version, scheme) : findThemeNameByName((0, _utils.normalizeEnum)(themeName), scheme)) || currentThemeName;
  // For chaining only
  return this;
}
function getThemeInfo(themeName, splitter) {
  const k = themeName.indexOf(splitter);
  return k > 0 ? {
    name: themeName.substring(0, k),
    scheme: themeName.substring(k + 1)
  } : null;
}
function registerThemeName(themeName, targetThemeName) {
  const themeInfo = getThemeInfo(themeName, '.') || {
    name: themeName
  };
  const name = themeInfo.name;
  // @ts-expect-error
  const scheme = themeInfo.scheme;
  if (scheme) {
    const fullThemeKey = `${name}.${scheme}`;
    themesMapping[name] = themesMapping[name] || targetThemeName;
    themesMapping[fullThemeKey] = targetThemeName;
  } else {
    themesMapping[name] = targetThemeName;
  }
}
function registerTheme(theme, baseThemeName) {
  const themeName = (0, _utils.normalizeEnum)(theme && theme.name);
  if (themeName) {
    theme.isDefault && (defaultTheme = themeName);
    registerThemeName(themeName, themeName);
    themes[themeName] = _extend(true, {}, getTheme(baseThemeName), patchTheme(theme));
  }
}
function registerThemeSchemeAlias(from, to) {
  themesSchemeMapping[from] = to;
}
function mergeScalar(target, field, source, sourceValue) {
  const _value = (source === null || source === void 0 ? void 0 : source[field]) ?? sourceValue;
  if (_value !== undefined && target[field] === undefined) {
    target[field] = _value;
  }
}
function mergeObject(target, field, source, sourceValue) {
  const _value = (source === null || source === void 0 ? void 0 : source[field]) ?? sourceValue;
  if (_value !== undefined) {
    target[field] = _extend(true, {}, _value, target[field]);
  }
}
// TODO: Font initialization should be done here
function patchTheme(theme) {
  theme = _extend(true, {
    loadingIndicator: {
      font: {}
    },
    export: {
      font: {}
    },
    legend: {
      font: {},
      border: {}
    },
    title: {
      font: {}
    },
    tooltip: {
      font: {}
    },
    'chart:common': {},
    'chart:common:axis': {
      grid: {},
      minorGrid: {},
      tick: {},
      minorTick: {},
      title: {
        font: {}
      },
      label: {
        font: {}
      }
    },
    'chart:common:annotation': {
      font: {},
      border: {}
    },
    chart: {
      commonSeriesSettings: {
        candlestick: {}
      }
    },
    pie: {},
    polar: {},
    gauge: {
      scale: {
        tick: {},
        minorTick: {},
        label: {
          font: {}
        }
      }
    },
    barGauge: {},
    funnel: {},
    sankey: {},
    map: {
      background: {}
    },
    treeMap: {
      tile: {
        selectionStyle: {
          border: {}
        }
      },
      group: {
        border: {},
        selectionStyle: {
          border: {}
        },
        label: {
          font: {}
        }
      }
    },
    rangeSelector: {
      scale: {
        tick: {},
        minorTick: {},
        label: {
          font: {}
        }
      },
      chart: {}
    },
    sparkline: {},
    bullet: {}
  }, theme);
  mergeScalar(theme.loadingIndicator, 'backgroundColor', theme);
  mergeScalar(theme.chart.commonSeriesSettings.candlestick, 'innerColor', null, theme.backgroundColor);
  mergeScalar(theme.map.background, 'color', null, theme.backgroundColor);
  mergeScalar(theme.title.font, 'color', null, theme.primaryTitleColor);
  mergeObject(theme.title, 'subtitle', null, theme.title);
  mergeScalar(theme.legend.font, 'color', null, theme.secondaryTitleColor);
  mergeScalar(theme.legend.border, 'color', null, theme.gridColor);
  patchAxes(theme);
  ['chart', 'pie', 'polar', 'gauge', 'barGauge', 'map', 'treeMap', 'funnel', 'rangeSelector', 'sparkline', 'bullet', 'sankey'].forEach(section => {
    mergeScalar(theme[section], 'redrawOnResize', theme);
    mergeScalar(theme[section], 'containerBackgroundColor', null, theme.backgroundColor);
    mergeObject(theme[section], 'tooltip', theme);
    mergeObject(theme[section], 'export', theme);
  });
  ['chart', 'pie', 'polar', 'gauge', 'barGauge', 'map', 'treeMap', 'funnel', 'rangeSelector', 'sankey'].forEach(section => {
    mergeObject(theme[section], 'loadingIndicator', theme);
    mergeObject(theme[section], 'legend', theme);
    mergeObject(theme[section], 'title', theme);
  });
  ['chart', 'pie', 'polar'].forEach(section => {
    mergeObject(theme, section, null, theme['chart:common']);
  });
  ['chart', 'polar'].forEach(section => {
    theme[section] = theme[section] || {};
    mergeObject(theme[section], 'commonAxisSettings', null, theme['chart:common:axis']);
  });
  ['chart', 'polar', 'map', 'pie'].forEach(section => {
    theme[section] = theme[section] || {};
    mergeObject(theme[section], 'commonAnnotationSettings', null, theme['chart:common:annotation']);
  });
  mergeObject(theme.rangeSelector.chart, 'commonSeriesSettings', theme.chart);
  mergeObject(theme.rangeSelector.chart, 'dataPrepareSettings', theme.chart);
  mergeScalar(theme.treeMap.group.border, 'color', null, theme.gridColor);
  mergeScalar(theme.treeMap.tile.selectionStyle.border, 'color', null, theme.primaryTitleColor);
  mergeScalar(theme.treeMap.group.selectionStyle.border, 'color', null, theme.primaryTitleColor);
  mergeScalar(theme.map.legend, 'backgroundColor', theme);
  patchMapLayers(theme);
  return theme;
}
function patchAxes(theme) {
  const commonAxisSettings = theme['chart:common:axis'];
  const colorFieldName = 'color';
  [commonAxisSettings.grid, commonAxisSettings.minorGrid].forEach(obj => {
    mergeScalar(obj, colorFieldName, null, theme.gridColor);
  });
  [commonAxisSettings, commonAxisSettings.tick, commonAxisSettings.minorTick, commonAxisSettings.label.font].forEach(obj => {
    mergeScalar(obj, colorFieldName, null, theme.axisColor);
  });
  mergeScalar(commonAxisSettings.title.font, colorFieldName, null, theme.secondaryTitleColor);
  mergeScalar(theme.gauge.scale.label.font, colorFieldName, null, theme.axisColor);
  mergeScalar(theme.gauge.scale.tick, colorFieldName, null, theme.backgroundColor);
  mergeScalar(theme.gauge.scale.minorTick, colorFieldName, null, theme.backgroundColor);
  mergeScalar(theme.rangeSelector.scale.label.font, colorFieldName, null, theme.axisColor);
}
function patchMapLayers(theme) {
  const map = theme.map;
  ['area', 'line', 'marker'].forEach(section => {
    mergeObject(map, `layer:${section}`, null, map.layer);
  });
  ['dot', 'bubble', 'pie', 'image'].forEach(section => {
    mergeObject(map, `layer:marker:${section}`, null, map['layer:marker']);
  });
}
function addCacheItem(target) {
  const cacheUid = ++nextCacheUid;
  target._cache = cacheUid;
  widgetsCache[cacheUid] = target;
}
function removeCacheItem(target) {
  delete widgetsCache[target._cache];
}
function refreshTheme() {
  Object.keys(widgetsCache).forEach(key => {
    widgetsCache[key].refresh();
  });
  // For chaining only
  return this;
}
// register themes
if ((0, _type.isEmptyObject)(themes) && (0, _type.isEmptyObject)(themesMapping) && !defaultTheme) {
  [].concat(
  // @ts-expect-error
  _index2.default, _carmine.default, _dark.default, _contrast.default, _darkmoon.default, _darkviolet.default, _greenmist.default, _softblue.default, _index3.default, _index.default).forEach(t => {
    // @ts-expect-error
    registerTheme(t.theme, t.baseThemeName);
  });
}