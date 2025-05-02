/**
* DevExtreme (cjs/__internal/grids/new/grid_core/editing/options.test.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _inferno = require("inferno");
var _di = require("../di.test_utils");
var _options_controller = require("../options_controller/options_controller.mock");
var _controller = require("../toolbar/controller");
var _controller2 = require("./controller");
var _view = require("./popup/view");
/* eslint-disable spellcheck/spell-checker */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

const setup = config => {
  const rootElement = document.createElement('div');
  const context = (0, _di.getContext)(config);
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
    getForm
  };
};
(0, _globals.describe)('ColumnProperties', () => {
  (0, _globals.describe)('allowEditing', () => {
    (0, _globals.describe)('when it is false', () => {
      (0, _globals.it)('should make editor disabled', () => {
        var _props$items$0$editor;
        const {
          editPopupView
        } = setup({
          columns: [{
            dataField: 'field1',
            allowEditing: false
          }]
        });
        // @ts-expect-error private field
        const props = editPopupView.props;
        (0, _globals.expect)((_props$items$0$editor = props.items[0].editorOptions) === null || _props$items$0$editor === void 0 ? void 0 : _props$items$0$editor.disabled).toBe(true);
      });
    });
  });
  (0, _globals.describe)('editorOptions', () => {
    (0, _globals.it)('should be passed to form item editorOptions', () => {
      var _props$items$0$editor2;
      const {
        editPopupView
      } = setup({
        columns: [{
          dataField: 'field1',
          editorOptions: {
            someEditOption: 'someEditOptionValue'
          }
        }]
      });
      // @ts-expect-error private field
      const props = editPopupView.props;
      (0, _globals.expect)((_props$items$0$editor2 = props.items[0].editorOptions) === null || _props$items$0$editor2 === void 0 ? void 0 : _props$items$0$editor2.someEditOption).toBe('someEditOptionValue');
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
        editPopupView
      } = setup({
        columns: [{
          dataField: 'field1',
          formItem: {
            colSpan: 2
          }
        }]
      });
      // @ts-expect-error private field
      const props = editPopupView.props;
      (0, _globals.expect)(props.items[0].colSpan).toBe(2);
    });
  });
  (0, _globals.describe)('validationRules', () => {
    (0, _globals.it)('should be passed to form item', () => {
      var _props$items$0$valida;
      const {
        editPopupView
      } = setup({
        columns: [{
          dataField: 'field1',
          validationRules: [{
            type: 'required'
          }]
        }]
      });
      // @ts-expect-error private field
      const props = editPopupView.props;
      (0, _globals.expect)((_props$items$0$valida = props.items[0].validationRules) === null || _props$items$0$valida === void 0 ? void 0 : _props$items$0$valida[0].type).toBe('required');
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
        (0, _globals.expect)(getForm().option('formData')).toMatchSnapshot();
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
      (0, _globals.it)('should update state in editor', () => {
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
  });
});
