/**
* DevExtreme (cjs/__internal/viz/gauges/base_gauge.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseGauge = void 0;
exports.compareArrays = compareArrays;
exports.getSampleText = exports.formatValue = void 0;
var _common = require("../../../core/utils/common");
var _extend2 = require("../../../core/utils/extend");
var _format_helper = _interopRequireDefault(require("../../../format_helper"));
var _export = require("../../viz/core/export");
var _loading_indicator = require("../../viz/core/loading_indicator");
var _m_base_widget = _interopRequireDefault(require("../../viz/core/m_base_widget"));
var _title = require("../../viz/core/title");
var _tooltip = require("../../viz/core/tooltip");
var _utils = require("../../viz/core/utils");
var _theme_manager = _interopRequireDefault(require("../../viz/gauges/theme_manager"));
var _tracker = _interopRequireDefault(require("../../viz/gauges/tracker"));
var _translator1d = require("../../viz/translators/translator1d");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* eslint-disable no-self-compare */ /* eslint-disable prefer-rest-params */ /* eslint-disable prefer-spread */ /* eslint-disable @typescript-eslint/no-this-alias */ /* eslint-disable no-continue */ /* eslint-disable @typescript-eslint/init-declarations */ /* eslint-disable no-plusplus */ /* eslint-disable func-names */ /* eslint-disable @typescript-eslint/naming-convention */ /* eslint-disable no-param-reassign */ /* eslint-disable no-multi-assign */ /* eslint-disable @stylistic/max-len */ /* eslint-disable @typescript-eslint/explicit-module-boundary-types */ /* eslint-disable @typescript-eslint/no-unsafe-return */ /* eslint-disable @typescript-eslint/no-use-before-define */ /* eslint-disable @typescript-eslint/explicit-function-return-type */ /* eslint-disable prefer-destructuring */ /* eslint-disable @typescript-eslint/no-unused-expressions */ /* eslint-disable @typescript-eslint/prefer-optional-chain */
const _Number = Number;
const _extend = _extend2.extend;
const _format = _format_helper.default.format;
const BaseGauge = exports.BaseGauge = _m_base_widget.default.inherit({
  _rootClassPrefix: 'dxg',
  _themeSection: 'gauge',
  _titleBBoxCache: null,
  _createThemeManager() {
    return new _theme_manager.default.ThemeManager(this._getThemeManagerOptions());
  },
  _initCore() {
    const that = this;
    const root = that._renderer.root;
    that._valueChangingLocker = 0;
    that._translator = that._factory.createTranslator();
    that._tracker = that._factory.createTracker({
      renderer: that._renderer,
      container: root
    });
    that._setTrackerCallbacks();
  },
  _beginValueChanging() {
    this._resetIsReady();
    this._onBeginUpdate();
    ++this._valueChangingLocker;
  },
  _endValueChanging() {
    if (--this._valueChangingLocker === 0) {
      this._drawn();
    }
  },
  _setTrackerCallbacks() {
    const that = this;
    const renderer = that._renderer;
    const tooltip = that._tooltip;
    that._tracker.setCallbacks({
      'tooltip-show': function (target, info, callback) {
        const tooltipParameters = target.getTooltipParameters();
        const offset = renderer.getRootOffset();
        const formatObject = _extend({
          value: tooltipParameters.value,
          valueText: tooltip.formatValue(tooltipParameters.value),
          color: tooltipParameters.color
        }, info);
        return tooltip.show(formatObject, {
          x: tooltipParameters.x + offset.left,
          y: tooltipParameters.y + offset.top,
          offset: tooltipParameters.offset
        }, {
          target: info
        }, undefined, callback);
      },
      'tooltip-hide': function () {
        return tooltip.hide();
      }
    });
  },
  _dispose() {
    this._cleanCore();
    this.callBase.apply(this, arguments);
  },
  _disposeCore() {
    const that = this;
    that._themeManager.dispose();
    that._tracker.dispose();
    that._translator = that._tracker = null;
  },
  _cleanCore() {
    this._tracker.deactivate();
    this._noAnimation = false;
    this._cleanContent();
  },
  _renderCore() {
    const that = this;
    if (!that._isValidDomain) return;
    that._renderContent();
    that._renderGraphicObjects();
    that._tracker.setTooltipState(that._tooltip.isEnabled());
    that._tracker.activate();
    that._noAnimation = false;
  },
  _applyChanges() {
    this.callBase.apply(this, arguments);
    this._resizing = this._noAnimation = false;
  },
  _setContentSize() {
    const that = this;
    that._resizing = that._noAnimation = that._changes.count() === 2;
    that.callBase.apply(that, arguments);
  },
  _getChangesRequireCoreUpdate() {
    return ['DOMAIN', 'MOSTLY_TOTAL', 'EXPORT'];
  },
  _isTitleBBoxChanged() {
    var _this$_titleBBoxCache, _this$_titleBBoxCache2, _this$_titleBBoxCache3;
    const titleBBox = this._title.getLayoutOptions();
    const hasTitleHeightChanged = titleBBox.height !== ((_this$_titleBBoxCache = this._titleBBoxCache) === null || _this$_titleBBoxCache === void 0 ? void 0 : _this$_titleBBoxCache.height);
    const hasTitleYChanged = titleBBox.y !== ((_this$_titleBBoxCache2 = this._titleBBoxCache) === null || _this$_titleBBoxCache2 === void 0 ? void 0 : _this$_titleBBoxCache2.y);
    const hasVerticalAlignmentChanged = titleBBox.verticalAlignment !== ((_this$_titleBBoxCache3 = this._titleBBoxCache) === null || _this$_titleBBoxCache3 === void 0 ? void 0 : _this$_titleBBoxCache3.verticalAlignment);
    this._titleBBoxCache = null;
    return hasTitleHeightChanged || hasTitleYChanged || hasVerticalAlignmentChanged;
  },
  _forceCoreUpdate() {
    const isTriggeredByTitleOnly = this._changes.has('TITLE') && !this._getChangesRequireCoreUpdate().some(change => this._changes.has(change));
    if (isTriggeredByTitleOnly) {
      return this._isTitleBBoxChanged();
    }
    return true;
  },
  _applySize(rect) {
    const that = this;
    that._innerRect = {
      left: rect[0],
      top: rect[1],
      right: rect[2],
      bottom: rect[3]
    };
    // If loading indicator is shown it is got hidden at the end of "_renderCore" - during "_drawn". Then "loadingIndicator" option is changed.
    // It causes another "_setContentSize" execution (inside of the first one). Layout backwards during inner "_setContentSize" and clears its cache and
    // then backwards again during outer "_setContentSize" when "_cache" is null - so it fails.
    // The following code dirtily preserves layout cache for the outer backward.
    // The appropriate solution is to remove heavy rendering from "_applySize" - it should be done later during some other change processing.
    // It would be even better to somehow defer any inside option changes - so they all are applied after all changes are processed.
    const layoutCache = that._layout._cache;
    if (that._forceCoreUpdate()) {
      that._cleanCore();
      that._renderCore();
    }
    that._layout._cache = that._layout._cache || layoutCache;
    return [rect[0], that._innerRect.top, rect[2], that._innerRect.bottom];
  },
  _initialChanges: ['DOMAIN'],
  _themeDependentChanges: ['DOMAIN'],
  _optionChangesMap: {
    subtitle: 'MOSTLY_TOTAL',
    indicator: 'MOSTLY_TOTAL',
    geometry: 'MOSTLY_TOTAL',
    animation: 'MOSTLY_TOTAL',
    startValue: 'DOMAIN',
    endValue: 'DOMAIN'
  },
  _optionChangesOrder: ['DOMAIN', 'MOSTLY_TOTAL'],
  _change_DOMAIN() {
    this._setupDomain();
  },
  _change_MOSTLY_TOTAL() {
    this._applyMostlyTotalChange();
  },
  _updateExtraElements: _common.noop,
  _setupDomain() {
    const that = this;
    that._setupDomainCore();
    // T130599
    that._isValidDomain = isFinite(1 / (that._translator.getDomain()[1] - that._translator.getDomain()[0]));
    if (!that._isValidDomain) {
      that._incidentOccurred('W2301');
    }
    that._change(['MOSTLY_TOTAL']);
  },
  _applyMostlyTotalChange() {
    const that = this;
    that._setupCodomain();
    that._setupAnimationSettings();
    that._setupDefaultFormat();
    that._change(['LAYOUT']);
  },
  _setupAnimationSettings() {
    const that = this;
    let option = that.option('animation');
    that._animationSettings = null;
    if (option === undefined || option) {
      option = _extend({
        enabled: true,
        duration: 1000,
        easing: 'easeOutCubic'
      }, option);
      if (option.enabled && option.duration > 0) {
        that._animationSettings = {
          duration: _Number(option.duration),
          easing: option.easing
        };
      }
    }
    //  It is better to place it here than to create separate function for one line of code
    that._containerBackgroundColor = that.option('containerBackgroundColor') || that._themeManager.theme().containerBackgroundColor;
  },
  _setupDefaultFormat() {
    const domain = this._translator.getDomain();
    this._defaultFormatOptions = (0, _utils.getAppropriateFormat)(domain[0], domain[1], this._getApproximateScreenRange());
  },
  _setupDomainCore: null,
  _calculateSize: null,
  _cleanContent: null,
  _renderContent: null,
  _setupCodomain: null,
  _getApproximateScreenRange: null,
  _factory: {
    createTranslator() {
      return new _translator1d.Translator1D();
    },
    createTracker(parameters) {
      return new _tracker.default(parameters);
    }
  }
});
//  TODO: find a better place for it
const formatValue = function (value, options, extra) {
  if (Object.is(value, -0)) {
    value = 0;
  }
  options = options || {};
  const text = _format(value, options.format);
  let formatObject;
  if (typeof options.customizeText === 'function') {
    formatObject = _extend({
      value,
      valueText: text
    }, extra);
    return String(options.customizeText.call(formatObject, formatObject));
  }
  return text;
};
//  TODO: find a better place for it
exports.formatValue = formatValue;
const getSampleText = function (translator, options) {
  // @ts-expect-error
  const text1 = formatValue(translator.getDomainStart(), options);
  // @ts-expect-error
  const text2 = formatValue(translator.getDomainEnd(), options);
  return text1.length >= text2.length ? text1 : text2;
};
exports.getSampleText = getSampleText;
function compareArrays(array1, array2) {
  return array1 && array2 && array1.length === array2.length && compareArraysElements(array1, array2);
}
function compareArraysElements(array1, array2) {
  let i;
  const ii = array1.length;
  let array1ValueIsNaN;
  let array2ValueIsNaN;
  for (i = 0; i < ii; ++i) {
    array1ValueIsNaN = array1[i] !== array1[i];
    array2ValueIsNaN = array2[i] !== array2[i];
    if (array1ValueIsNaN && array2ValueIsNaN) {
      continue;
    }
    if (array1[i] !== array2[i]) return false;
  }
  return true;
}
// PLUGINS_SECTION
BaseGauge.addPlugin(_export.plugin);
BaseGauge.addPlugin(_title.plugin);
BaseGauge.addPlugin(_tooltip.plugin);
BaseGauge.addPlugin(_loading_indicator.plugin);
// These are gauges specifics on using tooltip - they require refactoring.
const _setTooltipOptions = BaseGauge.prototype._setTooltipOptions;
BaseGauge.prototype._setTooltipOptions = function () {
  _setTooltipOptions.apply(this, arguments);
  this._tracker && this._tracker.setTooltipState(this._tooltip.isEnabled());
};
const {
  _change_TITLE
} = BaseGauge.prototype;
BaseGauge.prototype._change_TITLE = function () {
  this._titleBBoxCache = _extends({}, this._title.getLayoutOptions());
  _change_TITLE.apply(this, arguments);
};
