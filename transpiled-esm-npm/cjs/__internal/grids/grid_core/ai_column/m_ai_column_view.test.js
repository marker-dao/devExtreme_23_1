"use strict";

var _globals = require("@jest/globals");
var _fx = _interopRequireDefault(require("../../../../common/core/animation/fx"));
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _callbacks = _interopRequireDefault(require("../../../../core/utils/callbacks"));
var _wrapInstance = _interopRequireDefault(require("../../../grids/grid_core/__tests__/__mock__/helpers/wrapInstance"));
var _ai_prompt_editor = require("../../../grids/grid_core/__tests__/__mock__/model/ai_prompt_editor");
var _ai_prompt_editor2 = require("./ai_prompt_editor/ai_prompt_editor");
var _const = require("./const");
var _m_ai_column_view = require("./m_ai_column_view");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* eslint-disable @typescript-eslint/no-explicit-any */
_globals.jest.mock('./ai_prompt_editor/ai_prompt_editor', () => {
  const original = _globals.jest.requireActual('./ai_prompt_editor/ai_prompt_editor');
  return _extends({}, original, {
    AIPromptEditor: _globals.jest.fn(function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      const instance = new original.AIPromptEditor(...args);
      return (0, _wrapInstance.default)(instance);
    })
  });
});
_globals.jest.spyOn(_m_ai_column_view.AIColumnView.prototype, 'getController');
const mockColumnsController = {
  addCommandColumn: _globals.jest.fn(),
  columnOption: _globals.jest.fn(),
  getColumnByPath: _globals.jest.fn(),
  getColumnOptionNameByFullName: _globals.jest.fn(),
  getVisibleIndex: _globals.jest.fn().mockReturnValue(0)
};
const mockAIColumnController = {
  abortAIColumnRequest: _globals.jest.fn(),
  refreshAIColumn: _globals.jest.fn(),
  sendAIColumnRequest: _globals.jest.fn(),
  aiRequestCompleted: (0, _callbacks.default)(),
  aiRequestRejected: (0, _callbacks.default)()
};
const mockColumn = {
  type: 'ai',
  alignment: 'left',
  name: 'aiColumn',
  index: 0
};
const createComponentMock = _globals.jest.fn((el, Widget, options) => new Widget(el, options));
const createAIColumnView = () => {
  const $container = (0, _renderer.default)('<div>').appendTo(document.body);
  const $cellElement = (0, _renderer.default)('<div>').appendTo(document.body);
  const mockComponent = {
    element: () => $container.get(0),
    _createComponent: createComponentMock,
    _controllers: {
      columns: mockColumnsController,
      aiColumn: mockAIColumnController
    }
  };
  const aiColumnView = new _m_ai_column_view.AIColumnView(mockComponent);
  aiColumnView.init();
  aiColumnView.render($container);
  return {
    $container,
    cellElement: $cellElement[0],
    aiColumnView,
    aiPromptEditorPOM: new _ai_prompt_editor.AIPromptEditorModel(aiColumnView.element().get(0))
  };
};
const beforeTest = () => {
  _fx.default.off = true;
  _globals.jest.useFakeTimers();
  _globals.jest.clearAllMocks();
};
const afterTest = () => {
  document.body.innerHTML = '';
  _fx.default.off = false;
  _globals.jest.useRealTimers();
  mockAIColumnController.aiRequestCompleted.empty();
  mockAIColumnController.aiRequestRejected.empty();
};
(0, _globals.describe)('AIColumnView', () => {
  (0, _globals.beforeEach)(beforeTest);
  (0, _globals.afterEach)(afterTest);
  (0, _globals.describe)('initialization', () => {
    (0, _globals.it)('should initialize controllers and add AI command column', () => {
      const {
        aiColumnView
      } = createAIColumnView();
      (0, _globals.expect)(aiColumnView.getController).toHaveBeenCalledWith('columns');
      (0, _globals.expect)(aiColumnView.getController).toHaveBeenCalledWith('aiColumn');
      (0, _globals.expect)(mockColumnsController.addCommandColumn).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(mockColumnsController.addCommandColumn).toHaveBeenCalledWith({
        type: _const.AI_COLUMN_NAME,
        command: _const.AI_COLUMN_NAME,
        cssClass: 'dx-command-ai',
        fixed: false
      });
    });
  });
  (0, _globals.describe)('Methods', () => {
    (0, _globals.describe)('showPromptEditor', () => {
      (0, _globals.it)('should create new AIPromptEditor instance', async () => {
        const {
          $container,
          cellElement,
          aiColumnView,
          aiPromptEditorPOM
        } = createAIColumnView();
        await aiColumnView.showPromptEditor(cellElement, mockColumn);
        (0, _globals.expect)(_ai_prompt_editor2.AIPromptEditor).toHaveBeenCalledTimes(1);
        (0, _globals.expect)(_ai_prompt_editor2.AIPromptEditor).toHaveBeenCalledWith({
          prompt: '',
          container: aiColumnView.element(),
          createComponent: _globals.expect.any(Function),
          onStop: _globals.expect.any(Function),
          onSubmit: _globals.expect.any(Function),
          onRefresh: _globals.expect.any(Function),
          popupOptions: {
            container: document.body,
            onHiding: _globals.expect.any(Function),
            position: {
              my: 'right top',
              at: 'right bottom',
              of: '.dx-header-row td[aria-colindex="1"]',
              collision: 'fit',
              boundary: $container.get(0)
            }
          }
        });
        (0, _globals.expect)(aiColumnView.getPromptEditorInstance().show).toHaveBeenCalledTimes(1);
        (0, _globals.expect)(aiPromptEditorPOM.isVisible()).toBe(true);
      });
      (0, _globals.it)('should update existing AIPromptEditor instance', async () => {
        const {
          cellElement,
          aiColumnView,
          aiPromptEditorPOM
        } = createAIColumnView();
        await aiColumnView.showPromptEditor(cellElement, mockColumn);
        (0, _globals.expect)(_ai_prompt_editor2.AIPromptEditor).toHaveBeenCalledTimes(1);
        (0, _globals.expect)(_ai_prompt_editor2.AIPromptEditor).toHaveBeenCalledWith(_globals.expect.objectContaining({
          popupOptions: _globals.expect.objectContaining({
            position: _globals.expect.objectContaining({
              of: '.dx-header-row td[aria-colindex="1"]'
            })
          })
        }));
        (0, _globals.expect)(aiColumnView.getPromptEditorInstance().updateOptions).toHaveBeenCalledTimes(0);
        const newColumn = _extends({}, mockColumn, {
          ai: {
            prompt: 'updated prompt'
          }
        });
        mockColumnsController.getVisibleIndex.mockReturnValue(1);
        await aiColumnView.showPromptEditor(cellElement, newColumn);
        (0, _globals.expect)(_ai_prompt_editor2.AIPromptEditor).toHaveBeenCalledTimes(1); // Only one instance created
        (0, _globals.expect)(aiColumnView.getPromptEditorInstance().updateOptions).toHaveBeenCalledTimes(1);
        (0, _globals.expect)(aiColumnView.getPromptEditorInstance().updateOptions).toHaveBeenCalledWith(_globals.expect.objectContaining({
          popupOptions: _globals.expect.objectContaining({
            position: _globals.expect.objectContaining({
              of: '.dx-header-row td[aria-colindex="2"]'
            })
          })
        }));
        (0, _globals.expect)(aiPromptEditorPOM.getTextArea().getInputElement().value).toBe('updated prompt');
      });
      (0, _globals.it)('should configure popup position correctly for left alignment', async () => {
        const {
          cellElement,
          aiColumnView
        } = createAIColumnView();
        const leftAlignedColumn = _extends({}, mockColumn, {
          alignment: 'left'
        });
        await aiColumnView.showPromptEditor(cellElement, leftAlignedColumn);
        (0, _globals.expect)(_ai_prompt_editor2.AIPromptEditor).toHaveBeenCalledWith(_globals.expect.objectContaining({
          popupOptions: _globals.expect.objectContaining({
            position: _globals.expect.objectContaining({
              my: 'right top',
              at: 'right bottom'
            })
          })
        }));
      });
      (0, _globals.it)('should configure popup position correctly for right alignment', async () => {
        const {
          cellElement,
          aiColumnView
        } = createAIColumnView();
        const rightAlignedColumn = _extends({}, mockColumn, {
          alignment: 'right'
        });
        await aiColumnView.showPromptEditor(cellElement, rightAlignedColumn);
        (0, _globals.expect)(_ai_prompt_editor2.AIPromptEditor).toHaveBeenCalledWith(_globals.expect.objectContaining({
          popupOptions: _globals.expect.objectContaining({
            position: _globals.expect.objectContaining({
              my: 'left top',
              at: 'left bottom'
            })
          })
        }));
      });
      (0, _globals.describe)('when called with invalid parameters', () => {
        (0, _globals.it)('should return false if cell element is null', async () => {
          const {
            aiColumnView
          } = createAIColumnView();
          const result = await aiColumnView.showPromptEditor(null, mockColumn);
          (0, _globals.expect)(_ai_prompt_editor2.AIPromptEditor).not.toHaveBeenCalled();
          (0, _globals.expect)(result).toBe(false);
        });
        (0, _globals.it)('should return false if column is null', async () => {
          const {
            cellElement,
            aiColumnView
          } = createAIColumnView();
          const result = await aiColumnView.showPromptEditor(cellElement, null);
          (0, _globals.expect)(_ai_prompt_editor2.AIPromptEditor).not.toHaveBeenCalled();
          (0, _globals.expect)(result).toBe(false);
        });
        (0, _globals.it)('should return false if column type is not ai', async () => {
          const {
            cellElement,
            aiColumnView
          } = createAIColumnView();
          const result = await aiColumnView.showPromptEditor(cellElement, _extends({}, mockColumn, {
            type: ''
          }));
          (0, _globals.expect)(_ai_prompt_editor2.AIPromptEditor).not.toHaveBeenCalled();
          (0, _globals.expect)(result).toBe(false);
        });
      });
    });
    (0, _globals.describe)('hidePromptEditor', () => {
      (0, _globals.it)('should call hide method', async () => {
        const {
          cellElement,
          aiColumnView,
          aiPromptEditorPOM
        } = createAIColumnView();
        await aiColumnView.showPromptEditor(cellElement, mockColumn);
        const result = await aiColumnView.hidePromptEditor();
        (0, _globals.expect)(aiColumnView.getPromptEditorInstance().hide).toHaveBeenCalledTimes(1);
        (0, _globals.expect)(aiPromptEditorPOM.isVisible()).toBe(false);
        (0, _globals.expect)(result).toBe(false);
      });
    });
  });
  (0, _globals.describe)('event handlers in AIPromptEditor config', () => {
    (0, _globals.describe)('onSubmit', () => {
      (0, _globals.it)('should update column option and prompt editor state', async () => {
        const {
          cellElement,
          aiColumnView,
          aiPromptEditorPOM
        } = createAIColumnView();
        const columnWithIndex = _extends({}, mockColumn, {
          index: 2
        });
        await aiColumnView.showPromptEditor(cellElement, columnWithIndex);
        aiPromptEditorPOM.getTextArea().setValue('test prompt');
        aiPromptEditorPOM.getApplyButton().getElement().click();
        (0, _globals.expect)(aiColumnView.getPromptEditorInstance().updateStateOnAction).toHaveBeenCalledWith('apply');
        (0, _globals.expect)(mockColumnsController.columnOption).toHaveBeenCalledWith(2, 'ai.prompt', 'test prompt', true);
      });
    });
    (0, _globals.describe)('onStop', () => {
      (0, _globals.it)('should abort AI request and update prompt editor state', async () => {
        const {
          cellElement,
          aiColumnView,
          aiPromptEditorPOM
        } = createAIColumnView();
        mockAIColumnController.sendAIColumnRequest.mockImplementation(() => {
          setTimeout(() => {
            mockAIColumnController.aiRequestCompleted.fire();
          });
        });
        await aiColumnView.showPromptEditor(cellElement, mockColumn);
        const promptEditorInstance = aiColumnView.getPromptEditorInstance();
        aiPromptEditorPOM.getTextArea().setValue('test prompt');
        aiPromptEditorPOM.getApplyButton().getElement().click();
        promptEditorInstance.updateStateOnAction.mockClear();
        aiPromptEditorPOM.getStopButton().getElement().click();
        _globals.jest.runAllTimers();
        (0, _globals.expect)(promptEditorInstance.updateStateOnAction).toHaveBeenCalledWith('stop');
        (0, _globals.expect)(mockAIColumnController.abortAIColumnRequest).toHaveBeenCalledTimes(1);
      });
    });
    (0, _globals.describe)('onRefresh', () => {
      (0, _globals.it)('should refresh AI column and update prompt editor state', async () => {
        const {
          cellElement,
          aiColumnView,
          aiPromptEditorPOM
        } = createAIColumnView();
        const columnWithPrompt = _extends({}, mockColumn, {
          name: 'testColumn',
          ai: {
            prompt: 'test prompt'
          }
        });
        await aiColumnView.showPromptEditor(cellElement, columnWithPrompt);
        const promptEditorInstance = aiColumnView.getPromptEditorInstance();
        aiPromptEditorPOM.getRefreshButton().getElement().click();
        (0, _globals.expect)(promptEditorInstance.updateStateOnAction).toHaveBeenCalledWith('regenerate');
        (0, _globals.expect)(mockAIColumnController.refreshAIColumn).toHaveBeenCalledWith('testColumn');
      });
      (0, _globals.it)('should update prompt editor state on completion', async () => {
        const {
          cellElement,
          aiColumnView,
          aiPromptEditorPOM
        } = createAIColumnView();
        const columnWithPrompt = _extends({}, mockColumn, {
          name: 'testColumn',
          ai: {
            prompt: 'test prompt'
          }
        });
        mockAIColumnController.refreshAIColumn.mockImplementation(() => {
          setTimeout(() => {
            mockAIColumnController.aiRequestCompleted.fire();
          });
        });
        await aiColumnView.showPromptEditor(cellElement, columnWithPrompt);
        const promptEditorInstance = aiColumnView.getPromptEditorInstance();
        aiPromptEditorPOM.getRefreshButton().getElement().click();
        promptEditorInstance.updateStateOnAction.mockClear();
        _globals.jest.runAllTimers();
        (0, _globals.expect)(promptEditorInstance.updateStateOnAction).toHaveBeenCalledTimes(1);
        (0, _globals.expect)(promptEditorInstance.updateStateOnAction).toHaveBeenCalledWith('stop');
      });
      (0, _globals.it)('should update prompt editor state on error', async () => {
        const {
          cellElement,
          aiColumnView,
          aiPromptEditorPOM
        } = createAIColumnView();
        const columnWithPrompt = _extends({}, mockColumn, {
          name: 'testColumn',
          ai: {
            prompt: 'test prompt'
          }
        });
        mockAIColumnController.refreshAIColumn.mockImplementation(() => {
          setTimeout(() => {
            mockAIColumnController.aiRequestRejected.fire();
          });
        });
        await aiColumnView.showPromptEditor(cellElement, columnWithPrompt);
        const promptEditorInstance = aiColumnView.getPromptEditorInstance();
        aiPromptEditorPOM.getRefreshButton().getElement().click();
        promptEditorInstance.updateStateOnAction.mockClear();
        _globals.jest.runAllTimers();
        (0, _globals.expect)(promptEditorInstance.updateStateOnAction).toHaveBeenCalledTimes(1);
        (0, _globals.expect)(promptEditorInstance.updateStateOnAction).toHaveBeenCalledWith('stop');
      });
    });
    (0, _globals.describe)('onHiding', () => {
      (0, _globals.it)('should update prompt editor state and abort AI request', async () => {
        const {
          cellElement,
          aiColumnView
        } = createAIColumnView();
        await aiColumnView.showPromptEditor(cellElement, mockColumn);
        const promptEditorInstance = aiColumnView.getPromptEditorInstance();
        await aiColumnView.hidePromptEditor();
        (0, _globals.expect)(promptEditorInstance.updateStateOnAction).toHaveBeenCalledWith('stop');
        (0, _globals.expect)(promptEditorInstance.updateStateOnAction).toHaveBeenCalledTimes(1);
        (0, _globals.expect)(mockAIColumnController.abortAIColumnRequest).toHaveBeenCalledTimes(1);
      });
    });
  });
  (0, _globals.describe)('optionChanged', () => {
    (0, _globals.it)('should return early if name is not columns', () => {
      const {
        aiColumnView
      } = createAIColumnView();
      aiColumnView.optionChanged({
        name: 'dataSource'
      });
      (0, _globals.expect)(mockColumnsController.getColumnByPath).not.toHaveBeenCalled();
    });
    (0, _globals.it)('should return early if column type is not ai', () => {
      const {
        aiColumnView
      } = createAIColumnView();
      const column = {
        type: 'data'
      };
      mockColumnsController.getColumnByPath.mockReturnValue(column);
      aiColumnView.optionChanged({
        name: 'columns',
        fullName: 'columns[0].caption'
      });
      (0, _globals.expect)(mockColumnsController.getColumnOptionNameByFullName).not.toHaveBeenCalled();
    });
    (0, _globals.it)('should handle ai.prompt option change', async () => {
      const {
        cellElement,
        aiColumnView
      } = createAIColumnView();
      mockColumnsController.getColumnByPath.mockReturnValue(mockColumn);
      mockColumnsController.getColumnOptionNameByFullName.mockReturnValue('ai.prompt');
      mockAIColumnController.sendAIColumnRequest.mockImplementation(() => {
        setTimeout(() => {
          mockAIColumnController.aiRequestCompleted.fire();
        });
      });
      await aiColumnView.showPromptEditor(cellElement, mockColumn);
      const promptEditorInstance = aiColumnView.getPromptEditorInstance();
      promptEditorInstance.getEditorValue.mockReturnValue('new prompt value');
      aiColumnView.optionChanged({
        name: 'columns',
        fullName: 'columns[0].ai.prompt',
        value: 'new prompt value'
      });
      (0, _globals.expect)(mockAIColumnController.sendAIColumnRequest).toHaveBeenCalledWith('aiColumn');
      (0, _globals.expect)(promptEditorInstance.updatePrompt).not.toHaveBeenCalled();
      _globals.jest.runAllTimers();
      (0, _globals.expect)(promptEditorInstance.updatePrompt).toHaveBeenCalledWith('new prompt value');
    });
    (0, _globals.it)('should update prompt editor state on completion', async () => {
      const {
        cellElement,
        aiColumnView
      } = createAIColumnView();
      mockColumnsController.getColumnByPath.mockReturnValue(mockColumn);
      mockColumnsController.getColumnOptionNameByFullName.mockReturnValue('ai.prompt');
      mockAIColumnController.sendAIColumnRequest.mockImplementation(() => {
        mockAIColumnController.aiRequestCompleted.fire();
      });
      await aiColumnView.showPromptEditor(cellElement, mockColumn);
      const promptEditorInstance = aiColumnView.getPromptEditorInstance();
      promptEditorInstance.getEditorValue.mockReturnValue('new prompt value');
      aiColumnView.optionChanged({
        name: 'columns',
        fullName: 'columns[0].ai.prompt',
        value: 'new prompt value'
      });
      (0, _globals.expect)(promptEditorInstance.updatePrompt).toHaveBeenCalledWith('new prompt value');
      (0, _globals.expect)(promptEditorInstance.updateStateOnAction).toHaveBeenCalledTimes(1);
    });
    (0, _globals.it)('should update prompt editor state on error', async () => {
      const {
        cellElement,
        aiColumnView
      } = createAIColumnView();
      mockColumnsController.getColumnByPath.mockReturnValue(mockColumn);
      mockColumnsController.getColumnOptionNameByFullName.mockReturnValue('ai.prompt');
      mockAIColumnController.sendAIColumnRequest.mockImplementation(() => {
        mockAIColumnController.aiRequestRejected.fire();
      });
      await aiColumnView.showPromptEditor(cellElement, mockColumn);
      aiColumnView.optionChanged({
        name: 'columns',
        fullName: 'columns[0].ai.prompt',
        value: 'new prompt value'
      });
      const promptEditorInstance = aiColumnView.getPromptEditorInstance();
      (0, _globals.expect)(promptEditorInstance.updatePrompt).not.toHaveBeenCalled();
      (0, _globals.expect)(promptEditorInstance.updateStateOnAction).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(promptEditorInstance.updateStateOnAction).toHaveBeenCalledWith('stop');
    });
    (0, _globals.describe)('when prompt editor is not initialized', () => {
      (0, _globals.it)('should handle optionChanged', () => {
        const {
          aiColumnView
        } = createAIColumnView();
        mockColumnsController.getColumnByPath.mockReturnValue(mockColumn);
        mockColumnsController.getColumnOptionNameByFullName.mockReturnValue('ai.prompt');
        (0, _globals.expect)(() => {
          aiColumnView.optionChanged({
            name: 'columns',
            fullName: 'columns[0].ai.prompt',
            value: 'new prompt value'
          });
        }).not.toThrow();
        (0, _globals.expect)(mockAIColumnController.sendAIColumnRequest).toHaveBeenCalledWith('aiColumn');
      });
    });
  });
});