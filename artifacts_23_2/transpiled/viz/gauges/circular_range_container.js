"use strict";

exports.default = void 0;
var _base_range_container = _interopRequireDefault(require("./base_range_container"));
var _utils = require("../core/utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const _Number = Number;
const _max = Math.max;
const CircularRangeContainer = _base_range_container.default.inherit({
  _processOptions: function () {
    const that = this;
    that._inner = that._outer = 0;
    switch ((0, _utils.normalizeEnum)(that._options.orientation)) {
      case 'inside':
        that._inner = 1;
        break;
      case 'center':
        that._inner = that._outer = 0.5;
        break;
      default:
        that._outer = 1;
        break;
    }
  },
  _isVisible: function (layout) {
    let width = this._options.width;
    width = _Number(width) || _max(_Number(width.start), _Number(width.end));
    return layout.radius - this._inner * width > 0;
  },
  _createRange: function (range, layout) {
    const that = this;
    const width = (range.startWidth + range.endWidth) / 2;
    return that._renderer.arc(layout.x, layout.y, layout.radius - that._inner * width, layout.radius + that._outer * width, that._translator.translate(range.end), that._translator.translate(range.start)).attr({
      'stroke-linejoin': 'round'
    });
  },
  measure: function (layout) {
    let width = this._options.width;
    width = _Number(width) || _max(_Number(width.start), _Number(width.end));
    return {
      min: layout.radius - this._inner * width,
      max: layout.radius + this._outer * width
    };
  }
});
var _default = CircularRangeContainer;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;