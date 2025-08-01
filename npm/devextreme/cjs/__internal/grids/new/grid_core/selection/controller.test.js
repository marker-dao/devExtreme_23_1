/**
* DevExtreme (cjs/__internal/grids/new/grid_core/selection/controller.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _data_controller = require("../data_controller");
var _di = require("../di.test_utils");
var _items_controller = require("../items_controller/items_controller");
var _options_controller = require("../options_controller/options_controller.mock");
var _controller = require("./controller");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const setup = function () {
  let config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const context = (0, _di.getContext)(_extends({
    selection: {
      mode: 'single'
    },
    selectedCardKeys: []
  }, config));
  return {
    optionsController: context.get(_options_controller.OptionsControllerMock),
    selectionController: context.get(_controller.SelectionController),
    itemsController: context.get(_items_controller.ItemsController),
    dataController: context.get(_data_controller.DataController)
  };
};
(0, _globals.describe)('SelectionController', () => {
  // Public methods
  (0, _globals.describe)('selectCards', () => {
    (0, _globals.it)('should select item', () => {
      const {
        selectionController,
        itemsController
      } = setup({
        keyExpr: 'id',
        dataSource: [{
          id: 1,
          value: 'test'
        }]
      });
      selectionController.selectCards([1]);
      (0, _globals.expect)(itemsController.items).toMatchSnapshot();
    });
  });
  (0, _globals.describe)('deselectCards', () => {
    (0, _globals.it)('should deselect item', () => {
      const {
        selectionController,
        itemsController
      } = setup({
        keyExpr: 'id',
        dataSource: [{
          id: 1,
          value: 'test'
        }],
        selectedCardKeys: [1]
      });
      selectionController.deselectCards([1]);
      (0, _globals.expect)(itemsController.items).toMatchSnapshot();
    });
  });
  (0, _globals.describe)('selectCardsByIndexes', () => {
    (0, _globals.it)('should select item', () => {
      const {
        selectionController,
        itemsController
      } = setup({
        keyExpr: 'id',
        dataSource: [{
          id: 1,
          value: 'test'
        }]
      });
      selectionController.selectCardsByIndexes([0]);
      (0, _globals.expect)(itemsController.items).toMatchSnapshot();
    });
  });
  (0, _globals.describe)('deselectCardsByIndexes', () => {
    (0, _globals.it)('should deselect item', () => {
      const {
        selectionController,
        itemsController
      } = setup({
        keyExpr: 'id',
        dataSource: [{
          id: 1,
          value: 'test'
        }],
        selectedCardKeys: [1]
      });
      selectionController.deselectCardsByIndexes([0]);
      (0, _globals.expect)(itemsController.items).toMatchSnapshot();
    });
  });
  (0, _globals.describe)('changeCardSelection', () => {
    (0, _globals.describe)('when the control arg equal to false', () => {
      (0, _globals.it)('should update the select state of the item', () => {
        const {
          selectionController,
          itemsController
        } = setup({
          keyExpr: 'id',
          dataSource: [{
            id: 1,
            value: 'test'
          }]
        });
        selectionController.changeCardSelection(0, {
          control: false
        });
        (0, _globals.expect)(itemsController.items).toMatchSnapshot();
      });
    });
    (0, _globals.describe)('when the control arg equal to true', () => {
      (0, _globals.it)('should update the select state of the item', () => {
        const {
          selectionController,
          itemsController
        } = setup({
          keyExpr: 'id',
          dataSource: [{
            id: 1,
            value: 'test'
          }],
          selectedCardKeys: [1]
        });
        selectionController.changeCardSelection(0, {
          control: true
        });
        (0, _globals.expect)(itemsController.items).toMatchSnapshot();
      });
    });
    (0, _globals.describe)('when item is selected and multiple selection enabled', () => {
      (0, _globals.it)('should update the select state of the item', () => {
        const {
          selectionController
        } = setup({
          keyExpr: 'id',
          dataSource: [{
            id: 1,
            value: 'test'
          }],
          selectedCardKeys: [1],
          selection: {
            mode: 'multiple',
            showCheckBoxesMode: 'always'
          }
        });
        selectionController.changeCardSelection(0);
        (0, _globals.expect)(selectionController.getSelectedCardKeys()).toEqual([]);
      });
    });
  });
  (0, _globals.describe)('isCardSelected', () => {
    (0, _globals.describe)('when the selectedCardKeys is specified', () => {
      (0, _globals.it)('should return true', () => {
        const {
          selectionController
        } = setup({
          keyExpr: 'id',
          dataSource: [{
            id: 1,
            value: 'test'
          }],
          selectedCardKeys: [1]
        });
        (0, _globals.expect)(selectionController.isCardSelected(1)).toBe(true);
      });
    });
    (0, _globals.describe)('when the selectedCardKeys isn\'t specified', () => {
      (0, _globals.it)('should return false', () => {
        const {
          selectionController
        } = setup({
          keyExpr: 'id',
          dataSource: [{
            id: 1,
            value: 'test'
          }]
        });
        (0, _globals.expect)(selectionController.isCardSelected(1)).toBe(false);
      });
    });
  });
  (0, _globals.describe)('getSelectedCardKeys', () => {
    (0, _globals.it)('should return the selected card keys', () => {
      const {
        selectionController
      } = setup({
        keyExpr: 'id',
        dataSource: [{
          id: 1,
          value: 'test'
        }],
        selectedCardKeys: [1]
      });
      (0, _globals.expect)(selectionController.getSelectedCardKeys()).toEqual([1]);
    });
  });
  (0, _globals.describe)('getSelectedCardsData', () => {
    (0, _globals.it)('should return the selected cards data', () => {
      const {
        selectionController,
        dataController
      } = setup({
        keyExpr: 'id',
        dataSource: [{
          id: 1,
          value: 'test'
        }],
        selectedCardKeys: [1]
      });
      (0, _globals.expect)(selectionController.getSelectedCardsData()).toEqual(dataController.items.peek());
    });
  });
  (0, _globals.describe)('clearSelection', () => {
    (0, _globals.it)('should clear the selection', () => {
      const {
        selectionController
      } = setup({
        keyExpr: 'id',
        dataSource: [{
          id: 1,
          value: 'test'
        }],
        selectedCardKeys: [1]
      });
      selectionController.clearSelection();
      (0, _globals.expect)(selectionController.getSelectedCardKeys().length).toBe(0);
    });
  });
  (0, _globals.describe)('updateSelectionCheckBoxesVisible', () => {
    (0, _globals.describe)('when the selection mode is equal to \'multiple\' and the showCheckBoxesMode is equal to \'onClick\'', () => {
      (0, _globals.it)('should show the selection checkboxes', () => {
        const {
          selectionController
        } = setup({
          keyExpr: 'id',
          dataSource: [{
            id: 1,
            value: 'test'
          }],
          selection: {
            mode: 'multiple',
            showCheckBoxesMode: 'onClick'
          }
        });
        selectionController.updateSelectionCheckBoxesVisible(true);
        (0, _globals.expect)(selectionController.isCheckBoxesVisible.peek()).toBe(true);
      });
      (0, _globals.it)('should hide the selection checkboxes', () => {
        const {
          selectionController
        } = setup({
          keyExpr: 'id',
          dataSource: [{
            id: 1,
            value: 'test'
          }],
          selection: {
            mode: 'multiple',
            showCheckBoxesMode: 'onClick'
          }
        });
        selectionController.updateSelectionCheckBoxesVisible(false);
        (0, _globals.expect)(selectionController.isCheckBoxesVisible.peek()).toBe(false);
      });
    });
  });
  (0, _globals.describe)('processLongTap', () => {
    (0, _globals.describe)('when the selection mode is equal to \'multiple\' and the showCheckBoxesMode is equal to \'onLongTap\'', () => {
      (0, _globals.it)('should render the selection checkbox', () => {
        const {
          selectionController
        } = setup({
          keyExpr: 'id',
          dataSource: [{
            id: 1,
            value: 'test'
          }],
          selection: {
            mode: 'multiple',
            showCheckBoxesMode: 'onLongTap'
          }
        });
        // @ts-expect-error
        selectionController.processLongTap({
          index: 0
        });
        (0, _globals.expect)(selectionController.isCheckBoxesRendered.peek()).toBe(true);
      });
    });
    (0, _globals.describe)('when the selection mode is equal to \'multiple\' and the showCheckBoxesMode is equal to \'onClick\'', () => {
      (0, _globals.it)('should show the selection checkbox', () => {
        const {
          selectionController
        } = setup({
          keyExpr: 'id',
          dataSource: [{
            id: 1,
            value: 'test'
          }],
          selection: {
            mode: 'multiple',
            showCheckBoxesMode: 'onClick'
          }
        });
        // @ts-expect-error
        selectionController.processLongTap({
          index: 0
        });
        (0, _globals.expect)(selectionController.isCheckBoxesVisible.peek()).toBe(true);
      });
    });
    (0, _globals.describe)('when the selection mode is equal to \'multiple\' and the showCheckBoxesMode is equal to \'none\'', () => {
      (0, _globals.it)('should select a first item', () => {
        const {
          selectionController
        } = setup({
          keyExpr: 'id',
          dataSource: [{
            id: 1,
            value: 'test'
          }],
          selection: {
            mode: 'multiple',
            showCheckBoxesMode: 'none'
          }
        });
        // @ts-expect-error
        selectionController.processLongTap({
          index: 0
        });
        (0, _globals.expect)(selectionController.getSelectedCardKeys()).toEqual([1]);
      });
    });
    (0, _globals.describe)('when the selection mode is equal to \'multiple\' and the showCheckBoxesMode is equal to \'none\'', () => {
      (0, _globals.it)('should not select a first item', () => {
        const {
          selectionController
        } = setup({
          keyExpr: 'id',
          dataSource: [{
            id: 1,
            value: 'test'
          }],
          selection: {
            mode: 'multiple',
            showCheckBoxesMode: 'always'
          }
        });
        // @ts-expect-error
        selectionController.processLongTap({
          index: 0
        });
        (0, _globals.expect)(selectionController.getSelectedCardKeys()).toEqual([]);
      });
    });
  });
  // Public properties
  (0, _globals.describe)('isCheckBoxesRendered', () => {
    (0, _globals.describe)('when the selection mode is equal to \'none\'', () => {
      (0, _globals.it)('should return false', () => {
        const {
          selectionController
        } = setup({
          keyExpr: 'id',
          dataSource: [{
            id: 1,
            value: 'test'
          }],
          selection: {
            mode: 'none'
          }
        });
        (0, _globals.expect)(selectionController.isCheckBoxesRendered.peek()).toBe(false);
      });
    });
    (0, _globals.describe)('when the selection mode is equal to \'multiple\' and the showCheckBoxesMode is equal to \'always\'', () => {
      (0, _globals.it)('should return true', () => {
        const {
          selectionController
        } = setup({
          keyExpr: 'id',
          dataSource: [{
            id: 1,
            value: 'test'
          }],
          selection: {
            mode: 'multiple',
            showCheckBoxesMode: 'always'
          }
        });
        (0, _globals.expect)(selectionController.isCheckBoxesRendered.peek()).toBe(true);
      });
    });
    (0, _globals.describe)('when the selection mode is equal to \'multiple\' and the showCheckBoxesMode is equal to \'onClick\'', () => {
      (0, _globals.it)('should return true', () => {
        const {
          selectionController
        } = setup({
          keyExpr: 'id',
          dataSource: [{
            id: 1,
            value: 'test'
          }],
          selection: {
            mode: 'multiple',
            showCheckBoxesMode: 'onClick'
          }
        });
        (0, _globals.expect)(selectionController.isCheckBoxesRendered.peek()).toBe(true);
      });
    });
    (0, _globals.describe)('when the selection mode is equal to \'multiple\' and the showCheckBoxesMode is equal to \'onLongTap\'', () => {
      (0, _globals.it)('should return false', () => {
        const {
          selectionController
        } = setup({
          keyExpr: 'id',
          dataSource: [{
            id: 1,
            value: 'test'
          }],
          selection: {
            mode: 'multiple',
            showCheckBoxesMode: 'onLongTap'
          }
        });
        (0, _globals.expect)(selectionController.isCheckBoxesRendered.peek()).toBe(false);
      });
    });
  });
  (0, _globals.describe)('isCheckBoxesVisible', () => {
    (0, _globals.describe)('when the selection mode is equal to \'multiple\' and the showCheckBoxesMode is equal to \'onClick\'', () => {
      (0, _globals.it)('should return false', () => {
        const {
          selectionController
        } = setup({
          keyExpr: 'id',
          dataSource: [{
            id: 1,
            value: 'test'
          }],
          selection: {
            mode: 'multiple',
            showCheckBoxesMode: 'onClick'
          }
        });
        (0, _globals.expect)(selectionController.isCheckBoxesVisible.peek()).toBe(false);
      });
    });
    (0, _globals.describe)('when selecting one card', () => {
      (0, _globals.it)('should return false', () => {
        const {
          selectionController
        } = setup({
          keyExpr: 'id',
          dataSource: [{
            id: 1,
            value: 'test1'
          }, {
            id: 2,
            value: 'test2'
          }, {
            id: 3,
            value: 'test3'
          }],
          selection: {
            mode: 'multiple',
            showCheckBoxesMode: 'onClick'
          }
        });
        selectionController.selectCards([1]);
        (0, _globals.expect)(selectionController.isCheckBoxesVisible.peek()).toBe(false);
      });
    });
    (0, _globals.describe)('when selecting two cards', () => {
      (0, _globals.it)('should return true', () => {
        const {
          selectionController
        } = setup({
          keyExpr: 'id',
          dataSource: [{
            id: 1,
            value: 'test1'
          }, {
            id: 2,
            value: 'test2'
          }, {
            id: 3,
            value: 'test3'
          }],
          selection: {
            mode: 'multiple',
            showCheckBoxesMode: 'onClick'
          }
        });
        selectionController.selectCards([1, 2]);
        (0, _globals.expect)(selectionController.isCheckBoxesVisible.peek()).toBe(true);
      });
    });
    (0, _globals.describe)('when deselecting all cards', () => {
      (0, _globals.it)('should return false', () => {
        const {
          selectionController
        } = setup({
          keyExpr: 'id',
          dataSource: [{
            id: 1,
            value: 'test1'
          }, {
            id: 2,
            value: 'test2'
          }, {
            id: 3,
            value: 'test3'
          }],
          selection: {
            mode: 'multiple',
            showCheckBoxesMode: 'onClick'
          },
          selectedCardKeys: [1, 2]
        });
        selectionController.deselectCards([1, 2]);
        (0, _globals.expect)(selectionController.isCheckBoxesVisible.peek()).toBe(false);
      });
    });
  });
  (0, _globals.describe)('needToHiddenCheckBoxes', () => {
    (0, _globals.describe)('when the selection mode is equal to \'multiple\' and the showCheckBoxesMode is equal to \'onClick\'', () => {
      (0, _globals.it)('should return true', () => {
        const {
          selectionController
        } = setup({
          keyExpr: 'id',
          dataSource: [{
            id: 1,
            value: 'test'
          }],
          selection: {
            mode: 'multiple',
            showCheckBoxesMode: 'onClick'
          }
        });
        (0, _globals.expect)(selectionController.needToHiddenCheckBoxes.peek()).toBe(true);
      });
    });
    (0, _globals.describe)('when the selection mode is equal to \'multiple\' and the showCheckBoxesMode is equal to \'always\'', () => {
      (0, _globals.it)('should return false', () => {
        const {
          selectionController
        } = setup({
          keyExpr: 'id',
          dataSource: [{
            id: 1,
            value: 'test'
          }],
          selection: {
            mode: 'multiple',
            showCheckBoxesMode: 'always'
          }
        });
        (0, _globals.expect)(selectionController.needToHiddenCheckBoxes.peek()).toBe(false);
      });
    });
  });
  // Events
  (0, _globals.describe)('onSelectionChanging', () => {
    (0, _globals.describe)('when selecting a card', () => {
      (0, _globals.it)('should be called', () => {
        const selectionChangingMockFn = _globals.jest.fn();
        const cardData = {
          id: 1,
          value: 'test'
        };
        const {
          selectionController
        } = setup({
          keyExpr: 'id',
          dataSource: [cardData],
          selection: {
            mode: 'multiple'
          },
          onSelectionChanging: selectionChangingMockFn
        });
        selectionController.selectCards([1]);
        (0, _globals.expect)(selectionChangingMockFn.mock.calls).toHaveLength(1);
        (0, _globals.expect)(selectionChangingMockFn.mock.lastCall).toMatchObject([{
          cancel: false,
          currentDeselectedCardKeys: [],
          currentSelectedCardKeys: [1],
          isDeselectAll: false,
          isSelectAll: false,
          selectedCardKeys: [1],
          selectedCardsData: [cardData]
        }]);
      });
    });
    (0, _globals.describe)('when deselecting a card', () => {
      (0, _globals.it)('should be called', () => {
        const selectionChangingMockFn = _globals.jest.fn();
        const cardData = {
          id: 1,
          value: 'test'
        };
        const {
          selectionController
        } = setup({
          keyExpr: 'id',
          dataSource: [cardData],
          selection: {
            mode: 'multiple'
          },
          selectedCardKeys: [1],
          onSelectionChanging: selectionChangingMockFn
        });
        selectionController.deselectCards([1]);
        (0, _globals.expect)(selectionChangingMockFn.mock.calls).toHaveLength(1);
        (0, _globals.expect)(selectionChangingMockFn.mock.lastCall).toMatchObject([{
          cancel: false,
          currentDeselectedCardKeys: [1],
          currentSelectedCardKeys: [],
          isDeselectAll: false,
          isSelectAll: false,
          selectedCardKeys: [],
          selectedCardsData: []
        }]);
      });
    });
    (0, _globals.describe)('when selecting all cards', () => {
      (0, _globals.it)('should be called', () => {
        const selectionChangingMockFn = _globals.jest.fn();
        const data = [{
          id: 1,
          value: 'test1'
        }, {
          id: 2,
          value: 'test2'
        }];
        const {
          selectionController
        } = setup({
          keyExpr: 'id',
          dataSource: data,
          selection: {
            mode: 'multiple',
            allowSelectAll: true
          },
          onSelectionChanging: selectionChangingMockFn
        });
        selectionController.selectAll();
        (0, _globals.expect)(selectionChangingMockFn.mock.calls).toHaveLength(1);
        (0, _globals.expect)(selectionChangingMockFn.mock.lastCall).toMatchObject([{
          cancel: false,
          currentDeselectedCardKeys: [],
          currentSelectedCardKeys: [1, 2],
          isDeselectAll: false,
          isSelectAll: false,
          selectedCardKeys: [1, 2],
          selectedCardsData: data
        }]);
      });
    });
    (0, _globals.describe)('when deselecting all cards', () => {
      (0, _globals.it)('should be called', () => {
        const selectionChangingMockFn = _globals.jest.fn();
        const data = [{
          id: 1,
          value: 'test1'
        }, {
          id: 2,
          value: 'test2'
        }];
        const {
          selectionController
        } = setup({
          keyExpr: 'id',
          dataSource: data,
          selection: {
            mode: 'multiple',
            allowSelectAll: true
          },
          selectedCardKeys: [1, 2],
          onSelectionChanging: selectionChangingMockFn
        });
        selectionController.deselectAll();
        (0, _globals.expect)(selectionChangingMockFn.mock.calls).toHaveLength(1);
        (0, _globals.expect)(selectionChangingMockFn.mock.lastCall).toMatchObject([{
          cancel: false,
          currentDeselectedCardKeys: [1, 2],
          currentSelectedCardKeys: [],
          isDeselectAll: false,
          isSelectAll: false,
          selectedCardKeys: [],
          selectedCardsData: []
        }]);
      });
    });
    (0, _globals.describe)('when a cancel arg is specified as true', () => {
      (0, _globals.it)('should be called', () => {
        const selectionChangingMockFn = _globals.jest.fn(e => {
          e.cancel = true;
        });
        const cardData = {
          id: 1,
          value: 'test'
        };
        const {
          selectionController
        } = setup({
          keyExpr: 'id',
          dataSource: [cardData],
          selection: {
            mode: 'multiple'
          },
          onSelectionChanging: selectionChangingMockFn
        });
        selectionController.selectCards([1]);
        (0, _globals.expect)(selectionChangingMockFn.mock.calls).toHaveLength(1);
        (0, _globals.expect)(selectionChangingMockFn.mock.lastCall).toMatchObject([{
          cancel: true,
          currentDeselectedCardKeys: [],
          currentSelectedCardKeys: [1],
          isDeselectAll: false,
          isSelectAll: false,
          selectedCardKeys: [1],
          selectedCardsData: [cardData]
        }]);
        (0, _globals.expect)(selectionController.getSelectedCardKeys()).toEqual([]);
      });
    });
    (0, _globals.describe)('when a cancel arg is specified as Promise', () => {
      (0, _globals.it)('should be called', () => {
        const cancel = Promise.resolve(true);
        const selectionChangingMockFn = _globals.jest.fn(e => {
          e.cancel = cancel;
        });
        const cardData = {
          id: 1,
          value: 'test'
        };
        const {
          selectionController
        } = setup({
          keyExpr: 'id',
          dataSource: [cardData],
          selection: {
            mode: 'multiple'
          },
          onSelectionChanging: selectionChangingMockFn
        });
        selectionController.selectCards([1]);
        (0, _globals.expect)(selectionChangingMockFn.mock.calls).toHaveLength(1);
        (0, _globals.expect)(selectionChangingMockFn.mock.lastCall).toMatchObject([{
          cancel,
          currentDeselectedCardKeys: [],
          currentSelectedCardKeys: [1],
          isDeselectAll: false,
          isSelectAll: false,
          selectedCardKeys: [1],
          selectedCardsData: [cardData]
        }]);
        (0, _globals.expect)(selectionController.getSelectedCardKeys()).toEqual([]);
      });
    });
  });
  (0, _globals.describe)('onSelectionChanged', () => {
    (0, _globals.describe)('when selecting a card', () => {
      (0, _globals.it)('should be called', () => {
        const selectionChangedMockFn = _globals.jest.fn();
        const cardData = {
          id: 1,
          value: 'test'
        };
        const {
          selectionController
        } = setup({
          keyExpr: 'id',
          dataSource: [cardData],
          selection: {
            mode: 'multiple'
          },
          onSelectionChanged: selectionChangedMockFn
        });
        selectionController.selectCards([1]);
        (0, _globals.expect)(selectionChangedMockFn.mock.calls).toHaveLength(1);
        (0, _globals.expect)(selectionChangedMockFn.mock.lastCall).toMatchObject([{
          currentDeselectedCardKeys: [],
          currentSelectedCardKeys: [1],
          isDeselectAll: false,
          isSelectAll: false,
          selectedCardKeys: [1],
          selectedCardsData: [cardData]
        }]);
      });
    });
    (0, _globals.describe)('when deselecting a card', () => {
      (0, _globals.it)('should be called', () => {
        const selectionChangedMockFn = _globals.jest.fn();
        const cardData = {
          id: 1,
          value: 'test'
        };
        const {
          selectionController
        } = setup({
          keyExpr: 'id',
          dataSource: [cardData],
          selection: {
            mode: 'multiple'
          },
          selectedCardKeys: [1],
          onSelectionChanged: selectionChangedMockFn
        });
        selectionController.deselectCards([1]);
        (0, _globals.expect)(selectionChangedMockFn.mock.calls).toHaveLength(1);
        (0, _globals.expect)(selectionChangedMockFn.mock.lastCall).toMatchObject([{
          currentDeselectedCardKeys: [1],
          currentSelectedCardKeys: [],
          isDeselectAll: false,
          isSelectAll: false,
          selectedCardKeys: [],
          selectedCardsData: []
        }]);
      });
    });
    (0, _globals.describe)('when selection changes via selectionChanged callback', () => {
      (0, _globals.it)('should update both selectionController and itemsController selection states when selecting single card', () => {
        const cardData = {
          id: 1,
          value: 'test'
        };
        const {
          selectionController,
          itemsController
        } = setup({
          keyExpr: 'id',
          dataSource: [cardData],
          selection: {
            mode: 'multiple'
          }
        });
        // Set up the spy before calling the method
        const setSelectionStateSpy = _globals.jest.spyOn(itemsController, 'setSelectionState');
        // Mock the selectionChanged private method call with test data
        const selectionChangedEvent = {
          addedItemKeys: [1],
          removedItemKeys: [],
          selectedItemKeys: [1],
          selectedItems: [cardData]
        };
        // Call the private method directly
        // @ts-expect-error - accessing private method
        selectionController.selectionChanged(selectionChangedEvent);
        // Verify that both controllers were updated
        (0, _globals.expect)(selectionController.getSelectedCardKeys()).toEqual([1]);
        // Check that the itemsController was updated with the same keys
        (0, _globals.expect)(setSelectionStateSpy).toHaveBeenCalledWith([1]);
        // Verify the UI would show correct selection state
        const items = itemsController.items.peek();
        (0, _globals.expect)(items[0].isSelected).toBe(true);
      });
      (0, _globals.it)('should update both selectionController and itemsController when selecting multiple cards', () => {
        const cardsData = [{
          id: 1,
          value: 'test1'
        }, {
          id: 2,
          value: 'test2'
        }, {
          id: 3,
          value: 'test3'
        }];
        const {
          selectionController,
          itemsController
        } = setup({
          keyExpr: 'id',
          dataSource: cardsData,
          selection: {
            mode: 'multiple'
          }
        });
        // Set up the spy before calling the method
        const setSelectionStateSpy = _globals.jest.spyOn(itemsController, 'setSelectionState');
        // Mock the selectionChanged private method call with test data
        const selectionChangedEvent = {
          addedItemKeys: [1, 3],
          removedItemKeys: [],
          selectedItemKeys: [1, 3],
          selectedItems: [cardsData[0], cardsData[2]]
        };
        // Call the private method directly
        // @ts-expect-error - accessing private method
        selectionController.selectionChanged(selectionChangedEvent);
        // Verify that both controllers were updated
        (0, _globals.expect)(selectionController.getSelectedCardKeys()).toEqual([1, 3]);
        // Check that the itemsController was updated with the same keys
        (0, _globals.expect)(setSelectionStateSpy).toHaveBeenCalledWith([1, 3]);
        // Verify the UI would show correct selection state
        const items = itemsController.items.peek();
        (0, _globals.expect)(items[0].isSelected).toBe(true);
        (0, _globals.expect)(items[1].isSelected).toBe(false);
        (0, _globals.expect)(items[2].isSelected).toBe(true);
      });
      (0, _globals.it)('should update both selectionController and itemsController when deselecting cards', () => {
        const cardsData = [{
          id: 1,
          value: 'test1'
        }, {
          id: 2,
          value: 'test2'
        }, {
          id: 3,
          value: 'test3'
        }];
        const {
          selectionController,
          itemsController
        } = setup({
          keyExpr: 'id',
          dataSource: cardsData,
          selection: {
            mode: 'multiple'
          },
          selectedCardKeys: [1, 2, 3]
        });
        // Initially all cards should be selected
        (0, _globals.expect)(itemsController.items.peek()[0].isSelected).toBe(true);
        (0, _globals.expect)(itemsController.items.peek()[1].isSelected).toBe(true);
        (0, _globals.expect)(itemsController.items.peek()[2].isSelected).toBe(true);
        // Set up the spy before calling the method
        const setSelectionStateSpy = _globals.jest.spyOn(itemsController, 'setSelectionState');
        // Mock the selectionChanged event when deselecting card #2
        const selectionChangedEvent = {
          addedItemKeys: [],
          removedItemKeys: [2],
          selectedItemKeys: [1, 3],
          selectedItems: [cardsData[0], cardsData[2]]
        };
        // Call the private method directly
        // @ts-expect-error - accessing private method
        selectionController.selectionChanged(selectionChangedEvent);
        // Verify that both controllers were updated
        (0, _globals.expect)(selectionController.getSelectedCardKeys()).toEqual([1, 3]);
        // Check that the itemsController was updated with the same keys
        (0, _globals.expect)(setSelectionStateSpy).toHaveBeenCalledWith([1, 3]);
        // Verify the UI would show correct selection state
        const items = itemsController.items.peek();
        (0, _globals.expect)(items[0].isSelected).toBe(true);
        (0, _globals.expect)(items[1].isSelected).toBe(false);
        (0, _globals.expect)(items[2].isSelected).toBe(true);
      });
      (0, _globals.it)('should throw error E1042 if keyExpr is missing and selectionChanged', () => {
        const cardData = {
          id: 1,
          value: 'test'
        };
        const {
          selectionController
        } = setup({
          dataSource: [cardData],
          selection: {
            mode: 'multiple'
          }
        });
        // Mock the selectionChanged private method call with test data
        const selectionChangedEvent = {
          addedItemKeys: [1],
          removedItemKeys: [],
          selectedItemKeys: [1],
          selectedItems: [cardData]
        };
        (0, _globals.expect)(() => {
          // @ts-expect-error - accessing private method
          selectionController.selectionChanged(selectionChangedEvent);
        }).toThrowError('E1042');
      });
    });
    (0, _globals.describe)('when selecting all cards', () => {
      (0, _globals.it)('should be called', () => {
        const selectionChangedMockFn = _globals.jest.fn();
        const data = [{
          id: 1,
          value: 'test1'
        }, {
          id: 2,
          value: 'test2'
        }];
        const {
          selectionController
        } = setup({
          keyExpr: 'id',
          dataSource: data,
          selection: {
            mode: 'multiple',
            allowSelectAll: true
          },
          onSelectionChanged: selectionChangedMockFn
        });
        selectionController.selectAll();
        (0, _globals.expect)(selectionChangedMockFn.mock.calls).toHaveLength(1);
        (0, _globals.expect)(selectionChangedMockFn.mock.lastCall).toMatchObject([{
          currentDeselectedCardKeys: [],
          currentSelectedCardKeys: [1, 2],
          isDeselectAll: false,
          isSelectAll: false,
          selectedCardKeys: [1, 2],
          selectedCardsData: data
        }]);
      });
    });
    (0, _globals.describe)('when deselecting all cards', () => {
      (0, _globals.it)('should be called', () => {
        const selectionChangedMockFn = _globals.jest.fn();
        const data = [{
          id: 1,
          value: 'test1'
        }, {
          id: 2,
          value: 'test2'
        }];
        const {
          selectionController
        } = setup({
          keyExpr: 'id',
          dataSource: data,
          selection: {
            mode: 'multiple',
            allowSelectAll: true
          },
          selectedCardKeys: [1, 2],
          onSelectionChanged: selectionChangedMockFn
        });
        selectionController.deselectAll();
        (0, _globals.expect)(selectionChangedMockFn.mock.calls).toHaveLength(1);
        (0, _globals.expect)(selectionChangedMockFn.mock.lastCall).toMatchObject([{
          currentDeselectedCardKeys: [1, 2],
          currentSelectedCardKeys: [],
          isDeselectAll: false,
          isSelectAll: false,
          selectedCardKeys: [],
          selectedCardsData: []
        }]);
      });
    });
  });
});
