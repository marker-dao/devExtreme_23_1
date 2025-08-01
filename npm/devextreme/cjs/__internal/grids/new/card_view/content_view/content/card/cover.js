/**
* DevExtreme (cjs/__internal/grids/new/card_view/content_view/content/card/cover.js)
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
exports.Cover = exports.CLASSES = void 0;
var _inferno = require("inferno");
var _message = _interopRequireDefault(require("../../../../../../../localization/message"));
var _combine_classes = require("../../../../../../core/utils/combine_classes");
var _icon = require("../../../../../../grids/new/grid_core/icon");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CLASSES = exports.CLASSES = {
  cover: 'dx-card-cover',
  image: 'dx-card-cover-image',
  noImage: 'dx-card-cover-noimage'
};
class Cover extends _inferno.Component {
  render() {
    const {
      id,
      imageSrc,
      alt,
      template: Template,
      card
    } = this.props;
    const src = imageSrc;
    const containerClasses = (0, _combine_classes.combineClasses)({
      [CLASSES.cover]: true,
      [CLASSES.noImage]: !src && !Template
    });
    return (0, _inferno.createVNode)(1, "div", containerClasses, Template ? (0, _inferno.createComponentVNode)(2, Template, {
      "card": card
    }) : (0, _inferno.createFragment)([src && (0, _inferno.createVNode)(1, "img", CLASSES.image, null, 1, {
      "src": src,
      "alt": alt
    }), !src && (0, _inferno.createComponentVNode)(2, _icon.Icon, {
      "name": 'imagethumbnail',
      "aria-label": _message.default.format('dxCardView-cardNoImageAriaLabel')
    })], 0), 0, {
      "id": id
    });
  }
}
exports.Cover = Cover;
