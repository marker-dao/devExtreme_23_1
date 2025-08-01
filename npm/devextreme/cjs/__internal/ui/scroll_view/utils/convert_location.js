/**
* DevExtreme (cjs/__internal/ui/scroll_view/utils/convert_location.js)
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
exports.convertToLocation = convertToLocation;
var _common = require("../../../../core/utils/common");
var _type = require("../../../../core/utils/type");
var _scroll_direction = require("./scroll_direction");
function convertToLocation(location, direction) {
  if ((0, _type.isPlainObject)(location)) {
    const left = (0, _common.ensureDefined)(location.left, location.x);
    const top = (0, _common.ensureDefined)(location.top, location.y);
    return {
      left: (0, _type.isDefined)(left) ? left : undefined,
      top: (0, _type.isDefined)(top) ? top : undefined
    };
  }
  const {
    isVertical,
    isHorizontal
  } = new _scroll_direction.ScrollDirection(direction);
  return {
    left: isHorizontal && (0, _type.isDefined)(location) ? location : undefined,
    top: isVertical && (0, _type.isDefined)(location) ? location : undefined
  };
}
