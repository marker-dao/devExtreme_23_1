/**
* DevExtreme (cjs/__internal/grids/new/card_view/content_view/content/card/card.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _inferno = require("inferno");
var _globals = require("@jest/globals");
var _data = require("../../../../../../../common/data");
var _m_guid = require("../../../../../../core/m_guid");
var _card = require("./card");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const props = {
  card: {
    fields: [{
      column: {
        dataField: 'Name',
        name: 'Field',
        caption: 'Field'
      },
      value: 'devextreme',
      text: 'devextreme'
    }],
    key: 0,
    data: {
      Field: 'Name',
      img: 'https://www.devexpress.com/support/demos/i/demo-thumbs/aspnetcore-grid.png',
      alt: 'Card Cover'
    }
  },
  header: {
    items: [{
      location: 'before',
      widget: 'dxCheckBox'
    }, {
      location: 'before',
      text: 'Card Header'
    }, {
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'edit',
        stylingMode: 'text'
      }
    }, {
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'trash',
        stylingMode: 'text'
      }
    }]
  },
  cover: {
    imageExpr: (0, _data.compileGetter)('img'),
    altExpr: (0, _data.compileGetter)('alt')
  }
};
(0, _globals.describe)('Rendering', () => {
  (0, _globals.beforeEach)(() => {
    _globals.jest.spyOn(_m_guid.Guid.prototype, '_normalize').mockReturnValue('guidmock');
  });
  (0, _globals.afterEach)(() => {
    _globals.jest.spyOn(_m_guid.Guid.prototype, '_normalize').mockRestore();
  });
  (0, _globals.it)('should be rendered correctly', () => {
    const container = document.createElement('div');
    // @ts-expect-error
    (0, _inferno.render)((0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _card.Card, _extends({}, props))), container);
    (0, _globals.expect)(container).toMatchSnapshot();
  });
  (0, _globals.it)('should render content correctly', () => {
    const container = document.createElement('div');
    // @ts-expect-error
    (0, _inferno.render)((0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _card.Card, _extends({}, props))), container);
    const fieldValue = container.querySelector('.dx-cardview-field-value');
    (0, _globals.expect)(fieldValue === null || fieldValue === void 0 ? void 0 : fieldValue.textContent).toEqual('devextreme');
  });
});
(0, _globals.describe)('Card Header', () => {
  (0, _globals.it)('should render the card header components correctly', () => {
    const container = document.createElement('div');
    // @ts-expect-error
    (0, _inferno.render)((0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _card.Card, _extends({}, props))), container);
    const cardHeaderText = container.querySelector('.dx-toolbar-label .dx-toolbar-item-content > div');
    (0, _globals.expect)(cardHeaderText === null || cardHeaderText === void 0 ? void 0 : cardHeaderText.textContent).toBe('Card Header');
    const checkbox = container.querySelectorAll('.dx-checkbox');
    (0, _globals.expect)(checkbox).toHaveLength(1);
    const editButton = container.querySelectorAll('.dx-icon-edit');
    (0, _globals.expect)(editButton).toHaveLength(1);
    const trashButton = container.querySelectorAll('.dx-icon-trash');
    (0, _globals.expect)(trashButton).toHaveLength(1);
  });
});
(0, _globals.describe)('Cover', () => {
  (0, _globals.it)('should be rendered', () => {
    const container = document.createElement('div');
    // @ts-expect-error
    (0, _inferno.render)((0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _card.Card, _extends({}, props))), container);
    const image = container.querySelector('img');
    (0, _globals.expect)(image).not.toBeNull();
  });
  (0, _globals.it)('should be rendered if imageExpr is not defined but template is defined', () => {
    const container = document.createElement('div');
    const localProps = _extends({}, props, {
      cover: {
        template: () => (0, _inferno.createVNode)(1, "img", 'myTemplate')
      }
    });
    // @ts-expect-error
    (0, _inferno.render)((0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _card.Card, _extends({}, localProps))), container);
    (0, _globals.expect)(container.querySelector('.myTemplate')).toBeTruthy();
  });
});
(0, _globals.describe)('Field Template', () => {
  (0, _globals.it)('should render field template correctly', () => {
    const container = document.createElement('div');
    // @ts-expect-error
    (0, _inferno.render)((0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _card.Card, _extends({}, props))), container);
    const fieldName = container.querySelector('.dx-cardview-field-caption');
    const fieldValue = container.querySelector('.dx-cardview-field-value');
    (0, _globals.expect)(fieldName === null || fieldName === void 0 ? void 0 : fieldName.textContent).toBe('Field:');
    (0, _globals.expect)(fieldValue === null || fieldValue === void 0 ? void 0 : fieldValue.textContent).toBe('devextreme');
  });
});
