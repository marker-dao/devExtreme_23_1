/* eslint-disable spellcheck/spell-checker */
import { afterEach, describe, expect, it } from '@jest/globals';
import $ from '../../../../../core/renderer';
import CardView from '../../../../grids/new/card_view/widget';
import { rerender } from 'inferno';
const SELECTORS = {
  cardView: '.dx-cardview',
  card: '.dx-card',
  value: '.dx-cardview-field-value'
};
const rootQuerySelector = selector => document.body.querySelector(selector);
const rootQuerySelectorAll = selector => Array.from(document.body.querySelectorAll(selector));
const createCardView = options => {
  const container = document.createElement('div');
  document.body.append(container);
  const cardView = new CardView(container, options);
  rerender();
  return cardView;
};
describe('ColumnsController - Column Option Generation', () => {
  // eslint-disable-next-line @typescript-eslint/init-declarations
  let instance;
  afterEach(() => {
    var _$;
    const cardView = rootQuerySelector(SELECTORS.cardView);
    // @ts-expect-error
    (_$ = $(cardView ?? undefined)) === null || _$ === void 0 || _$.dxCardView('dispose');
  });
  it('should auto-generate columns from first data row', () => {
    var _columns$find, _columns$find2, _columns$find3, _columns$find4;
    instance = createCardView({
      dataSource: [{
        name: 'Alice',
        age: 25,
        isActive: true,
        birthday: new Date(2000, 0, 1)
      }]
    });
    const columns = instance.getVisibleColumns();
    expect(columns.map(c => c.dataField)).toEqual(['name', 'age', 'isActive', 'birthday']);
    expect((_columns$find = columns.find(c => c.dataField === 'name')) === null || _columns$find === void 0 ? void 0 : _columns$find.dataType).toBe('string');
    expect((_columns$find2 = columns.find(c => c.dataField === 'age')) === null || _columns$find2 === void 0 ? void 0 : _columns$find2.dataType).toBe('number');
    expect((_columns$find3 = columns.find(c => c.dataField === 'isActive')) === null || _columns$find3 === void 0 ? void 0 : _columns$find3.dataType).toBe('boolean');
    expect((_columns$find4 = columns.find(c => c.dataField === 'birthday')) === null || _columns$find4 === void 0 ? void 0 : _columns$find4.dataType).toBe('date');
  });
  it('should regenerate columns with updated data types after dataSource change', () => {
    instance = createCardView({
      dataSource: [{
        id: 1
      }]
    });
    expect(instance.getVisibleColumns()[0].dataType).toBe('number');
    instance.option('dataSource', [{
      id: 'foo'
    }]);
    rerender();
    expect(instance.getVisibleColumns()[0].dataType).toBe('string');
  });
  it.each([{
    value: 'hello',
    expected: 'string'
  }, {
    value: 123,
    expected: 'number'
  }, {
    value: true,
    expected: 'boolean'
  }, {
    value: new Date(2020, 0, 1),
    expected: 'date'
  }])('should respect auto-detected dataType = $expected', _ref => {
    let {
      value,
      expected
    } = _ref;
    instance = createCardView({
      dataSource: [{
        col: value
      }]
    });
    const column = instance.getVisibleColumns().find(c => c.dataField === 'col');
    expect(column === null || column === void 0 ? void 0 : column.dataType).toBe(expected);
  });
  it.each([{
    dataType: 'number',
    format: 'currency',
    value: 1999,
    expectedText: '$1,999'
  }, {
    dataType: 'date',
    format: 'shortDate',
    value: new Date(2020, 0, 2),
    expectedText: '1/2/2020'
  }, {
    dataType: 'boolean',
    format: undefined,
    value: true,
    expectedText: 'true'
  }, {
    dataType: 'string',
    format: undefined,
    value: 'Test',
    expectedText: 'Test'
  }])('should render formatted value in card for dataType=$dataType with format=$format', _ref2 => {
    var _rootQuerySelectorAll;
    let {
      dataType,
      format,
      value,
      expectedText
    } = _ref2;
    instance = createCardView({
      dataSource: [{
        field: value
      }],
      columns: [{
        dataField: 'field',
        dataType,
        format
      }]
    });
    const renderedText = (_rootQuerySelectorAll = rootQuerySelectorAll(SELECTORS.value)[0]) === null || _rootQuerySelectorAll === void 0 ? void 0 : _rootQuerySelectorAll.textContent;
    expect(renderedText).toBe(expectedText);
  });
  describe('when value has mismatched type from declared dataType', () => {
    it.each([{
      dataType: 'number',
      value: '1234',
      expectedText: '1234'
    }, {
      dataType: 'date',
      value: 'abcde',
      format: 'shortDate',
      expectedText: 'abcde'
    }, {
      dataType: 'boolean',
      value: 'hello',
      expectedText: 'true'
    }, {
      dataType: 'string',
      value: 9876,
      expectedText: '9876'
    }])('should render $value (type mismatch) with declared dataType=$dataType', _ref3 => {
      var _rootQuerySelectorAll2;
      let {
        dataType,
        value,
        expectedText,
        format
      } = _ref3;
      instance = createCardView({
        dataSource: [{
          field: value
        }],
        columns: [{
          dataField: 'field',
          dataType,
          format
        }]
      });
      const renderedText = (_rootQuerySelectorAll2 = rootQuerySelectorAll(SELECTORS.value)[0]) === null || _rootQuerySelectorAll2 === void 0 || (_rootQuerySelectorAll2 = _rootQuerySelectorAll2.textContent) === null || _rootQuerySelectorAll2 === void 0 ? void 0 : _rootQuerySelectorAll2.trim();
      expect(renderedText).toBe(expectedText);
    });
  });
});