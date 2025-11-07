"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _pointer = _interopRequireDefault(require("../../../common/core/events/pointer"));
var _utils = require("../../../common/core/events/utils");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _widget = _interopRequireDefault(require("../../core/widget/widget"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const POINTERUP_EVENT_NAME = (0, _utils.addNamespace)(_pointer.default.up, 'dxDiagramPanel');
const PREVENT_REFOCUS_SELECTOR = '.dx-textbox';
class DiagramPanel extends _widget.default {
  _init() {
    super._init();
    this._createOnPointerUpAction();
  }
  _render() {
    super._render();
    this._attachPointerUpEvent();
  }
  _getPointerUpElements() {
    return [this.$element()];
  }
  _attachPointerUpEvent() {
    const elements = this._getPointerUpElements();
    elements.forEach(element => {
      _events_engine.default.off(element, POINTERUP_EVENT_NAME);
      _events_engine.default.on(element, POINTERUP_EVENT_NAME, e => {
        if (!(0, _renderer.default)(e.target).closest(PREVENT_REFOCUS_SELECTOR).length) {
          this._onPointerUpAction();
        }
      });
    });
  }
  _createOnPointerUpAction() {
    this._onPointerUpAction = this._createActionByOption('onPointerUp');
  }
  _optionChanged(args) {
    const {
      name
    } = args;
    switch (name) {
      case 'onPointerUp':
        this._createOnPointerUpAction();
        break;
      default:
        super._optionChanged(args);
    }
  }
}
var _default = exports.default = DiagramPanel;