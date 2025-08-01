/**
* DevExtreme (cjs/viz/translators/range.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.Range = void 0;
var _type = require("../../core/utils/type");
var _extend = require("../../core/utils/extend");
var _utils = require("../core/utils");
const _isDefined = _type.isDefined;
const _isDate = _type.isDate;
const _isFunction = _type.isFunction;
const minSelector = 'min';
const maxSelector = 'max';
const minVisibleSelector = 'minVisible';
const maxVisibleSelector = 'maxVisible';
const baseSelector = 'base';
const axisTypeSelector = 'axisType';
function otherLessThan(thisValue, otherValue) {
  return otherValue < thisValue;
}
function otherGreaterThan(thisValue, otherValue) {
  return otherValue > thisValue;
}
function compareAndReplace(thisValue, otherValue, setValue, compare) {
  const otherValueDefined = _isDefined(otherValue);
  if (_isDefined(thisValue)) {
    if (otherValueDefined && compare(thisValue, otherValue)) {
      setValue(otherValue);
    }
  } else if (otherValueDefined) {
    setValue(otherValue);
  }
}
const Range = function (range) {
  range && (0, _extend.extend)(this, range);
};
exports.Range = Range;
const _Range = Range;
_Range.prototype = {
  constructor: _Range,
  addRange: function (otherRange) {
    const that = this;
    const categories = that.categories;
    const otherCategories = otherRange.categories;
    const isDiscrete = that[axisTypeSelector] === 'discrete';
    const compareAndReplaceByField = function (field, compare) {
      compareAndReplace(that[field], otherRange[field], function (value) {
        that[field] = value;
      }, compare);
    };
    const controlValuesByVisibleBounds = function (valueField, visibleValueField, compare) {
      compareAndReplace(that[valueField], that[visibleValueField], function (value) {
        _isDefined(that[valueField]) && (that[valueField] = value);
      }, compare);
    };
    const checkField = function (field) {
      that[field] = that[field] || otherRange[field];
    };
    checkField('invert');
    checkField('containsConstantLine');
    checkField(axisTypeSelector);
    checkField('dataType');
    checkField('isSpacedMargin');
    if (that[axisTypeSelector] === 'logarithmic') {
      checkField(baseSelector);
    } else {
      that[baseSelector] = undefined;
    }
    compareAndReplaceByField(minSelector, otherLessThan);
    compareAndReplaceByField(maxSelector, otherGreaterThan);
    if (isDiscrete) {
      checkField(minVisibleSelector);
      checkField(maxVisibleSelector);
    } else {
      compareAndReplaceByField(minVisibleSelector, otherLessThan);
      compareAndReplaceByField(maxVisibleSelector, otherGreaterThan);
    }
    compareAndReplaceByField('interval', otherLessThan);
    if (!isDiscrete) {
      controlValuesByVisibleBounds(minSelector, minVisibleSelector, otherLessThan);
      controlValuesByVisibleBounds(minSelector, maxVisibleSelector, otherLessThan);
      controlValuesByVisibleBounds(maxSelector, maxVisibleSelector, otherGreaterThan);
      controlValuesByVisibleBounds(maxSelector, minVisibleSelector, otherGreaterThan);
    }
    if (categories === undefined) {
      that.categories = otherCategories;
    } else {
      that.categories = otherCategories ? (0, _utils.unique)(categories.concat(otherCategories)) : categories;
    }
    if (that[axisTypeSelector] === 'logarithmic') {
      checkField('allowNegatives');
      compareAndReplaceByField('linearThreshold', otherLessThan);
    }
    return that;
  },
  isEmpty: function () {
    return (!_isDefined(this[minSelector]) || !_isDefined(this[maxSelector])) && (!this.categories || this.categories.length === 0);
  },
  correctValueZeroLevel: function () {
    const that = this;
    if (_isDate(that[maxSelector]) || _isDate(that[minSelector])) {
      return that;
    }
    function setZeroLevel(min, max) {
      that[min] < 0 && that[max] < 0 && (that[max] = 0);
      that[min] > 0 && that[max] > 0 && (that[min] = 0);
    }
    setZeroLevel(minSelector, maxSelector);
    setZeroLevel(minVisibleSelector, maxVisibleSelector);
    return that;
  },
  sortCategories(sort) {
    if (sort === false || !this.categories) {
      return;
    }
    if (Array.isArray(sort)) {
      const sortValues = sort.map(item => item.valueOf());
      const filteredSeriesCategories = this.categories.filter(item => sortValues.indexOf(item.valueOf()) === -1);
      this.categories = sort.concat(filteredSeriesCategories);
    } else {
      const notAFunction = !_isFunction(sort);
      if (notAFunction && this.dataType !== 'string') {
        sort = (a, b) => a.valueOf() - b.valueOf();
      } else if (notAFunction) {
        sort = false;
      }
      sort && this.categories.sort(sort);
    }
  }
};
