"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RollingStock = void 0;
var RollingStock = /*#__PURE__*/function () {
  function RollingStock(label, isRotated, shiftFunction) {
    var bBox = label.getBoundingRect();
    var x = bBox.x;
    var y = bBox.y;
    var endX = bBox.x + bBox.width;
    var endY = bBox.y + bBox.height;
    this.labels = [label];
    this.shiftFunction = shiftFunction;
    this.bBox = {
      start: isRotated ? x : y,
      width: isRotated ? bBox.width : bBox.height,
      end: isRotated ? endX : endY,
      oppositeStart: isRotated ? y : x,
      oppositeEnd: isRotated ? endY : endX
    };
    this.initialPosition = isRotated ? bBox.x : bBox.y;
  }
  var _proto = RollingStock.prototype;
  _proto.toChain = function toChain(nextRollingStock) {
    var nextRollingStockBBox = nextRollingStock.getBoundingRect();
    nextRollingStock.shift(nextRollingStockBBox.start - this.bBox.end);
    this.changeBoxWidth(nextRollingStockBBox.width);
    this.labels = this.labels.concat(nextRollingStock.labels);
  };
  _proto.getBoundingRect = function getBoundingRect() {
    return this.bBox;
  };
  _proto.shift = function shift(shiftLength) {
    var _this = this;
    this.labels.forEach(function (label) {
      var bBox = label.getBoundingRect();
      var coords = _this.shiftFunction(bBox, shiftLength);
      if (!label.hideInsideLabel(coords)) {
        label.shift(coords.x, coords.y);
      }
    });
    this.bBox.end -= shiftLength;
    this.bBox.start -= shiftLength;
  };
  _proto.setRollingStockInCanvas = function setRollingStockInCanvas(canvas) {
    if (this.bBox.end > canvas.end) {
      this.shift(this.bBox.end - canvas.end);
    }
  };
  _proto.getLabels = function getLabels() {
    return this.labels;
  };
  _proto.value = function value() {
    return this.labels[0].getData().value;
  };
  _proto.getInitialPosition = function getInitialPosition() {
    return this.initialPosition;
  };
  _proto.changeBoxWidth = function changeBoxWidth(width) {
    this.bBox.end += width;
    this.bBox.width += width;
  };
  return RollingStock;
}();
exports.RollingStock = RollingStock;