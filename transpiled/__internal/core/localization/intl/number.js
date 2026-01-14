"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _config = _interopRequireDefault(require("../../../../core/config"));
var _accounting_formats = _interopRequireDefault(require("../../../core/localization/cldr-data/accounting_formats"));
var _core = _interopRequireDefault(require("../../../core/localization/core"));
var _open_xml_currency_format = _interopRequireDefault(require("../../../core/localization/open_xml_currency_format"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CURRENCY_STYLES = ['standard', 'accounting'];
const MAX_FRACTION_DIGITS = 20;
const detectCurrencySymbolRegex = /([^\s0]+)?(\s*)0*[.,]*0*(\s*)([^\s0]+)?/;
const formattersCache = {};
const getFormatter = format => {
  const key = `${_core.default.locale()}/${JSON.stringify(format)}`;
  if (!formattersCache[key]) {
    formattersCache[key] = new Intl.NumberFormat(_core.default.locale(), format).format;
  }
  return formattersCache[key];
};
const getCurrencyFormatter = currency => new Intl.NumberFormat(_core.default.locale(), {
  style: 'currency',
  currency
});
var _default = exports.default = {
  engine() {
    return 'intl';
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
      const fractionDigits = String(value).split('.')[1];
      config = {
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        minimumIntegerDigits: formatConfig.precision || undefined,
        useGrouping: false,
        maximumFractionDigits: fractionDigits === null || fractionDigits === void 0 ? void 0 : fractionDigits.length,
        round: value < 0 ? 'ceil' : 'floor'
      };
    } else {
      config = this._getPrecisionConfig(formatConfig.precision);
    }
    if (format === 'percent') {
      config.style = 'percent';
    } else if (format === 'currency') {
      // @ts-expect-error
      const useAccountingStyle = formatConfig.useCurrencyAccountingStyle ?? (0, _config.default)().defaultUseCurrencyAccountingStyle;
      config.style = 'currency';
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      config.currency = formatConfig.currency || (0, _config.default)().defaultCurrency;
      config.currencySign = CURRENCY_STYLES[+useAccountingStyle];
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
        minimumFractionDigits: precision || 0,
        maximumFractionDigits: precision || 0
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
    if (format.currency === 'default') {
      format.currency = (0, _config.default)().defaultCurrency;
    }
    // eslint-disable-next-line @stylistic/no-mixed-operators
    if (!format || typeof format !== 'function' && !format.type && !format.formatter) {
      return getFormatter(format)(value);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.callBase.apply(this, [value, format]);
  },
  _getCurrencySymbolInfo(currency) {
    const formatter = getCurrencyFormatter(currency);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._extractCurrencySymbolInfo(formatter.format(0));
  },
  _extractCurrencySymbolInfo(currencyValueString) {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const match = detectCurrencySymbolRegex.exec(currencyValueString) || [];
    const position = match[1] ? 'before' : 'after';
    const symbol = match[1] || match[4] || '';
    const delimiter = match[2] || match[3] || '';
    return {
      position,
      symbol,
      delimiter
    };
  },
  getCurrencySymbol(currency) {
    if (!currency) {
      // @ts-expect-error
      // eslint-disable-next-line
      currency = (0, _config.default)().defaultCurrency;
    }
    const symbolInfo = this._getCurrencySymbolInfo(currency);
    return {
      symbol: symbolInfo.symbol
    };
  },
  getOpenXmlCurrencyFormat(currency) {
    const targetCurrency = currency || (0, _config.default)().defaultCurrency;
    const currencySymbol = this._getCurrencySymbolInfo(targetCurrency).symbol;
    const closestAccountingFormat = _core.default
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    .getValueByClosestLocale(locale => _accounting_formats.default[locale]);
    return (0, _open_xml_currency_format.default)(currencySymbol, closestAccountingFormat);
  }
};