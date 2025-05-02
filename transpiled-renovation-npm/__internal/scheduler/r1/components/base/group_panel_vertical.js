"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupPanelVertical = void 0;
var _inferno = require("inferno");
var _index = require("../../../../core/r1/runtime/inferno/index");
var _index2 = require("../../utils/index");
var _group_panel_props = require("./group_panel_props");
var _group_panel_vertical_row = require("./group_panel_vertical_row");
class GroupPanelVertical extends _index.BaseInfernoComponent {
  render() {
    const {
      className,
      elementRef,
      groupPanelData,
      resourceCellTemplate,
      height,
      styles
    } = this.props;
    const style = (0, _index.normalizeStyles)(_index2.renderUtils.addHeightToStyle(height, styles));
    return (0, _inferno.createVNode)(1, "div", className, (0, _inferno.createVNode)(1, "div", "dx-scheduler-group-flex-container", groupPanelData.groupPanelItems.map(group => (0, _inferno.createComponentVNode)(2, _group_panel_vertical_row.GroupPanelVerticalRow, {
      "groupItems": group,
      "cellTemplate": resourceCellTemplate
    }, group[0].key)), 0), 2, {
      "style": style
    }, null, elementRef);
  }
}
exports.GroupPanelVertical = GroupPanelVertical;
GroupPanelVertical.defaultProps = _group_panel_props.GroupPanelBaseDefaultProps;