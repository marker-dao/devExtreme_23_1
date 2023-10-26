"use strict";

exports.getCanvas = getCanvas;
exports.getCloudAngle = getCloudAngle;
exports.getCloudPoints = getCloudPoints;
exports.isTextEmpty = isTextEmpty;
exports.prepareData = prepareData;
exports.recalculateCoordinates = recalculateCoordinates;
var _type = require("../../../core/utils/type");
var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));
var _window = require("../../../core/utils/window");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  PI,
  asin,
  ceil,
  cos,
  floor,
  max,
  min,
  round,
  sin
} = Math;
const buildPath = function () {
  for (var _len = arguments.length, points = new Array(_len), _key = 0; _key < _len; _key++) {
    points[_key] = arguments[_key];
  }
  return points.join('');
};
function getArc(cornerRadius, xDirection, yDirection) {
  return "a ".concat(cornerRadius, " ").concat(cornerRadius, " 0 0 1 ").concat(xDirection * cornerRadius, " ").concat(yDirection * cornerRadius);
}
function getAbsoluteArc(cornerRadius, x, y) {
  return "A ".concat(cornerRadius, " ").concat(cornerRadius, " 0 0 1 ").concat(x, " ").concat(y);
}
function rotateSize(_ref, angle) {
  let {
    height,
    width
  } = _ref;
  if (angle % 90 === 0 && angle % 180 !== 0) {
    return {
      width: height,
      height: width
    };
  }
  return {
    width,
    height
  };
}
function rotateX(_ref2, angle) {
  let {
    anchorX,
    anchorY,
    x,
    y
  } = _ref2;
  return (anchorX - x) * round(cos(angle)) + (anchorY - y) * round(sin(angle)) + x;
}
function rotateY(_ref3, angle) {
  let {
    anchorX,
    anchorY,
    x,
    y
  } = _ref3;
  return -(anchorX - x) * round(sin(angle)) + (anchorY - y) * round(cos(angle)) + y;
}
function getCloudPoints(size, coordinates, rotationAngle, options, bounded) {
  const {
    x,
    y
  } = coordinates;
  const radRotationAngle = rotationAngle * PI / 180;
  const {
    height,
    width
  } = rotateSize(size, rotationAngle);
  const anchorX = rotateX(coordinates, radRotationAngle);
  const anchorY = rotateY(coordinates, radRotationAngle);
  const halfArrowWidth = options.arrowWidth / 2;
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const xr = Math.ceil(x + halfWidth);
  const xl = Math.floor(x - halfWidth);
  const yt = Math.floor(y - halfHeight);
  const yb = Math.ceil(y + halfHeight);
  const leftTopCorner = [xl, yt];
  const rightTopCorner = [xr, yt];
  const rightBottomCorner = [xr, yb];
  const leftBottomCorner = [xl, yb];
  const getCoordinate = (cur, side1, side2) => {
    if (cur <= side1) {
      return side1;
    }
    if (cur >= side2) {
      return side2;
    }
    return cur;
  };
  const arrowX = getCoordinate(anchorX, xl, xr);
  const arrowY = getCoordinate(anchorY, yt, yb);
  const arrowBaseBottom = min(arrowY + halfArrowWidth, yb);
  const arrowBaseTop = max(arrowY - halfArrowWidth, yt);
  const arrowBaseLeft = max(arrowX - halfArrowWidth, xl);
  const cornerRadius = Math.min(halfWidth, halfHeight, options.cornerRadius);
  let points = '';
  let arrowArc = '';
  leftTopCorner[1] += cornerRadius;
  rightTopCorner[0] -= cornerRadius;
  rightBottomCorner[1] -= cornerRadius;
  leftBottomCorner[0] += cornerRadius;
  if (!bounded || xl <= anchorX && anchorX <= xr && yt <= anchorY && anchorY <= yb) {
    points = buildPath(leftTopCorner, getArc(cornerRadius, 1, -1), 'L', rightTopCorner, getArc(cornerRadius, 1, 1), 'L', rightBottomCorner, getArc(cornerRadius, -1, 1), 'L', leftBottomCorner, getArc(cornerRadius, -1, -1));
  } else if (anchorX > xr && anchorY < yt) {
    const arrowAngle = options.arrowWidth / cornerRadius || 0;
    const angle = PI / 4 + arrowAngle / 2;
    const endAngle = PI / 4 - arrowAngle / 2;
    const arrowEndPointX = rightTopCorner[0] + cos(endAngle) * cornerRadius;
    const arrowEndPointY = rightTopCorner[1] + (1 - sin(endAngle)) * cornerRadius;
    if (Math.abs(angle) > PI / 2) {
      arrowArc = buildPath('L', [arrowBaseLeft, yt, anchorX, anchorY, xr, arrowBaseBottom]);
    } else {
      arrowArc = buildPath('L', rightTopCorner, getArc(cornerRadius, cos(angle), 1 - sin(angle)), 'L', [anchorX, anchorY, arrowEndPointX, arrowEndPointY], getAbsoluteArc(cornerRadius, rightTopCorner[0] + cornerRadius, rightTopCorner[1] + cornerRadius));
    }
    points = buildPath(leftTopCorner, getArc(cornerRadius, 1, -1), arrowArc, 'L', rightBottomCorner, getArc(cornerRadius, -1, 1), 'L', leftBottomCorner, getArc(cornerRadius, -1, -1));
  } else if (anchorX > xr && anchorY >= yt && anchorY <= yb) {
    if (arrowBaseTop >= rightTopCorner[1] + cornerRadius && arrowBaseBottom <= rightBottomCorner[1]) {
      arrowArc = buildPath(getArc(cornerRadius, 1, 1), 'L', [xr, arrowBaseTop, anchorX, anchorY, xr, arrowBaseBottom], 'L', rightBottomCorner, getArc(cornerRadius, -1, 1));
    } else if (arrowBaseTop < rightTopCorner[1] + cornerRadius && arrowBaseBottom >= rightTopCorner[1] + cornerRadius && arrowBaseBottom <= rightBottomCorner[1]) {
      const arrowWidthRest = rightTopCorner[1] + cornerRadius - arrowBaseTop;
      const angle = arrowWidthRest / cornerRadius;
      const arrowBaseTopX = rightTopCorner[0] + cos(angle) * cornerRadius;
      const arrowBaseTopY = rightTopCorner[1] + (1 - sin(angle)) * cornerRadius;
      arrowArc = buildPath(getArc(cornerRadius, cos(angle), 1 - sin(angle)), 'L', [arrowBaseTopX, arrowBaseTopY, anchorX, anchorY, xr, arrowBaseBottom], 'L', rightBottomCorner, getArc(cornerRadius, -1, 1));
    } else if (arrowBaseTop < rightTopCorner[1] + cornerRadius && arrowBaseBottom < rightTopCorner[1] + cornerRadius) {
      const arrowWidthRest = rightTopCorner[1] + cornerRadius - arrowBaseTop;
      const arrowAngle = arrowWidthRest / cornerRadius;
      const angle = arrowAngle;
      const arrowBaseTopX = rightTopCorner[0] + cos(angle) * cornerRadius;
      const arrowBaseTopY = rightTopCorner[1] + (1 - sin(angle)) * cornerRadius;
      const bottomAngle = Math.sin((rightTopCorner[1] + cornerRadius - arrowBaseBottom) / cornerRadius);
      const arrowBaseBottomX = rightTopCorner[0] + cornerRadius * cos(bottomAngle);
      const arrowBaseBottomY = rightTopCorner[1] + cornerRadius * (1 - sin(bottomAngle));
      arrowArc = buildPath(getArc(cornerRadius, cos(angle), 1 - sin(angle)), 'L', [arrowBaseTopX, arrowBaseTopY, anchorX, anchorY, arrowBaseBottomX, arrowBaseBottomY], getAbsoluteArc(cornerRadius, rightTopCorner[0] + cornerRadius, rightTopCorner[1] + cornerRadius), 'L', rightBottomCorner, getArc(cornerRadius, -1, 1));
    } else if (arrowBaseTop <= rightTopCorner[1] + cornerRadius && arrowBaseBottom >= rightBottomCorner[1]) {
      const topAngle = asin((rightTopCorner[1] + cornerRadius - arrowBaseTop) / cornerRadius);
      const arrowBaseTopX = rightTopCorner[0] + cornerRadius * cos(topAngle);
      const arrowBaseTopY = rightTopCorner[1] + cornerRadius * (1 - sin(topAngle));
      const bottomAngle = asin((arrowBaseBottom - rightBottomCorner[1]) / cornerRadius);
      const arrowBaseBottomX = rightBottomCorner[0] + cornerRadius * (cos(bottomAngle) - 1);
      const arrowBaseBottomY = rightBottomCorner[1] + cornerRadius * sin(bottomAngle);
      arrowArc = buildPath(getArc(cornerRadius, cos(topAngle), 1 - sin(topAngle)), 'L', [arrowBaseTopX, arrowBaseTopY, anchorX, anchorY, arrowBaseBottomX, arrowBaseBottomY], getAbsoluteArc(cornerRadius, rightBottomCorner[0] - cornerRadius, rightBottomCorner[1] + cornerRadius));
    } else if (arrowBaseTop > rightTopCorner[1] + cornerRadius && arrowBaseTop <= rightBottomCorner[1] && arrowBaseBottom > rightBottomCorner[1]) {
      const bottomAngle = asin((arrowBaseBottom - rightBottomCorner[1]) / cornerRadius);
      const arrowBaseBottomX = rightBottomCorner[0] + cornerRadius * (cos(bottomAngle) - 1);
      const arrowBaseBottomY = rightBottomCorner[1] + cornerRadius * sin(bottomAngle);
      arrowArc = buildPath(getArc(cornerRadius, 1, 1), 'L', [xr, arrowBaseTop, anchorX, anchorY, arrowBaseBottomX, arrowBaseBottomY], getAbsoluteArc(cornerRadius, rightBottomCorner[0] - cornerRadius, rightBottomCorner[1] + cornerRadius));
    } else if (arrowBaseTop > rightTopCorner[1] + cornerRadius && arrowBaseBottom > rightBottomCorner[1]) {
      const bottomAngle = asin((arrowBaseBottom - rightBottomCorner[1]) / cornerRadius);
      const arrowBaseBottomX = rightBottomCorner[0] + cornerRadius * (cos(bottomAngle) - 1);
      const arrowBaseBottomY = rightBottomCorner[1] + cornerRadius * sin(bottomAngle);
      const topAngle = asin((arrowBaseTop - rightBottomCorner[1]) / cornerRadius);
      const arrowBaseTopX = rightBottomCorner[0] + cornerRadius * (cos(topAngle) - 1);
      const arrowBaseTopY = rightBottomCorner[1] + cornerRadius * sin(topAngle);
      arrowArc = buildPath(getArc(cornerRadius, 1, 1), 'L', rightBottomCorner, getArc(cornerRadius, cos(topAngle) - 1, sin(topAngle)), 'L', [arrowBaseTopX, arrowBaseTopY, anchorX, anchorY, arrowBaseBottomX, arrowBaseBottomY], getAbsoluteArc(cornerRadius, rightBottomCorner[0] - cornerRadius, rightBottomCorner[1] + cornerRadius));
    }
    points = buildPath(leftTopCorner, getArc(cornerRadius, 1, -1), 'L', rightTopCorner, arrowArc, 'L', leftBottomCorner, getArc(cornerRadius, -1, -1));
  }
  return buildPath('M', points, 'Z');
}
function getCanvas(container) {
  var _ref4, _getWindow, _ref5, _getWindow2;
  const containerBox = container.getBoundingClientRect();
  const html = _dom_adapter.default.getDocumentElement();
  const body = _dom_adapter.default.getBody();
  let left = (_ref4 = Number((_getWindow = (0, _window.getWindow)()) === null || _getWindow === void 0 ? void 0 : _getWindow.pageXOffset) || html.scrollLeft) !== null && _ref4 !== void 0 ? _ref4 : 0;
  let top = (_ref5 = Number((_getWindow2 = (0, _window.getWindow)()) === null || _getWindow2 === void 0 ? void 0 : _getWindow2.pageYOffset) || html.scrollTop) !== null && _ref5 !== void 0 ? _ref5 : 0;
  const box = {
    left,
    top,
    width: max(body.clientWidth, html.clientWidth) + left,
    height: max(body.scrollHeight, html.scrollHeight, body.offsetHeight, html.offsetHeight, body.clientHeight, html.clientHeight),
    right: 0,
    bottom: 0
  };
  if (container !== _dom_adapter.default.getBody()) {
    left = max(box.left, box.left + containerBox.left);
    top = max(box.top, box.top + containerBox.top);
    box.width = min(containerBox.width, box.width) + left + box.left;
    box.height = min(containerBox.height, box.height) + top + box.top;
    box.left = left;
    box.top = top;
  }
  return box;
}
function recalculateCoordinates(_ref6) {
  let {
    anchorX,
    anchorY,
    arrowLength,
    canvas,
    offset,
    size
  } = _ref6;
  const bounds = {
    xl: canvas.left,
    xr: canvas.width - canvas.right,
    width: canvas.width - canvas.right - canvas.left,
    yt: canvas.top,
    yb: canvas.height - canvas.bottom,
    height: canvas.height - canvas.bottom - canvas.top
  };
  if (anchorX < bounds.xl || bounds.xr < anchorX || anchorY < bounds.yt || bounds.yb < anchorY) {
    return false;
  }
  let x = Number.NaN;
  let y = Number.NaN;
  let correctedAnchorY = anchorY;
  if (bounds.width < size.width) {
    x = round(bounds.xl + bounds.width / 2);
  } else {
    x = min(max(anchorX, ceil(bounds.xl + size.width / 2)), floor(bounds.xr - size.width / 2));
  }
  const halfHeightWithArrow = arrowLength + size.height / 2 + offset;
  const yTop = anchorY - halfHeightWithArrow;
  const yBottom = anchorY + halfHeightWithArrow;
  if (bounds.height < size.height + arrowLength) {
    y = round(bounds.yt + size.height / 2);
  } else if (yTop - size.height / 2 < bounds.yt) {
    if (yBottom + size.height / 2 < bounds.yb) {
      y = yBottom;
      correctedAnchorY += offset;
    } else {
      y = round(bounds.yt + size.height / 2);
    }
  } else {
    y = yTop;
    correctedAnchorY -= offset;
  }
  return {
    x,
    y,
    anchorX,
    anchorY: correctedAnchorY
  };
}
function getCloudAngle(_ref7, _ref8) {
  let {
    height,
    width
  } = _ref7;
  let {
    anchorX,
    anchorY,
    x,
    y
  } = _ref8;
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const xr = Math.ceil(x + halfWidth);
  const xl = Math.floor(x - halfWidth);
  const yt = Math.floor(y - halfHeight);
  const yb = Math.ceil(y + halfHeight);
  let angle = 0;
  if (anchorX < xl && anchorY < yt || anchorX >= xl && anchorX <= xr && anchorY < yt) {
    angle = 270;
  }
  if (anchorX > xr && anchorY > yb || anchorX >= xl && anchorX <= xr && anchorY > yb) {
    angle = 90;
  }
  if (anchorX < xl && anchorY > yb || anchorX < xl && anchorY >= yt && anchorY <= yb) {
    angle = 180;
  }
  return angle;
}
function prepareData(data, color, border, font, customizeTooltip) {
  var _customize$color, _customize$borderColo, _customize$fontColor;
  let customize = {};
  if ((0, _type.isFunction)(customizeTooltip)) {
    customize = customizeTooltip.call(data, data);
    customize = (0, _type.isPlainObject)(customize) ? customize : {};
    if ('text' in customize) {
      customize.text = (0, _type.isDefined)(customize.text) ? String(customize.text) : '';
    }
    if ('html' in customize) {
      customize.html = (0, _type.isDefined)(customize.html) ? String(customize.html) : '';
    }
  }
  if (!('text' in customize) && !('html' in customize)) {
    var _data$valueText, _data$description;
    customize.text = ((_data$valueText = data.valueText) !== null && _data$valueText !== void 0 ? _data$valueText : '') || ((_data$description = data.description) !== null && _data$description !== void 0 ? _data$description : '');
  }
  customize.color = ((_customize$color = customize.color) !== null && _customize$color !== void 0 ? _customize$color : '') || color;
  customize.borderColor = ((_customize$borderColo = customize.borderColor) !== null && _customize$borderColo !== void 0 ? _customize$borderColo : '') || border.color;
  customize.fontColor = ((_customize$fontColor = customize.fontColor) !== null && _customize$fontColor !== void 0 ? _customize$fontColor : '') || font.color;
  return customize;
}
function isTextEmpty(_ref9) {
  let {
    html,
    text
  } = _ref9;
  return text === null || text === '' || html === '' || html === null;
}