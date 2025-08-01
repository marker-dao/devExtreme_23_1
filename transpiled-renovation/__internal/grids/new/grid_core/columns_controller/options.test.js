"use strict";

var _globals = require("@jest/globals");
var _data_controller = require("../data_controller");
var _di = require("../di.test_utils");
var _items_controller = require("../items_controller/items_controller");
var _options_controller = require("../options_controller/options_controller.mock");
var _columns_controller = require("./columns_controller");
const _excluded = ["selector"];
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
const setup = config => {
  const context = (0, _di.getContext)(config);
  return {
    options: context.get(_options_controller.OptionsControllerMock),
    dataController: context.get(_data_controller.DataController),
    columnsController: context.get(_columns_controller.ColumnsController),
    itemsController: context.get(_items_controller.ItemsController)
  };
};
(0, _globals.describe)('Options', () => {
  (0, _globals.describe)('columns', () => {
    (0, _globals.describe)('when given as string', () => {
      (0, _globals.it)('should be normalized', () => {
        const {
          columnsController
        } = setup({
          columns: ['a', 'b', 'c']
        });
        const columns = columnsController.columns.peek();
        (0, _globals.expect)(columns).toMatchSnapshot();
      });
      (0, _globals.it)('should use given string as dataField', () => {
        const {
          columnsController
        } = setup({
          columns: ['a', 'b', 'c']
        });
        const columns = columnsController.columns.peek();
        (0, _globals.expect)(columns[0].dataField).toBe('a');
        (0, _globals.expect)(columns[1].dataField).toBe('b');
        (0, _globals.expect)(columns[2].dataField).toBe('c');
      });
      (0, _globals.it)('should be the same as if we passed objects with dataField only', () => {
        const {
          columnsController: columnsController1
        } = setup({
          columns: ['a', 'b', 'c']
        });
        const columns1 = columnsController1.columns.peek();
        const {
          columnsController: columnsController2
        } = setup({
          columns: [{
            dataField: 'a'
          }, {
            dataField: 'b'
          }, {
            dataField: 'c'
          }]
        });
        const columns2 = columnsController2.columns.peek();
        // selector is newly created func, so it can't be compared
        const removeSelector = _ref => {
          let column = _objectWithoutPropertiesLoose(_ref, _excluded);
          return column;
        };
        (0, _globals.expect)(columns1.map(removeSelector)).toStrictEqual(columns2.map(removeSelector));
      });
    });
    (0, _globals.describe)('when given as object', () => {
      (0, _globals.it)('should be normalized', () => {
        const {
          columnsController
        } = setup({
          columns: [{
            dataField: 'a'
          }, {
            dataField: 'b'
          }, {
            dataField: 'c'
          }]
        });
        const columns = columnsController.columns.peek();
        (0, _globals.expect)(columns).toMatchSnapshot();
      });
    });
  });
  (0, _globals.describe)('columns[].visible', () => {
    (0, _globals.describe)('when it is true', () => {
      (0, _globals.it)('should include column to visibleColumns', () => {
        const {
          columnsController
        } = setup({
          columns: [{
            dataField: 'a',
            visible: true
          }, {
            dataField: 'b',
            visible: true
          }]
        });
        const visibleColumns = columnsController.visibleColumns.peek();
        (0, _globals.expect)(visibleColumns).toHaveLength(2);
        (0, _globals.expect)(visibleColumns[0].name).toBe('a');
        (0, _globals.expect)(visibleColumns[1].name).toBe('b');
      });
    });
    (0, _globals.describe)('when it is false', () => {
      (0, _globals.it)('should exclude column from visibleColumns', () => {
        const {
          columnsController
        } = setup({
          columns: [{
            dataField: 'a',
            visible: true
          }, {
            dataField: 'b',
            visible: false
          }]
        });
        const visibleColumns = columnsController.visibleColumns.peek();
        (0, _globals.expect)(visibleColumns).toHaveLength(1);
        (0, _globals.expect)(visibleColumns[0].name).toBe('a');
      });
    });
  });
  (0, _globals.describe)('columns[].visibleIndex', () => {
    (0, _globals.it)('should affect order in visibleColumns', () => {
      const {
        columnsController
      } = setup({
        columns: [{
          dataField: 'a',
          visibleIndex: 1
        }, {
          dataField: 'b'
        }]
      });
      const visibleColumns = columnsController.visibleColumns.peek();
      (0, _globals.expect)(visibleColumns).toHaveLength(2);
      (0, _globals.expect)(visibleColumns[0]).toMatchObject({
        name: 'b',
        visibleIndex: 0
      });
      (0, _globals.expect)(visibleColumns[1]).toMatchObject({
        name: 'a',
        visibleIndex: 1
      });
    });
  });
  (0, _globals.describe)('column[].calculateFieldValue', () => {
    (0, _globals.it)('should override value in CardInfo', () => {
      const {
        columnsController,
        itemsController
      } = setup({
        columns: [{
          calculateFieldValue: data => `${data.a} ${data.b}`
        }]
      });
      const dataObject = {
        a: 'a',
        b: 'b'
      };
      const columns = columnsController.columns.peek();
      const CardInfo = itemsController.createCardInfo(dataObject, columns, 0);
      (0, _globals.expect)(CardInfo.fields).toHaveLength(1);
      (0, _globals.expect)(CardInfo.fields[0].value).toBe('a b');
      (0, _globals.expect)(CardInfo.fields[0].displayValue).toBe('a b');
      (0, _globals.expect)(CardInfo.fields[0].text).toBe('a b');
    });
    (0, _globals.it)('should take priority over dataField', () => {
      const {
        columnsController,
        itemsController
      } = setup({
        columns: [{
          calculateFieldValue: data => `${data.a} ${data.b}`,
          dataField: 'a'
        }]
      });
      const dataObject = {
        a: 'a',
        b: 'b'
      };
      const columns = columnsController.columns.peek();
      const CardInfo = itemsController.createCardInfo(dataObject, columns, 0);
      (0, _globals.expect)(CardInfo.fields).toHaveLength(1);
      (0, _globals.expect)(CardInfo.fields[0].value).toBe('a b');
    });
  });
  (0, _globals.describe)('column[].calculateDisplayValue', () => {
    (0, _globals.it)('should override displayValue in CardInfo', () => {
      const {
        columnsController,
        itemsController
      } = setup({
        columns: [{
          calculateDisplayValue: data => `${data.a} ${data.b}`
        }]
      });
      const dataObject = {
        a: 'a',
        b: 'b'
      };
      const columns = columnsController.columns.peek();
      const CardInfo = itemsController.createCardInfo(dataObject, columns, 0);
      (0, _globals.expect)(CardInfo.fields).toHaveLength(1);
      (0, _globals.expect)(CardInfo.fields[0].displayValue).toBe('a b');
    });
  });
  (0, _globals.describe)('column[].customizeText', () => {
    (0, _globals.it)('should override text in CardInfo', () => {
      const {
        columnsController,
        itemsController
      } = setup({
        columns: [{
          dataField: 'a',
          customizeText: _ref2 => {
            let {
              valueText
            } = _ref2;
            return `aa ${valueText} aa`;
          }
        }]
      });
      const dataObject = {
        a: 'a',
        b: 'b'
      };
      const columns = columnsController.columns.peek();
      const CardInfo = itemsController.createCardInfo(dataObject, columns, 0);
      (0, _globals.expect)(CardInfo.fields).toHaveLength(1);
      (0, _globals.expect)(CardInfo.fields[0].text).toBe('aa a aa');
    });
  });
  (0, _globals.describe)('column[].dataField', () => {
    (0, _globals.it)('should determine which value from data will be used', () => {
      const {
        columnsController,
        itemsController
      } = setup({
        columns: [{
          dataField: 'a'
        }, {
          dataField: 'b'
        }]
      });
      const dataObject = {
        a: 'a text',
        b: 'b text'
      };
      const columns = columnsController.columns.peek();
      const CardInfo = itemsController.createCardInfo(dataObject, columns, 0);
      (0, _globals.expect)(CardInfo.fields).toHaveLength(2);
      (0, _globals.expect)(CardInfo.fields[0].text).toBe('a text');
      (0, _globals.expect)(CardInfo.fields[1].text).toBe('b text');
    });
  });
  (0, _globals.describe)('column[].dataType', () => {
    (0, _globals.it)('should affect column default settings', () => {
      const {
        columnsController
      } = setup({
        columns: [{
          dataField: 'a',
          dataType: 'number'
        }, {
          dataField: 'b',
          dataType: 'boolean'
        }]
      });
      const columns = columnsController.columns.peek();
      (0, _globals.expect)(columns).toHaveLength(2);
      (0, _globals.expect)(columns[0].alignment).toMatchInlineSnapshot('"left"');
      (0, _globals.expect)(columns[1].alignment).toMatchInlineSnapshot('"left"');
    });
  });
  ['falseText', 'trueText'].forEach(propName => {
    (0, _globals.describe)(`column[].${propName}`, () => {
      (0, _globals.it)('should be used as text for boolean column', () => {
        const {
          columnsController,
          itemsController
        } = setup({
          columns: [{
            dataField: 'a',
            dataType: 'boolean',
            [propName]: `my ${propName} text`
          }]
        });
        const dataObject = {
          a: propName === 'trueText'
        };
        const columns = columnsController.columns.peek();
        const CardInfo = itemsController.createCardInfo(dataObject, columns, 0);
        (0, _globals.expect)(CardInfo.fields).toHaveLength(1);
        (0, _globals.expect)(CardInfo.fields[0].text).toBe(`my ${propName} text`);
      });
    });
  });
  (0, _globals.describe)('column[].format', () => {
    (0, _globals.it)('should affect CardInfo text', () => {
      const {
        columnsController,
        itemsController
      } = setup({
        columns: [{
          dataField: 'a',
          format: 'currency'
        }]
      });
      const dataObject = {
        a: 123
      };
      const columns = columnsController.columns.peek();
      const CardInfo = itemsController.createCardInfo(dataObject, columns, 0);
      (0, _globals.expect)(CardInfo.fields).toHaveLength(1);
      (0, _globals.expect)(CardInfo.fields[0].text).toBe('$123');
    });
  });
});