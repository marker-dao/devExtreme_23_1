/**
* DevExtreme (cjs/__internal/core/speech_recognition_adapter.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpeechRecognitionAdapter = exports.NOT_SUPPORTED_ERROR = void 0;
var _window = require("../../core/utils/window");
var _ui = _interopRequireDefault(require("../../ui/widget/ui.errors"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const NOT_SUPPORTED_ERROR = exports.NOT_SUPPORTED_ERROR = 'E1065';
const EVENT_NAMES = ['onresult', 'onerror', 'onend'];
class SpeechRecognitionAdapter {
  constructor(config, events) {
    this._isListening = false;
    const window = (0, _window.getWindow)();
    // @ts-expect-error SpeechRecognition API is not supported in TS
    const SpeechRecognitionConstructor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionConstructor) {
      _ui.default.log(NOT_SUPPORTED_ERROR);
      return;
    }
    this._speechRecognition = new SpeechRecognitionConstructor();
    this.applyConfig(config);
    this._attachEvents(events);
  }
  _attachEvents(events) {
    if (!this._speechRecognition) {
      return;
    }
    // eslint-disable-next-line spellcheck/spell-checker
    this._speechRecognition.onstart = () => {
      this._isListening = true;
    };
    // eslint-disable-next-line spellcheck/spell-checker
    this._speechRecognition.onend = event => {
      this._isListening = false;
      events.onEnd(event);
    };
    // eslint-disable-next-line spellcheck/spell-checker
    this._speechRecognition.onresult = events.onResult;
    this._speechRecognition.onerror = events.onError;
  }
  applyConfig() {
    let config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    Object.entries(config).forEach(_ref => {
      let [key, value] = _ref;
      if (this._speechRecognition && !EVENT_NAMES.includes(key)) {
        this._speechRecognition[key] = value;
      }
    });
  }
  start() {
    var _this$_speechRecognit;
    if (this._isListening) {
      return;
    }
    (_this$_speechRecognit = this._speechRecognition) === null || _this$_speechRecognit === void 0 || _this$_speechRecognit.start();
  }
  stop() {
    var _this$_speechRecognit2;
    if (!this._isListening) {
      return;
    }
    (_this$_speechRecognit2 = this._speechRecognition) === null || _this$_speechRecognit2 === void 0 || _this$_speechRecognit2.stop();
  }
  dispose() {
    this._speechRecognition = null;
  }
  isAvailable() {
    return Boolean(this._speechRecognition);
  }
}
exports.SpeechRecognitionAdapter = SpeechRecognitionAdapter;
