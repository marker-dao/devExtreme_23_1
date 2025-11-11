/**
* DevExtreme (cjs/__internal/grids/grid_core/ai_column/m_ai_column_view.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.columnHeadersViewExtender = void 0;
var _message = _interopRequireDefault(require("../../../../common/core/localization/message"));
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _drop_down_button = _interopRequireDefault(require("../../../../ui/drop_down_button"));
var _const = require("./const");
var _dom = require("./dom");
var _utils = require("./utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const columnHeadersViewExtender = Base => class AIColumnHeadersViewExtender extends Base {
  getDropDownButtonItems(column) {
    var _column$ai, _column$ai2;
    return [{
      key: 'autoFill',
      icon: _const.ICON_NAMES.autoFill,
      text: _message.default.format('dxDataGrid-aiDropDownAutofill')
    }, {
      key: 'regenerate',
      icon: _const.ICON_NAMES.regenerate,
      text: _message.default.format('dxDataGrid-aiPromptEditorRegenerateButton'),
      disabled: !((_column$ai = column.ai) !== null && _column$ai !== void 0 && _column$ai.prompt)
    }, {
      key: 'clear',
      icon: _const.ICON_NAMES.clear,
      text: _message.default.format('dxDataGrid-aiDropDownClear'),
      disabled: !((_column$ai2 = column.ai) !== null && _column$ai2 !== void 0 && _column$ai2.prompt)
    }];
  }
  getDropDownButtonInstance($container) {
    return _drop_down_button.default.getInstance($container.find(`.${_const.CLASSES.aiColumnHeaderButton}`)[0]);
  }
  getDropDownButtonConfig(column, $container) {
    const alignment = column.alignment === 'right' ? 'left' : 'right';
    return {
      showArrowIcon: false,
      icon: 'overflow',
      stylingMode: 'text',
      useItemTextAsTitle: false,
      items: this.getDropDownButtonItems(column),
      onItemClick: e => {
        const {
          key: actionName
        } = e.itemData;
        // eslint-disable-next-line default-case
        switch (actionName) {
          case 'autoFill':
            this.aiPromptEditorController.show($container[0], column);
            break;
          case 'regenerate':
            this.aiColumnController.sendRequest(column.name, false);
            break;
          case 'clear':
            this.aiColumnController.clearAIColumn(column.name);
            break;
        }
      },
      dropDownOptions: {
        width: 180,
        position: {
          of: $container[0],
          at: `${alignment} bottom`,
          my: `${alignment} top`
        },
        onShown: () => {
          this.activeDropDownButtonInstance = this.getDropDownButtonInstance($container);
        },
        onHidden: () => {
          this.activeDropDownButtonInstance = null;
        },
        onDisposing: () => {
          this.activeDropDownButtonInstance = null;
        }
      }
    };
  }
  renderHeaderDropDownButton(column, $container) {
    const $dropDownButton = (0, _renderer.default)('<div>').addClass(_const.CLASSES.aiColumnHeaderButton).appendTo($container);
    this._createComponent($dropDownButton, _drop_down_button.default, this.getDropDownButtonConfig(column, $container));
  }
  renderAIHeader($container, column) {
    const $iconElement = (0, _dom.createChatSparkleOutlineIcon)();
    const $aiHeaderContainer = (0, _dom.createAIHeaderContainer)();
    const $cellContent = this.createCellContent($container, column);
    $cellContent.text(column.caption ?? '');
    $aiHeaderContainer.append($iconElement).append($cellContent).appendTo($container);
  }
  getHeaderDefaultTemplate($container, options) {
    if ((0, _utils.isAIColumnHeader)(options.column)) {
      this.renderAIHeader($container, options.column);
      return;
    }
    super.getHeaderDefaultTemplate($container, options);
  }
  _processTemplate(template, options) {
    const renderingTemplate = super._processTemplate(template, options);
    const needToRenderHeaderDropDownButton = (0, _utils.isAIColumnHeader)(options.column, options.rowType) && (0, _utils.isHeaderDropDownButtonVisible)(options.column);
    if (renderingTemplate && needToRenderHeaderDropDownButton) {
      return {
        render: args => {
          renderingTemplate.render(args);
          this.renderHeaderDropDownButton(args.model.column, (0, _renderer.default)(args.container));
        }
      };
    }
    return renderingTemplate;
  }
  aiColumnOptionChanged(column, optionName, value) {
    const isPromptOptionName = (0, _utils.isPromptOption)(optionName, value);
    if (isPromptOptionName) {
      const visibleIndex = this._columnsController.getVisibleIndex(column.index);
      const $headerElement = this.getHeaderElement(visibleIndex);
      const dropDownButtonInstance = this.getDropDownButtonInstance($headerElement);
      dropDownButtonInstance === null || dropDownButtonInstance === void 0 || dropDownButtonInstance.option('items', this.getDropDownButtonItems(column));
    }
  }
  init() {
    super.init();
    this.aiColumnController = this.getController('aiColumn');
    this.aiPromptEditorController = this.getController('aiPromptEditor');
    this.columnsResizer = this.getController('columnsResizer');
    this.columnsResizer.resizeStarted.add(() => {
      var _this$activeDropDownB;
      /**
       * We need to manually close the DropDownMenu button and AIPromptEditor
       * because the stopPropagation method is called
       * when the cell resize is initiated.
       * Calling this method is necessary to fix bug T252661.
       */
      (_this$activeDropDownB = this.activeDropDownButtonInstance) === null || _this$activeDropDownB === void 0 || _this$activeDropDownB.close();
      this.aiPromptEditorController.hide();
    });
    this.aiColumnOptionChangedHandler = this.aiColumnOptionChanged.bind(this);
    this._columnsController.aiColumnOptionChanged.add(this.aiColumnOptionChangedHandler);
  }
  renderDragCellContent($dragContainer, column) {
    if (column.type === _const.AI_COLUMN_NAME) {
      this.renderAIHeader($dragContainer, column);
      return;
    }
    super.renderDragCellContent($dragContainer, column);
  }
  dispose() {
    super.dispose();
    this.activeDropDownButtonInstance = null;
    if (this.aiColumnOptionChangedHandler) {
      this._columnsController.aiColumnOptionChanged.remove(this.aiColumnOptionChangedHandler);
    }
  }
};
exports.columnHeadersViewExtender = columnHeadersViewExtender;
