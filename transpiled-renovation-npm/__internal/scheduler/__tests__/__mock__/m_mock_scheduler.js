"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupSchedulerTestEnvironment = exports.DEFAULT_TIMELINE_CELL_HEIGHT = exports.DEFAULT_CELL_WIDTH = exports.DEFAULT_CELL_HEIGHT = void 0;
var _globals = require("@jest/globals");
var _m_console = require("../../../core/utils/m_console");
var _dom_component = _interopRequireDefault(require("../../../core/widget/dom_component"));
var _m_work_space = _interopRequireDefault(require("../../workspaces/m_work_space"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const DEFAULT_CELL_WIDTH = exports.DEFAULT_CELL_WIDTH = 250;
const DEFAULT_CELL_HEIGHT = exports.DEFAULT_CELL_HEIGHT = 80;
const DEFAULT_TIMELINE_CELL_HEIGHT = exports.DEFAULT_TIMELINE_CELL_HEIGHT = 450;
const setupSchedulerTestEnvironment = function () {
  let {
    width = DEFAULT_CELL_WIDTH,
    height = DEFAULT_CELL_HEIGHT
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  _globals.jest.spyOn(_m_console.logger, 'warn').mockImplementation(() => {});
  _dom_component.default.prototype._isVisible = _globals.jest.fn(() => true);
  _m_work_space.default.prototype._createCrossScrollingConfig = () => ({
    direction: 'both',
    onScroll: _globals.jest.fn(),
    onEnd: _globals.jest.fn()
  });
  Element.prototype.getBoundingClientRect = _globals.jest.fn(() => ({
    width,
    height,
    top: 0,
    left: 0,
    bottom: height,
    right: width,
    x: 0,
    y: 0,
    toJSON: () => {}
  }));
};
exports.setupSchedulerTestEnvironment = setupSchedulerTestEnvironment;