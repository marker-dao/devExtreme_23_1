/**
* DevExtreme (esm/__internal/grids/new/grid_core/editing/options.test.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable spellcheck/spell-checker */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { describe, expect, it, jest } from '@jest/globals';
import dxCalendar from '../../../../../ui/calendar';
import { rerender } from 'inferno';
import { getContext } from '../di.test_utils';
import { OptionsControllerMock } from '../options_controller/options_controller.mock';
import { ToolbarController } from '../toolbar/controller';
import { ConfirmController } from './confirm_controller';
import { EditingController } from './controller';
import { EditPopupView } from './popup/view';
class MockConfirmController {
  constructor() {
    this.confirm = jest.fn().mockImplementation(() => Promise.resolve(true));
  }
}
MockConfirmController.dependencies = [];
const setup = config => {
  const rootElement = document.createElement('div');
  const context = getContext(config);
  const mockConfirmController = new MockConfirmController();
  context.registerInstance(ConfirmController, mockConfirmController);
  const optionsController = context.get(OptionsControllerMock);
  const editingController = context.get(EditingController);
  const toolbarController = context.get(ToolbarController);
  const editPopupView = context.get(EditPopupView);
  editPopupView.render(rootElement);
  rerender();
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
describe('ColumnProperties', () => {
  describe('allowEditing', () => {
    describe('when it is false', () => {
      it('should make editor disabled', () => {
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
        expect(getForm().getEditor('field1').option('disabled')).toBe(true);
      });
    });
  });
  describe('editorOptions', () => {
    it('should be passed to form item editorOptions', () => {
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
      expect(getForm().getEditor('field1').option('someEditOption')).toBe('someEditOptionValue');
    });
  });
  describe('setFieldValue', () => {
    it('should be used as callback for setting editor value', async () => {
      const setFieldValue = jest.fn((newData, value) => {
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
      expect(setFieldValue.mock.calls[0]).toMatchSnapshot();
      expect(editingController.changes.peek()).toMatchSnapshot();
    });
  });
  describe('formItem', () => {
    it('should be passed to form item', () => {
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
      expect(getForm().getEditor('field1')).toBeInstanceOf(dxCalendar);
    });
  });
  describe('validationRules', () => {
    it('should be passed to form item', async () => {
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
      expect(validationResult.isValid).toBe(false);
    });
  });
});
describe('Options', () => {
  describe('editing', () => {
    describe('editCardKey', () => {
      it('should open popup with given item', () => {
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
        expect(getForm().getEditor('field1').option('value')).toBe('value1');
        expect(getForm().getEditor('id').option('value')).toBe(1);
      });
    });
    describe('allowAdding', () => {
      it('should add "add" button to toolbar', () => {
        const {
          toolbarController,
          optionsController
        } = setup({});
        expect(toolbarController.items.peek()).toEqual([]);
        optionsController.option('editing.allowAdding', 'true');
        expect(toolbarController.items.peek()).toMatchSnapshot();
      });
    });
    describe('allowUpdating', () => {
      it.skip('should add "edit" button to card', () => {
        // TODO: think how to organize test
      });
    });
    describe('allowRemoving', () => {
      it('should add "remove" button to card', () => {
        // TODO: think how to organize test
      });
    });
    describe('changes', () => {
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
      it('should be empty initially', () => {
        const {
          editingController
        } = setup(config);
        expect(editingController.changes.peek()).toEqual([]);
      });
      it('should contain unsaved changes', async () => {
        var _getForm$getEditor;
        const {
          editingController,
          editPopupView,
          getForm
        } = setup(config);
        (_getForm$getEditor = getForm().getEditor('some_field')) === null || _getForm$getEditor === void 0 || _getForm$getEditor.option('value', 'qwe');
        // @ts-expect-error private prop
        await editPopupView.promises.waitForAll();
        expect(editingController.changes.peek()).toMatchSnapshot();
      });
      it.skip('should update state in editor', () => {
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
        expect((_getForm$getEditor2 = getForm().getEditor('some_field')) === null || _getForm$getEditor2 === void 0 ? void 0 : _getForm$getEditor2.option('value')).toBe('qwe');
      });
    });
    describe('form', () => {
      it('should pass options to edit form', () => {
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
        expect(getForm().option('disabled')).toBe(true);
      });
    });
    describe('texts', () => {
      describe('confirmDeleteMessage', () => {
        it('should be used to show confirm delete dialog', async () => {
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
          expect(mockConfirmController.confirm.mock.calls[0][0]).toBe(myCustomMessage);
        });
      });
      describe('confirmDeleteTitle', () => {
        it('should be used to show confirm delete dialog', async () => {
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
          expect(mockConfirmController.confirm.mock.calls[0][1]).toBe(myCustomTitle);
        });
        describe('when it is undefined', () => {
          it('should hide title', async () => {
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
            expect(mockConfirmController.confirm.mock.calls[0][1]).toBe('');
            expect(mockConfirmController.confirm.mock.calls[0][2]).toBe(false);
          });
        });
      });
    });
  });
});
