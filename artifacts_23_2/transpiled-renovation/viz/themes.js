"use strict";

exports.addCacheItem = addCacheItem;
exports.currentTheme = currentTheme;
exports.getTheme = getTheme;
exports.refreshTheme = refreshTheme;
exports.registerTheme = registerTheme;
exports.registerThemeSchemeAlias = registerThemeSchemeAlias;
exports.removeCacheItem = removeCacheItem;
exports.widgetsCache = exports.themesSchemeMapping = exports.themesMapping = exports.themes = exports.resetCurrentTheme = void 0;
var _extend2 = require("../core/utils/extend");
var _iterator = require("../core/utils/iterator");
var _utils = require("./core/utils");
var _themes = require("../ui/themes");
var _type = require("../core/utils/type");
var _generic = _interopRequireDefault(require("./core/themes/generic.light"));
var _generic2 = _interopRequireDefault(require("./core/themes/generic.carmine"));
var _generic3 = _interopRequireDefault(require("./core/themes/generic.dark"));
var _generic4 = _interopRequireDefault(require("./core/themes/generic.contrast"));
var _generic5 = _interopRequireDefault(require("./core/themes/generic.darkmoon"));
var _generic6 = _interopRequireDefault(require("./core/themes/generic.darkviolet"));
var _generic7 = _interopRequireDefault(require("./core/themes/generic.greenmist"));
var _generic8 = _interopRequireDefault(require("./core/themes/generic.softblue"));
var _material = _interopRequireDefault(require("./core/themes/material"));
var _fluent = _interopRequireDefault(require("./core/themes/fluent"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const themes = {};
exports.themes = themes;
const themesMapping = {};
exports.themesMapping = themesMapping;
const themesSchemeMapping = {};
exports.themesSchemeMapping = themesSchemeMapping;
const _extend = _extend2.extend;
const _each = _iterator.each;
let currentThemeName = null;
let defaultTheme;
let nextCacheUid = 0;
const widgetsCache = {};
exports.widgetsCache = widgetsCache;
function getTheme(themeName) {
  const name = (0, _utils.normalizeEnum)(themeName);
  return themes[name] || themes[themesMapping[name] || currentTheme()];
}
function findThemeNameByName(name, scheme) {
  return themesMapping[name + '.' + scheme] || themesSchemeMapping[name + '.' + scheme] || themesMapping[name];
}
function findThemeNameByPlatform(platform, version, scheme) {
  return findThemeNameByName(platform + version, scheme) || findThemeNameByName(platform, scheme);
}
function currentTheme(themeName, colorScheme) {
  if (!arguments.length) {
    return currentThemeName || findThemeNameByName((0, _themes.current)()) || defaultTheme;
  }
  const scheme = (0, _utils.normalizeEnum)(colorScheme);
  currentThemeName = (themeName && themeName.platform ? findThemeNameByPlatform((0, _utils.normalizeEnum)(themeName.platform), themeName.version, scheme) : findThemeNameByName((0, _utils.normalizeEnum)(themeName), scheme)) || currentThemeName;
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
  const scheme = themeInfo.scheme;
  if (scheme) {
    themesMapping[name] = themesMapping[name] || targetThemeName;
    themesMapping[name + '.' + scheme] = targetThemeName;
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
  const _value = source ? source[field] : sourceValue;
  if (_value !== undefined && target[field] === undefined) {
    target[field] = _value;
  }
}
function mergeObject(target, field, source, sourceValue) {
  const _value = source ? source[field] : sourceValue;
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
    'export': {
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
  _each(['chart', 'pie', 'polar', 'gauge', 'barGauge', 'map', 'treeMap', 'funnel', 'rangeSelector', 'sparkline', 'bullet', 'sankey'], function (_, section) {
    mergeScalar(theme[section], 'redrawOnResize', theme);
    mergeScalar(theme[section], 'containerBackgroundColor', null, theme.backgroundColor);
    mergeObject(theme[section], 'tooltip', theme);
    mergeObject(theme[section], 'export', theme);
  });
  _each(['chart', 'pie', 'polar', 'gauge', 'barGauge', 'map', 'treeMap', 'funnel', 'rangeSelector', 'sankey'], function (_, section) {
    mergeObject(theme[section], 'loadingIndicator', theme);
    mergeObject(theme[section], 'legend', theme);
    mergeObject(theme[section], 'title', theme);
  });
  _each(['chart', 'pie', 'polar'], function (_, section) {
    mergeObject(theme, section, null, theme['chart:common']);
  });
  _each(['chart', 'polar'], function (_, section) {
    theme[section] = theme[section] || {};
    mergeObject(theme[section], 'commonAxisSettings', null, theme['chart:common:axis']);
  });
  _each(['chart', 'polar', 'map', 'pie'], function (_, section) {
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
  _each([commonAxisSettings.grid, commonAxisSettings.minorGrid], function (_, obj) {
    mergeScalar(obj, colorFieldName, null, theme.gridColor);
  });
  _each([commonAxisSettings, commonAxisSettings.tick, commonAxisSettings.minorTick, commonAxisSettings.label.font], function (_, obj) {
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
  _each(['area', 'line', 'marker'], function (_, section) {
    mergeObject(map, 'layer:' + section, null, map.layer);
  });
  _each(['dot', 'bubble', 'pie', 'image'], function (_, section) {
    mergeObject(map, 'layer:marker:' + section, null, map['layer:marker']);
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
  _each(widgetsCache, function () {
    this.refresh();
  });
  // For chaining only
  return this;
}

// register themes
if ((0, _type.isEmptyObject)(themes) && (0, _type.isEmptyObject)(themesMapping) && !defaultTheme) {
  [].concat(_generic.default, _generic2.default, _generic3.default, _generic4.default, _generic5.default, _generic6.default, _generic7.default, _generic8.default, _material.default, _fluent.default).forEach(t => {
    registerTheme(t.theme, t.baseThemeName);
  });
}

///#DEBUG

const resetCurrentTheme = function () {
  currentThemeName = null;
};
///#ENDDEBUG
exports.resetCurrentTheme = resetCurrentTheme;