/**
* DevExtreme (esm/__internal/grids/grid_core/__tests__/__mock__/model/cell/ai_header_cell.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { DropDownButtonModel } from '../../../../../../ui/drop_down_editor/__tests__/__mock__/model/drop_down_button';
import { HeaderCellModel } from './header_cell';
const SELECTORS = {
  aiColumnHeaderContent: 'dx-command-ai-header-content',
  aiColumnHeaderButton: 'dx-command-ai-header-button',
  aiChatSparkleOutlineIcon: 'dx-icon-chatsparkleoutline'
};
export class AIHeaderCellModel extends HeaderCellModel {
  getHeaderContent() {
    var _this$root;
    return ((_this$root = this.root) === null || _this$root === void 0 ? void 0 : _this$root.querySelector(`.${SELECTORS.aiColumnHeaderContent}`)) ?? null;
  }
  getIcon() {
    var _this$root2;
    return ((_this$root2 = this.root) === null || _this$root2 === void 0 ? void 0 : _this$root2.querySelector(`.${SELECTORS.aiChatSparkleOutlineIcon}`)) ?? null;
  }
  getDropDownButton() {
    var _this$root3;
    return new DropDownButtonModel(((_this$root3 = this.root) === null || _this$root3 === void 0 ? void 0 : _this$root3.querySelector(`.${SELECTORS.aiColumnHeaderButton}`)) ?? null);
  }
}
