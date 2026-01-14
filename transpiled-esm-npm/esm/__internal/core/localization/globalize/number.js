import '../../../core/localization/globalize/core';
import 'globalize/number';
import errors from '../../../../core/errors';
import numberLocalization from '../../../core/localization/number';
// eslint-disable-next-line import/no-extraneous-dependencies
import Globalize from 'globalize';
const MAX_FRACTION_DIGITS = 20;
if (Globalize !== null && Globalize !== void 0 && Globalize.formatNumber) {
  if (Globalize.locale().locale === 'en') {
    Globalize.locale('en');
  }
  const formattersCache = {};
  const getFormatter = format => {
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let formatter;
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let formatCacheKey;
    if (typeof format === 'object') {
      formatCacheKey = `${Globalize.locale().locale}:${JSON.stringify(format)}`;
    } else {
      formatCacheKey = `${Globalize.locale().locale}:${format}`;
    }
    formatter = formattersCache[formatCacheKey];
    if (!formatter) {
      formatter = Globalize.numberFormatter(format);
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
        errors.log('W0011');
      }
      let result = Globalize.parseNumber(text);
      if (isNaN(result)) {
        result = this.callBase.apply(this, [text, format]);
      }
      return result;
    }
  };
  numberLocalization.resetInjection();
  numberLocalization.inject(globalizeNumberLocalization);
}