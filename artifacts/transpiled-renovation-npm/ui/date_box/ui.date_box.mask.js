"use strict";

exports.default = void 0;
var _index = require("../../events/utils/index");
var _type = require("../../core/utils/type");
var _dom = require("../../core/utils/dom");
var _extend = require("../../core/utils/extend");
var _math = require("../../core/utils/math");
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _uiDate_boxMask = require("./ui.date_box.mask.parts");
var _date = _interopRequireDefault(require("../../localization/date"));
var _date2 = require("../../localization/ldml/date.parser");
var _date3 = require("../../localization/ldml/date.format");
var _uiDate_box = _interopRequireDefault(require("./ui.date_box.base"));
var _number = _interopRequireDefault(require("../../localization/number"));
var _devices = _interopRequireDefault(require("../../core/devices"));
var _browser = _interopRequireDefault(require("../../core/utils/browser"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const MASK_EVENT_NAMESPACE = 'dateBoxMask';
const FORWARD = 1;
const BACKWARD = -1;
const DateBoxMask = _uiDate_box.default.inherit({
  _supportedKeys(e) {
    const originalHandlers = this.callBase(e);
    const callOriginalHandler = e => {
      const originalHandler = originalHandlers[(0, _index.normalizeKeyName)(e)];
      return originalHandler && originalHandler.apply(this, [e]);
    };
    const applyHandler = (e, maskHandler) => {
      if (this._shouldUseOriginalHandler(e)) {
        return callOriginalHandler.apply(this, [e]);
      } else {
        return maskHandler.apply(this, [e]);
      }
    };
    return (0, _extend.extend)({}, originalHandlers, {
      del: e => {
        return applyHandler(e, event => {
          this._revertPart(FORWARD);
          this._isAllSelected() || event.preventDefault();
        });
      },
      backspace: e => {
        return applyHandler(e, event => {
          this._revertPart(BACKWARD);
          this._isAllSelected() || event.preventDefault();
        });
      },
      home: e => {
        return applyHandler(e, event => {
          this._selectFirstPart();
          event.preventDefault();
        });
      },
      end: e => {
        return applyHandler(e, event => {
          this._selectLastPart();
          event.preventDefault();
        });
      },
      escape: e => {
        return applyHandler(e, event => {
          this._revertChanges(event);
        });
      },
      enter: e => {
        return applyHandler(e, () => {
          this._enterHandler();
        });
      },
      leftArrow: e => {
        return applyHandler(e, event => {
          this._selectNextPart(BACKWARD);
          event.preventDefault();
        });
      },
      rightArrow: e => {
        return applyHandler(e, event => {
          this._selectNextPart(FORWARD);
          event.preventDefault();
        });
      },
      upArrow: e => {
        return applyHandler(e, event => {
          this._upDownArrowHandler(FORWARD);
          event.preventDefault();
        });
      },
      downArrow: e => {
        return applyHandler(e, event => {
          this._upDownArrowHandler(BACKWARD);
          event.preventDefault();
        });
      }
    });
  },
  _shouldUseOriginalHandler(e) {
    const keysToHandleByMask = ['backspace', 'del'];
    const isNotDeletingInCalendar = this.option('opened') && e && keysToHandleByMask.indexOf((0, _index.normalizeKeyName)(e)) === -1;
    return !this._useMaskBehavior() || isNotDeletingInCalendar || e && e.altKey;
  },
  _upDownArrowHandler(step) {
    this._setNewDateIfEmpty();
    const originalValue = this._getActivePartValue(this._initialMaskValue);
    const currentValue = this._getActivePartValue();
    const delta = currentValue - originalValue;
    this._loadMaskValue(this._initialMaskValue);
    this._partIncrease(delta + step, true);
  },
  _getDefaultOptions() {
    return (0, _extend.extend)(this.callBase(), {
      useMaskBehavior: false,
      emptyDateValue: new Date(2000, 0, 1, 0, 0, 0)
    });
  },
  _isSingleCharKey(_ref) {
    let {
      originalEvent,
      alt
    } = _ref;
    const key = originalEvent.data || originalEvent.key;
    return typeof key === 'string' && key.length === 1 && !alt && !(0, _index.isCommandKeyPressed)(originalEvent);
  },
  _isSingleDigitKey(e) {
    var _e$originalEvent;
    const data = (_e$originalEvent = e.originalEvent) === null || _e$originalEvent === void 0 ? void 0 : _e$originalEvent.data;
    return (data === null || data === void 0 ? void 0 : data.length) === 1 && parseInt(data, 10);
  },
  _useBeforeInputEvent: function () {
    return _devices.default.real().android;
  },
  _keyInputHandler(e, key) {
    const oldInputValue = this._input().val();
    this._processInputKey(key);
    e.preventDefault();
    const isValueChanged = oldInputValue !== this._input().val();
    isValueChanged && _events_engine.default.trigger(this._input(), 'input');
  },
  _keyboardHandler(e) {
    let key = e.originalEvent.key;
    const result = this.callBase(e);
    if (!this._useMaskBehavior() || this._useBeforeInputEvent()) {
      return result;
    }
    if (_browser.default.chrome && e.key === 'Process' && e.code.indexOf('Digit') === 0) {
      key = e.code.replace('Digit', '');
      this._processInputKey(key);
      this._maskInputHandler = () => {
        this._renderSelectedPart();
      };
    } else if (this._isSingleCharKey(e)) {
      this._keyInputHandler(e.originalEvent, key);
    }
    return result;
  },
  _maskBeforeInputHandler(e) {
    this._maskInputHandler = null;
    const {
      inputType
    } = e.originalEvent;
    if (inputType === 'insertCompositionText') {
      this._maskInputHandler = () => {
        this._renderSelectedPart();
      };
    }
    const isBackwardDeletion = inputType === 'deleteContentBackward';
    const isForwardDeletion = inputType === 'deleteContentForward';
    if (isBackwardDeletion || isForwardDeletion) {
      const direction = isBackwardDeletion ? BACKWARD : FORWARD;
      this._maskInputHandler = () => {
        this._revertPart();
        this._selectNextPart(direction);
      };
    }
    if (!this._useMaskBehavior() || !this._isSingleCharKey(e)) {
      return;
    }
    const key = e.originalEvent.data;
    this._keyInputHandler(e, key);
    return true;
  },
  _keyPressHandler(e) {
    const {
      originalEvent: event
    } = e;
    if ((event === null || event === void 0 ? void 0 : event.inputType) === 'insertCompositionText' && this._isSingleDigitKey(e)) {
      this._processInputKey(event.data);
      this._renderDisplayText(this._getDisplayedText(this._maskValue));
      this._selectNextPart();
    }
    this.callBase(e);
    if (this._maskInputHandler) {
      this._maskInputHandler();
      this._maskInputHandler = null;
    }
  },
  _processInputKey(key) {
    if (this._isAllSelected()) {
      this._activePartIndex = 0;
    }
    this._setNewDateIfEmpty();
    if (isNaN(parseInt(key))) {
      this._searchString(key);
    } else {
      this._searchNumber(key);
    }
  },
  _isAllSelected() {
    const caret = this._caret();
    return caret.end - caret.start === this.option('text').length;
  },
  _getFormatPattern() {
    if (this._formatPattern) {
      return this._formatPattern;
    }
    const format = this._strategy.getDisplayFormat(this.option('displayFormat'));
    const isLDMLPattern = (0, _type.isString)(format) && !_date.default._getPatternByFormat(format);
    if (isLDMLPattern) {
      this._formatPattern = format;
    } else {
      this._formatPattern = (0, _date3.getFormat)(function (value) {
        return _date.default.format(value, format);
      });
    }
    return this._formatPattern;
  },
  _setNewDateIfEmpty() {
    if (!this._maskValue) {
      const value = this.option('type') === 'time' ? new Date(null) : new Date();
      this._maskValue = value;
      this._initialMaskValue = value;
      this._renderDateParts();
    }
  },
  _partLimitsReached(max) {
    const maxLimitLength = String(max).length;
    const formatLength = this._getActivePartProp('pattern').length;
    const isShortFormat = formatLength === 1;
    const maxSearchLength = isShortFormat ? maxLimitLength : Math.min(formatLength, maxLimitLength);
    const isLengthExceeded = this._searchValue.length === maxSearchLength;
    const isValueOverflowed = parseInt(this._searchValue + '0') > max;
    return isLengthExceeded || isValueOverflowed;
  },
  _searchNumber(char) {
    const {
      max
    } = this._getActivePartLimits();
    const maxLimitLength = String(max).length;
    this._searchValue = (this._searchValue + char).substr(-maxLimitLength);
    if (isNaN(this._searchValue)) {
      this._searchValue = char;
    }
    this._setActivePartValue(this._searchValue);
    if (this._partLimitsReached(max)) {
      this._selectNextPart(FORWARD);
    }
  },
  _searchString(char) {
    if (!isNaN(parseInt(this._getActivePartProp('text')))) {
      return;
    }
    const limits = this._getActivePartProp('limits')(this._maskValue);
    const startString = this._searchValue + char.toLowerCase();
    const endLimit = limits.max - limits.min;
    for (let i = 0; i <= endLimit; i++) {
      this._loadMaskValue(this._initialMaskValue);
      this._partIncrease(i + 1);
      if (this._getActivePartProp('text').toLowerCase().indexOf(startString) === 0) {
        this._searchValue = startString;
        return;
      }
    }
    this._setNewDateIfEmpty();
    if (this._searchValue) {
      this._clearSearchValue();
      this._searchString(char);
    }
  },
  _clearSearchValue() {
    this._searchValue = '';
  },
  _revertPart: function (direction) {
    if (!this._isAllSelected()) {
      const actual = this._getActivePartValue(this.option('emptyDateValue'));
      this._setActivePartValue(actual);
      this._selectNextPart(direction);
    }
    this._clearSearchValue();
  },
  _useMaskBehavior() {
    return this.option('useMaskBehavior') && this.option('mode') === 'text';
  },
  _prepareRegExpInfo() {
    this._regExpInfo = (0, _date2.getRegExpInfo)(this._getFormatPattern(), _date.default);
    const regexp = this._regExpInfo.regexp;
    const source = regexp.source;
    const flags = regexp.flags;
    const quantifierRegexp = new RegExp(/(\{[0-9]+,?[0-9]*\})/);
    const convertedSource = source.split(quantifierRegexp).map(sourcePart => {
      return quantifierRegexp.test(sourcePart) ? sourcePart : _number.default.convertDigits(sourcePart, false);
    }).join('');
    this._regExpInfo.regexp = new RegExp(convertedSource, flags);
  },
  _initMaskState() {
    this._activePartIndex = 0;
    this._formatPattern = null;
    this._prepareRegExpInfo();
    this._loadMaskValue();
  },
  _renderMask() {
    this.callBase();
    this._detachMaskEvents();
    this._clearMaskState();
    if (this._useMaskBehavior()) {
      this._attachMaskEvents();
      this._initMaskState();
      this._renderDateParts();
    }
  },
  _renderDateParts() {
    if (!this._useMaskBehavior()) {
      return;
    }
    const text = this.option('text') || this._getDisplayedText(this._maskValue);
    if (text) {
      this._dateParts = (0, _uiDate_boxMask.renderDateParts)(text, this._regExpInfo);
      if (!this._input().is(':hidden')) {
        this._selectNextPart();
      }
    }
  },
  _detachMaskEvents() {
    _events_engine.default.off(this._input(), '.' + MASK_EVENT_NAMESPACE);
  },
  _attachMaskEvents() {
    _events_engine.default.on(this._input(), (0, _index.addNamespace)('dxclick', MASK_EVENT_NAMESPACE), this._maskClickHandler.bind(this));
    _events_engine.default.on(this._input(), (0, _index.addNamespace)('paste', MASK_EVENT_NAMESPACE), this._maskPasteHandler.bind(this));
    _events_engine.default.on(this._input(), (0, _index.addNamespace)('drop', MASK_EVENT_NAMESPACE), () => {
      this._renderSelectedPart();
    });
    _events_engine.default.on(this._input(), (0, _index.addNamespace)('compositionend', MASK_EVENT_NAMESPACE), this._maskCompositionEndHandler.bind(this));
    if (this._useBeforeInputEvent()) {
      _events_engine.default.on(this._input(), (0, _index.addNamespace)('beforeinput', MASK_EVENT_NAMESPACE), this._maskBeforeInputHandler.bind(this));
    }
  },
  _renderSelectedPart() {
    this._renderDisplayText(this._getDisplayedText(this._maskValue));
    this._selectNextPart();
  },
  _selectLastPart() {
    if (this.option('text')) {
      this._activePartIndex = this._dateParts.length;
      this._selectNextPart(BACKWARD);
    }
  },
  _selectFirstPart() {
    if (this.option('text')) {
      this._activePartIndex = -1;
      this._selectNextPart(FORWARD);
    }
  },
  _onMouseWheel(e) {
    if (this._useMaskBehavior()) {
      this._partIncrease(e.delta > 0 ? FORWARD : BACKWARD, e);
    }
  },
  _selectNextPart() {
    let step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    if (!this.option('text') || this._disposed) {
      return;
    }
    if (step) {
      this._initialMaskValue = new Date(this._maskValue);
    }
    let index = (0, _math.fitIntoRange)(this._activePartIndex + step, 0, this._dateParts.length - 1);
    if (this._dateParts[index].isStub) {
      const isBoundaryIndex = index === 0 && step < 0 || index === this._dateParts.length - 1 && step > 0;
      if (!isBoundaryIndex) {
        this._selectNextPart(step >= 0 ? step + 1 : step - 1);
        return;
      } else {
        index = this._activePartIndex;
      }
    }
    if (this._activePartIndex !== index) {
      this._clearSearchValue();
    }
    this._activePartIndex = index;
    this._caret(this._getActivePartProp('caret'));
  },
  _getRealLimitsPattern() {
    if (this._getActivePartProp('pattern')[0] === 'd') {
      return 'dM';
    }
  },
  _getActivePartLimits(lockOtherParts) {
    const limitFunction = this._getActivePartProp('limits');
    return limitFunction(this._maskValue, lockOtherParts && this._getRealLimitsPattern());
  },
  _getActivePartValue(dateValue) {
    dateValue = dateValue || this._maskValue;
    const getter = this._getActivePartProp('getter');
    return (0, _type.isFunction)(getter) ? getter(dateValue) : dateValue[getter]();
  },
  _addLeadingZeroes(value) {
    const zeroes = this._searchValue.match(/^0+/);
    const limits = this._getActivePartLimits();
    const maxLimitLength = String(limits.max).length;
    return ((zeroes && zeroes[0] || '') + String(value)).substr(-maxLimitLength);
  },
  _setActivePartValue(value, dateValue) {
    dateValue = dateValue || this._maskValue;
    const setter = this._getActivePartProp('setter');
    const limits = this._getActivePartLimits();
    value = (0, _math.inRange)(value, limits.min, limits.max) ? value : value % 10;
    value = this._addLeadingZeroes((0, _math.fitIntoRange)(value, limits.min, limits.max));
    (0, _type.isFunction)(setter) ? setter(dateValue, value) : dateValue[setter](value);
    this._renderDisplayText(this._getDisplayedText(dateValue));
    this._renderDateParts();
  },
  _getActivePartProp(property) {
    if (!this._dateParts || !this._dateParts[this._activePartIndex]) {
      return undefined;
    }
    return this._dateParts[this._activePartIndex][property];
  },
  _loadMaskValue() {
    let value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.dateOption('value');
    this._maskValue = value && new Date(value);
    this._initialMaskValue = value && new Date(value);
  },
  _saveMaskValue() {
    const value = this._maskValue && new Date(this._maskValue);
    if (value && this.option('type') === 'date') {
      value.setHours(0, 0, 0, 0);
    }
    this._initialMaskValue = new Date(value);
    this.dateOption('value', value);
  },
  _revertChanges() {
    this._loadMaskValue();
    this._renderDisplayText(this._getDisplayedText(this._maskValue));
    this._renderDateParts();
  },
  _renderDisplayText(text) {
    this.callBase(text);
    if (this._useMaskBehavior()) {
      this.option('text', text);
    }
  },
  _partIncrease(step, lockOtherParts) {
    this._setNewDateIfEmpty();
    const {
      max,
      min
    } = this._getActivePartLimits(lockOtherParts);
    let limitDelta = max - min;

    // take AM\PM into account
    if (limitDelta === 1) {
      limitDelta++;
    }
    let newValue = step + this._getActivePartValue();
    if (newValue > max) {
      newValue = this._applyLimits(newValue, {
        limitBase: min,
        limitClosest: max,
        limitDelta
      });
    } else if (newValue < min) {
      newValue = this._applyLimits(newValue, {
        limitBase: max,
        limitClosest: min,
        limitDelta
      });
    }
    this._setActivePartValue(newValue);
  },
  _applyLimits(newValue, _ref2) {
    let {
      limitBase,
      limitClosest,
      limitDelta
    } = _ref2;
    const delta = (newValue - limitClosest) % limitDelta;
    return delta ? limitBase + delta - 1 * (0, _math.sign)(delta) : limitClosest;
  },
  _maskClickHandler() {
    this._loadMaskValue(this._maskValue);
    if (this.option('text')) {
      this._activePartIndex = (0, _uiDate_boxMask.getDatePartIndexByPosition)(this._dateParts, this._caret().start);
      if (!this._isAllSelected()) {
        if ((0, _type.isDefined)(this._activePartIndex)) {
          this._caret(this._getActivePartProp('caret'));
        } else {
          this._selectLastPart();
        }
      }
    }
  },
  _maskCompositionEndHandler(e) {
    this._input().val(this._getDisplayedText(this._maskValue));
    this._selectNextPart();
    this._maskInputHandler = () => {
      this._renderSelectedPart();
    };
  },
  _maskPasteHandler(e) {
    const newText = this._replaceSelectedText(this.option('text'), this._caret(), (0, _dom.clipboardText)(e));
    const date = _date.default.parse(newText, this._getFormatPattern());
    if (date && this._isDateValid(date)) {
      this._maskValue = date;
      this._renderDisplayText(this._getDisplayedText(this._maskValue));
      this._renderDateParts();
      this._selectNextPart();
    }
    e.preventDefault();
  },
  _isDateValid(date) {
    return (0, _type.isDate)(date) && !isNaN(date);
  },
  _isValueDirty() {
    const value = this.dateOption('value');
    return (this._maskValue && this._maskValue.getTime()) !== (value && value.getTime());
  },
  _fireChangeEvent() {
    this._clearSearchValue();
    if (this._isValueDirty()) {
      _events_engine.default.trigger(this._input(), 'change');
    }
  },
  _enterHandler() {
    this._fireChangeEvent();
    this._selectNextPart(FORWARD);
  },
  _focusOutHandler(e) {
    const shouldFireChangeEvent = this._useMaskBehavior() && !e.isDefaultPrevented();
    if (shouldFireChangeEvent) {
      this._fireChangeEvent();
      this.callBase(e);
      this._selectFirstPart(e);
    } else {
      this.callBase(e);
    }
  },
  _valueChangeEventHandler(e) {
    const text = this.option('text');
    if (this._useMaskBehavior()) {
      this._saveValueChangeEvent(e);
      if (!text) {
        this._maskValue = null;
      } else if (this._maskValue === null) {
        this._loadMaskValue(text);
      }
      this._saveMaskValue();
    } else {
      this.callBase(e);
    }
  },
  _optionChanged(args) {
    switch (args.name) {
      case 'useMaskBehavior':
        this._renderMask();
        break;
      case 'displayFormat':
      case 'mode':
        this.callBase(args);
        this._renderMask();
        break;
      case 'value':
        this._loadMaskValue();
        this.callBase(args);
        this._renderDateParts();
        break;
      case 'emptyDateValue':
        break;
      default:
        this.callBase(args);
    }
  },
  _clearMaskState() {
    this._clearSearchValue();
    delete this._dateParts;
    delete this._activePartIndex;
    delete this._maskValue;
  },
  clear() {
    this._clearMaskState();
    this._activePartIndex = 0;
    this.callBase();
  },
  _clean() {
    this.callBase();
    this._detachMaskEvents();
    this._clearMaskState();
  }
});
var _default = DateBoxMask;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;