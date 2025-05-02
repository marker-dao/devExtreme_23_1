"use strict";

var _globals = require("@jest/globals");
var _widget = _interopRequireDefault(require("../../../../../grids/new/card_view/widget"));
var _inferno = require("inferno");
var _view_controller = require("./view_controller");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable spellcheck/spell-checker */

const SELECTORS = {
  popupContent: '.dx-popup-wrapper.dx-header-filter-menu'
};
const rootQuerySelector = selector => document.body.querySelector(selector);
(0, _globals.describe)('HeaderFilter', () => {
  (0, _globals.describe)('View integration', () => {
    (0, _globals.it)('should render popup with list by default', () => {
      const container = document.createElement('div');
      const popupContainer = document.createElement('div');
      const {
        body
      } = document;
      body.append(container);
      const cardView = new _widget.default(container, {
        dataSource: [{
          A: 'A_0'
        }, {
          A: 'A_1'
        }, {
          A: 'A_2'
        }, {
          A: 'A_3'
        }, {
          A: 'A_4'
        }],
        columns: ['A'],
        headerFilter: {
          visible: true
        }
      });
      // @ts-expect-error getting protected field
      const viewController = cardView.diContext.get(_view_controller.HeaderFilterViewController);
      const column = cardView.getVisibleColumns()[0];
      viewController.openPopup(popupContainer, column);
      (0, _inferno.rerender)();
      (0, _globals.expect)(rootQuerySelector(SELECTORS.popupContent)).toMatchSnapshot();
    });
    (0, _globals.it)('should render popup with tree list if dataType is date-like', () => {
      const container = document.createElement('div');
      const popupContainer = document.createElement('div');
      const {
        body
      } = document;
      body.append(container);
      const cardView = new _widget.default(container, {
        dataSource: [{
          A: 'A_0'
        }, {
          A: 'A_1'
        }, {
          A: 'A_2'
        }, {
          A: 'A_3'
        }, {
          A: 'A_4'
        }],
        columns: [{
          dataField: 'A',
          dataType: 'date'
        }],
        headerFilter: {
          visible: true
        }
      });
      // @ts-expect-error getting protected field
      const viewController = cardView.diContext.get(_view_controller.HeaderFilterViewController);
      const column = cardView.getVisibleColumns()[0];
      viewController.openPopup(popupContainer, column);
      (0, _inferno.rerender)();
      (0, _globals.expect)(rootQuerySelector(SELECTORS.popupContent)).toMatchSnapshot();
    });
  });
});