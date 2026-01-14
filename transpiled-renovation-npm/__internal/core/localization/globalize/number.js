"use strict";

require("../../../core/localization/globalize/core");
require("globalize/number");
var _errors = _interopRequireDefault(require("../../../../core/errors"));
var _number2 = _interopRequireDefault(require("../../../core/localization/number"));
var _globalize = _interopRequireDefault(require("globalize"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line import/no-extraneous-dependencies

const MAX_FRACTION_DIGITS = 20;
if (_globalize.default !== null && _globalize.default !== void 0 && _globalize.default.formatNumber) {
  if (_globalize.default.locale().locale === 'en') {
    _globalize.default.locale('en');
  }
  const formattersCache = {};
  const getFormatter = format => {
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let formatter;
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let formatCacheKey;
    if (typeof format === 'object') {
      formatCacheKey = `${_globalize.default.locale().locale}:${JSON.stringify(format)}`;
    } else {
      formatCacheKey = `${_globalize.default.locale().locale}:${format}`;
    }
    formatter = formattersCache[formatCacheKey];
    if (!formatter) {
      formatter = _globalize.default.numberFormatter(format);
      formattersCache[formatCacheKey] = formatter;
    }
    return formatter;
  };
  const globalizeNumberLocalization = {
    engine() {
      return 'globalize';
    },
    _formatNumberCore(value, format, formatConfig) {
      if (format === 'exponential') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return this.callBase.apply(this, [value, format, formatConfig]);
      }
      return getFormatter(this._normalizeFormatConfig(format, formatConfig, value))(value);
    },
    _normalizeFormatConfig(format, formatConfig, value) {
      // eslint-disable-next-line @typescript-eslint/init-declarations
      let config;
      if (format === 'decimal') {
        config = {
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
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
    _getPrecisionConfig(precision) {
      // eslint-disable-next-line @typescript-eslint/init-declarations
      let config;
      if (precision === null) {
        config = {
          minimumFractionDigits: 0,
          maximumFractionDigits: MAX_FRACTION_DIGITS
        };
      } else {
        config = {
          minimumFractionDigits: precision ?? 0,
          maximumFractionDigits: precision ?? 0
        };
      }
      return config;
    },
    format(value, format) {
      if (typeof value !== 'number') {
        return value;
      }
      // eslint-disable-next-line no-param-reassign
      format = this._normalizeFormat(format);
      // eslint-disable-next-line @stylistic/no-mixed-operators
      if (!format || typeof format !== 'function' && !format.type && !format.formatter) {
        // @ts-expect-error
        return getFormatter(format)(value);
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this.callBase.apply(this, [value, format]);
    },
    parse(text, format) {
      if (!text) {
        return undefined;
      }
      if (format && (typeof format === 'string' || format.parser)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return this.callBase.apply(this, [text, format]);
      }
      if (format) {
        // Current parser functionality provided as-is and
        // is independent of the most of capabilities of formatter.
        _errors.default.log('W0011');
      }
      let result = _globalize.default.parseNumber(text);
      if (isNaN(result)) {
        result = this.callBase.apply(this, [text, format]);
      }
      return result;
    }
  };
  _number2.default.resetInjection();
  _number2.default.inject(globalizeNumberLocalization);
}