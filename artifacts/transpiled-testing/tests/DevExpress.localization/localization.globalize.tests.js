!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.localization/localization.globalize.tests.js"], ["../../../../node_modules/devextreme-cldr-data/ru.json!json","../../../../node_modules/devextreme-cldr-data/de.json!json","../../../../node_modules/devextreme-cldr-data/da.json!json","localization/globalize/core","localization/globalize/number","localization/globalize/currency","localization/globalize/date","localization/globalize/message","../../helpers/dateHelper.js","jquery","globalize","localization/number","localization/date","localization/message","core/config","../DevExpress.exporter/exceljsParts/exceljs.format.tests.js","../../../../node_modules/cldr-core/supplemental/likelySubtags.json!","core/utils/common","format_helper","core/utils/browser","core/utils/date","./sharedParts/localization.shared.js"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
!function(e){function n(e,n){e=e.replace(l,"");var r=e.match(u),t=(r[1].split(",")[n]||"require").replace(s,""),i=p[t]||(p[t]=new RegExp(a+t+f,"g"));i.lastIndex=0;for(var o,c=[];o=i.exec(e);)c.push(o[2]||o[3]);return c}function r(e,n,t,o){if("object"==typeof e&&!(e instanceof Array))return r.apply(null,Array.prototype.splice.call(arguments,1,arguments.length-1));if("string"==typeof e&&"function"==typeof n&&(e=[e]),!(e instanceof Array)){if("string"==typeof e){var l=i.get(e);return l.__useDefault?l["default"]:l}throw new TypeError("Invalid require")}for(var a=[],f=0;f<e.length;f++)a.push(i["import"](e[f],o));Promise.all(a).then(function(e){n&&n.apply(null,e)},t)}function t(t,l,a){"string"!=typeof t&&(a=l,l=t,t=null),l instanceof Array||(a=l,l=["require","exports","module"].splice(0,a.length)),"function"!=typeof a&&(a=function(e){return function(){return e}}(a)),void 0===l[l.length-1]&&l.pop();var f,u,s;-1!=(f=o.call(l,"require"))&&(l.splice(f,1),t||(l=l.concat(n(a.toString(),f)))),-1!=(u=o.call(l,"exports"))&&l.splice(u,1),-1!=(s=o.call(l,"module"))&&l.splice(s,1);var p={name:t,deps:l,execute:function(n,t,o){for(var p=[],c=0;c<l.length;c++)p.push(n(l[c]));o.uri=o.id,o.config=function(){},-1!=s&&p.splice(s,0,o),-1!=u&&p.splice(u,0,t),-1!=f&&p.splice(f,0,function(e,t,l){return"string"==typeof e&&"function"!=typeof t?n(e):r.call(i,e,t,l,o.id)});var d=a.apply(-1==u?e:t,p);return"undefined"==typeof d&&o&&(d=o.exports),"undefined"!=typeof d?d:void 0}};if(t)c.anonDefine||c.isBundle?c.anonDefine&&c.anonDefine.name&&(c.anonDefine=null):c.anonDefine=p,c.isBundle=!0,i.registerDynamic(p.name,p.deps,!1,p.execute);else{if(c.anonDefine&&!c.anonDefine.name)throw new Error("Multiple anonymous defines in module "+t);c.anonDefine=p}}var i=$__System,o=Array.prototype.indexOf||function(e){for(var n=0,r=this.length;r>n;n++)if(this[n]===e)return n;return-1},l=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,a="(?:^|[^$_a-zA-Z\\xA0-\\uFFFF.])",f="\\s*\\(\\s*(\"([^\"]+)\"|'([^']+)')\\s*\\)",u=/\(([^\)]*)\)/,s=/^\s+|\s+$/g,p={};t.amd={};var c={isBundle:!1,anonDefine:null};i.amdDefine=t,i.amdRequire=r}("undefined"!=typeof self?self:global);
(function() {
var define = $__System.amdDefine;
SystemJS.config({
  meta: {'./localization.base.tests.js': {deps: ['localization/globalize/core', 'localization/globalize/number', 'localization/globalize/currency', 'localization/globalize/date', 'localization/globalize/message']}},
  packages: {'globalize': {meta: {'../globalize.js': {deps: ['cldr/unresolved']}}}}
});
define("testing/tests/DevExpress.localization/localization.globalize.tests.js", ["require", "exports", "module", "../../../../node_modules/devextreme-cldr-data/ru.json!json", "../../../../node_modules/devextreme-cldr-data/de.json!json", "../../../../node_modules/devextreme-cldr-data/da.json!json", "localization/globalize/core", "localization/globalize/number", "localization/globalize/currency", "localization/globalize/date", "localization/globalize/message", "../../helpers/dateHelper.js", "jquery", "globalize", "localization/number", "localization/date", "localization/message", "core/config", "../DevExpress.exporter/exceljsParts/exceljs.format.tests.js", "../../../../node_modules/cldr-core/supplemental/likelySubtags.json!", "core/utils/common", "format_helper", "core/utils/browser", "core/utils/date", "./sharedParts/localization.shared.js"], function(require, exports, module) {
  const cldrData = [require('../../../../node_modules/devextreme-cldr-data/ru.json!json'), require('../../../../node_modules/devextreme-cldr-data/de.json!json'), require('../../../../node_modules/devextreme-cldr-data/da.json!json')];
  require('localization/globalize/core');
  require('localization/globalize/number');
  require('localization/globalize/currency');
  require('localization/globalize/date');
  require('localization/globalize/message');
  const generateExpectedDate = require('../../helpers/dateHelper.js').generateDate;
  const $ = require('jquery');
  const Globalize = require('globalize');
  const numberLocalization = require('localization/number');
  const dateLocalization = require('localization/date');
  const messageLocalization = require('localization/message');
  const config = require('core/config');
  const ExcelJSLocalizationFormatTests = require('../DevExpress.exporter/exceljsParts/exceljs.format.tests.js');
  const likelySubtags = require('../../../../node_modules/cldr-core/supplemental/likelySubtags.json!');
  Globalize.load(likelySubtags);
  cldrData.forEach((localeCldrData) => {
    Globalize.load(localeCldrData);
  });
  const NBSP = String.fromCharCode(160);
  const RUB = String.fromCharCode(8381);
  const noop = require('core/utils/common').noop;
  const formatHelper = require('format_helper');
  const browser = require('core/utils/browser');
  const dateUtils = require('core/utils/date');
  const sharedTests = require('./sharedParts/localization.shared.js').default;
  const NEGATIVE_NUMBERS = [-4.645, -35.855];
  const ROUNDING_CORRECTION = {
    '-4.64': '-4.65',
    '-35.85': '-35.86'
  };
  function isIosWithMSKTimeZone() {
    const isIos = navigator.userAgent.indexOf('Mac OS X') > -1 && browser['webkit'];
    const hasMSKTimeZone = new Date().toString().indexOf('MSK') > -1;
    return isIos && hasMSKTimeZone;
  }
  QUnit.module('Globalize common', {before: function() {
      numberLocalization.inject({format: function(value, format) {
          let result = this.callBase.apply(this, arguments);
          if (NEGATIVE_NUMBERS.indexOf(value) !== -1 && format.type === 'fixedPoint' && format.precision === 2 && !!ROUNDING_CORRECTION[result]) {
            result = ROUNDING_CORRECTION[result];
          }
          return result;
        }});
    }}, function() {
    QUnit.test('engine', function(assert) {
      assert.equal(numberLocalization.engine(), 'globalize');
      assert.equal(dateLocalization.engine(), 'globalize');
      assert.equal(messageLocalization.engine(), 'globalize');
    });
    sharedTests();
  });
  QUnit.module('Localization date (ru)', {
    beforeEach: function() {
      Globalize.locale('ru');
    },
    afterEach: function() {
      Globalize.locale('en');
    }
  }, () => {
    QUnit.test('getFormatParts', function(assert) {
      assert.equal(dateLocalization.getFormatParts('dayofweek').length, 0);
      assert.equal(dateLocalization.getFormatParts('shortdate').join(' '), 'day month year');
      assert.equal(dateLocalization.getFormatParts('longDateLongTime').join(' '), 'day month year hours minutes seconds');
      assert.equal(dateLocalization.getFormatParts('d - M - y, hh:mm:ss [SSS]').join(' '), 'day month year hours minutes seconds milliseconds');
      assert.equal(dateLocalization.getFormatParts('ah:mm').join(' '), 'hours minutes');
    });
    QUnit.test('getMonthNames', function(assert) {
      assert.deepEqual(dateLocalization.getMonthNames(), ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'], 'Array of month names');
    });
    QUnit.test('getMonthNames with specified type', function(assert) {
      assert.deepEqual(dateLocalization.getMonthNames('wide', 'format'), ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'], 'Array of month names');
    });
    QUnit.test('getMonthNames with type=\'standalone\'', function(assert) {
      assert.deepEqual(dateLocalization.getMonthNames('wide', 'standalone'), ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'], 'Array of month names');
    });
    QUnit.test('getPeriodNames', function(assert) {
      assert.deepEqual(dateLocalization.getPeriodNames(), ['AM', 'PM'], 'Array of period names');
    });
    QUnit.test('getDayNames', function(assert) {
      assert.deepEqual(dateLocalization.getDayNames(), ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'], 'Array of day names');
    });
    QUnit.test('getTimeSeparator', function(assert) {
      assert.equal(dateLocalization.getTimeSeparator(), ':');
    });
    QUnit.test('format', function(assert) {
      const expectedValues = {
        'day': '2',
        'dayofweek': 'понедельник',
        'hour': '03',
        'longdate': 'понедельник, 2 марта 2015 г.',
        'longdatelongtime': 'понедельник, 2 марта 2015 г., 03:04:05',
        'longtime': '03:04:05',
        'millisecond': '006',
        'minute': '04',
        'month': 'март',
        'monthandday': '2 марта',
        'monthandyear': 'март 2015 г.',
        'quarter': '1-й кв.',
        'quarterandyear': '1-й кв. 2015 г.',
        'second': '05',
        'shortdate': '02.03.2015',
        'shortdateshorttime': '02.03.2015, 03:04',
        'shorttime': '03:04',
        'shortyear': '15',
        'year': '2015',
        'datetime-local': '2015-03-02T03:04:05',
        'yyyy MMMM d': '2015 марта 2',
        'ss SSS': '05 006'
      };
      const date = new Date(2015, 2, 2, 3, 4, 5);
      date.setMilliseconds(6);
      $.each(expectedValues, function(format, expectedValue) {
        assert.equal(dateLocalization.format(date, format), expectedValue, format + ' format');
      });
      assert.equal(dateLocalization.format(date), String(new Date(2015, 2, 2, 3, 4, 5)), 'without format');
      assert.notOk(dateLocalization.format(), 'without date');
    });
    QUnit.test('format cache for different locales', function(assert) {
      const originalLocale = Globalize.locale().locale;
      const date = new Date(2015, 2, 2, 3, 4, 5);
      try {
        Globalize.locale('en');
        assert.equal(dateLocalization.format(date, 'month'), 'March');
      } finally {
        Globalize.locale(originalLocale);
        assert.equal(dateLocalization.format(date, 'month'), 'март');
      }
    });
    QUnit.test('parse', function(assert) {
      const assertData = {
        'day': {
          text: '2',
          expectedConfig: {day: 2}
        },
        'hour': {
          text: '03',
          expectedConfig: {hours: 3}
        },
        'longdate': {
          text: 'понедельник, 2 марта 2015 г.',
          expected: new Date(2015, 2, 2)
        },
        'longdatelongtime': {
          text: 'понедельник, 2 марта 2015 г., 3:04:05',
          expected: new Date(2015, 2, 2, 3, 4, 5)
        },
        'longtime': {
          text: '3:04:05',
          expectedConfig: {
            hours: 3,
            minutes: 4,
            seconds: 5
          }
        },
        'minute': {
          text: '04',
          expectedConfig: {minutes: 4}
        },
        'month': {
          text: 'март',
          expectedConfig: {
            month: 2,
            day: 1
          }
        },
        'monthandday': {
          text: '2 марта',
          expectedConfig: {
            month: 2,
            day: 2
          }
        },
        'monthandyear': {
          text: 'март 2015 г.',
          expected: new Date(2015, 2, 1)
        },
        'second': {
          text: '05',
          expectedConfig: {seconds: 5}
        },
        'shortdate': {
          text: '02.03.2015',
          expected: new Date(2015, 2, 2)
        },
        'shortdateshorttime': {
          text: '02.03.2015, 3:04',
          expected: new Date(2015, 2, 2, 3, 4)
        },
        'shorttime': {
          text: '3:04',
          expectedConfig: {
            hours: 3,
            minutes: 4
          }
        },
        'shortyear': {
          text: '15',
          expected: new Date(2015, 0, 1)
        },
        'year': {
          text: '2015',
          expected: new Date(2015, 0, 1)
        },
        'datetime-local': {
          text: '2015-03-02T03:04:05',
          expected: new Date(2015, 2, 2, 3, 4, 5)
        },
        'yyyy MMMM d': {
          text: '2015 марта 2',
          expected: new Date(2015, 2, 2)
        }
      };
      $.each(assertData, function(format, data) {
        assert.equal(dateLocalization.parse(data.text, format), String(data.expected || generateExpectedDate(data.expectedConfig)), format + ' format');
      });
      assert.equal(dateLocalization.parse('550', 'millisecond').getMilliseconds(), 550, 'millisecond format');
      assert.equal(dateLocalization.parse('550', 'SSS').getMilliseconds(), 550, 'millisecond format');
      assert.equal(dateLocalization.parse(dateLocalization.format(new Date(), 'shortDate')), String(generateExpectedDate({hours: 0})), 'without format');
      assert.notOk(dateLocalization.parse(), 'without date');
      assert.equal(dateLocalization.parse(Globalize.formatDate(new Date(), {date: 'short'}), {date: 'short'}), String(generateExpectedDate({hours: 0})), 'globalize format');
    });
    QUnit.test('firstDayOfWeekIndex', function(assert) {
      assert.equal(dateLocalization.firstDayOfWeekIndex(), 1);
    });
  });
  QUnit.module('Custom format types', () => {
    QUnit.test('format: { time: \'medium\' }', function(assert) {
      assert.equal(dateLocalization.format(new Date(2015, 1, 2, 3, 4, 5, 6), {time: 'medium'}), '3:04:05 AM', 'with object format');
    });
    QUnit.test('Parse custom format', function(assert) {
      const expected = new Date(2010, 2, 2).toString();
      assert.equal(dateLocalization.parse('20100302', 'yyyyMMdd'), expected, 'Format \'yyyyMMdd\' parse ok');
      assert.equal(dateLocalization.parse('02mar10', 'dMyyyy'), expected, 'Format \'dMyyyy\' parse ok');
    });
  });
  QUnit.module('Localization message (custom locales)', {beforeEach: function() {
      messageLocalization.load({'en': {
          addedKey: 'testValue',
          hello: 'Hello, {0} {1}'
        }});
    }}, () => {
    QUnit.test('Fallback to neutral culture', function(assert) {
      const originalLocale = Globalize.locale().locale;
      messageLocalization.load({'ru': {
          TestBack: 'Back ru',
          TestCancel: 'Cancel ru'
        }});
      messageLocalization.load({'ru-RU': {TestCancel: 'Cancel ru-RU'}});
      try {
        Globalize.locale('ru-RU');
        assert.equal(messageLocalization.format('TestBack'), 'Back ru');
        assert.equal(messageLocalization.format('TestCancel'), 'Cancel ru-RU');
      } finally {
        Globalize.locale(originalLocale);
      }
    });
    QUnit.test('Fallback to default (en) culture', function(assert) {
      const originalLocale = Globalize.locale().locale;
      try {
        Globalize.locale('ru');
        assert.equal(messageLocalization.format('OK'), 'OK');
        assert.equal(messageLocalization.getFormatter('OK')(), 'OK');
      } finally {
        Globalize.locale(originalLocale);
      }
    });
    QUnit.test('Extended culture with empty string value (T271323)', function(assert) {
      const originalLocale = Globalize.locale().locale;
      Globalize.load({'supplemental': {'likelySubtags': {'zh': 'zh-Hans-CN'}}});
      messageLocalization.load({'zh-CN': {addedKey: ''}});
      try {
        Globalize.locale('zh-CN');
        assert.equal(messageLocalization.localizeString('@addedKey'), 'testValue', 'Default culture value');
      } finally {
        Globalize.locale(originalLocale);
      }
    });
    QUnit.test('localizeString by custom locale (T383089)', function(assert) {
      messageLocalization.load({'ru': {'ruAddedKey': 'ruValue'}});
      Globalize.locale('ru');
      const localized = messageLocalization.localizeString('@ruAddedKey @@ruAddedKey @');
      assert.equal(localized, 'ruValue @ruAddedKey @');
      Globalize.locale('en');
    });
    QUnit.test('Empty message', function(assert) {
      Globalize.loadMessages({'en': {'empty': ''}});
      assert.equal(messageLocalization.format('empty'), '');
    });
    QUnit.test('DX messages can be customized', function(assert) {
      assert.equal(messageLocalization.format('dxCollectionWidget-noDataText'), 'No data to display');
      Globalize.loadMessages({'en': {'dxCollectionWidget-noDataText': 'Custom caption'}});
      assert.equal(messageLocalization.format('dxCollectionWidget-noDataText'), 'Custom caption');
    });
    QUnit.test('getDictionary ru', function(assert) {
      messageLocalization.load({'ru': {'freshRuAddedKey': 'ruValue'}});
      Globalize.locale('ru');
      messageLocalization.localizeString('@unknownKey');
      messageLocalization.localizeString('@ruAddedKey');
      assert.equal(messageLocalization.getDictionary()['freshRuAddedKey'], 'ruValue');
      assert.equal(messageLocalization.getDictionary(true)['freshRuAddedKey'], undefined);
      assert.equal(messageLocalization.getDictionary()['unknownKey'], 'Unknown key');
      assert.equal(messageLocalization.getDictionary(true)['unknownKey'], 'Unknown key');
      Globalize.locale('en');
    });
  });
  QUnit.module('Localization globalizeNumber', () => {
    QUnit.test('format', function(assert) {
      assert.equal(numberLocalization.format(1.2), '1.2');
      assert.equal(numberLocalization.format(12), '12');
      assert.equal(numberLocalization.format(2, {minimumIntegerDigits: 2}), '02');
      assert.equal(numberLocalization.format(12, {minimumIntegerDigits: 2}), '12');
      assert.equal(numberLocalization.format(2, {minimumIntegerDigits: 3}), '002');
      assert.equal(numberLocalization.format(12, {minimumIntegerDigits: 3}), '012');
      assert.equal(numberLocalization.format(123, {minimumIntegerDigits: 3}), '123');
    });
  });
  QUnit.module('Localization currency with Globalize', () => {
    QUnit.test('format currency default after global config change', function(assert) {
      const originalDefaultCurrency = config().defaultCurrency;
      assert.equal(numberLocalization.format(1.2, {currency: 'default'}), '$1.20');
      config({defaultCurrency: 'EUR'});
      assert.equal(numberLocalization.format(12, {currency: 'default'}), '€12.00');
      config({defaultCurrency: originalDefaultCurrency});
      assert.equal(numberLocalization.format(1.2, {currency: 'default'}), '$1.20');
    });
    QUnit.test('format', function(assert) {
      assert.equal(numberLocalization.format(1.2, {currency: 'default'}), '$1.20');
      assert.equal(numberLocalization.format(12, {currency: 'default'}), '$12.00');
      assert.equal(numberLocalization.format(1, {
        minimumIntegerDigits: 2,
        minimumFractionDigits: 0,
        currency: 'default'
      }), '$01');
      assert.equal(numberLocalization.format(1, {
        minimumIntegerDigits: 2,
        minimumFractionDigits: 0,
        currency: 'RUB'
      }), 'RUB' + NBSP + '01');
    });
    QUnit.test('format currency with sign/style (T1076906)', function(assert) {
      assert.equal(numberLocalization.format(-1.2, {
        currency: 'default',
        style: 'accounting'
      }), '($1.20)');
      assert.equal(numberLocalization.format(-1.2, {
        type: 'currency',
        useCurrencyAccountingStyle: true
      }), '($1)');
      assert.equal(numberLocalization.format(-12, {
        currency: 'default',
        style: 'symbol'
      }), '-$12.00');
      assert.equal(numberLocalization.format(-12, {
        type: 'currency',
        useCurrencyAccountingStyle: false
      }), '-$12');
    });
    QUnit.test('format currency & power in RU locale', function(assert) {
      Globalize.locale('ru');
      assert.equal(numberLocalization.format(0, {
        type: 'currency thousands',
        currency: undefined,
        precision: 0
      }), '0K' + NBSP + '$');
      assert.equal(numberLocalization.format(0, {
        type: 'currency thousands',
        currency: 'CSK',
        precision: 2
      }), '0,00K' + NBSP + 'CSK');
      assert.equal(numberLocalization.format(2e+5, {
        type: 'currency thousands',
        precision: 0
      }), '200K' + NBSP + '$');
      Globalize.locale('en');
    });
    QUnit.test('getOpenXmlCurrencyFormat: check conversion for some cultures (T835933)', function(assert) {
      try {
        Globalize.locale('en');
        assert.equal(numberLocalization.getOpenXmlCurrencyFormat(undefined), '$#,##0{0}_);\\($#,##0{0}\\)');
        assert.equal(numberLocalization.getOpenXmlCurrencyFormat('USD'), '$#,##0{0}_);\\($#,##0{0}\\)');
        assert.equal(numberLocalization.getOpenXmlCurrencyFormat('RUB'), '\\R\\U\\B#,##0{0}_);\\(\\R\\U\\B#,##0{0}\\)');
        assert.equal(numberLocalization.getOpenXmlCurrencyFormat('CNY'), '\\C\\N\\¥#,##0{0}_);\\(\\C\\N\\¥#,##0{0}\\)');
        assert.equal(numberLocalization.getOpenXmlCurrencyFormat('NOK'), '\\N\\O\\K#,##0{0}_);\\(\\N\\O\\K#,##0{0}\\)');
        Globalize.locale('en-ru');
        assert.equal(numberLocalization.getOpenXmlCurrencyFormat(undefined), '$#,##0{0}_);\\($#,##0{0}\\)');
        assert.equal(numberLocalization.getOpenXmlCurrencyFormat('USD'), '$#,##0{0}_);\\($#,##0{0}\\)');
        assert.equal(numberLocalization.getOpenXmlCurrencyFormat('RUB'), '\\R\\U\\B#,##0{0}_);\\(\\R\\U\\B#,##0{0}\\)');
        assert.equal(numberLocalization.getOpenXmlCurrencyFormat('CNY'), '\\C\\N\\¥#,##0{0}_);\\(\\C\\N\\¥#,##0{0}\\)');
        assert.equal(numberLocalization.getOpenXmlCurrencyFormat('NOK'), '\\N\\O\\K#,##0{0}_);\\(\\N\\O\\K#,##0{0}\\)');
        Globalize.locale('ru');
        assert.equal(numberLocalization.getOpenXmlCurrencyFormat(undefined), '#,##0{0}\xA0$');
        assert.equal(numberLocalization.getOpenXmlCurrencyFormat('USD'), '#,##0{0}\xA0$');
        assert.equal(numberLocalization.getOpenXmlCurrencyFormat('RUB'), '#,##0{0}\xA0\\₽');
        assert.equal(numberLocalization.getOpenXmlCurrencyFormat('CNY'), '#,##0{0}\xA0\\C\\N\\¥');
        assert.equal(numberLocalization.getOpenXmlCurrencyFormat('NOK'), '#,##0{0}\xA0\\N\\O\\K');
      } finally {
        Globalize.locale('en');
      }
    });
    QUnit.test('getDecimalSeparator and getThousandsSeparator in RU locale', function(assert) {
      Globalize.locale('ru');
      assert.equal(numberLocalization.getDecimalSeparator(), ',');
      assert.equal(numberLocalization.getThousandsSeparator(), '\xa0');
      Globalize.locale('en');
    });
    QUnit.test('getCurrencySymbol and config.defaultCurrency', function(assert) {
      const originalDefaultCurrency = config().defaultCurrency;
      try {
        assert.equal(numberLocalization.getCurrencySymbol().symbol, '$');
        config({defaultCurrency: 'EUR'});
        assert.equal(numberLocalization.getCurrencySymbol().symbol, '€');
      } finally {
        config({defaultCurrency: originalDefaultCurrency});
      }
    });
  });
  QUnit.module('Exceljs format', () => {
    ExcelJSLocalizationFormatTests.default.runCurrencyTests([{
      value: 'USD',
      expected: '$#,##0_);\\($#,##0\\)'
    }, {
      value: 'RUB',
      expected: '\\R\\U\\B#,##0_);\\(\\R\\U\\B#,##0\\)'
    }, {
      value: 'JPY',
      expected: '\\¥#,##0_);\\(\\¥#,##0\\)'
    }, {
      value: 'KPW',
      expected: '\\K\\P\\W#,##0_);\\(\\K\\P\\W#,##0\\)'
    }, {
      value: 'LBP',
      expected: '\\L\\B\\P#,##0_);\\(\\L\\B\\P#,##0\\)'
    }, {
      value: 'SEK',
      expected: '\\S\\E\\K#,##0_);\\(\\S\\E\\K#,##0\\)'
    }]);
    ExcelJSLocalizationFormatTests.default.runPivotGridCurrencyTests([{
      value: 'USD',
      expected: '$#,##0_);\\($#,##0\\)'
    }, {
      value: 'RUB',
      expected: '\\R\\U\\B#,##0_);\\(\\R\\U\\B#,##0\\)'
    }, {
      value: 'JPY',
      expected: '\\¥#,##0_);\\(\\¥#,##0\\)'
    }, {
      value: 'KPW',
      expected: '\\K\\P\\W#,##0_);\\(\\K\\P\\W#,##0\\)'
    }, {
      value: 'LBP',
      expected: '\\L\\B\\P#,##0_);\\(\\L\\B\\P#,##0\\)'
    }, {
      value: 'SEK',
      expected: '\\S\\E\\K#,##0_);\\(\\S\\E\\K#,##0\\)'
    }]);
  });
  QUnit.module('Format helper', () => {
    QUnit.module('Numeric and dateTime formats', {beforeEach: function() {
        this.testDate = new Date(2010, 2, 5, 12, 13, 33, 0);
      }}, () => {
      QUnit.test('Currency numeric formats', function(assert) {
        assert.equal(formatHelper.format(1204, 'currency'), '$1,204');
        assert.equal(formatHelper.format(1204, {
          type: 'cuRRency',
          precision: 2
        }), '$1,204.00');
        assert.equal(formatHelper.format(-1204, {
          type: 'currency',
          precision: 2
        }), '($1,204.00)');
      });
      QUnit.test('currency RUB large number format with different locales', function(assert) {
        const currentCultureName = Globalize.locale().locale;
        assert.equal(formatHelper.format(1.204, {
          type: 'currency',
          precision: 2,
          currency: 'RUB'
        }), 'RUB' + NBSP + '1.20');
        Globalize.locale('ru');
        try {
          assert.equal(formatHelper.format(1.204, {
            type: 'currency',
            precision: 2,
            currency: 'RUB'
          }), '1,20' + NBSP + RUB);
        } finally {
          Globalize.locale(currentCultureName);
        }
      });
      QUnit.test('Fixed point numeric formats', function(assert) {
        assert.equal(formatHelper.format(23.04059872, {
          type: 'fIxedPoint',
          precision: 4
        }), '23.0406');
      });
      QUnit.test('Percent numeric formats', function(assert) {
        assert.equal(formatHelper.format(0.45, 'percEnt'), '45%');
        assert.equal(formatHelper.format(0.45, {
          type: 'peRcent',
          precision: 2
        }), '45.00%');
      });
      QUnit.test('Decimal numeric formats', function(assert) {
        assert.equal(formatHelper.format(437, 'decimAl'), '437');
        assert.equal(formatHelper.format(437, {
          type: 'deCimal',
          precision: 5
        }), '00437');
      });
      QUnit.test('Long date format', function(assert) {
        assert.equal(formatHelper.format(this.testDate, 'LONGDate'), 'Friday, March 5, 2010');
      });
      QUnit.test('Long time format', function(assert) {
        assert.equal(formatHelper.format(this.testDate, 'longTIME'), '12:13:33 PM');
      });
      QUnit.test('Month and day format', function(assert) {
        assert.equal(formatHelper.format(this.testDate, 'monthAndDAY'), 'March 5');
      });
      QUnit.test('Month and year format', function(assert) {
        assert.equal(formatHelper.format(this.testDate, 'MONTHAndYear'), 'March 2010');
      });
      QUnit.test('Short date format', function(assert) {
        assert.equal(formatHelper.format(this.testDate, 'shoRTDate'), '3/5/2010');
      });
      QUnit.test('Short time format', function(assert) {
        assert.equal(formatHelper.format(this.testDate, 'shoRTTime'), '12:13 PM');
      });
      QUnit.test('Custom date time format', function(assert) {
        assert.equal(formatHelper.format(this.testDate, 'dd MMM yy'), '05 Mar 10');
      });
      QUnit.test('LongDateLongTime', function(assert) {
        assert.equal(formatHelper.format(this.testDate, 'LONGDATELongTime'), 'Friday, March 5, 2010, 12:13:33 PM');
      });
      QUnit.test('ShortDateShortTime', function(assert) {
        assert.equal(formatHelper.format(this.testDate, 'shortDATESHORTTime'), '3/5/2010, 12:13 PM');
      });
      QUnit.test('Invalid format parameters', function(assert) {
        assert.equal(formatHelper.format('test', 'percent'), 'test');
        assert.equal(formatHelper.format(12, 12), 12);
      });
      QUnit.test('Quarter and year', function(assert) {
        assert.equal(formatHelper.format(new Date(2005, 0, 1), 'QUarterAndYear'), 'Q1 2005');
        assert.equal(formatHelper.format(new Date(2005, 0, 1), 'dd MMM yy, Q'), '01 Jan 05, 1');
        assert.equal(formatHelper.format(new Date(2005, 0, 1), 'qq, dd MMM yy'), '01, 01 Jan 05');
        assert.equal(formatHelper.format(new Date(2005, 0, 1), 'q, yy'), '1, 05');
        assert.equal(formatHelper.format(new Date(2005, 0, 1), 'qq, yy'), '01, 05');
        assert.equal(formatHelper.format(new Date(2005, 0, 1), 'QQ, yyyy MM'), '01, 2005 01');
        assert.equal(formatHelper.format(new Date(2005, 0, 1), 'qqq, yyyy'), 'Q1, 2005');
        assert.equal(formatHelper.format(new Date(2005, 0, 1), 'qqqq, yyyy'), '1st quarter, 2005');
      });
      QUnit.test('Custom quarter format', function(assert) {
        assert.equal(formatHelper.format(new Date(2005, 0, 1), 'q'), '1', 'quarter format - q');
        assert.equal(formatHelper.format(new Date(2005, 0, 1), 'Q'), '1', 'quarter format - Q');
        assert.equal(formatHelper.format(new Date(2005, 0, 1), 'qq'), '01', 'quarter format - qq');
        assert.equal(formatHelper.format(new Date(2005, 0, 1), 'QQ'), '01', 'quarter format - QQ');
        assert.equal(formatHelper.format(new Date(2005, 0, 1), 'qqq'), 'Q1', 'quarter format - qqq');
        assert.equal(formatHelper.format(new Date(2005, 0, 1), 'QQQ'), 'Q1', 'quarter format - QQQ');
        assert.equal(formatHelper.format(new Date(2005, 0, 1), 'qqqq'), '1st quarter', 'quarter format - qqqq');
        assert.equal(formatHelper.format(new Date(2005, 0, 1), 'QQQQ'), '1st quarter', 'quarter format - QQQQ');
        assert.equal(formatHelper.format(new Date(2005, 0, 1), 'q MMM QQ'), '1 Jan 01', 'quarter format - q MMM QQ');
      });
      QUnit.test('Quarters for any months', function(assert) {
        assert.equal(formatHelper.format(new Date(2005, 0, 1), 'quartERAndYear'), 'Q1 2005');
        assert.equal(formatHelper.format(new Date(2005, 1, 1), 'quartERAndYear'), 'Q1 2005');
        assert.equal(formatHelper.format(new Date(2005, 2, 1), 'quartERAndYear'), 'Q1 2005');
        assert.equal(formatHelper.format(new Date(2005, 3, 1), 'quarterANDYear'), 'Q2 2005');
        assert.equal(formatHelper.format(new Date(2005, 4, 1), 'quarterANDYear'), 'Q2 2005');
        assert.equal(formatHelper.format(new Date(2005, 5, 1), 'quarterANDYear'), 'Q2 2005');
        assert.equal(formatHelper.format(new Date(2005, 6, 1), 'qUARterAndYear'), 'Q3 2005');
        assert.equal(formatHelper.format(new Date(2005, 7, 1), 'qUARterAndYear'), 'Q3 2005');
        assert.equal(formatHelper.format(new Date(2005, 8, 1), 'qUARterAndYear'), 'Q3 2005');
        assert.equal(formatHelper.format(new Date(2005, 9, 1), 'qUARterAndYear'), 'Q4 2005');
        assert.equal(formatHelper.format(new Date(2005, 10, 1), 'qUARterAndYear'), 'Q4 2005');
        assert.equal(formatHelper.format(new Date(2005, 11, 1), 'qUARterAndYear'), 'Q4 2005');
      });
      QUnit.test('Choose call format method by the value type', function(assert) {
        assert.equal(formatHelper.format(new Date(2005, 0, 1), 'loNGDate'), 'Saturday, January 1, 2005');
        assert.equal(formatHelper.format(new Date(2005, 0, 1), 'SHORTDate'), '1/1/2005');
        assert.equal(formatHelper.format(12.098, {
          type: 'fixEDPoint',
          precision: 2
        }), '12.10');
        assert.equal(formatHelper.format(12.098, {
          type: 'cuRRency',
          precision: 1
        }), '$12.1');
        assert.equal(formatHelper.format('InvalidValue'), 'InvalidValue');
      });
      QUnit.test('Millisecond date time interval format', function(assert) {
        assert.equal(formatHelper.format(new Date(2005, 0, 1, 10, 33, 20, 237), 'millisecond'), '237');
        assert.equal(formatHelper.format(new Date(2005, 0, 1, 10, 33, 20, 569), 'millisecond'), '569');
      });
      QUnit.test('Day date time interval format', function(assert) {
        assert.equal(formatHelper.format(new Date(2005, 0, 16, 10, 33, 20, 237), 'day'), '16');
        assert.equal(formatHelper.format(new Date(2005, 0, 30, 19, 23, 56, 237), 'day'), '30');
      });
      QUnit.test('Month date time interval format', function(assert) {
        assert.equal(formatHelper.format(new Date(2005, 0, 16, 10, 33, 20, 237), 'month'), 'January');
        assert.equal(formatHelper.format(new Date(2005, 9, 27, 19, 23, 56, 237), 'month'), 'October');
      });
      QUnit.test('Quarter date time interval format', function(assert) {
        assert.equal(formatHelper.format(new Date(2005, 0, 16, 10, 33, 20, 237), 'quarter'), 'Q1');
        assert.equal(formatHelper.format(new Date(2005, 9, 27, 19, 23, 56, 237), 'quarter'), 'Q4');
      });
      QUnit.test('Year date time interval format', function(assert) {
        assert.equal(formatHelper.format(new Date(2005, 0, 16, 10, 33, 20, 237), 'year'), '2005');
        assert.equal(formatHelper.format(new Date(2009, 9, 27, 19, 23, 56, 237), 'year'), '2009');
      });
      QUnit.test('Short Year date time interval format', function(assert) {
        assert.equal(formatHelper.format(new Date(2005, 0, 16, 10, 33, 20, 237), 'shortyear'), '05');
        assert.equal(formatHelper.format(new Date(2009, 9, 27, 19, 23, 56, 237), 'shortyear'), '09');
      });
      if (!isIosWithMSKTimeZone()) {
        QUnit.test('getDateMarkerFormat for second range', function(assert) {
          const date1 = new Date(2010, 0, 1, 2, 23, 33);
          const date2 = new Date(date1.getTime());
          date2.setMilliseconds(3000);
          const format = formatHelper.getDateFormatByDifferences(dateUtils.getDatesDifferences(date1, date2));
          assert.equal(formatHelper.format(date2, format), '2:23:36 AM');
        });
        QUnit.test('getDateMarkerFormat for minute range', function(assert) {
          const date1 = new Date(2010, 0, 1, 2, 23, 33, 990);
          let date2 = new Date(date1.getTime());
          let format;
          date2.setSeconds(63);
          format = formatHelper.getDateFormatByDifferences(dateUtils.getDatesDifferences(date1, date2));
          assert.equal(formatHelper.format(date2, format), '2:24:03 AM');
          date2 = new Date(date1.getTime());
          date2.setMinutes(25);
          format = formatHelper.getDateFormatByDifferences(dateUtils.getDatesDifferences(date1, date2));
          assert.equal(formatHelper.format(date2, format), '2:25 AM');
        });
        QUnit.test('getDateMarkerFormat for hour range', function(assert) {
          const date1 = new Date(2010, 0, 1, 2, 23, 33, 990);
          let date2 = new Date(date1.getTime());
          let format;
          date2.setSeconds(30000);
          format = formatHelper.getDateFormatByDifferences(dateUtils.getDatesDifferences(date1, date2));
          assert.equal(formatHelper.format(date2, format), '10:43:00 AM');
          date2 = new Date(date1.getTime());
          date2.setHours(4);
          format = formatHelper.getDateFormatByDifferences(dateUtils.getDatesDifferences(date1, date2));
          assert.equal(formatHelper.format(date2, format), '4:23 AM');
        });
      }
      QUnit.test('getDateMarkerFormat for day range', function(assert) {
        const date1 = new Date(2010, 0, 29, 12, 23, 33, 990);
        let date2 = new Date(date1.getTime());
        let format;
        date2 = new Date(date1.getTime());
        date2.setMinutes(1000);
        format = formatHelper.getDateFormatByDifferences(dateUtils.getDatesDifferences(date1, date2));
        assert.equal(formatHelper.format(date2, format), 'Saturday, 30 4:40 AM');
        date2 = new Date(date1.getTime());
        date2.setDate(30);
        format = formatHelper.getDateFormatByDifferences(dateUtils.getDatesDifferences(date1, date2));
        assert.equal(formatHelper.format(date2, format), 'Saturday, 30');
      });
      QUnit.test('getDateMarkerFormat for month range', function(assert) {
        const date1 = new Date(2010, 10, 29, 12, 23, 33, 990);
        let date2 = new Date(date1.getTime());
        let format;
        date2.setHours(74);
        format = formatHelper.getDateFormatByDifferences(dateUtils.getDatesDifferences(date1, date2));
        assert.equal(formatHelper.format(date2, format), 'December 2 2:23 AM');
        date2 = new Date(date1.getTime());
        date2.setFullYear(2011);
        date2.setMonth(11);
        date2.setHours(74);
        format = formatHelper.getDateFormatByDifferences(dateUtils.getDatesDifferences(date1, date2));
        assert.equal(formatHelper.format(date2, format), '1/1/2012 2:23 AM');
        date2 = new Date(date1.getTime());
        date2.setDate(32);
        format = formatHelper.getDateFormatByDifferences(dateUtils.getDatesDifferences(date1, date2));
        assert.equal(formatHelper.format(date2, format), 'December 2');
        date2 = new Date(date1.getTime());
        date2.setMonth(11);
        format = formatHelper.getDateFormatByDifferences(dateUtils.getDatesDifferences(date1, date2));
        assert.equal(formatHelper.format(date2, format), 'December');
      });
      QUnit.test('getDateMarkerFormat for year range', function(assert) {
        const date1 = new Date(2010, 10, 29, 12, 23, 33, 990);
        const date2 = new Date(date1.getTime());
        date2.setFullYear(2031);
        const format = formatHelper.getDateFormatByDifferences(dateUtils.getDatesDifferences(date1, date2));
        assert.equal(formatHelper.format(date2, format), '2031');
      });
      QUnit.test('value is null or undefined', function(assert) {
        assert.strictEqual(formatHelper.format(null, ''), '');
        assert.strictEqual(formatHelper.format(undefined, ''), '');
        assert.strictEqual(formatHelper.format('test', ''), 'test');
      });
      QUnit.test('large number auto format negative numbers', function(assert) {
        assert.strictEqual(formatHelper.format(-123, 'fixedPoint largeNumber'), '-123');
        assert.strictEqual(formatHelper.format(-1230, 'fixedPoint largeNumber'), '-1K');
        assert.strictEqual(formatHelper.format(-12300000, 'fixedPoint largeNumber'), '-12M');
      });
      QUnit.test('large number auto format precision', function(assert) {
        assert.strictEqual(formatHelper.format(0.01, 'fixedPoint LARGENumber'), '0');
        assert.strictEqual(formatHelper.format(10.23, 'fixedPoint largeNumber'), '10');
        assert.strictEqual(formatHelper.format(123, {
          type: 'fixedPoint largeNumber',
          precision: 1
        }), '123.0');
        assert.strictEqual(formatHelper.format(12345, {
          type: 'fixedPoint largeNUMBER',
          precision: 2
        }), '12.35K');
        assert.strictEqual(formatHelper.format(12345, {
          type: 'fixedPoint largeNumber',
          precision: 5
        }), '12.34500K');
      });
      QUnit.test('large number auto format small numbers', function(assert) {
        assert.strictEqual(formatHelper.format(0.01, {
          type: 'fixedPoint largeNumber',
          precision: 2
        }), '0.01');
        assert.strictEqual(formatHelper.format(999, {
          type: 'fixedPoint largeNumber',
          precision: 2
        }), '999.00');
        assert.strictEqual(formatHelper.format(999.9, {
          type: 'fixedPoint largeNumber',
          precision: 0
        }), '1,000');
        assert.strictEqual(formatHelper.format(1000, {
          type: 'fixedPoint largeNumber',
          precision: 0
        }), '1K');
      });
      QUnit.test('large number auto format powers', function(assert) {
        assert.strictEqual(formatHelper.format(1234.56, {
          type: 'fixedPoint largeNumber',
          precision: 2
        }), '1.23K');
        assert.strictEqual(formatHelper.format(12345.67, {
          type: 'fixedPoint largeNumber',
          precision: 2
        }), '12.35K');
        assert.strictEqual(formatHelper.format(123400000, {
          type: 'fixedPoint largeNumber',
          precision: 2
        }), '123.40M');
        assert.strictEqual(formatHelper.format(1234000000, {
          type: 'fixedPoint largeNumber',
          precision: 2
        }), '1.23B');
        assert.strictEqual(formatHelper.format(12340000000000, {
          type: 'fixedPoint largeNumber',
          precision: 2
        }), '12.34T');
        assert.strictEqual(formatHelper.format(12340000000000000, {
          type: 'fixedPoint largeNumber',
          precision: 2
        }), '12,340.00T');
      });
      QUnit.test('large number format powers', function(assert) {
        assert.strictEqual(formatHelper.format(12345.67, {
          type: 'fixedPoint',
          precision: 2
        }), '12,345.67');
        assert.strictEqual(formatHelper.format(12345.67, {
          type: 'fixedPoint largeNumber',
          precision: 2
        }), '12.35K');
        assert.strictEqual(formatHelper.format(12345.67, {
          type: 'fixedPoint thousands',
          precision: 2
        }), '12.35K');
        assert.strictEqual(formatHelper.format(12345.67, {
          type: 'fixedPoint miLLions',
          precision: 3
        }), '0.012M');
        assert.strictEqual(formatHelper.format(12345.67, {
          type: 'fixedPoint biLLions',
          precision: 7
        }), '0.0000123B');
        assert.strictEqual(formatHelper.format(12345670, {
          type: 'fixedPoint triLLions',
          precision: 7
        }), '0.0000123T');
      });
      QUnit.test('currency large number format', function(assert) {
        assert.strictEqual(formatHelper.format(12345.67, {
          type: 'currency largeNumber',
          precision: 2
        }), '$12.35K');
        assert.strictEqual(formatHelper.format(12345.67, {
          type: 'currency thoUSands',
          precision: 2
        }), '$12.35K');
        assert.strictEqual(formatHelper.format(12345.67, {
          type: 'currency miLLions',
          precision: 3
        }), '$0.012M');
      });
      QUnit.test('large number format without number type', function(assert) {
        assert.strictEqual(formatHelper.format(12345.67, {
          type: 'largeNumber',
          precision: 2
        }), '12.35K');
        assert.strictEqual(formatHelper.format(12345.67, {
          type: 'thousands',
          precision: 2
        }), '12.35K');
        assert.strictEqual(formatHelper.format(12345.67, {
          type: 'millions',
          precision: 3
        }), '0.012M');
      });
      QUnit.test('Empty format for number', function(assert) {
        assert.equal(formatHelper.format(1204, ''), '1204');
        assert.equal(formatHelper.format(12.04, ''), '12.04');
      });
      QUnit.test('exponential number type pow', function(assert) {
        assert.strictEqual(formatHelper.format(5, {
          type: 'exponEntial',
          precision: 2
        }), '5.00E+0');
        assert.strictEqual(formatHelper.format(0.0081, {
          type: 'exponential',
          precision: 2
        }), '8.10E-3');
        assert.strictEqual(formatHelper.format(-12345.67, {
          type: 'exponential',
          precision: 2
        }), '-1.23E+4');
        assert.strictEqual(formatHelper.format(500000001, {
          type: 'exponential',
          precision: 2
        }), '5.00E+8');
        assert.strictEqual(formatHelper.format(1.56662165464E+99, {
          type: 'exponential',
          precision: 2
        }), '1.57E+99');
        assert.strictEqual(formatHelper.format(1.56662165464E-99, {
          type: 'exponential',
          precision: 2
        }), '1.57E-99');
      });
      QUnit.test('exponential number type precision', function(assert) {
        assert.strictEqual(formatHelper.format(1234, 'exponential'), '1.2E+3');
        assert.strictEqual(formatHelper.format(5, {
          type: 'exponential',
          precision: 0
        }), '5E+0');
        assert.strictEqual(formatHelper.format(0.0081, {
          type: 'exponential',
          precision: 1
        }), '8.1E-3');
        assert.strictEqual(formatHelper.format(-12345.67, {
          type: 'exponential',
          precision: 2
        }), '-1.23E+4');
        assert.strictEqual(formatHelper.format(500000001, {
          type: 'exponential',
          precision: 3
        }), '5.000E+8');
        assert.strictEqual(formatHelper.format(-123456789, {
          type: 'exponential',
          precision: 8
        }), '-1.23456789E+8');
      });
      QUnit.test('exponential number type round', function(assert) {
        assert.strictEqual(formatHelper.format(0.00999, {
          type: 'exponential',
          precision: 0
        }), '1E-2');
        assert.strictEqual(formatHelper.format(0.00999, {
          type: 'exponential',
          precision: 2
        }), '9.99E-3');
        assert.strictEqual(formatHelper.format(999, {
          type: 'exponential',
          precision: 1
        }), '1.0E+3');
      });
      QUnit.test('exponential number type positive and negative number', function(assert) {
        assert.strictEqual(formatHelper.format(0, {
          type: 'exponential',
          precision: 2
        }), '0.00E+0');
        assert.strictEqual(formatHelper.format(1234, {
          type: 'exponential',
          precision: 2
        }), '1.23E+3');
        assert.strictEqual(formatHelper.format(-1234, {
          type: 'exponential',
          precision: 2
        }), '-1.23E+3');
      });
    });
    QUnit.module('formatNumberEx', () => {
      QUnit.test('not execute formatNumberEx for non-number value', function(assert) {
        assert.equal(formatHelper.format('test string', {format: 'currency'}), 'test string');
      });
      QUnit.test('not execute formatNumberEx for infinite value', function(assert) {
        assert.equal(formatHelper.format(Infinity, {format: 'fixedPoint'}), Infinity.toString());
        assert.equal(formatHelper.format(-Infinity, {format: 'fixedPoint'}), (-Infinity).toString());
      });
      QUnit.test('not execute formatNumberEx for NaN value', function(assert) {
        assert.equal(formatHelper.format(NaN, {format: 'fixedPoint'}), NaN.toString());
      });
      QUnit.test('Case insensitive currency', function(assert) {
        assert.equal(formatHelper.format(1204, 'currency'), '$1,204');
        assert.equal(formatHelper.format(1204, {
          type: 'cuRrency',
          precision: 2
        }), '$1,204.00');
      });
      QUnit.test('not execute formatNumberEx for string w with set format', function(assert) {
        String.prototype.format = noop;
        assert.equal(formatHelper.format(123, 'currency'), '$123');
        delete String.prototype.format;
      });
    });
  });
});

})();
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../../node_modules/devextreme-cldr-data/ru.json!json","../../../../node_modules/devextreme-cldr-data/de.json!json","../../../../node_modules/devextreme-cldr-data/da.json!json","localization/globalize/core","localization/globalize/number","localization/globalize/currency","localization/globalize/date","localization/globalize/message","../../helpers/dateHelper.js","jquery","globalize","localization/number","localization/date","localization/message","core/config","../DevExpress.exporter/exceljsParts/exceljs.format.tests.js","../../../../node_modules/cldr-core/supplemental/likelySubtags.json!","core/utils/common","format_helper","core/utils/browser","core/utils/date","./sharedParts/localization.shared.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../../node_modules/devextreme-cldr-data/ru.json!json"), require("../../../../node_modules/devextreme-cldr-data/de.json!json"), require("../../../../node_modules/devextreme-cldr-data/da.json!json"), require("localization/globalize/core"), require("localization/globalize/number"), require("localization/globalize/currency"), require("localization/globalize/date"), require("localization/globalize/message"), require("../../helpers/dateHelper.js"), require("jquery"), require("globalize"), require("localization/number"), require("localization/date"), require("localization/message"), require("core/config"), require("../DevExpress.exporter/exceljsParts/exceljs.format.tests.js"), require("../../../../node_modules/cldr-core/supplemental/likelySubtags.json!"), require("core/utils/common"), require("format_helper"), require("core/utils/browser"), require("core/utils/date"), require("./sharedParts/localization.shared.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=localization.globalize.tests.js.map