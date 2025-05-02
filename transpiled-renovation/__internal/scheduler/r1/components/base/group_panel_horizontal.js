"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupPanelHorizontal = void 0;
var _inferno = require("inferno");
var _index = require("../../../../core/r1/runtime/inferno/index");
var _group_panel_horizontal_row = require("./group_panel_horizontal_row");
var _group_panel_props = require("./group_panel_props");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
class GroupPanelHorizontal extends _index.BaseInfernoComponent {
  constructor() {
    super(...arguments);
    this._groupPanelItems = null;
  }
  getGroupPanelItems() {
    if (this._groupPanelItems !== null) {
      return this._groupPanelItems;
    }
    const {
      groupPanelData: {
        baseColSpan,
        groupPanelItems
      }
    } = this.props;
    const colSpans = groupPanelItems.reduceRight((currentColSpans, groupsRow, idx) => {
      const nextColSpans = currentColSpans;
      const currentLevelGroupCount = groupsRow.length;
      const previousColSpan = idx === groupPanelItems.length - 1 ? baseColSpan : currentColSpans[idx + 1];
      const previousLevelGroupCount = idx === groupPanelItems.length - 1 ? currentLevelGroupCount : groupPanelItems[idx + 1].length;
      const groupCountDiff = previousLevelGroupCount / currentLevelGroupCount;
      nextColSpans[idx] = groupCountDiff * previousColSpan;
      return nextColSpans;
    }, [...new Array(groupPanelItems.length)]);
    this._groupPanelItems = groupPanelItems.map((groupsRenderRow, index) => {
      const colSpan = colSpans[index];
      return groupsRenderRow.map(groupItem => _extends({}, groupItem, {
        colSpan
      }));
    });
    return this._groupPanelItems;
  }
  componentWillUpdate(nextProps) {
    if (this.props.groupPanelData !== nextProps.groupPanelData) {
      this._groupPanelItems = null;
    }
  }
  render() {
    const {
      resourceCellTemplate
    } = this.props;
    const groupPanelItems = this.getGroupPanelItems();
    return (0, _inferno.createFragment)(groupPanelItems.map(group => (0, _inferno.createComponentVNode)(2, _group_panel_horizontal_row.GroupPanelHorizontalRow, {
      "groupItems": group,
      "cellTemplate": resourceCellTemplate
    }, group[0].key)), 0);
  }
}
exports.GroupPanelHorizontal = GroupPanelHorizontal;
GroupPanelHorizontal.defaultProps = _group_panel_props.GroupPanelBaseDefaultProps;