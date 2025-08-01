/**
* DevExtreme (cjs/__internal/events/core/m_keyboard_processor.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _index = require("../../../common/core/events/utils/index");
var _class = _interopRequireDefault(require("../../../core/class"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const COMPOSITION_START_EVENT = 'compositionstart';
const COMPOSITION_END_EVENT = 'compositionend';
const KEYDOWN_EVENT = 'keydown';
const NAMESPACE = 'KeyboardProcessor';
const createKeyDownOptions = e => ({
  keyName: (0, _index.normalizeKeyName)(e),
  key: e.key,
  code: e.code,
  ctrl: e.ctrlKey,
  location: e.location,
  metaKey: e.metaKey,
  shift: e.shiftKey,
  alt: e.altKey,
  which: e.which,
  originalEvent: e
});
const KeyboardProcessor = _class.default.inherit({
  _keydown: (0, _index.addNamespace)(KEYDOWN_EVENT, NAMESPACE),
  _compositionStart: (0, _index.addNamespace)(COMPOSITION_START_EVENT, NAMESPACE),
  _compositionEnd: (0, _index.addNamespace)(COMPOSITION_END_EVENT, NAMESPACE),
  ctor(options) {
    options = options || {};
    if (options.element) {
      this._element = (0, _renderer.default)(options.element);
    }
    if (options.focusTarget) {
      this._focusTarget = options.focusTarget;
    }
    this._handler = options.handler;
    if (this._element) {
      this._processFunction = e => {
        const focusTargets = (0, _renderer.default)(this._focusTarget).toArray();
        const isNotFocusTarget = this._focusTarget && this._focusTarget !== e.target && !focusTargets.includes(e.target);
        const shouldSkipProcessing = this._isComposingJustFinished && e.which === 229 || this._isComposing || isNotFocusTarget;
        this._isComposingJustFinished = false;
        if (!shouldSkipProcessing) {
          this.process(e);
        }
      };
      this._toggleProcessingWithContext = this.toggleProcessing.bind(this);
      _events_engine.default.on(this._element, this._keydown, this._processFunction);
      _events_engine.default.on(this._element, this._compositionStart, this._toggleProcessingWithContext);
      _events_engine.default.on(this._element, this._compositionEnd, this._toggleProcessingWithContext);
    }
  },
  dispose() {
    if (this._element) {
      _events_engine.default.off(this._element, this._keydown, this._processFunction);
      _events_engine.default.off(this._element, this._compositionStart, this._toggleProcessingWithContext);
      _events_engine.default.off(this._element, this._compositionEnd, this._toggleProcessingWithContext);
    }
    this._element = undefined;
    this._handler = undefined;
  },
  process(e) {
    this._handler(createKeyDownOptions(e));
  },
  toggleProcessing(_ref) {
    let {
      type
    } = _ref;
    this._isComposing = type === COMPOSITION_START_EVENT;
    this._isComposingJustFinished = !this._isComposing;
  }
});
// @ts-expect-error
KeyboardProcessor.createKeyDownOptions = createKeyDownOptions;
var _default = exports.default = KeyboardProcessor;
