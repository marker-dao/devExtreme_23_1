/**
* DevExtreme (cjs/__internal/scheduler/r1/components/timeline/header_panel_timeline.js)
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
exports.HeaderPanelTimeline = void 0;
var _inferno = require("inferno");
var _index = require("../../../../core/r1/runtime/inferno/index");
var _header_panel = require("../base/header_panel");
var _date_header_timeline = require("./date_header_timeline");
class HeaderPanelTimeline extends _index.InfernoWrapperComponent {
  createEffects() {
    return [(0, _index.createReRenderEffect)()];
  }
  render() {
    const {
      viewContext,
      dateCellTemplate,
      dateHeaderData,
      groupByDate,
      groupOrientation,
      groupPanelData,
      groups,
      isRenderDateHeader,
      resourceCellTemplate,
      timeCellTemplate
    } = this.props;
    return (0, _inferno.createComponentVNode)(2, _header_panel.HeaderPanel, {
      "viewContext": viewContext,
      "dateHeaderData": dateHeaderData,
      "groupPanelData": groupPanelData,
      "groupByDate": groupByDate,
      "groups": groups,
      "groupOrientation": groupOrientation,
      "isRenderDateHeader": isRenderDateHeader,
      "dateHeaderTemplate": _date_header_timeline.TimelineDateHeaderLayout,
      "resourceCellTemplate": resourceCellTemplate,
      "dateCellTemplate": dateCellTemplate,
      "timeCellTemplate": timeCellTemplate
    });
  }
}
exports.HeaderPanelTimeline = HeaderPanelTimeline;
HeaderPanelTimeline.defaultProps = _header_panel.HeaderPanelDefaultProps;
