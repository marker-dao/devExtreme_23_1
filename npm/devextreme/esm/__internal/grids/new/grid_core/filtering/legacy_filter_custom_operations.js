/**
* DevExtreme (esm/__internal/grids/new/grid_core/filtering/legacy_filter_custom_operations.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
// NOTE: This code moved from old grid_core/filter/m_filter_custom_operations
// with minimal possible modifications
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable max-depth */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable @stylistic/max-len */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import messageLocalization from '../../../../../common/core/localization/message';
import { DataSource } from '../../../../../common/data/data_source/data_source';
import $ from '../../../../../core/renderer';
import { Deferred } from '../../../../../core/utils/deferred';
import { extend } from '../../../../../core/utils/extend';
import errors from '../../../../../ui/widget/ui.errors';
import { getFilterExpression, isCondition, isGroup, renderValueText } from '../../../../filter_builder/m_utils';
import { getHeaderItemText } from './header_filter/legacy_header_filter';
function baseOperation(config) {
  const {
    getHeaderFilterController
  } = config;
  const calculateFilterExpression = function (filterValue, field, fields) {
    const result = [];
    const lastIndex = filterValue.length - 1;
    filterValue && filterValue.forEach((value, index) => {
      if (isCondition(value) || isGroup(value)) {
        const filterExpression = getFilterExpression(value, fields, [], 'headerFilter');
        result.push(filterExpression);
      } else {
        const filterExpression = getFilterExpression([field.dataField ?? field.name, '=', value], fields, [], 'headerFilter');
        result.push(filterExpression);
      }
      index !== lastIndex && result.push('or');
    });
    if (result.length === 1) {
      return result[0];
    }
    return result;
  };
  const getFullText = function (itemText, parentText) {
    return parentText ? `${parentText}/${itemText}` : itemText;
  };
  const getSelectedItemsTexts = function (items, parentText) {
    let result = [];
    items.forEach(item => {
      if (item.items) {
        const selectedItemsTexts = getSelectedItemsTexts(item.items, getFullText(item.text, parentText));
        result = result.concat(selectedItemsTexts);
      }
      item.selected && result.push(getFullText(item.text, parentText));
    });
    return result;
  };
  // Override in the private API WA [T1232532]
  const customizeText = function (fieldInfo, options) {
    options = options || {};
    const headerFilterController = getHeaderFilterController();
    const {
      value
    } = fieldInfo;
    let column = config.columnOption(fieldInfo.field.dataField);
    const headerFilter = column && column.headerFilter;
    // TODO: lookup is not supported in CardView yet
    const lookup = column && column.lookup;
    const values = options.values || [value];
    if (headerFilter && headerFilter.dataSource || lookup && lookup.dataSource) {
      // @ts-expect-error
      const result = new Deferred();
      // @ts-expect-error
      const itemsDeferred = options.items || new Deferred();
      if (!options.items) {
        column = extend({}, column, {
          filterType: 'include',
          filterValues: values
        });
        const dataSourceOptions = headerFilterController.getDataSource(column);
        dataSourceOptions.paginate = false;
        const dataSource = new DataSource(dataSourceOptions);
        const key = dataSource.store().key();
        if (key) {
          const {
            values
          } = options;
          if (values && values.length > 1) {
            const filter = values.reduce((result, value) => {
              if (result.length) {
                result.push('or');
              }
              result.push([key, '=', value]);
              return result;
            }, []);
            dataSource.filter(filter);
          } else {
            dataSource.filter([key, '=', fieldInfo.value]);
          }
        } else if (fieldInfo.field.calculateDisplayValue) {
          errors.log('W1017');
        }
        options.items = itemsDeferred;
        dataSource.load().done(itemsDeferred.resolve);
      }
      itemsDeferred.done(items => {
        const index = values.indexOf(fieldInfo.value);
        result.resolve(getSelectedItemsTexts(items, null)[index]);
      });
      return result;
    }
    const headerFilterOptions = config.getHeaderFilterOptions();
    const text = getHeaderItemText(value, column, 0, headerFilterOptions);
    return text;
  };
  return {
    dataTypes: ['string', 'date', 'datetime', 'number', 'boolean', 'object'],
    calculateFilterExpression,
    editorTemplate(conditionInfo, container) {
      const headerFilterController = getHeaderFilterController();
      const div = $('<div>').addClass('dx-filterbuilder-item-value-text').appendTo(container);
      const originalColumn = config.columnOption(conditionInfo.field.dataField);
      const column = extend(true, {}, originalColumn);
      renderValueText(div, conditionInfo.text && conditionInfo.text.split('|'));
      const setValue = function (value) {
        conditionInfo.setValue(value);
      };
      column.filterType = 'include';
      column.filterValues = conditionInfo.value ? conditionInfo.value.slice() : [];
      headerFilterController.showHeaderFilterMenuBase({
        columnElement: div,
        column,
        customApply(filterValues) {
          setValue(filterValues);
          headerFilterController.hideHeaderFilterMenu();
          conditionInfo.closeEditor();
        },
        onHidden() {
          conditionInfo.closeEditor();
        },
        isFilterBuilder: true
      });
      return container;
    },
    customizeText
  };
}
export function anyOf(config) {
  return extend(baseOperation(config), {
    name: 'anyof',
    icon: 'selectall',
    caption: messageLocalization.format('dxFilterBuilder-filterOperationAnyOf')
  });
}
export function noneOf(config) {
  const baseOp = baseOperation(config);
  return extend({}, baseOp, {
    calculateFilterExpression(filterValue, field, fields) {
      const baseFilter = baseOp.calculateFilterExpression(filterValue, field, fields);
      if (!baseFilter || baseFilter.length === 0) return null;
      return baseFilter[0] === '!' ? baseFilter : ['!', baseFilter];
    },
    name: 'noneof',
    icon: 'unselectall',
    caption: messageLocalization.format('dxFilterBuilder-filterOperationNoneOf')
  });
}
