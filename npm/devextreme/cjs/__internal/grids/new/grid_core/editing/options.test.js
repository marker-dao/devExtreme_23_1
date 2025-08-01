/**
* DevExtreme (cjs/__internal/grids/new/grid_core/editing/options.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _calendar = _interopRequireDefault(require("../../../../../ui/calendar"));
var _inferno = require("inferno");
var _di = require("../di.test_utils");
var _options_controller = require("../options_controller/options_controller.mock");
var _controller = require("../toolbar/controller");
var _confirm_controller = require("./confirm_controller");
var _controller2 = require("./controller");
var _view = require("./popup/view");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable spellcheck/spell-checker */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

class MockConfirmController {
  constructor() {
    this.confirm = _globals.jest.fn().mockImplementation(() => Promise.resolve(true));
  }
}
MockConfirmController.dependencies = [];
const setup = config => {
  const rootElement = document.createElement('div');
  const context = (0, _di.getContext)(config);
  const mockConfirmController = new MockConfirmController();
  context.registerInstance(_confirm_controller.ConfirmController, mockConfirmController);
  const optionsController = context.get(_options_controller.OptionsControllerMock);
  const editingController = context.get(_controller2.EditingController);
  const toolbarController = context.get(_controller.ToolbarController);
  const editPopupView = context.get(_view.EditPopupView);
  editPopupView.render(rootElement);
  (0, _inferno.rerender)();
  const getForm = () => {
    // @ts-expect-error private field
    const form = editPopupView.formRef.current;
    if (!form) {
      throw new Error('form is not visible');
    }
    return form;
  };
  return {
    optionsController,
    editingController,
    editPopupView,
    rootElement,
    toolbarController,
    context,
    getForm,
    mockConfirmController
  };
};
(0, _globals.describe)('ColumnProperties', () => {
  (0, _globals.describe)('allowEditing', () => {
    (0, _globals.describe)('when it is false', () => {
      (0, _globals.it)('should make editor disabled', () => {
        const {
          getForm
        } = setup({
          dataSource: [{
            field1: 1
          }],
          keyExpr: 'field1',
          editing: {
            editCardKey: 1
          },
          columns: [{
            dataField: 'field1',
            allowEditing: false
          }]
        });
        (0, _globals.expect)(getForm().getEditor('field1').option('disabled')).toBe(true);
      });
    });
  });
  (0, _globals.describe)('editorOptions', () => {
    (0, _globals.it)('should be passed to form item editorOptions', () => {
      const {
        getForm
      } = setup({
        dataSource: [{
          field1: 1
        }],
        keyExpr: 'field1',
        editing: {
          editCardKey: 1
        },
        columns: [{
          dataField: 'field1',
          editorOptions: {
            someEditOption: 'someEditOptionValue'
          }
        }]
      });
      (0, _globals.expect)(getForm().getEditor('field1').option('someEditOption')).toBe('someEditOptionValue');
    });
  });
  (0, _globals.describe)('setFieldValue', () => {
    (0, _globals.it)('should be used as callback for setting editor value', async () => {
      const setFieldValue = _globals.jest.fn((newData, value) => {
        newData.mycustomfield = value;
      });
      const {
        editPopupView,
        editingController,
        getForm
      } = setup({
        columns: [{
          dataField: 'field1',
          setFieldValue
        }, 'id'],
        dataSource: [{
          id: 1,
          field1: 'value1'
        }],
        keyExpr: 'id',
        editing: {
          editCardKey: 1
        }
      });
      getForm().getEditor('field1').option('value', 'qwe');
      // @ts-expect-error private field
      await editPopupView.promises.waitForAll();
      (0, _globals.expect)(setFieldValue.mock.calls[0]).toMatchSnapshot();
      (0, _globals.expect)(editingController.changes.peek()).toMatchSnapshot();
    });
  });
  (0, _globals.describe)('formItem', () => {
    (0, _globals.it)('should be passed to form item', () => {
      const {
        getForm
      } = setup({
        dataSource: [{
          field1: 1
        }],
        keyExpr: 'field1',
        editing: {
          editCardKey: 1
        },
        columns: [{
          dataField: 'field1',
          formItem: {
            editorType: 'dxCalendar'
          }
        }]
      });
      (0, _globals.expect)(getForm().getEditor('field1')).toBeInstanceOf(_calendar.default);
    });
  });
  (0, _globals.describe)('validationRules', () => {
    (0, _globals.it)('should be passed to form item', async () => {
      const {
        getForm,
        editingController
      } = setup({
        dataSource: [],
        keyExpr: 'field1',
        columns: [{
          dataField: 'field1',
          validationRules: [{
            type: 'required'
          }]
        }]
      });
      await editingController.addCard();
      const validationResult = getForm().validate();
      (0, _globals.expect)(validationResult.isValid).toBe(false);
    });
  });
});
(0, _globals.describe)('Options', () => {
  (0, _globals.describe)('editing', () => {
    (0, _globals.describe)('editCardKey', () => {
      (0, _globals.it)('should open popup with given item', () => {
        const {
          getForm
        } = setup({
          columns: [{
            dataField: 'field1'
          }, 'id'],
          dataSource: [{
            id: 1,
            field1: 'value1'
          }],
          keyExpr: 'id',
          editing: {
            editCardKey: 1
          }
        });
        (0, _globals.expect)(getForm().getEditor('field1').option('value')).toBe('value1');
        (0, _globals.expect)(getForm().getEditor('id').option('value')).toBe(1);
      });
    });
    (0, _globals.describe)('allowAdding', () => {
      (0, _globals.it)('should add "add" button to toolbar', () => {
        const {
          toolbarController,
          optionsController
        } = setup({});
        (0, _globals.expect)(toolbarController.items.peek()).toEqual([]);
        optionsController.option('editing.allowAdding', 'true');
        (0, _globals.expect)(toolbarController.items.peek()).toMatchSnapshot();
      });
    });
    (0, _globals.describe)('allowUpdating', () => {
      _globals.it.skip('should add "edit" button to card', () => {
        // TODO: think how to organize test
      });
    });
    (0, _globals.describe)('allowRemoving', () => {
      (0, _globals.it)('should add "remove" button to card', () => {
        // TODO: think how to organize test
      });
    });
    (0, _globals.describe)('changes', () => {
      const config = {
        dataSource: [{
          key: 1,
          some_field: 'asd'
        }],
        columns: ['some_field'],
        keyExpr: 'key',
        editing: {
          editCardKey: 1
        }
      };
      (0, _globals.it)('should be empty initially', () => {
        const {
          editingController
        } = setup(config);
        (0, _globals.expect)(editingController.changes.peek()).toEqual([]);
      });
      (0, _globals.it)('should contain unsaved changes', async () => {
        var _getForm$getEditor;
        const {
          editingController,
          editPopupView,
          getForm
        } = setup(config);
        (_getForm$getEditor = getForm().getEditor('some_field')) === null || _getForm$getEditor === void 0 || _getForm$getEditor.option('value', 'qwe');
        // @ts-expect-error private prop
        await editPopupView.promises.waitForAll();
        (0, _globals.expect)(editingController.changes.peek()).toMatchSnapshot();
      });
      _globals.it.skip('should update state in editor', () => {
        var _getForm$getEditor2;
        const {
          editingController,
          getForm
        } = setup(config);
        editingController.changes.value = [{
          type: 'update',
          key: 1,
          data: {
            some_field: 'qwe'
          }
        }];
        (0, _globals.expect)((_getForm$getEditor2 = getForm().getEditor('some_field')) === null || _getForm$getEditor2 === void 0 ? void 0 : _getForm$getEditor2.option('value')).toBe('qwe');
      });
    });
    (0, _globals.describe)('form', () => {
      (0, _globals.it)('should pass options to edit form', () => {
        const {
          getForm
        } = setup({
          dataSource: [{
            key: 1,
            some_field: 'asd'
          }],
          columns: ['some_field'],
          keyExpr: 'key',
          editing: {
            editCardKey: 1,
            form: {
              disabled: true
            }
          }
        });
        (0, _globals.expect)(getForm().option('disabled')).toBe(true);
      });
    });
    (0, _globals.describe)('texts', () => {
      (0, _globals.describe)('confirmDeleteMessage', () => {
        (0, _globals.it)('should be used to show confirm delete dialog', async () => {
          const myCustomMessage = 'my custom title';
          const {
            editingController,
            mockConfirmController
          } = setup({
            columns: [{
              dataField: 'field1'
            }, 'id'],
            dataSource: [{
              id: 1,
              field1: 'value1'
            }],
            keyExpr: 'id',
            editing: {
              texts: {
                confirmDeleteMessage: myCustomMessage
              }
            }
          });
          await editingController.deleteCard(1);
          (0, _globals.expect)(mockConfirmController.confirm.mock.calls[0][0]).toBe(myCustomMessage);
        });
      });
      (0, _globals.describe)('confirmDeleteTitle', () => {
        (0, _globals.it)('should be used to show confirm delete dialog', async () => {
          const myCustomTitle = 'my custom title';
          const {
            editingController,
            mockConfirmController
          } = setup({
            columns: [{
              dataField: 'field1'
            }, 'id'],
            dataSource: [{
              id: 1,
              field1: 'value1'
            }],
            keyExpr: 'id',
            editing: {
              texts: {
                confirmDeleteTitle: myCustomTitle
              }
            }
          });
          await editingController.deleteCard(1);
          (0, _globals.expect)(mockConfirmController.confirm.mock.calls[0][1]).toBe(myCustomTitle);
        });
        (0, _globals.describe)('when it is undefined', () => {
          (0, _globals.it)('should hide title', async () => {
            const myCustomTitle = undefined;
            const {
              editingController,
              mockConfirmController
            } = setup({
              columns: [{
                dataField: 'field1'
              }, 'id'],
              dataSource: [{
                id: 1,
                field1: 'value1'
              }],
              keyExpr: 'id',
              editing: {
                texts: {
                  confirmDeleteTitle: myCustomTitle
                }
              }
            });
            await editingController.deleteCard(1);
            (0, _globals.expect)(mockConfirmController.confirm.mock.calls[0][1]).toBe('');
            (0, _globals.expect)(mockConfirmController.confirm.mock.calls[0][2]).toBe(false);
          });
        });
      });
    });
  });
});
