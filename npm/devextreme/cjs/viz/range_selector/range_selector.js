/**
* DevExtreme (cjs/viz/range_selector/range_selector.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _type2 = require("../../core/utils/type");
var _extend = require("../../core/utils/extend");
var _iterator = require("../../core/utils/iterator");
var _utils = require("../core/utils");
var _date = _interopRequireDefault(require("../../core/utils/date"));
var _math = require("../../core/utils/math");
var _range = require("../translators/range");
var _base_axis = require("../axes/base_axis");
var _parse_utils = require("../components/parse_utils");
var _format_helper = _interopRequireDefault(require("../../format_helper"));
var _common = require("./common");
var _sliders_controller = require("./sliders_controller");
var _tracker = require("./tracker");
var _range_view = require("./range_view");
var _series_data_source = require("./series_data_source");
var _tick_generator = require("../axes/tick_generator");
var _axes_constants = _interopRequireDefault(require("../axes/axes_constants"));
var _m_base_widget = _interopRequireDefault(require("../../__internal/viz/core/m_base_widget"));
var _export = require("../core/export");
var _title = require("../core/title");
var _loading_indicator = require("../core/loading_indicator");
var _data_source = require("../core/data_source");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const _max = Math.max;
const _ceil = Math.ceil;
const _floor = Math.floor;
const START_VALUE = 'startValue';
const END_VALUE = 'endValue';
const DATETIME = 'datetime';
const VALUE = 'value';
const DISCRETE = 'discrete';
const SEMIDISCRETE = 'semidiscrete';
const STRING = 'string';
const VALUE_CHANGED = VALUE + 'Changed';
const CONTAINER_BACKGROUND_COLOR = 'containerBackgroundColor';
const SLIDER_MARKER = 'sliderMarker';
const OPTION_BACKGROUND = 'background';
const LOGARITHMIC = 'logarithmic';
const KEEP = 'keep';
const SHIFT = 'shift';
const RESET = 'reset';
const INVISIBLE_POS = -1000;
const SEMIDISCRETE_GRID_SPACING_FACTOR = 50;
const DEFAULT_AXIS_DIVISION_FACTOR = 30;
const DEFAULT_MINOR_AXIS_DIVISION_FACTOR = 15;
const logarithmBase = 10;
function calculateMarkerHeight(renderer, value, sliderMarkerOptions) {
  const formattedText = value === undefined ? _common.consts.emptySliderMarkerText : (0, _common.formatValue)(value, sliderMarkerOptions);
  const textBBox = getTextBBox(renderer, formattedText, sliderMarkerOptions.font);
  return _ceil(textBBox.height) + 2 * sliderMarkerOptions.paddingTopBottom + _common.consts.pointerSize;
}
function calculateScaleLabelHalfWidth(renderer, value, scaleOptions, tickIntervalsInfo) {
  const formattedText = (0, _common.formatValue)(value, scaleOptions.label, tickIntervalsInfo, scaleOptions.valueType, scaleOptions.type, scaleOptions.logarithmBase);
  const textBBox = getTextBBox(renderer, formattedText, scaleOptions.label.font);
  return _ceil(textBBox.width / 2);
}
function calculateIndents(renderer, scale, sliderMarkerOptions, indentOptions, tickIntervalsInfo) {
  let leftMarkerHeight;
  let leftScaleLabelWidth = 0;
  let rightScaleLabelWidth = 0;
  let rightMarkerHeight;
  let placeholderWidthLeft;
  let placeholderWidthRight;
  let placeholderHeight;
  const ticks = scale.type === 'semidiscrete' ? scale.customTicks : tickIntervalsInfo.ticks;
  let startTickValue;
  let endTickValue;
  indentOptions = indentOptions || {};
  placeholderWidthLeft = indentOptions.left;
  placeholderWidthRight = indentOptions.right;
  placeholderHeight = sliderMarkerOptions.placeholderHeight;
  if (sliderMarkerOptions.visible) {
    leftMarkerHeight = calculateMarkerHeight(renderer, scale.startValue, sliderMarkerOptions);
    rightMarkerHeight = calculateMarkerHeight(renderer, scale.endValue, sliderMarkerOptions);
    if (placeholderHeight === undefined) {
      placeholderHeight = _max(leftMarkerHeight, rightMarkerHeight);
    }
  }
  if (scale.label.visible) {
    startTickValue = (0, _type2.isDefined)(scale.startValue) ? ticks[0] : undefined;
    endTickValue = (0, _type2.isDefined)(scale.endValue) ? ticks[ticks.length - 1] : undefined;
    leftScaleLabelWidth = calculateScaleLabelHalfWidth(renderer, startTickValue, scale, tickIntervalsInfo);
    rightScaleLabelWidth = calculateScaleLabelHalfWidth(renderer, endTickValue, scale, tickIntervalsInfo);
  }
  placeholderWidthLeft = placeholderWidthLeft !== undefined ? placeholderWidthLeft : leftScaleLabelWidth;
  placeholderWidthRight = (placeholderWidthRight !== undefined ? placeholderWidthRight : rightScaleLabelWidth) || 1; // T240698

  return {
    left: placeholderWidthLeft,
    right: placeholderWidthRight,
    top: placeholderHeight || 0,
    bottom: 0
  };
}
function calculateValueType(firstValue, secondValue) {
  const typeFirstValue = (0, _type2.type)(firstValue);
  const typeSecondValue = (0, _type2.type)(secondValue);
  const validType = function (type) {
    return typeFirstValue === type || typeSecondValue === type;
  };
  return validType('date') ? DATETIME : validType('number') ? 'numeric' : validType(STRING) ? STRING : '';
}
function showScaleMarkers(scaleOptions) {
  return scaleOptions.valueType === DATETIME && scaleOptions.marker.visible;
}
function updateTranslatorRangeInterval(translatorRange, scaleOptions) {
  let intervalX = scaleOptions.minorTickInterval || scaleOptions.tickInterval;
  if (scaleOptions.valueType === 'datetime') {
    intervalX = _date.default.dateToMilliseconds(intervalX);
  }
  translatorRange.addRange({
    interval: intervalX
  });
}
function checkLogarithmicOptions(options, defaultLogarithmBase, incidentOccurred) {
  if (!options) {
    return;
  }
  const logarithmBase = options.logarithmBase;
  if (options.type === LOGARITHMIC && logarithmBase <= 0 || logarithmBase && !(0, _type2.isNumeric)(logarithmBase)) {
    options.logarithmBase = defaultLogarithmBase;
    incidentOccurred('E2104');
  } else if (options.type !== LOGARITHMIC) {
    options.logarithmBase = undefined;
  }
}
function calculateScaleAreaHeight(renderer, scaleOptions, visibleMarkers, tickIntervalsInfo) {
  const labelScaleOptions = scaleOptions.label;
  const markerScaleOptions = scaleOptions.marker;
  const placeholderHeight = scaleOptions.placeholderHeight;
  const ticks = scaleOptions.type === 'semidiscrete' ? scaleOptions.customTicks : tickIntervalsInfo.ticks;
  const text = (0, _common.formatValue)(ticks[0], labelScaleOptions);
  if (placeholderHeight) {
    return placeholderHeight;
  } else {
    return (labelScaleOptions.visible ? labelScaleOptions.topIndent + getTextBBox(renderer, text, labelScaleOptions.font).height : 0) + (visibleMarkers ? markerScaleOptions.topIndent + markerScaleOptions.separatorHeight : 0);
  }
}
function getMinorTickIntervalUnit(tickInterval, minorTickInterval, withCorrection) {
  let interval = _date.default.getDateUnitInterval(minorTickInterval);
  const majorUnit = _date.default.getDateUnitInterval(tickInterval);
  const idx = _date.default.dateUnitIntervals.indexOf(interval);
  if (withCorrection && interval === majorUnit && idx > 0) {
    interval = _date.default.dateUnitIntervals[idx - 1];
  }
  return interval;
}
function getNextTickInterval(tickInterval, minorTickInterval, isDateType) {
  if (!tickInterval) {
    tickInterval = minorTickInterval;
  } else {
    if (isDateType) {
      tickInterval = _date.default.getNextDateUnit(tickInterval);
    } else {
      tickInterval += minorTickInterval;
    }
  }
  return tickInterval;
}
function calculateTickIntervalsForSemidiscreteScale(scaleOptions, min, max, screenDelta) {
  const minorTickInterval = scaleOptions.minorTickInterval;
  let tickInterval = scaleOptions.tickInterval;
  let interval;
  const isDateType = scaleOptions.valueType === 'datetime';
  const gridSpacingFactor = scaleOptions.axisDivisionFactor || {};
  let tickCountByInterval;
  let tickCountByScreen;
  if (!tickInterval) {
    do {
      interval = getNextTickInterval(tickInterval, minorTickInterval, isDateType);
      if (tickInterval !== interval) {
        tickInterval = interval;
      } else {
        break;
      }
      if (isDateType) {
        interval = _date.default.dateToMilliseconds(tickInterval);
      }
      tickCountByInterval = _ceil((max - min) / interval);
      tickCountByScreen = _floor(screenDelta / (gridSpacingFactor[tickInterval] || SEMIDISCRETE_GRID_SPACING_FACTOR)) || 1;
    } while (interval && tickCountByInterval > tickCountByScreen);
  }
  return {
    tickInterval: tickInterval,
    minorTickInterval: minorTickInterval,
    bounds: {
      minVisible: min,
      maxVisible: max
    },
    ticks: []
  };
}
function updateTickIntervals(scaleOptions, screenDelta, incidentOccurred, range) {
  let result;
  const min = (0, _type2.isDefined)(range.minVisible) ? range.minVisible : range.min;
  const max = (0, _type2.isDefined)(range.maxVisible) ? range.maxVisible : range.max;
  const categoriesInfo = scaleOptions._categoriesInfo;
  let ticksInfo;
  let length;
  const bounds = {};
  if (scaleOptions.type === SEMIDISCRETE) {
    result = calculateTickIntervalsForSemidiscreteScale(scaleOptions, min, max, screenDelta);
  } else {
    ticksInfo = (0, _tick_generator.tickGenerator)({
      axisType: scaleOptions.type,
      dataType: scaleOptions.valueType,
      logBase: scaleOptions.logarithmBase,
      allowNegatives: true,
      linearThreshold: Math.abs(scaleOptions.linearThreshold || 0),
      axisDivisionFactor: scaleOptions.axisDivisionFactor,
      minorAxisDivisionFactor: scaleOptions.minorAxisDivisionFactor,
      calculateMinors: true,
      allowDecimals: scaleOptions.allowDecimals,
      endOnTick: scaleOptions.endOnTick,
      incidentOccurred: incidentOccurred,
      rangeIsEmpty: range.isEmpty()
    })({
      min: min,
      max: max,
      categories: (0, _type2.isDefined)(categoriesInfo) ? categoriesInfo.categories : []
    }, screenDelta, scaleOptions.tickInterval, scaleOptions.forceUserTickInterval, undefined, scaleOptions.minorTickInterval, scaleOptions.minorTickCount);
    length = ticksInfo.ticks.length;
    bounds.minVisible = ticksInfo.ticks[0] < min ? ticksInfo.ticks[0] : min;
    bounds.maxVisible = ticksInfo.ticks[length - 1] > max ? ticksInfo.ticks[length - 1] : max;
    result = {
      tickInterval: ticksInfo.tickInterval,
      minorTickInterval: scaleOptions.minorTickInterval === 0 ? 0 : ticksInfo.minorTickInterval,
      bounds: bounds,
      ticks: ticksInfo.ticks
    };
  }
  return result;
}
function getFirstDayOfWeek(options) {
  var _options$workWeek;
  return (_options$workWeek = options.workWeek) === null || _options$workWeek === void 0 ? void 0 : _options$workWeek[0];
}
function calculateTranslatorRange(seriesDataSource, scaleOptions) {
  let minValue;
  let maxValue;
  let inverted = false;
  let startValue = scaleOptions.startValue;
  let endValue = scaleOptions.endValue;
  let categories;
  let categoriesInfo;
  // TODO: There should be something like "seriesDataSource.getArgumentRange()"
  let translatorRange = seriesDataSource ? seriesDataSource.getBoundRange().arg : new _range.Range();
  let rangeForCategories;
  const isDate = scaleOptions.valueType === 'datetime';
  const firstDayOfWeek = getFirstDayOfWeek(scaleOptions);
  const minRange = scaleOptions.minRange;
  if (scaleOptions.type === DISCRETE) {
    rangeForCategories = new _range.Range({
      minVisible: startValue,
      maxVisible: endValue
    });
    rangeForCategories.addRange(translatorRange);
    translatorRange = rangeForCategories;
    categories = seriesDataSource ? seriesDataSource.argCategories : scaleOptions.categories || startValue && endValue && [startValue, endValue];
    categories = categories || [];
    scaleOptions._categoriesInfo = categoriesInfo = (0, _utils.getCategoriesInfo)(categories, startValue, endValue);
  }
  if (scaleOptions.type === SEMIDISCRETE) {
    startValue = scaleOptions.startValue = correctValueByInterval(scaleOptions.startValue, isDate, minRange, firstDayOfWeek);
    endValue = scaleOptions.endValue = correctValueByInterval(scaleOptions.endValue, isDate, minRange, firstDayOfWeek);
    translatorRange.minVisible = correctValueByInterval(translatorRange.minVisible, isDate, minRange, firstDayOfWeek);
    translatorRange.maxVisible = correctValueByInterval(translatorRange.maxVisible, isDate, minRange, firstDayOfWeek);
    translatorRange.min = correctValueByInterval(translatorRange.min, isDate, minRange, firstDayOfWeek);
    translatorRange.max = correctValueByInterval(translatorRange.max, isDate, minRange, firstDayOfWeek);
  }
  if ((0, _type2.isDefined)(startValue) && (0, _type2.isDefined)(endValue)) {
    inverted = categoriesInfo ? categoriesInfo.inverted : startValue > endValue;
    minValue = categoriesInfo ? categoriesInfo.start : inverted ? endValue : startValue;
    maxValue = categoriesInfo ? categoriesInfo.end : inverted ? startValue : endValue;
  } else if ((0, _type2.isDefined)(startValue) || (0, _type2.isDefined)(endValue)) {
    minValue = startValue;
    maxValue = endValue;
  } else if (categoriesInfo) {
    minValue = categoriesInfo.start;
    maxValue = categoriesInfo.end;
  }
  translatorRange.addRange({
    invert: inverted,
    min: minValue,
    max: maxValue,
    minVisible: minValue,
    maxVisible: maxValue,
    dataType: scaleOptions.valueType
  });
  translatorRange.addRange({
    categories: !seriesDataSource ? categories : undefined,
    base: scaleOptions.logarithmBase,
    axisType: scaleOptions.type,
    dataType: scaleOptions.valueType
  });
  seriesDataSource && translatorRange.sortCategories(categories);
  return translatorRange;
}
function startEndNotDefined(start, end) {
  return !(0, _type2.isDefined)(start) || !(0, _type2.isDefined)(end);
}
function getTextBBox(renderer, text, fontOptions) {
  const textElement = renderer.text(text, INVISIBLE_POS, INVISIBLE_POS).css((0, _utils.patchFontOptions)(fontOptions)).append(renderer.root);
  const textBBox = textElement.getBBox();
  textElement.remove();
  return textBBox;
}
function getDateMarkerVisibilityChecker(screenDelta) {
  return function (isDateScale, isMarkerVisible, min, max, tickInterval) {
    if (isMarkerVisible && isDateScale) {
      if (!(0, _type2.isDefined)(tickInterval) || tickInterval.years || tickInterval.months >= 6 || screenDelta / SEMIDISCRETE_GRID_SPACING_FACTOR < _ceil((max - min) / _date.default.dateToMilliseconds('year')) + 1) {
        isMarkerVisible = false;
      }
    }
    return isMarkerVisible;
  };
}
function updateScaleOptions(scaleOptions, seriesDataSource, translatorRange, tickIntervalsInfo, checkDateMarkerVisibility) {
  let bounds;
  let isEmptyInterval;
  const categoriesInfo = scaleOptions._categoriesInfo;
  let intervals;
  const isDateTime = scaleOptions.valueType === DATETIME;
  if (seriesDataSource && !seriesDataSource.isEmpty() && !translatorRange.isEmpty()) {
    bounds = tickIntervalsInfo.bounds;
    translatorRange.addRange(bounds);
    scaleOptions.startValue = translatorRange.invert ? bounds.maxVisible : bounds.minVisible;
    scaleOptions.endValue = translatorRange.invert ? bounds.minVisible : bounds.maxVisible;
  }
  scaleOptions.marker.visible = checkDateMarkerVisibility(isDateTime && scaleOptions.type.indexOf(DISCRETE) === -1, scaleOptions.marker.visible, scaleOptions.startValue, scaleOptions.endValue, tickIntervalsInfo.tickInterval);
  if (categoriesInfo) {
    scaleOptions.startValue = categoriesInfo.start;
    scaleOptions.endValue = categoriesInfo.end;
  }
  if (scaleOptions.type.indexOf(DISCRETE) === -1) {
    isEmptyInterval = (0, _type2.isDate)(scaleOptions.startValue) && (0, _type2.isDate)(scaleOptions.endValue) && scaleOptions.startValue.getTime() === scaleOptions.endValue.getTime() || scaleOptions.startValue === scaleOptions.endValue;
  }
  scaleOptions.isEmpty = startEndNotDefined(scaleOptions.startValue, scaleOptions.endValue) || isEmptyInterval;
  if (scaleOptions.isEmpty) {
    scaleOptions.startValue = scaleOptions.endValue = undefined;
  } else {
    scaleOptions.minorTickInterval = tickIntervalsInfo.minorTickInterval;
    scaleOptions.tickInterval = tickIntervalsInfo.tickInterval;
    if (isDateTime && (!(0, _type2.isDefined)(scaleOptions.label.format) || scaleOptions.type === SEMIDISCRETE && scaleOptions.minorTickInterval !== scaleOptions.tickInterval)) {
      if (scaleOptions.type === DISCRETE) {
        scaleOptions.label.format = _format_helper.default.getDateFormatByTicks(tickIntervalsInfo.ticks);
      } else {
        if (!scaleOptions.marker.visible) {
          scaleOptions.label.format = _format_helper.default.getDateFormatByTickInterval(scaleOptions.startValue, scaleOptions.endValue, scaleOptions.tickInterval);
        } else {
          scaleOptions.label.format = _date.default.getDateFormatByTickInterval(scaleOptions.tickInterval);
        }
      }
    }
  }
  if (scaleOptions.type === SEMIDISCRETE) {
    intervals = getIntervalCustomTicks(scaleOptions);
    scaleOptions.customMinorTicks = intervals.altIntervals;
    scaleOptions.customTicks = intervals.intervals;
    scaleOptions.customBoundTicks = [scaleOptions.customTicks[0]];
  }
}
function prepareScaleOptions(scaleOption, calculatedValueType, incidentOccurred, containerColor) {
  let parsedValue = 0;
  let valueType = (0, _parse_utils.correctValueType)((0, _utils.normalizeEnum)(scaleOption.valueType));
  const validateStartEndValues = function (field, parser) {
    const messageToIncidentOccurred = field === START_VALUE ? 'start' : 'end';
    if ((0, _type2.isDefined)(scaleOption[field])) {
      parsedValue = parser(scaleOption[field]);
      if ((0, _type2.isDefined)(parsedValue)) {
        scaleOption[field] = parsedValue;
      } else {
        scaleOption[field] = undefined;
        incidentOccurred('E2202', [messageToIncidentOccurred]);
      }
    }
  };
  valueType = calculatedValueType || valueType;
  if (!valueType) {
    valueType = calculateValueType(scaleOption.startValue, scaleOption.endValue) || 'numeric';
  }
  if (valueType === STRING || scaleOption.categories) {
    scaleOption.type = DISCRETE;
    valueType = STRING;
  }
  scaleOption.containerColor = containerColor;
  scaleOption.valueType = valueType;
  scaleOption.dataType = valueType;
  const parser = (0, _parse_utils.getParser)(valueType);
  validateStartEndValues(START_VALUE, parser);
  validateStartEndValues(END_VALUE, parser);
  checkLogarithmicOptions(scaleOption, logarithmBase, incidentOccurred);
  if (!scaleOption.type) {
    scaleOption.type = 'continuous';
  }
  scaleOption.parser = parser;
  if (scaleOption.type === SEMIDISCRETE) {
    scaleOption.minorTick.visible = false;
    scaleOption.minorTickInterval = scaleOption.minRange;
    scaleOption.marker.visible = false;
    scaleOption.maxRange = undefined;
  }
  scaleOption.forceUserTickInterval |= (0, _type2.isDefined)(scaleOption.tickInterval) && !(0, _type2.isDefined)(scaleOption.axisDivisionFactor);
  scaleOption.axisDivisionFactor = (0, _type2.isDefined)(scaleOption.axisDivisionFactor) ? scaleOption.axisDivisionFactor : DEFAULT_AXIS_DIVISION_FACTOR;
  scaleOption.minorAxisDivisionFactor = (0, _type2.isDefined)(scaleOption.minorAxisDivisionFactor) ? scaleOption.minorAxisDivisionFactor : DEFAULT_MINOR_AXIS_DIVISION_FACTOR;
  return scaleOption;
}
function correctValueByInterval(value, isDate, interval, firstDayOfWeek) {
  if ((0, _type2.isDefined)(value)) {
    value = isDate ? _date.default.correctDateWithUnitBeginning(new Date(value), interval, null, firstDayOfWeek) : (0, _math.adjust)(_floor((0, _math.adjust)(value / interval)) * interval);
  }
  return value;
}
function getIntervalCustomTicks(options) {
  let min = options.startValue;
  let max = options.endValue;
  const isDate = options.valueType === 'datetime';
  const firstDayOfWeek = getFirstDayOfWeek(options);
  const tickInterval = options.tickInterval;
  const res = {
    intervals: []
  };
  if (!(0, _type2.isDefined)(min) || !(0, _type2.isDefined)(max)) {
    return res;
  }
  res.intervals = _date.default.getSequenceByInterval(min, max, options.minorTickInterval);
  if (tickInterval !== options.minorTickInterval) {
    res.altIntervals = res.intervals;
    min = correctValueByInterval(min, isDate, tickInterval, firstDayOfWeek);
    max = correctValueByInterval(max, isDate, tickInterval, firstDayOfWeek);
    res.intervals = _date.default.getSequenceByInterval(min, max, tickInterval);
    res.intervals[0] = res.altIntervals[0];
  }
  return res;
}
function getPrecisionForSlider(startValue, endValue, screenDelta) {
  const d = Math.abs(endValue - startValue) / screenDelta;
  const tail = d - _floor(d);
  return tail > 0 ? _ceil(Math.abs((0, _math.adjust)((0, _utils.getLog)(tail, 10)))) : 0;
}
const dxRangeSelector = _m_base_widget.default.inherit({
  _toggleParentsScrollSubscription() {},
  _eventsMap: {
    'onValueChanged': {
      name: VALUE_CHANGED
    }
  },
  _rootClassPrefix: 'dxrs',
  _rootClass: 'dxrs-range-selector',
  _dataIsReady: function () {
    return this._dataIsLoaded();
  },
  _initialChanges: ['DATA_SOURCE', 'VALUE'],
  _themeDependentChanges: ['MOSTLY_TOTAL'],
  _themeSection: 'rangeSelector',
  _fontFields: ['scale.label.font', 'sliderMarker.font'],
  _initCore: function () {
    const that = this;
    const renderer = that._renderer;
    const root = renderer.root;

    // TODO: Move it to the SlidersEventManager
    root.css({
      'touch-action': 'pan-y'
    });

    // RangeContainer
    that._clipRect = renderer.clipRect(); // TODO: Try to remove it
    // TODO: Groups could be created by the corresponding components
    const rangeViewGroup = renderer.g().attr({
      'class': 'dxrs-view'
    }).append(root);
    const slidersGroup = renderer.g().attr({
      'class': 'dxrs-slidersContainer',
      'clip-path': that._clipRect.id
    }).append(root);
    const scaleGroup = renderer.g().attr({
      'class': 'dxrs-scale',
      'clip-path': that._clipRect.id
    }).append(root);
    const labelsAxesGroup = renderer.g().attr({
      'class': 'dxrs-scale-elements',
      'clip-path': that._clipRect.id
    }).append(root);
    const scaleBreaksGroup = renderer.g().attr({
      'class': 'dxrs-scale-breaks'
    }).append(root);
    const trackersGroup = renderer.g().attr({
      'class': 'dxrs-trackers'
    }).append(root);
    that._axis = new AxisWrapper({
      renderer: renderer,
      root: scaleGroup,
      scaleBreaksGroup: scaleBreaksGroup,
      labelsAxesGroup: labelsAxesGroup,
      updateSelectedRange: function (range, e) {
        that.setValue((0, _utils.convertVisualRangeObject)(range), e);
      },
      incidentOccurred: that._incidentOccurred
    });
    that._rangeView = new _range_view.RangeView({
      renderer: renderer,
      root: rangeViewGroup,
      translator: that._axis.getTranslator()
    });
    that._slidersController = new _sliders_controller.SlidersController({
      renderer: renderer,
      root: slidersGroup,
      trackersGroup: trackersGroup,
      updateSelectedRange: function (range, lastSelectedRange, e) {
        if (!that._rangeOption) {
          that.option(VALUE, (0, _utils.convertVisualRangeObject)(range, (0, _type2.isPlainObject)(that._options.silent(VALUE))));
        }
        that._eventTrigger(VALUE_CHANGED, {
          value: (0, _utils.convertVisualRangeObject)(range),
          previousValue: (0, _utils.convertVisualRangeObject)(lastSelectedRange),
          event: e
        });
      },
      axis: that._axis,
      translator: that._axis.getTranslator()
    });
    that._tracker = new _tracker.Tracker({
      renderer: renderer,
      controller: that._slidersController
    });
  },
  _getDefaultSize: function () {
    return {
      width: 400,
      height: 160
    };
  },
  _disposeCore: function () {
    this._axis.dispose();
    this._slidersController.dispose();
    this._tracker.dispose();
  },
  _applySize: function (rect) {
    this._clientRect = rect.slice();
    this._change(['MOSTLY_TOTAL']);
  },
  _optionChangesMap: {
    scale: 'SCALE',
    value: 'VALUE',
    dataSource: 'DATA_SOURCE'
  },
  _optionChangesOrder: ['SCALE', 'DATA_SOURCE'],
  _change_SCALE: function () {
    this._change(['MOSTLY_TOTAL']);
  },
  _setValueByDataSource() {
    const that = this;
    const options = that._options.silent();
    const axis = that._axis;
    if (options.dataSource) {
      let selectedRangeUpdateMode = that.option('selectedRangeUpdateMode');
      const value = that.getValue();
      const valueIsReady = (0, _type2.isDefined)(value[0]) && (0, _type2.isDefined)(value[1]);
      if ((0, _type2.isDefined)(selectedRangeUpdateMode)) {
        selectedRangeUpdateMode = (0, _utils.normalizeEnum)(selectedRangeUpdateMode);
        that.__skipAnimation = true;
      } else if (valueIsReady && !that._dataSourceIsAsync) {
        // T696409 T930471
        selectedRangeUpdateMode = RESET;
      }
      if (selectedRangeUpdateMode === 'auto' && valueIsReady) {
        const rangesInfo = axis.allScaleSelected(value);
        if (rangesInfo.startValue && rangesInfo.endValue) {
          selectedRangeUpdateMode = RESET;
        } else if (rangesInfo.endValue) {
          selectedRangeUpdateMode = SHIFT;
        } else {
          selectedRangeUpdateMode = KEEP;
        }
      }
      if (selectedRangeUpdateMode === RESET) {
        options[VALUE] = null;
      } else if (selectedRangeUpdateMode === SHIFT && valueIsReady) {
        const value = that.getValue();
        that.__skipAnimation = true;
        options[VALUE] = {
          length: axis.getVisualRangeLength({
            minVisible: value[0],
            maxVisible: value[1]
          })
        };
      } else if (selectedRangeUpdateMode === KEEP) {
        that.__skipAnimation = true;
      }
    }
    that._dataSourceIsAsync = undefined;
  },
  _change_DATA_SOURCE: function () {
    if (this._options.silent('dataSource')) {
      this._updateDataSource();
    }
  },
  _customChangesOrder: ['MOSTLY_TOTAL', 'VALUE', 'SLIDER_SELECTION'],
  _change_MOSTLY_TOTAL: function () {
    this._applyMostlyTotalChange();
  },
  _change_SLIDER_SELECTION: function () {
    const that = this;
    const value = that._options.silent(VALUE);
    that._slidersController.setSelectedRange(value && (0, _utils.getVizRangeObject)(value));
  },
  _change_VALUE: function () {
    const that = this;
    const option = that._rangeOption;
    that._dataSourceIsAsync = !that._dataIsReady();
    if (option) {
      that._options.silent(VALUE, option);
      that.setValue(option);
    }
  },
  _validateRange: function (start, end) {
    const ensureValueInvalid = value => (0, _type2.isDefined)(value) && !this._axis.getTranslator().isValid(value);
    if (this._dataIsReady() && (ensureValueInvalid(start) || ensureValueInvalid(end))) {
      this._incidentOccurred('E2203');
    }
  },
  _applyChanges: function () {
    const that = this;
    const value = that._options.silent(VALUE);
    if (that._changes.has('VALUE') && value) {
      that._rangeOption = value;
    }
    that.callBase.apply(that, arguments);
    that._rangeOption = null;
    that.__isResizing = that.__skipAnimation = false;
  },
  _applyMostlyTotalChange: function () {
    const that = this;
    const renderer = that._renderer;
    const rect = that._clientRect;
    let currentAnimationEnabled;
    const canvas = {
      left: rect[0],
      top: rect[1],
      width: rect[2] - rect[0],
      height: rect[3] - rect[1]
    };
    if (that.__isResizing || that.__skipAnimation) {
      currentAnimationEnabled = renderer.animationEnabled();
      renderer.updateAnimationOptions({
        enabled: false
      });
    }
    that._clipRect.attr({
      x: rect[0],
      y: rect[1],
      width: rect[2] - rect[0],
      height: rect[3] - rect[1]
    });
    that._axis.getTranslator().update(new _range.Range(), canvas, {
      isHorizontal: true
    });
    that._updateContent({
      left: rect[0],
      top: rect[1],
      width: rect[2] - rect[0],
      height: rect[3] - rect[1]
    });
    if (that.__isResizing || that.__skipAnimation) {
      renderer.updateAnimationOptions({
        enabled: currentAnimationEnabled
      });
    }
    that._drawn();
  },
  _dataSourceChangedHandler: function () {
    this._setValueByDataSource();
    this._requestChange(['MOSTLY_TOTAL']);
  },
  // It seems that we REALLY like to translate option structures from one form to another.
  // TODO: The more appropriate way is the following:
  // that._rangeView.update([
  //     that._getOption("background"),
  //     that._getOption("chart"),
  //     that.option("dataSource")
  // ]);
  // that._slidersController.update([
  //     that._getOption("sliderHandle"),
  //     that._getOption("sliderMarker"),
  //     that._getOption("shutter"),
  //     that._getOption("behavior")
  // ]);
  // that._axis.update(that._getOption("scale"));
  _completeSeriesDataSourceCreation(scaleOptions, seriesDataSource) {
    const rect = this._clientRect;
    const canvas = {
      left: rect[0],
      top: rect[1],
      width: rect[2] - rect[0],
      height: rect[3] - rect[1]
    };
    this._axis.updateOptions((0, _extend.extend)({}, scaleOptions, {
      isHorizontal: true,
      label: {}
    }));
    seriesDataSource.isShowChart() && this._axis.setMarginOptions(seriesDataSource.getMarginOptions(canvas));
    this._axis.updateCanvas(canvas);
    seriesDataSource.createPoints();
  },
  _updateContent: function (canvas) {
    const that = this;
    const chartOptions = that.option('chart');
    const seriesDataSource = that._createSeriesDataSource(chartOptions);
    const isCompactMode = !(seriesDataSource && seriesDataSource.isShowChart() || that.option('background.image.url'));
    const scaleOptions = prepareScaleOptions(that._getOption('scale'), seriesDataSource && seriesDataSource.getCalculatedValueType(), that._incidentOccurred, this._getOption('containerBackgroundColor', true));
    seriesDataSource && that._completeSeriesDataSourceCreation(scaleOptions, seriesDataSource);
    const argTranslatorRange = calculateTranslatorRange(seriesDataSource, scaleOptions);
    const tickIntervalsInfo = updateTickIntervals(scaleOptions, canvas.width, that._incidentOccurred, argTranslatorRange);
    const chartThemeManager = seriesDataSource && seriesDataSource.isShowChart() && seriesDataSource.getThemeManager();
    if (chartThemeManager) {
      // TODO: Looks like usage of "chartThemeManager" can be replaced with "that._getOption("chart").valueAxis.logarithmBase - check it
      checkLogarithmicOptions(chartOptions && chartOptions.valueAxis, chartThemeManager.getOptions('valueAxis').logarithmBase, that._incidentOccurred);
    }
    updateScaleOptions(scaleOptions, seriesDataSource, argTranslatorRange, tickIntervalsInfo, getDateMarkerVisibilityChecker(canvas.width));
    updateTranslatorRangeInterval(argTranslatorRange, scaleOptions);
    const sliderMarkerOptions = that._prepareSliderMarkersOptions(scaleOptions, canvas.width, tickIntervalsInfo, argTranslatorRange);
    const indents = calculateIndents(that._renderer, scaleOptions, sliderMarkerOptions, that.option('indent'), tickIntervalsInfo);
    const rangeContainerCanvas = {
      left: canvas.left + indents.left,
      top: canvas.top + indents.top,
      width: canvas.left + indents.left + _max(canvas.width - indents.left - indents.right, 1),
      height: _max(!isCompactMode ? canvas.height - indents.top - indents.bottom - calculateScaleAreaHeight(that._renderer, scaleOptions, showScaleMarkers(scaleOptions), tickIntervalsInfo) : _common.HEIGHT_COMPACT_MODE, 0),
      right: 0,
      bottom: 0
    };

    // TODO: There should be one call to some axis method (not 4 methods)
    that._axis.update(scaleOptions, isCompactMode, rangeContainerCanvas, argTranslatorRange, seriesDataSource);
    scaleOptions.minorTickInterval = scaleOptions.isEmpty ? 0 : scaleOptions.minorTickInterval;

    // RangeContainer
    that._updateElements(scaleOptions, sliderMarkerOptions, isCompactMode, rangeContainerCanvas, seriesDataSource);
    if (chartThemeManager) {
      chartThemeManager.dispose(); // TODO: Move it inside "SeriesDataSource"
    }
  },
  _updateElements: function (scaleOptions, sliderMarkerOptions, isCompactMode, canvas, seriesDataSource) {
    const that = this;
    const behavior = that._getOption('behavior');
    const shutterOptions = that._getOption('shutter');
    const isNotSemiDiscrete = scaleOptions.type !== SEMIDISCRETE;
    shutterOptions.color = shutterOptions.color || that._getOption(CONTAINER_BACKGROUND_COLOR, true);
    that._rangeView.update(that.option('background'), that._themeManager.theme('background'), canvas, isCompactMode, behavior.animationEnabled && that._renderer.animationEnabled(), seriesDataSource);

    // TODO: Is entire options bag really needed for SlidersContainer?
    that._isUpdating = true;
    that._slidersController.update([canvas.top, canvas.top + canvas.height], behavior, isCompactMode, that._getOption('sliderHandle'), sliderMarkerOptions, shutterOptions, {
      minRange: isNotSemiDiscrete ? that.option('scale.minRange') : undefined,
      maxRange: isNotSemiDiscrete ? that.option('scale.maxRange') : undefined
    }, that._axis.getFullTicks(), that._getOption('selectedRangeColor', true));
    that._requestChange(['SLIDER_SELECTION']);
    that._isUpdating = false;
    that._tracker.update(!that._axis.getTranslator().getBusinessRange().isEmpty(), behavior);
  },
  _createSeriesDataSource: function (chartOptions) {
    const that = this;
    let seriesDataSource;
    const dataSource = that._dataSourceItems(); // TODO: This code can be executed when data source is not loaded (it is an error)!
    const scaleOptions = that._getOption('scale');
    const valueType = scaleOptions.valueType || calculateValueType(scaleOptions.startValue, scaleOptions.endValue);
    const valueAxis = new _base_axis.Axis({
      renderer: that._renderer,
      axisType: 'xyAxes',
      drawingType: 'linear'
    });
    valueAxis.updateOptions({
      isHorizontal: false,
      label: {},
      categoriesSortingMethod: that._getOption('chart').valueAxis.categoriesSortingMethod
    });
    if (dataSource || chartOptions && chartOptions.series) {
      chartOptions = (0, _extend.extend)({}, chartOptions, {
        theme: that.option('theme')
      });
      seriesDataSource = new _series_data_source.SeriesDataSource({
        renderer: that._renderer,
        dataSource: dataSource,
        valueType: (0, _utils.normalizeEnum)(valueType),
        axisType: scaleOptions.type,
        chart: chartOptions,
        dataSourceField: that.option('dataSourceField'),
        incidentOccurred: that._incidentOccurred,
        categories: scaleOptions.categories,
        argumentAxis: that._axis,
        valueAxis: valueAxis
      });
    }
    return seriesDataSource;
  },
  _prepareSliderMarkersOptions: function (scaleOptions, screenDelta, tickIntervalsInfo, argRange) {
    const that = this;
    const minorTickInterval = tickIntervalsInfo.minorTickInterval;
    const tickInterval = tickIntervalsInfo.tickInterval;
    let interval = tickInterval;
    const endValue = scaleOptions.endValue;
    const startValue = scaleOptions.startValue;
    const sliderMarkerOptions = that._getOption(SLIDER_MARKER);
    const doNotSnap = !that._getOption('behavior').snapToTicks;
    const isTypeDiscrete = scaleOptions.type === DISCRETE;
    const isValueTypeDatetime = scaleOptions.valueType === DATETIME;
    sliderMarkerOptions.borderColor = that._getOption(CONTAINER_BACKGROUND_COLOR, true);
    if (!sliderMarkerOptions.format && !argRange.isEmpty()) {
      if (doNotSnap && (0, _type2.isNumeric)(scaleOptions.startValue)) {
        sliderMarkerOptions.format = {
          type: 'fixedPoint',
          precision: getPrecisionForSlider(startValue, endValue, screenDelta)
        };
      }
      if (isValueTypeDatetime && !isTypeDiscrete) {
        if ((0, _type2.isDefined)(minorTickInterval) && minorTickInterval !== 0) {
          interval = getMinorTickIntervalUnit(tickInterval, minorTickInterval, doNotSnap);
        }
        if (!scaleOptions.marker.visible) {
          if ((0, _type2.isDefined)(startValue) && (0, _type2.isDefined)(endValue)) {
            sliderMarkerOptions.format = _format_helper.default.getDateFormatByTickInterval(startValue, endValue, interval);
          }
        } else {
          sliderMarkerOptions.format = _date.default.getDateFormatByTickInterval(interval);
        }
      }
      // T347293
      if (isValueTypeDatetime && isTypeDiscrete && tickIntervalsInfo.ticks.length) {
        sliderMarkerOptions.format = _format_helper.default.getDateFormatByTicks(tickIntervalsInfo.ticks);
      }
    }
    return sliderMarkerOptions;
  },
  getValue: function () {
    return (0, _utils.convertVisualRangeObject)(this._slidersController.getSelectedRange());
  },
  setValue: function (value, e) {
    const visualRange = (0, _utils.getVizRangeObject)(value);
    if (!this._isUpdating && value) {
      this._validateRange(visualRange.startValue, visualRange.endValue);
      !(0, _utils.rangesAreEqual)(visualRange, this._slidersController.getSelectedRange()) && this._slidersController.setSelectedRange(visualRange, e);
    }
  },
  _setContentSize: function () {
    this.__isResizing = this._changes.count() === 2;
    this.callBase.apply(this, arguments);
  }
});
(0, _iterator.each)(['selectedRangeColor', 'containerBackgroundColor', 'sliderMarker', 'sliderHandle', 'shutter', OPTION_BACKGROUND, 'behavior', 'chart', 'indent'], function (_, name) {
  dxRangeSelector.prototype._optionChangesMap[name] = 'MOSTLY_TOTAL';
});

// AxisWrapper

function prepareAxisOptions(scaleOptions, isCompactMode, height, axisPosition) {
  scaleOptions.marker.label.font = scaleOptions.label.font;
  scaleOptions.color = scaleOptions.marker.color = scaleOptions.tick.color;
  scaleOptions.opacity = scaleOptions.marker.opacity = scaleOptions.tick.opacity;
  scaleOptions.width = scaleOptions.marker.width = scaleOptions.tick.width;
  scaleOptions.placeholderSize = (scaleOptions.placeholderHeight || 0) + axisPosition;
  scaleOptions.argumentType = scaleOptions.valueType;
  scaleOptions.visible = isCompactMode;
  scaleOptions.isHorizontal = true;
  scaleOptions.calculateMinors = true;
  scaleOptions.semiDiscreteInterval = scaleOptions.minRange;
  if (!isCompactMode) {
    scaleOptions.minorTick.length = scaleOptions.tick.length = height;
  }
  scaleOptions.label.indentFromAxis = scaleOptions.label.topIndent + axisPosition;
  return scaleOptions;
}
function createDateMarkersEvent(scaleOptions, markerTrackers, setSelectedRange) {
  (0, _iterator.each)(markerTrackers, function (_, value) {
    value.on('dxpointerdown', onPointerDown);
  });
  function onPointerDown(e) {
    const range = e.target.range;
    const minRange = scaleOptions.minRange ? _date.default.addInterval(range.startValue, scaleOptions.minRange) : undefined;
    const maxRange = scaleOptions.maxRange ? _date.default.addInterval(range.startValue, scaleOptions.maxRange) : undefined;
    if (!(minRange && minRange > range.endValue || maxRange && maxRange < range.endValue)) {
      setSelectedRange(range, e);
    }
  }
}
function getSharpDirection() {
  return 1;
}
function getTickStartPositionShift(length) {
  return length % 2 === 1 ? -_floor(length / 2) : -length / 2;
}
function checkShiftedLabels(majorTicks, boxes, minSpacing, alignment) {
  function checkLabelsOverlapping(nearestLabelsIndexes) {
    if (nearestLabelsIndexes.length === 2 && _axes_constants.default.areLabelsOverlap(boxes[nearestLabelsIndexes[0]], boxes[nearestLabelsIndexes[1]], minSpacing, alignment)) {
      majorTicks[nearestLabelsIndexes[0]].removeLabel();
    }
  }
  function getTwoVisibleLabels(startIndex) {
    const labels = [];
    for (let i = startIndex; labels.length < 2 && i < majorTicks.length; i++) {
      majorTicks[i].label && labels.push(i);
    }
    return labels;
  }
  if (majorTicks.length < 3) {
    return;
  }
  checkLabelsOverlapping(getTwoVisibleLabels(0));
  checkLabelsOverlapping(getTwoVisibleLabels(majorTicks.length - 2).reverse());
}
function AxisWrapper(params) {
  const that = this;
  that._axis = new _base_axis.Axis({
    renderer: params.renderer,
    axesContainerGroup: params.root,
    scaleBreaksGroup: params.scaleBreaksGroup,
    labelsAxesGroup: params.labelsAxesGroup,
    incidentOccurred: params.incidentOccurred,
    // TODO: These dependencies should be statically resolved (not for every new instance)
    axisType: 'xyAxes',
    drawingType: 'linear',
    widgetClass: 'dxrs',
    axisClass: 'range-selector',
    isArgumentAxis: true,
    getTemplate() {}
  });
  that._updateSelectedRangeCallback = params.updateSelectedRange;
  that._axis.getAxisSharpDirection = that._axis.getSharpDirectionByCoords = getSharpDirection;
  that._axis.getTickStartPositionShift = getTickStartPositionShift;
  that._axis._checkShiftedLabels = checkShiftedLabels;
}
AxisWrapper.prototype = {
  constructor: AxisWrapper,
  update: function (options, isCompactMode, canvas, businessRange, seriesDataSource) {
    const axis = this._axis;
    axis.updateOptions(prepareAxisOptions(options, isCompactMode, canvas.height, canvas.height / 2 - _ceil(options.width / 2)));
    axis.validate();
    axis.setBusinessRange(businessRange, true);
    if (seriesDataSource !== undefined && seriesDataSource.isShowChart()) {
      axis.setMarginOptions(seriesDataSource.getMarginOptions(canvas));
    }
    axis.draw(canvas);
    axis.shift({
      left: 0,
      bottom: -canvas.height / 2 + canvas.top
    });
    if (axis.getMarkerTrackers()) {
      // TODO: Check who is responsible for destroying events
      createDateMarkersEvent(options, axis.getMarkerTrackers(), this._updateSelectedRangeCallback);
    }
    axis.drawScaleBreaks({
      start: canvas.top,
      end: canvas.top + canvas.height
    });
  },
  visualRange: function () {},
  getViewport: function () {
    return {};
  },
  allScaleSelected(value) {
    const {
      startValue,
      endValue
    } = this._axis.visualRange();
    return {
      startValue: value[0].valueOf() === startValue.valueOf(),
      endValue: value[1].valueOf() === endValue.valueOf()
    };
  },
  getOptions() {
    return this._axis.getOptions() || {};
  }
};
(0, _iterator.each)(_base_axis.Axis.prototype, field => {
  if (field !== 'constructor' && field[0] !== '_' && (0, _type2.isFunction)(_base_axis.Axis.prototype[field]) && !(field in AxisWrapper.prototype)) {
    AxisWrapper.prototype[field] = function () {
      const axis = this._axis;
      return axis[field].apply(axis, arguments);
    };
  }
});
(0, _component_registrator.default)('dxRangeSelector', dxRangeSelector);
var _default = exports.default = dxRangeSelector; // PLUGINS_SECTION
dxRangeSelector.addPlugin(_export.plugin);
dxRangeSelector.addPlugin(_title.plugin);
dxRangeSelector.addPlugin(_loading_indicator.plugin);
dxRangeSelector.addPlugin(_data_source.plugin);
module.exports = exports.default;
module.exports.default = exports.default;
