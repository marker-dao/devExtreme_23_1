!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/core/utils/date.js"], ["./type","./math","./iterator","./inflector","../../renovation/ui/common/utils/date/index"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/core/utils/date.js", ["./type", "./math", "./iterator", "./inflector", "../../renovation/ui/common/utils/date/index"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _type = $__require("./type");
  var _math = $__require("./math");
  var _iterator = $__require("./iterator");
  var _inflector = $__require("./inflector");
  var _index = $__require("../../renovation/ui/common/utils/date/index");
  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct.bind();
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];a.push.apply(a, args);var Constructor = Function.bind.apply(Parent, a);var instance = new Constructor();if (Class) _setPrototypeOf(instance, Class.prototype);return instance;
      };
    }return _construct.apply(null, arguments);
  }
  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));return true;
    } catch (e) {
      return false;
    }
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;return o;
    };return _setPrototypeOf(o, p);
  }
  var DAYS_IN_WEEK = 7;
  var THURSDAY_WEEK_NUMBER = 4;
  var SUNDAY_WEEK_NUMBER = 7;
  var USUAL_WEEK_COUNT_IN_YEAR = 52;
  var dateUnitIntervals = ['millisecond', 'second', 'minute', 'hour', 'day', 'week', 'month', 'quarter', 'year'];
  var getDatesInterval = function getDatesInterval(startDate, endDate, intervalUnit) {
    var delta = endDate.getTime() - startDate.getTime();
    var millisecondCount = (0, _index.toMilliseconds)(intervalUnit) || 1;
    return Math.floor(delta / millisecondCount);
  };
  var getNextDateUnit = function getNextDateUnit(unit, withWeeks) {
    var interval = getDateUnitInterval(unit);
    switch (interval) {
      case 'millisecond':
        return 'second';
      case 'second':
        return 'minute';
      case 'minute':
        return 'hour';
      case 'hour':
        return 'day';
      case 'day':
        return withWeeks ? 'week' : 'month';
      case 'week':
        return 'month';
      case 'month':
        return 'quarter';
      case 'quarter':
        return 'year';
      case 'year':
        return 'year';
      default:
        return 0;
    }
  };
  var convertMillisecondsToDateUnits = function convertMillisecondsToDateUnits(value) {
    var i;
    var dateUnitCount;
    var dateUnitInterval;
    var dateUnitIntervals = ['millisecond', 'second', 'minute', 'hour', 'day', 'month', 'year'];
    var result = {};
    for (i = dateUnitIntervals.length - 1; i >= 0; i--) {
      dateUnitInterval = dateUnitIntervals[i];
      dateUnitCount = Math.floor(value / (0, _index.toMilliseconds)(dateUnitInterval));
      if (dateUnitCount > 0) {
        result[dateUnitInterval + 's'] = dateUnitCount;
        value -= convertDateUnitToMilliseconds(dateUnitInterval, dateUnitCount);
      }
    }
    return result;
  };
  var dateToMilliseconds = function dateToMilliseconds(tickInterval) {
    var milliseconds = 0;
    if ((0, _type.isObject)(tickInterval)) {
      (0, _iterator.each)(tickInterval, function (key, value) {
        milliseconds += convertDateUnitToMilliseconds(key.substr(0, key.length - 1), value);
      });
    }
    if ((0, _type.isString)(tickInterval)) {
      milliseconds = convertDateUnitToMilliseconds(tickInterval, 1);
    }
    return milliseconds;
  };
  function convertDateUnitToMilliseconds(dateUnit, count) {
    return (0, _index.toMilliseconds)(dateUnit) * count;
  }

  // refactor for performance
  function getDateUnitInterval(tickInterval) {
    var maxInterval = -1;
    var i;
    if ((0, _type.isString)(tickInterval)) {
      return tickInterval;
    }
    if ((0, _type.isObject)(tickInterval)) {
      (0, _iterator.each)(tickInterval, function (key, value) {
        for (i = 0; i < dateUnitIntervals.length; i++) {
          if (value && (key === dateUnitIntervals[i] + 's' || key === dateUnitIntervals[i]) && maxInterval < i) {
            maxInterval = i;
          }
        }
      });
      return dateUnitIntervals[maxInterval];
    }
    return '';
  }

  // T375972
  var tickIntervalToFormatMap = {
    millisecond: 'millisecond',
    second: 'longtime',
    minute: 'shorttime',
    hour: 'shorttime',
    day: 'day',
    week: 'day',
    month: 'month',
    quarter: 'quarter',
    year: 'year'
  };

  // Because of changes in formatting (Globalize has been updated) common date formatting has been changed.
  // The purpose of the following method is to preserve original dates formatting in axes and range selector slider markers.
  function getDateFormatByTickInterval(tickInterval) {
    return tickIntervalToFormatMap[getDateUnitInterval(tickInterval)] || '';
  }
  var getQuarter = function getQuarter(month) {
    return Math.floor(month / 3);
  };
  var getFirstQuarterMonth = function getFirstQuarterMonth(month) {
    return getQuarter(month) * 3;
  };
  function correctDateWithUnitBeginning(date, dateInterval, withCorrection, firstDayOfWeek) {
    date = new Date(date.getTime());
    var oldDate = new Date(date.getTime());
    var firstQuarterMonth;
    var month;
    var dateUnitInterval = getDateUnitInterval(dateInterval);
    switch (dateUnitInterval) {
      case 'second':
        date = new Date(Math.floor(oldDate.getTime() / 1000) * 1000);
        break;
      case 'minute':
        date = new Date(Math.floor(oldDate.getTime() / 60000) * 60000);
        break;
      case 'hour':
        date = new Date(Math.floor(oldDate.getTime() / 3600000) * 3600000);
        break;
      case 'year':
        date.setMonth(0);
      /* falls through */
      case 'month':
        date.setDate(1);
      /* falls through */
      case 'day':
        date.setHours(0, 0, 0, 0);
        break;
      case 'week':
        date = getFirstWeekDate(date, firstDayOfWeek || 0);
        date.setHours(0, 0, 0, 0);
        break;
      case 'quarter':
        firstQuarterMonth = getFirstQuarterMonth(date.getMonth());
        month = date.getMonth();
        date.setDate(1);
        date.setHours(0, 0, 0, 0);
        if (month !== firstQuarterMonth) {
          date.setMonth(firstQuarterMonth);
        }
        break;
    }
    if (withCorrection && dateUnitInterval !== 'hour' && dateUnitInterval !== 'minute' && dateUnitInterval !== 'second') {
      fixTimezoneGap(oldDate, date);
    }
    return date;
  }
  function trimTime(date) {
    return correctDateWithUnitBeginning(date, 'day');
  }
  var setToDayEnd = function setToDayEnd(date) {
    var result = trimTime(date);
    result.setDate(result.getDate() + 1);
    return new Date(result.getTime() - 1);
  };
  var getDatesDifferences = function getDatesDifferences(date1, date2) {
    var counter = 0;
    var differences = {
      year: date1.getFullYear() !== date2.getFullYear(),
      month: date1.getMonth() !== date2.getMonth(),
      day: date1.getDate() !== date2.getDate(),
      hour: date1.getHours() !== date2.getHours(),
      minute: date1.getMinutes() !== date2.getMinutes(),
      second: date1.getSeconds() !== date2.getSeconds(),
      millisecond: date1.getMilliseconds() !== date2.getMilliseconds()
    };
    (0, _iterator.each)(differences, function (key, value) {
      if (value) {
        counter++;
      }
    });
    if (counter === 0 && getTimezonesDifference(date1, date2) !== 0) {
      differences.hour = true;
      counter++;
    }
    differences.count = counter;
    return differences;
  };
  function addDateInterval(value, interval, dir) {
    var result = new Date(value.getTime());
    var intervalObject = (0, _type.isString)(interval) ? getDateIntervalByString(interval.toLowerCase()) : (0, _type.isNumeric)(interval) ? convertMillisecondsToDateUnits(interval) : interval;
    if (intervalObject.years) {
      result.setFullYear(result.getFullYear() + intervalObject.years * dir);
    }
    if (intervalObject.quarters) {
      result.setMonth(result.getMonth() + 3 * intervalObject.quarters * dir);
    }
    if (intervalObject.months) {
      result.setMonth(result.getMonth() + intervalObject.months * dir);
    }
    if (intervalObject.weeks) {
      result.setDate(result.getDate() + 7 * intervalObject.weeks * dir);
    }
    if (intervalObject.days) {
      result.setDate(result.getDate() + intervalObject.days * dir);
    }
    if (intervalObject.hours) {
      result.setTime(result.getTime() + intervalObject.hours * 3600000 * dir);
    }
    if (intervalObject.minutes) {
      result.setTime(result.getTime() + intervalObject.minutes * 60000 * dir);
    }
    if (intervalObject.seconds) {
      result.setTime(result.getTime() + intervalObject.seconds * 1000 * dir);
    }
    if (intervalObject.milliseconds) {
      result.setTime(result.getTime() + intervalObject.milliseconds * dir);
    }
    return result;
  }
  var addInterval = function addInterval(value, interval, isNegative) {
    var dir = isNegative ? -1 : +1;
    return (0, _type.isDate)(value) ? addDateInterval(value, interval, dir) : (0, _math.adjust)(value + interval * dir, interval);
  };
  var getSequenceByInterval = function getSequenceByInterval(min, max, interval) {
    var intervals = [];
    var cur;
    intervals.push((0, _type.isDate)(min) ? new Date(min.getTime()) : min);
    cur = min;
    while (cur < max) {
      cur = addInterval(cur, interval);
      intervals.push(cur);
    }
    return intervals;
  };
  var getViewFirstCellDate = function getViewFirstCellDate(viewType, date) {
    if (viewType === 'month') {
      return createDateWithFullYear(date.getFullYear(), date.getMonth(), 1);
    }
    if (viewType === 'year') {
      return createDateWithFullYear(date.getFullYear(), 0, date.getDate());
    }
    if (viewType === 'decade') {
      return createDateWithFullYear(getFirstYearInDecade(date), date.getMonth(), date.getDate());
    }
    if (viewType === 'century') {
      return createDateWithFullYear(getFirstDecadeInCentury(date), date.getMonth(), date.getDate());
    }
  };
  var getViewLastCellDate = function getViewLastCellDate(viewType, date) {
    if (viewType === 'month') {
      return createDateWithFullYear(date.getFullYear(), date.getMonth(), getLastMonthDay(date));
    }
    if (viewType === 'year') {
      return createDateWithFullYear(date.getFullYear(), 11, date.getDate());
    }
    if (viewType === 'decade') {
      return createDateWithFullYear(getFirstYearInDecade(date) + 9, date.getMonth(), date.getDate());
    }
    if (viewType === 'century') {
      return createDateWithFullYear(getFirstDecadeInCentury(date) + 90, date.getMonth(), date.getDate());
    }
  };
  var getViewMinBoundaryDate = function getViewMinBoundaryDate(viewType, date) {
    var resultDate = createDateWithFullYear(date.getFullYear(), date.getMonth(), 1);
    if (viewType === 'month') {
      return resultDate;
    }
    resultDate.setMonth(0);
    if (viewType === 'year') {
      return resultDate;
    }
    if (viewType === 'decade') {
      resultDate.setFullYear(getFirstYearInDecade(date));
    }
    if (viewType === 'century') {
      resultDate.setFullYear(getFirstDecadeInCentury(date));
    }
    return resultDate;
  };
  var getViewMaxBoundaryDate = function getViewMaxBoundaryDate(viewType, date) {
    var resultDate = new Date(date);
    resultDate.setDate(getLastMonthDay(date));
    if (viewType === 'month') {
      return resultDate;
    }
    resultDate.setMonth(11);
    resultDate.setDate(getLastMonthDay(resultDate));
    if (viewType === 'year') {
      return resultDate;
    }
    if (viewType === 'decade') {
      resultDate.setFullYear(getFirstYearInDecade(date) + 9);
    }
    if (viewType === 'century') {
      resultDate.setFullYear(getFirstDecadeInCentury(date) + 99);
    }
    return resultDate;
  };
  function getLastMonthDay(date) {
    var resultDate = createDateWithFullYear(date.getFullYear(), date.getMonth() + 1, 0);
    return resultDate.getDate();
  }
  var getViewUp = function getViewUp(typeView) {
    switch (typeView) {
      case 'month':
        return 'year';
      case 'year':
        return 'decade';
      case 'decade':
        return 'century';
      default:
        break;
    }
  };
  var getViewDown = function getViewDown(typeView) {
    switch (typeView) {
      case 'century':
        return 'decade';
      case 'decade':
        return 'year';
      case 'year':
        return 'month';
      default:
        break;
    }
  };
  var getDifferenceInMonth = function getDifferenceInMonth(typeView) {
    var difference = 1;
    if (typeView === 'year') {
      difference = 12;
    }
    if (typeView === 'decade') {
      difference = 12 * 10;
    }
    if (typeView === 'century') {
      difference = 12 * 100;
    }
    return difference;
  };
  var getDifferenceInMonthForCells = function getDifferenceInMonthForCells(typeView) {
    var difference = 1;
    if (typeView === 'decade') {
      difference = 12;
    }
    if (typeView === 'century') {
      difference = 12 * 10;
    }
    return difference;
  };
  function getDateIntervalByString(intervalString) {
    var result = {};
    switch (intervalString) {
      case 'year':
        result.years = 1;
        break;
      case 'month':
        result.months = 1;
        break;
      case 'quarter':
        result.months = 3;
        break;
      case 'week':
        result.weeks = 1;
        break;
      case 'day':
        result.days = 1;
        break;
      case 'hour':
        result.hours = 1;
        break;
      case 'minute':
        result.minutes = 1;
        break;
      case 'second':
        result.seconds = 1;
        break;
      case 'millisecond':
        result.milliseconds = 1;
        break;
    }
    return result;
  }
  function sameDate(date1, date2) {
    return sameMonthAndYear(date1, date2) && date1.getDate() === date2.getDate();
  }
  function sameMonthAndYear(date1, date2) {
    return sameYear(date1, date2) && date1.getMonth() === date2.getMonth();
  }
  function sameYear(date1, date2) {
    return date1 && date2 && date1.getFullYear() === date2.getFullYear();
  }
  function sameHoursAndMinutes(date1, date2) {
    return date1 && date2 && date1.getHours() === date2.getHours() && date1.getMinutes() === date2.getMinutes();
  }
  var sameDecade = function sameDecade(date1, date2) {
    if (!(0, _type.isDefined)(date1) || !(0, _type.isDefined)(date2)) return;
    var startDecadeDate1 = date1.getFullYear() - date1.getFullYear() % 10;
    var startDecadeDate2 = date2.getFullYear() - date2.getFullYear() % 10;
    return date1 && date2 && startDecadeDate1 === startDecadeDate2;
  };
  var sameCentury = function sameCentury(date1, date2) {
    if (!(0, _type.isDefined)(date1) || !(0, _type.isDefined)(date2)) return;
    var startCenturyDate1 = date1.getFullYear() - date1.getFullYear() % 100;
    var startCenturyDate2 = date2.getFullYear() - date2.getFullYear() % 100;
    return date1 && date2 && startCenturyDate1 === startCenturyDate2;
  };
  function getFirstDecadeInCentury(date) {
    return date && date.getFullYear() - date.getFullYear() % 100;
  }
  function getFirstYearInDecade(date) {
    return date && date.getFullYear() - date.getFullYear() % 10;
  }
  var getShortDateFormat = function getShortDateFormat() {
    return 'yyyy/MM/dd';
  };
  var getFirstMonthDate = function getFirstMonthDate(date) {
    if (!(0, _type.isDefined)(date)) return;
    return createDateWithFullYear(date.getFullYear(), date.getMonth(), 1);
  };
  var getLastMonthDate = function getLastMonthDate(date) {
    if (!(0, _type.isDefined)(date)) return;
    return createDateWithFullYear(date.getFullYear(), date.getMonth() + 1, 0);
  };
  function getFirstWeekDate(date, firstDayOfWeek) {
    var delta = (date.getDay() - firstDayOfWeek + DAYS_IN_WEEK) % DAYS_IN_WEEK;
    var result = new Date(date);
    result.setDate(date.getDate() - delta);
    return result;
  }
  function getUTCTime(date) {
    return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  }
  function getDayNumber(date) {
    var ms = getUTCTime(date) - getUTCTime(getFirstDateInYear(date.getFullYear()));
    return 1 + Math.floor(ms / (0, _index.toMilliseconds)('day'));
  }
  function getFirstDateInYear(year) {
    return new Date(year, 0, 1);
  }
  function getLastDateInYear(year) {
    return new Date(year, 11, 31);
  }
  function getDayWeekNumber(date, firstDayOfWeek) {
    var day = date.getDay() - firstDayOfWeek + 1;
    if (day <= 0) {
      day += DAYS_IN_WEEK;
    }
    return day;
  }
  function getWeekNumber(date, firstDayOfWeek, rule) {
    var firstWeekDayInYear = getDayWeekNumber(getFirstDateInYear(date.getFullYear()), firstDayOfWeek);
    var lastWeekDayInYear = getDayWeekNumber(getLastDateInYear(date.getFullYear()), firstDayOfWeek);
    var daysInFirstWeek = DAYS_IN_WEEK - firstWeekDayInYear + 1;
    var weekNumber = Math.ceil((getDayNumber(date) - daysInFirstWeek) / 7);
    switch (rule) {
      case 'fullWeek':
        {
          if (daysInFirstWeek === DAYS_IN_WEEK) {
            weekNumber++;
          }
          if (weekNumber === 0) {
            var lastDateInPreviousYear = getLastDateInYear(date.getFullYear() - 1);
            return getWeekNumber(lastDateInPreviousYear, firstDayOfWeek, rule);
          }
          return weekNumber;
        }
      case 'firstDay':
        {
          if (daysInFirstWeek > 0) {
            weekNumber++;
          }
          var isSunday = firstWeekDayInYear === SUNDAY_WEEK_NUMBER || lastWeekDayInYear === SUNDAY_WEEK_NUMBER;
          if (weekNumber > USUAL_WEEK_COUNT_IN_YEAR && !isSunday || weekNumber === 54) {
            weekNumber = 1;
          }
          return weekNumber;
        }
      case 'firstFourDays':
        {
          if (daysInFirstWeek > 3) {
            weekNumber++;
          }
          var isThursday = firstWeekDayInYear === THURSDAY_WEEK_NUMBER || lastWeekDayInYear === THURSDAY_WEEK_NUMBER;
          if (weekNumber > USUAL_WEEK_COUNT_IN_YEAR && !isThursday) {
            weekNumber = 1;
          }
          if (weekNumber === 0) {
            var _lastDateInPreviousYear = getLastDateInYear(date.getFullYear() - 1);
            return getWeekNumber(_lastDateInPreviousYear, firstDayOfWeek, rule);
          }
          return weekNumber;
        }
      default:
        break;
    }
  }
  var normalizeDateByWeek = function normalizeDateByWeek(date, currentDate) {
    var differenceInDays = dateUtils.getDatesInterval(date, currentDate, 'day');
    var resultDate = new Date(date);
    if (differenceInDays >= 6) {
      resultDate = new Date(resultDate.setDate(resultDate.getDate() + 7));
    }
    return resultDate;
  };
  var dateInRange = function dateInRange(date, min, max, format) {
    if (format === 'date') {
      min = min && dateUtils.correctDateWithUnitBeginning(min, 'day');
      max = max && dateUtils.correctDateWithUnitBeginning(max, 'day');
      date = date && dateUtils.correctDateWithUnitBeginning(date, 'day');
    }
    return normalizeDate(date, min, max) === date;
  };
  var intervalsOverlap = function intervalsOverlap(options) {
    var firstMin = options.firstMin,
        firstMax = options.firstMax,
        secondMin = options.secondMin,
        secondMax = options.secondMax;
    return firstMin <= secondMin && secondMin <= firstMax || firstMin > secondMin && firstMin < secondMax || firstMin < secondMax && firstMax > secondMax;
  };
  var dateTimeFromDecimal = function dateTimeFromDecimal(number) {
    var hours = Math.floor(number);
    var minutes = number % 1 * 60;
    return {
      hours: hours,
      minutes: minutes
    };
  };
  var roundDateByStartDayHour = function roundDateByStartDayHour(date, startDayHour) {
    var startTime = this.dateTimeFromDecimal(startDayHour);
    var result = new Date(date);
    if (date.getHours() === startTime.hours && date.getMinutes() < startTime.minutes || date.getHours() < startTime.hours) {
      result.setHours(startTime.hours, startTime.minutes, 0, 0);
    }
    return result;
  };
  function normalizeDate(date, min, max) {
    var normalizedDate = date;
    if (!(0, _type.isDefined)(date)) {
      return date;
    }
    if ((0, _type.isDefined)(min) && date < min) {
      normalizedDate = min;
    }
    if ((0, _type.isDefined)(max) && date > max) {
      normalizedDate = max;
    }
    return normalizedDate;
  }
  function fixTimezoneGap(oldDate, newDate) {
    // NOTE: T182866
    if (!(0, _type.isDefined)(oldDate)) {
      return;
    }
    var diff = newDate.getHours() - oldDate.getHours();
    if (diff === 0) {
      return;
    }
    var sign = diff === 1 || diff === -23 ? -1 : 1;
    var trial = new Date(newDate.getTime() + sign * 3600000);
    if (sign > 0 || trial.getDate() === newDate.getDate()) {
      newDate.setTime(trial.getTime());
    }
  }
  var roundToHour = function roundToHour(date) {
    var result = new Date(date.getTime());
    result.setHours(result.getHours() + 1);
    result.setMinutes(0);
    return result;
  };
  function getTimezonesDifference(min, max) {
    return (max.getTimezoneOffset() - min.getTimezoneOffset()) * 60 * 1000;
  }
  var makeDate = function makeDate(date) {
    // TODO: will be useful later for work with different timezones
    return new Date(date);
  };
  var getDatesOfInterval = function getDatesOfInterval(startDate, endDate, step) {
    var result = [];
    var currentDate = new Date(startDate.getTime());
    while (currentDate < endDate) {
      result.push(new Date(currentDate.getTime()));
      currentDate = this.addInterval(currentDate, step);
    }
    return result;
  };
  var createDateWithFullYear = function createDateWithFullYear(year) {
    var result = _construct(Date, Array.prototype.slice.call(arguments));
    result.setFullYear(year);
    return result;
  };
  var dateUtils = {
    dateUnitIntervals: dateUnitIntervals,
    convertMillisecondsToDateUnits: convertMillisecondsToDateUnits,
    dateToMilliseconds: dateToMilliseconds,
    getNextDateUnit: getNextDateUnit,
    convertDateUnitToMilliseconds: convertDateUnitToMilliseconds,
    getDateUnitInterval: getDateUnitInterval,
    getDateFormatByTickInterval: getDateFormatByTickInterval,
    // T375972
    getDatesDifferences: getDatesDifferences,
    correctDateWithUnitBeginning: correctDateWithUnitBeginning,
    trimTime: trimTime,
    setToDayEnd: setToDayEnd,
    roundDateByStartDayHour: roundDateByStartDayHour,
    dateTimeFromDecimal: dateTimeFromDecimal,
    addDateInterval: addDateInterval,
    addInterval: addInterval,
    getSequenceByInterval: getSequenceByInterval,
    getDateIntervalByString: getDateIntervalByString,
    sameHoursAndMinutes: sameHoursAndMinutes,
    sameDate: sameDate,
    sameMonthAndYear: sameMonthAndYear,
    sameMonth: sameMonthAndYear,
    sameYear: sameYear,
    sameDecade: sameDecade,
    sameCentury: sameCentury,
    getDifferenceInMonth: getDifferenceInMonth,
    getDifferenceInMonthForCells: getDifferenceInMonthForCells,
    getFirstYearInDecade: getFirstYearInDecade,
    getFirstDecadeInCentury: getFirstDecadeInCentury,
    getShortDateFormat: getShortDateFormat,
    getViewFirstCellDate: getViewFirstCellDate,
    getViewLastCellDate: getViewLastCellDate,
    getViewDown: getViewDown,
    getViewUp: getViewUp,
    getLastMonthDay: getLastMonthDay,
    getLastMonthDate: getLastMonthDate,
    getFirstMonthDate: getFirstMonthDate,
    getFirstWeekDate: getFirstWeekDate,
    getWeekNumber: getWeekNumber,
    normalizeDateByWeek: normalizeDateByWeek,
    getQuarter: getQuarter,
    getFirstQuarterMonth: getFirstQuarterMonth,
    dateInRange: dateInRange,
    intervalsOverlap: intervalsOverlap,
    roundToHour: roundToHour,
    normalizeDate: normalizeDate,
    getViewMinBoundaryDate: getViewMinBoundaryDate,
    getViewMaxBoundaryDate: getViewMaxBoundaryDate,
    fixTimezoneGap: fixTimezoneGap,
    getTimezonesDifference: getTimezonesDifference,
    makeDate: makeDate,
    getDatesInterval: getDatesInterval,
    getDatesOfInterval: getDatesOfInterval,
    createDateWithFullYear: createDateWithFullYear
  };
  dateUtils.sameView = function (view, date1, date2) {
    return dateUtils[(0, _inflector.camelize)('same ' + view)](date1, date2);
  };
  var _default = dateUtils;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["./type","./math","./iterator","./inflector","../../renovation/ui/common/utils/date/index"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("./type"), require("./math"), require("./iterator"), require("./inflector"), require("../../renovation/ui/common/utils/date/index"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=date.js.map