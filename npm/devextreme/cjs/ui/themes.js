/**
* DevExtreme (cjs/ui/themes.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.attachCssClasses = attachCssClasses;
exports.current = current;
exports.default = void 0;
exports.detachCssClasses = detachCssClasses;
exports.init = init;
exports.initialized = initialized;
exports.isCompact = isCompact;
exports.isDark = isDark;
exports.isFluent = isFluent;
exports.isGeneric = isGeneric;
exports.isMaterial = isMaterial;
exports.isMaterialBased = isMaterialBased;
exports.isPendingThemeLoaded = isPendingThemeLoaded;
exports.isWebFontLoaded = isWebFontLoaded;
exports.ready = themeReady;
exports.resetTheme = resetTheme;
exports.setDefaultTimeout = setDefaultTimeout;
exports.waitForThemeLoad = waitForThemeLoad;
exports.waitWebFont = waitWebFont;
var _size = require("../core/utils/size");
var _devices = _interopRequireDefault(require("../core/devices"));
var _dom_adapter = _interopRequireDefault(require("../core/dom_adapter"));
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _deferred = require("../core/utils/deferred");
var _html_parser = require("../core/utils/html_parser");
var _iterator = require("../core/utils/iterator");
var _ready_callbacks = _interopRequireDefault(require("../core/utils/ready_callbacks"));
var _view_port = require("../core/utils/view_port");
var _window = require("../core/utils/window");
var _themes_callback = require("./themes_callback");
var _m_common = require("../__internal/core/utils/m_common");
var _ui = _interopRequireDefault(require("./widget/ui.errors"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const window = (0, _window.getWindow)();
const ready = _ready_callbacks.default.add;
const viewPort = _view_port.value;
const viewPortChanged = _view_port.changeCallback;
let initDeferred = new _deferred.Deferred();
const DX_LINK_SELECTOR = 'link[rel=dx-theme]';
const THEME_ATTR = 'data-theme';
const ACTIVE_ATTR = 'data-active';
const DX_HAIRLINES_CLASS = 'dx-hairlines';
const ANY_THEME = 'any';
let context;
let $activeThemeLink;
let knownThemes;
let currentThemeName;
let pendingThemeName;
let defaultTimeout = 15000;
const THEME_MARKER_PREFIX = 'dx.';
function readThemeMarker() {
  if (!(0, _window.hasWindow)()) {
    return null;
  }
  const element = (0, _renderer.default)('<div>', context).addClass('dx-theme-marker').appendTo(context.documentElement);
  let result;
  try {
    result = window.getComputedStyle(element.get(0))['fontFamily'];
    if (!result) {
      return null;
    }
    result = result.replace(/["']/g, '');
    if (result.substr(0, THEME_MARKER_PREFIX.length) !== THEME_MARKER_PREFIX) {
      return null;
    }
    return result.substr(THEME_MARKER_PREFIX.length);
  } finally {
    element.remove();
  }
}

// FYI
// http://stackoverflow.com/q/2635814
// http://stackoverflow.com/a/3078636
function waitForThemeLoad(themeName) {
  let waitStartTime;
  let timerId;
  let intervalCleared = true;
  pendingThemeName = themeName;
  function handleLoaded() {
    pendingThemeName = null;
    clearInterval(timerId);
    intervalCleared = true;
    _themes_callback.themeReadyCallback.fire();
    _themes_callback.themeReadyCallback.empty();
    initDeferred.resolve();
  }
  if (isPendingThemeLoaded() || !defaultTimeout) {
    handleLoaded();
  } else {
    if (!intervalCleared) {
      if (pendingThemeName) {
        pendingThemeName = themeName;
      }
      return;
    }
    waitStartTime = Date.now();
    intervalCleared = false;
    timerId = setInterval(function () {
      const isLoaded = isPendingThemeLoaded();
      const isTimeout = !isLoaded && Date.now() - waitStartTime > defaultTimeout;
      if (isTimeout) {
        _ui.default.log('W0004', pendingThemeName);
      }
      if (isLoaded || isTimeout) {
        handleLoaded();
      }
    }, 10);
  }
}
function isPendingThemeLoaded() {
  if (!pendingThemeName) {
    return true;
  }
  const anyThemePending = pendingThemeName === ANY_THEME;
  if (initDeferred.state() === 'resolved' && anyThemePending) {
    return true;
  }
  const themeMarker = readThemeMarker();
  if (themeMarker && anyThemePending) {
    return true;
  }
  return themeMarker === pendingThemeName;
}
function processMarkup() {
  const $allThemeLinks = (0, _renderer.default)(DX_LINK_SELECTOR, context);
  if (!$allThemeLinks.length) {
    return;
  }
  knownThemes = {};
  $activeThemeLink = (0, _renderer.default)((0, _html_parser.parseHTML)('<link rel=stylesheet>'), context);
  $allThemeLinks.each(function () {
    const link = (0, _renderer.default)(this, context);
    const fullThemeName = link.attr(THEME_ATTR);
    const url = link.attr('href');
    const isActive = link.attr(ACTIVE_ATTR) === 'true';
    knownThemes[fullThemeName] = {
      url: url,
      isActive: isActive
    };
  });
  $allThemeLinks.last().after($activeThemeLink);
  $allThemeLinks.remove();
}
function resolveFullThemeName(desiredThemeName) {
  const desiredThemeParts = desiredThemeName ? desiredThemeName.split('.') : [];
  let result = null;
  if (knownThemes) {
    if (desiredThemeName in knownThemes) {
      return desiredThemeName;
    }
    (0, _iterator.each)(knownThemes, function (knownThemeName, themeData) {
      const knownThemeParts = knownThemeName.split('.');
      if (desiredThemeParts[0] && knownThemeParts[0] !== desiredThemeParts[0]) {
        return;
      }
      if (desiredThemeParts[1] && desiredThemeParts[1] !== knownThemeParts[1]) {
        return;
      }
      if (desiredThemeParts[2] && desiredThemeParts[2] !== knownThemeParts[2]) {
        return;
      }
      if (!result || themeData.isActive) {
        result = knownThemeName;
      }
      if (themeData.isActive) {
        return false;
      }
    });
  }
  return result;
}
function initContext(newContext) {
  try {
    if (newContext !== context) {
      knownThemes = null;
    }
  } catch (x) {
    // Cross-origin permission error
    knownThemes = null;
  }
  context = newContext;
}
function init(options) {
  options = options || {};
  initContext(options.context || _dom_adapter.default.getDocument());
  if (!context) return;
  processMarkup();
  currentThemeName = undefined;
  current(options);
}
function current(options) {
  if (!arguments.length) {
    currentThemeName = currentThemeName || readThemeMarker();
    return currentThemeName;
  }
  detachCssClasses(viewPort());
  options = options || {};
  if (typeof options === 'string') {
    options = {
      theme: options
    };
  }
  const isAutoInit = options._autoInit;
  const loadCallback = options.loadCallback;
  let currentThemeData;
  currentThemeName = resolveFullThemeName(options.theme || currentThemeName);
  if (currentThemeName) {
    currentThemeData = knownThemes[currentThemeName];
  }
  if (loadCallback) {
    _themes_callback.themeReadyCallback.add(loadCallback);
  }
  if (currentThemeData) {
    $activeThemeLink.attr('href', knownThemes[currentThemeName].url);
    if (_themes_callback.themeReadyCallback.has() || initDeferred.state() !== 'resolved' || options._forceTimeout) {
      waitForThemeLoad(currentThemeName);
    }
  } else {
    if (isAutoInit) {
      if ((0, _window.hasWindow)()) {
        waitForThemeLoad(ANY_THEME);
      }
      _themes_callback.themeReadyCallback.fire();
      _themes_callback.themeReadyCallback.empty();
    } else {
      throw _ui.default.Error('E0021', currentThemeName);
    }
  }
  initDeferred.done(() => attachCssClasses((0, _view_port.originalViewPort)(), currentThemeName));
}
function getCssClasses(themeName) {
  themeName = themeName || current();
  const result = [];
  const themeNameParts = themeName && themeName.split('.');
  if (themeNameParts) {
    result.push('dx-theme-' + themeNameParts[0], 'dx-theme-' + themeNameParts[0] + '-typography');
    if (themeNameParts.length > 1) {
      result.push('dx-color-scheme-' + themeNameParts[1] + (isMaterialBased(themeName) ? '-' + themeNameParts[2] : ''));
    }
  }
  return result;
}
let themeClasses;
function _attachCssClasses(element, themeName) {
  themeClasses = getCssClasses(themeName).join(' ');
  (0, _renderer.default)(element).addClass(themeClasses);
  const activateHairlines = function () {
    const pixelRatio = (0, _window.hasWindow)() && window.devicePixelRatio;
    if (!pixelRatio || pixelRatio < 2) {
      return;
    }
    const $tester = (0, _renderer.default)('<div>');
    $tester.css('border', '.5px solid transparent');
    (0, _renderer.default)('body').append($tester);
    if ((0, _size.getOuterHeight)($tester) === 1) {
      (0, _renderer.default)(element).addClass(DX_HAIRLINES_CLASS);
      themeClasses += ' ' + DX_HAIRLINES_CLASS;
    }
    $tester.remove();
  };
  activateHairlines();
}
function attachCssClasses(element, themeName) {
  (0, _deferred.when)(_m_common.uiLayerInitialized).done(() => {
    _attachCssClasses(element, themeName);
  });
}
function detachCssClasses(element) {
  (0, _deferred.when)(_m_common.uiLayerInitialized).done(() => {
    (0, _renderer.default)(element).removeClass(themeClasses);
  });
}
function themeReady(callback) {
  _themes_callback.themeReadyCallback.add(callback);
}
function isTheme(themeRegExp, themeName) {
  if (!themeName) {
    themeName = currentThemeName || readThemeMarker();
  }
  return new RegExp(themeRegExp).test(themeName);
}
function isMaterialBased(themeName) {
  return isMaterial(themeName) || isFluent(themeName);
}
function isMaterial(themeName) {
  return isTheme('material', themeName);
}
function isFluent(themeName) {
  return isTheme('fluent', themeName);
}
function isGeneric(themeName) {
  return isTheme('generic', themeName);
}
function isDark(themeName) {
  return isTheme('dark', themeName);
}
function isCompact(themeName) {
  return isTheme('compact', themeName);
}
function isWebFontLoaded(text, fontWeight) {
  const testedFont = 'Roboto, RobotoFallback, Arial';
  const etalonFont = 'Arial';
  const document = _dom_adapter.default.getDocument();
  const testElement = document.createElement('span');
  testElement.style.position = 'absolute';
  testElement.style.top = '-9999px';
  testElement.style.left = '-9999px';
  testElement.style.visibility = 'hidden';
  testElement.style.fontFamily = etalonFont;
  testElement.style.fontSize = '250px';
  testElement.style.fontWeight = fontWeight;
  testElement.innerHTML = text;
  document.body.appendChild(testElement);
  const etalonFontWidth = testElement.offsetWidth;
  testElement.style.fontFamily = testedFont;
  const testedFontWidth = testElement.offsetWidth;
  testElement.parentNode.removeChild(testElement);
  return etalonFontWidth !== testedFontWidth;
}
function waitWebFont(text, fontWeight) {
  const interval = 15;
  const timeout = 2000;
  return new Promise(resolve => {
    const check = () => {
      if (isWebFontLoaded(text, fontWeight)) {
        clear();
      }
    };
    const clear = () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      resolve();
    };
    const intervalId = setInterval(check, interval);
    const timeoutId = setTimeout(clear, timeout);
  });
}
function autoInit() {
  init({
    _autoInit: true,
    _forceTimeout: true
  });
  if ((0, _renderer.default)(DX_LINK_SELECTOR, context).length) {
    throw _ui.default.Error('E0022');
  }
}
if ((0, _window.hasWindow)()) {
  autoInit();
} else {
  ready(autoInit);
}
viewPortChanged.add(function (viewPort, prevViewPort) {
  initDeferred.done(function () {
    detachCssClasses(prevViewPort);
    attachCssClasses(viewPort);
  });
});
_devices.default.changed.add(function () {
  init({
    _autoInit: true
  });
});
function resetTheme() {
  $activeThemeLink && $activeThemeLink.attr('href', 'about:blank');
  currentThemeName = null;
  pendingThemeName = null;
  initDeferred = new _deferred.Deferred();
}
function initialized(callback) {
  initDeferred.done(callback);
}
function setDefaultTimeout(timeout) {
  defaultTimeout = timeout;
}

/**
 * Added default export according to our documentation
 * https://js.devexpress.com/Documentation/ApiReference/Common/Utils/ui/themes/
 * */
var _default = exports.default = {
  setDefaultTimeout,
  initialized,
  resetTheme,
  ready: themeReady,
  waitWebFont,
  isWebFontLoaded,
  isCompact,
  isDark,
  isGeneric,
  isMaterial,
  isFluent,
  isMaterialBased,
  detachCssClasses,
  attachCssClasses,
  current,
  waitForThemeLoad,
  isPendingThemeLoaded
};
