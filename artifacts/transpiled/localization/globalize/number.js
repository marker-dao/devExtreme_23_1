"use strict";

require("./core");
var _globalize = _interopRequireDefault(require("globalize"));
var _number = _interopRequireDefault(require("../number"));
var _errors = _interopRequireDefault(require("../../core/errors"));
require("globalize/number");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var MAX_FRACTION_DIGITS = 20;
if (_globalize.default && _globalize.default.formatNumber) {
  if (_globalize.default.locale().locale === 'en') {
    _globalize.default.locale('en');
  }
  var formattersCache = {};
  var getFormatter = function getFormatter(format) {
    var formatter;
    var formatCacheKey;
    if (_typeof(format) === 'object') {
      formatCacheKey = _globalize.default.locale().locale + ':' + JSON.stringify(format);
    } else {
      formatCacheKey = _globalize.default.locale().locale + ':' + format;
    }
    formatter = formattersCache[formatCacheKey];
    if (!formatter) {
      formatter = formattersCache[formatCacheKey] = _globalize.default.numberFormatter(format);
    }
    return formatter;
  };
  var globalizeNumberLocalization = {
    engine: function engine() {
      return 'globalize';
    },
    _formatNumberCore: function _formatNumberCore(value, format, formatConfig) {
      if (format === 'exponential') {
        return this.callBase.apply(this, arguments);
      }
      return getFormatter(this._normalizeFormatConfig(format, formatConfig, value))(value);
    },
    _normalizeFormatConfig: function _normalizeFormatConfig(format, formatConfig, value) {
      var config;
      if (format === 'decimal') {
        config = {
          minimumIntegerDigits: formatConfig.precision || 1,
          useGrouping: false,
          minimumFractionDigits: 0,
          maximumFractionDigits: MAX_FRACTION_DIGITS,
          round: value < 0 ? 'ceil' : 'floor'
        };
      } else {
        config = this._getPrecisionConfig(formatConfig.precision);
      }
      if (format === 'percent') {
        config.style = 'percent';
      }
      return config;
    },
    _getPrecisionConfig: function _getPrecisionConfig(precision) {
      var config;
      if (precision === null) {
        config = {
          minimumFractionDigits: 0,
          maximumFractionDigits: MAX_FRACTION_DIGITS
        };
      } else {
        config = {
          minimumFractionDigits: precision || 0,
          maximumFractionDigits: precision || 0
        };
      }
      return config;
    },
    format: function format(value, _format) {
      if (typeof value !== 'number') {
        return value;
      }
      _format = this._normalizeFormat(_format);
      if (!_format || typeof _format !== 'function' && !_format.type && !_format.formatter) {
        return getFormatter(_format)(value);
      }
      return this.callBase.apply(this, arguments);
    },
    parse: function parse(text, format) {
      if (!text) {
        return;
      }
      if (format && (format.parser || typeof format === 'string')) {
        return this.callBase.apply(this, arguments);
      }
      if (format) {
        // Current parser functionality provided as-is and is independent of the most of capabilities of formatter.
        _errors.default.log('W0011');
      }
      var result = _globalize.default.parseNumber(text);
      if (isNaN(result)) {
        result = this.callBase.apply(this, arguments);
      }
      return result;
    }
  };
  _number.default.resetInjection();
  _number.default.inject(globalizeNumberLocalization);
}