!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.dataGrid/keyboardNavigation.realControllers.tests.js"], ["generic_light.css!","jquery","ui/data_grid","core/utils/common","events/pointer","../../helpers/dataGridMocks.js","../../helpers/shadowDom.js","../../helpers/grid/keyboardNavigationHelper.js","core/devices"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.dataGrid/keyboardNavigation.realControllers.tests.js", ["generic_light.css!", "jquery", "ui/data_grid", "core/utils/common", "events/pointer", "../../helpers/dataGridMocks.js", "../../helpers/shadowDom.js", "../../helpers/grid/keyboardNavigationHelper.js", "core/devices"], function($__export) {
  "use strict";
  var $,
      commonUtils,
      pointerEvents,
      setupDataGridModules,
      getActiveElement,
      CLICK_EVENT,
      triggerKeyDown,
      focusCell,
      dataGridWrapper,
      devices,
      device;
  return {
    setters: [function($__m) {}, function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {
      commonUtils = $__m.default;
    }, function($__m) {
      pointerEvents = $__m.default;
    }, function($__m) {
      setupDataGridModules = $__m.setupDataGridModules;
    }, function($__m) {
      getActiveElement = $__m.getActiveElement;
    }, function($__m) {
      CLICK_EVENT = $__m.CLICK_EVENT;
      triggerKeyDown = $__m.triggerKeyDown;
      focusCell = $__m.focusCell;
      dataGridWrapper = $__m.dataGridWrapper;
    }, function($__m) {
      devices = $__m.default;
    }],
    execute: function() {
      device = devices.real();
      QUnit.testStart(function() {
        var markup = "\n        <style nonce=\"qunit-test\">\n            [tabindex] {\n                background-color: yellow !important;\n            }\n        </style>\n        <div>\n            <div id=\"container\" class=\"dx-datagrid\"></div>\n        </div>";
        $('#qunit-fixture').html(markup);
      });
      QUnit.module('Real DataController and ColumnsController', {
        setupModule: function() {
          this.triggerKeyDown = triggerKeyDown;
          this.focusCell = focusCell;
          this.data = this.data || [{
            name: 'Alex',
            phone: '555555',
            room: 1
          }, {
            name: 'Dan',
            phone: '553355',
            room: 2
          }];
          this.columns = this.columns || ['name', 'phone', 'room'];
          this.$element = function() {
            return $('#container');
          };
          this.options = $.extend(true, {
            autoNavigateToFocusedRow: true,
            keyboardNavigation: {enabled: true},
            showColumnHeaders: true,
            commonColumnSettings: {allowEditing: true},
            columns: this.columns,
            dataSource: {
              asyncLoadEnabled: false,
              store: this.data,
              paginate: true
            }
          }, this.options);
          setupDataGridModules(this, ['data', 'columns', 'columnHeaders', 'rows', 'editorFactory', 'gridView', 'editing', 'editingRowBased', 'editingFormBased', 'editingCellBased', 'focus', 'keyboardNavigation', 'validating', 'masterDetail', 'selection', 'grouping'], {initViews: true});
        },
        setupAndRender: function() {
          this.setupModule();
          this.gridView.render($('#container'));
          this.clock.tick(10);
        },
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.dispose && this.dispose();
          this.clock.restore();
        }
      }, function() {
        QUnit.testInActiveWindow('Must navigate after click by expand column of master detail', function(assert) {
          this.options = {
            masterDetail: {
              enabled: true,
              template: commonUtils.noop
            },
            paging: {
              pageSize: 2,
              enabled: true
            }
          };
          this.setupModule();
          this.gridView.render($('#container'));
          this.clock.tick(10);
          var keyboardController = this.getController('keyboardNavigation');
          var rowsView = this.gridView.getView('rowsView');
          var $expandCell = $(rowsView.element().find('td').first());
          $expandCell.trigger(CLICK_EVENT);
          this.clock.tick(10);
          this.triggerKeyDown('rightArrow');
          this.clock.tick(10);
          assert.deepEqual(keyboardController._focusedCellPosition, {
            rowIndex: 0,
            columnIndex: 1
          }, 'focusedCellPosition is a first column');
          assert.equal($(rowsView.getCellElement(0, 0)).attr('tabIndex'), undefined, 'expand cell hasn\'t tab index');
          assert.equal($(rowsView.getCellElement(0, 1)).attr('tabIndex'), 0, 'cell(0, 1) has tab index');
          assert.ok(!$(rowsView.getCellElement(0, 0)).hasClass('dx-cell-focus-disabled'), 'expand cell has no \'dx-cell-focus-disabled\' class');
          assert.ok(!$(rowsView.getCellElement(0, 1)).hasClass('dx-cell-focus-disabled'), 'cell(0, 1) has no \'dx-cell-focus-disabled\' class');
          assert.strictEqual(rowsView.element().attr('tabIndex'), undefined, 'rowsView has no tabIndex');
          assert.ok(!$(rowsView.getCellElement(0, 0)).hasClass('dx-focused'), 'expand cell is not focused');
          assert.ok($(rowsView.getCellElement(0, 1)).hasClass('dx-focused'), 'cell(0, 1) is focused');
          assert.ok(this.gridView.component.editorFactoryController.focus(), 'has overlay focus');
        });
        if (device.deviceType === 'desktop') {
          QUnit.testInActiveWindow('Focus on first cell when insert Row', function(assert) {
            this.options = {editing: {
                allowUpdating: true,
                mode: 'row',
                allowAdding: true
              }};
            this.setupModule();
            this.keyboardNavigationController._focusedView = this.rowsView;
            this.gridView.render($('#container'));
            this.editingController.addRow();
            this.clock.tick(10);
            var $newRow = $('#container').find('.dx-data-row').first();
            assert.equal(this.editingController._getVisibleEditRowIndex(), 0, 'edit row index');
            assert.ok($newRow.find('input').first().parents('.dx-editor-cell').hasClass('dx-focused'));
            this.triggerKeyDown('tab', false, false, $('#container').find('input'));
            this.clock.tick(10);
            assert.equal(this.editingController._getVisibleEditRowIndex(), 0, 'edit row index');
            assert.ok($newRow.find('input').eq(1).parents('.dx-editor-cell').hasClass('dx-focused'));
          });
          QUnit.testInActiveWindow('Focus on first cell when insert Row via API when not editing', function(assert) {
            this.options = {editing: {
                allowUpdating: false,
                mode: 'row'
              }};
            this.setupModule();
            this.keyboardNavigationController._focusedView = this.rowsView;
            this.gridView.render($('#container'));
            this.editingController.addRow();
            this.clock.tick(10);
            var $newRow = $('#container').find('.dx-data-row').first();
            assert.equal(this.editingController._getVisibleEditRowIndex(), 0, 'edit row index');
            assert.ok($newRow.find('input').first().parents('.dx-editor-cell').hasClass('dx-focused'));
            this.triggerKeyDown('tab', false, false, $('#container').find('input'));
            this.clock.tick(10);
            assert.equal(this.editingController._getVisibleEditRowIndex(), 0, 'edit row index');
            assert.ok($newRow.find('input').eq(1).parents('.dx-editor-cell').hasClass('dx-focused'));
          });
        }
        QUnit.testInActiveWindow('Cell is focused when clicked on self', function(assert) {
          this.setupAndRender();
          var $cell = $(this.getCellElement(1, 1));
          $cell.trigger(CLICK_EVENT);
          assert.ok($cell.is(':focus'), 'cell is focused');
        });
        QUnit.testInActiveWindow('Cell is focused when clicked on input in cell (T667278)', function(assert) {
          this.options = {columns: ['name', {
              dataField: 'phone',
              cellTemplate: function(cellElement) {
                return $(cellElement).append($('<input>'));
              }
            }, 'room']};
          this.setupAndRender();
          var $input = $(this.getCellElement(1, 1)).find('input');
          $input.focus().trigger(CLICK_EVENT);
          var $cell = $input.parent();
          assert.ok($input.is(':focus'), 'input is focused');
          assert.equal($cell.attr('tabIndex'), undefined, 'cell does not have tabindex');
          assert.ok($cell.hasClass('dx-cell-focus-disabled'), 'cell has class dx-cell-focus-disabled');
        });
        QUnit.testInActiveWindow('Cell is not focused when clicked on invalid self', function(assert) {
          this.setupAndRender();
          var navigationController = this.getController('keyboardNavigation');
          navigationController._isCellValid = function() {
            return false;
          };
          navigationController._focusedCellPosition = {
            columnIndex: 0,
            rowIndex: 0
          };
          navigationController._isNeedFocus = true;
          var $cell = $(this.getCellElement(1, 1));
          $cell.trigger(CLICK_EVENT);
          assert.notOk($cell.is(':focus'), 'cell is not focused');
          assert.deepEqual(navigationController._focusedCellPosition, {}, 'focusedCellPosition');
          assert.ok(!navigationController._isNeedFocus, 'isKeyDown');
        });
        QUnit.testInActiveWindow('Focus valid cell in a rows with data', function(assert) {
          this.options = {editing: {
              mode: 'cell',
              allowUpdating: true
            }};
          this.setupAndRender();
          $(this.getCellElement(1, 1)).trigger(CLICK_EVENT);
          this.clock.tick(10);
          var navigationController = this.getController('keyboardNavigation');
          var rowsView = this.getView('rowsView');
          navigationController.getFocusedView = function() {
            return rowsView;
          };
          navigationController._editingController.isEditing = function() {
            return true;
          };
          navigationController._isNeedFocus = true;
          rowsView.render();
          navigationController._focusedView = this.getView('rowsView');
          this.clock.tick(10);
          assert.ok($(this.getCellElement(1, 1)).is(':focus'), 'cell is focused');
        });
        QUnit.testInActiveWindow('Only visible input element is focused when edit mode is enabled (T403964)', function(assert) {
          this.options = {
            editing: {
              mode: 'row',
              allowUpdating: true
            },
            columns: ['name', {
              dataField: 'phone',
              editCellTemplate: function(cell) {
                return $(cell).append($('<input class="input1" />').css('display', 'none'), $('<input class="input2" />'), $('<input class="input3" />').css('display', 'none'));
              }
            }, 'room']
          };
          this.setupAndRender();
          var navigationController = this.getController('keyboardNavigation');
          this.editRow(1);
          this.clock.tick(10);
          this.triggerKeyDown('tab', false, false, getActiveElement());
          this.clock.tick(10);
          assert.deepEqual(navigationController._focusedCellPosition, {
            rowIndex: 1,
            columnIndex: 1
          });
          var cell = dataGridWrapper.rowsView.getDataRow(1).getCell(1);
          assert.ok(cell.hasFocusedClass());
          assert.ok($(getActiveElement()).hasClass('input2'));
        });
        QUnit.testInActiveWindow('After pressing space button checkboxes should not be rendered if showCheckBoxesMode = \'none\' and focusedRowEnabled = \'true\'', function(assert) {
          this.options = {
            selection: {
              mode: 'multiple',
              showCheckBoxesMode: 'none'
            },
            focusedRowEnabled: true,
            keyboardNavigation: {enabled: true}
          };
          this.setupModule();
          this.gridView.render($('#container'));
          this.clock.tick(10);
          this.triggerKeyDown('space', false, false, this.getRowElement(0));
          assert.equal($('.dx-select-checkbox').length, 0, 'checkboxes are not rendered');
        });
        QUnit.testInActiveWindow('SelectionWithCheckboxes should start if space key was pressed after focusing cell with selection checkbox', function(assert) {
          this.options = {
            selection: {
              mode: 'multiple',
              showCheckBoxesMode: 'onClick'
            },
            keyboardNavigation: {enabled: true}
          };
          this.setupModule();
          this.gridView.render($('#container'));
          this.clock.tick(10);
          this.focusCell(0, 0);
          this.triggerKeyDown('space', false, false, $('.dx-command-select').eq(1));
          assert.equal($('.dx-select-checkbox').eq(1).attr('aria-checked'), 'true');
          assert.equal(this.selectionController.isSelectionWithCheckboxes(), true);
        });
        QUnit.testInActiveWindow('SelectionWithCheckboxes should not start if space key was pressed after focusing cell without selection checkbox', function(assert) {
          this.options = {
            selection: {
              mode: 'multiple',
              showCheckBoxesMode: 'onClick'
            },
            keyboardNavigation: {enabled: true}
          };
          this.setupModule();
          this.gridView.render($('#container'));
          this.clock.tick(10);
          this.focusCell(0, 0);
          this.triggerKeyDown('space', false, false, $('.dx-command-select').eq(1).next());
          assert.equal($('.dx-select-checkbox').eq(1).attr('aria-checked'), 'true');
          assert.equal(this.selectionController.isSelectionWithCheckboxes(), false);
        });
        QUnit.testInActiveWindow('Master-detail cell should not has tabindex', function(assert) {
          this.$element = function() {
            return $('#container');
          };
          this.options = {
            keyboardNavigation: {enabled: true},
            masterDetail: {
              enabled: true,
              autoExpandAll: true
            },
            tabIndex: 111
          };
          this.setupModule();
          this.gridView.render($('#container'));
          this.clock.tick(10);
          this.option('focusedRowIndex', 1);
          this.getView('rowsView').renderFocusState();
          var masterDetailCell = $(this.gridView.getView('rowsView').element().find('.dx-master-detail-cell').eq(0));
          assert.notOk(masterDetailCell.attr('tabindex'), 'master-detail cell has no tabindex');
        });
        QUnit.testInActiveWindow('Cell should not lost focus after several clicks on the same cell', function(assert) {
          this.$element = function() {
            return $('#container');
          };
          this.options = {
            keyboardNavigation: {enabled: true},
            paging: {
              pageSize: 2,
              enabled: true
            }
          };
          this.setupModule();
          this.gridView.render($('#container'));
          this.clock.tick(10);
          var $cell = $(this.getCellElement(0, 1));
          $cell.trigger(CLICK_EVENT);
          $cell.trigger(CLICK_EVENT);
          assert.equal($(this.getCellElement(0, 1)).attr('tabIndex'), 0, 'cell has tab index');
          assert.ok($(this.getCellElement(0, 1)).is(':focus'), 'cell is focused');
        });
        QUnit.testInActiveWindow('Focus must be after cell click if edit mode == \'cell\'', function(assert) {
          this.$element = function() {
            return $('#container');
          };
          this.options = {
            keyboardNavigation: {enabled: true},
            editing: {
              mode: 'cell',
              allowUpdating: true
            }
          };
          this.setupModule();
          this.gridView.render($('#container'));
          var keyboardNavigationController = this.gridView.component.keyboardNavigationController;
          var $cell = $(this.rowsView.element().find('.dx-row').eq(1).find('td').eq(1));
          $cell.trigger(CLICK_EVENT);
          this.clock.tick(10);
          assert.ok(!keyboardNavigationController._isHiddenFocus, 'not hidden focus');
          assert.notOk($cell.hasClass('dx-cell-focus-disabled'), 'cell has no .dx-cell-focus-disabled');
          assert.notOk($cell.hasClass('dx-focused'), 'cell has .dx-focused');
        });
        QUnit.testInActiveWindow('DataGrid should not moved back to the edited cell if the next clicked cell canceled editing process (T718459, T812546)', function(assert) {
          var editingStartFiresCount = 0;
          var focusedCellChangingFiresCount = 0;
          var focusedCellChangedFiresCount = 0;
          var $cell;
          this.$element = function() {
            return $('#container');
          };
          this.options = {
            useKeyboard: true,
            editing: {
              mode: 'cell',
              allowUpdating: true
            },
            onEditingStart: function(e) {
              ++editingStartFiresCount;
              e.cancel = e.data.name === 'Alex';
            },
            onFocusedCellChanging: function(e) {
              ++focusedCellChangingFiresCount;
            },
            onFocusedCellChanged: function(e) {
              ++focusedCellChangedFiresCount;
            }
          };
          this.setupModule();
          this.gridView.render($('#container'));
          var keyboardNavigationController = this.gridView.component.keyboardNavigationController;
          $cell = $(this.getCellElement(1, 1));
          $cell.trigger(CLICK_EVENT);
          this.editCell(1, 1);
          this.clock.tick(10);
          assert.equal(focusedCellChangingFiresCount, 1, 'onFocusedCellChanging fires count');
          assert.equal(focusedCellChangedFiresCount, 1, 'onFocusedCellChanged fires count');
          assert.equal(editingStartFiresCount, 1, 'onEditingStart fires count');
          assert.notOk(keyboardNavigationController._isHiddenFocus, 'hidden focus');
          $cell = $(this.getCellElement(0, 1));
          $cell.trigger(CLICK_EVENT);
          this.editCell(0, 1);
          this.clock.tick(10);
          assert.equal(focusedCellChangingFiresCount, 2, 'onFocusedCellChanging fires count');
          assert.equal(focusedCellChangedFiresCount, 2, 'onFocusedCellChanged fires count');
          assert.equal(editingStartFiresCount, 2, 'onEditingStart fires count');
          assert.notOk(keyboardNavigationController._editingController.isEditing(), 'Is editing');
          assert.equal(this.rowsView.element().find('input').length, 0, 'input');
          assert.ok(keyboardNavigationController._isHiddenFocus, 'hidden focus');
          assert.notOk($cell.hasClass('dx-focused'), 'cell has no .dx-focused');
        });
        QUnit.testInActiveWindow('DataGrid should preserve fosused overlay after cancel editing (T812546)', function(assert) {
          var editingStartFiresCount = 0;
          this.$element = function() {
            return $('#container');
          };
          this.options = {
            editing: {
              mode: 'cell',
              allowUpdating: true
            },
            onEditingStart: function(e) {
              ++editingStartFiresCount;
              e.cancel = e.data.name === 'Alex';
              assert.notOk(keyboardNavigation._isHiddenFocus, 'Focus is not hidden');
            }
          };
          this.setupModule();
          var keyboardNavigation = this.getController('keyboardNavigation');
          this.gridView.render($('#container'));
          $(this.getCellElement(1, 1)).trigger(CLICK_EVENT);
          this.clock.tick(10);
          this.triggerKeyDown('upArrow', false, false, $(':focus'));
          this.clock.tick(10);
          assert.ok($(this.getCellElement(0, 1)).hasClass('dx-focused'), 'Cell has focus overlay');
          this.editCell(0, 1);
          this.clock.tick(10);
          assert.equal(editingStartFiresCount, 1, 'onEditingStart fires count');
        });
        QUnit.testInActiveWindow('DataGrid should cancel editing cell if cell focusing canceled (T718459)', function(assert) {
          var editingStartCount = 0;
          var focusedCellChangingFiresCount = 0;
          var focusedCellChangedFiresCount = 0;
          var $cell;
          this.$element = function() {
            return $('#container');
          };
          this.options = {
            keyboardNavigation: {enabled: true},
            editing: {
              mode: 'cell',
              allowUpdating: true
            },
            onEditingStart: function(e) {
              ++editingStartCount;
            },
            onFocusedCellChanging: function(e) {
              e.cancel = e.rows[e.newRowIndex].data.name === 'Alex';
              ++focusedCellChangingFiresCount;
            },
            onFocusedCellChanged: function(e) {
              ++focusedCellChangedFiresCount;
            }
          };
          this.setupModule();
          this.gridView.render($('#container'));
          var keyboardNavigationController = this.gridView.component.keyboardNavigationController;
          $cell = $(this.rowsView.element().find('.dx-row').eq(1).find('td').eq(1));
          $cell.trigger(CLICK_EVENT);
          this.editCell(1, 1);
          this.clock.tick(10);
          assert.equal(editingStartCount, 1, 'onStartEditing fires count');
          assert.equal(focusedCellChangingFiresCount, 1, 'onFocusedCellChanging fires count');
          assert.equal(focusedCellChangedFiresCount, 1, 'onFocusedCellChanged fires count');
          $cell = $(this.rowsView.element().find('.dx-row').eq(0).find('td').eq(1));
          $cell.trigger(CLICK_EVENT);
          assert.deepEqual(keyboardNavigationController._canceledCellPosition, {
            rowIndex: 0,
            columnIndex: 1
          }, 'Check _canceledCellPosition');
          this.editCell(0, 1);
          this.clock.tick(10);
          assert.notOk(keyboardNavigationController._canceledCellPosition, 'Check _canceledCellPosition');
          assert.equal(editingStartCount, 1, 'onStartEditing fires count');
          assert.equal(focusedCellChangingFiresCount, 2, 'onFocusedCellChanging fires count');
          assert.equal(focusedCellChangedFiresCount, 1, 'onFocusedCellChanged fires count');
          assert.notOk(keyboardNavigationController._isHiddenFocus, 'hidden focus');
          assert.notOk(keyboardNavigationController._editingController.isEditing(), 'Is editing');
          assert.equal(this.rowsView.element().find('input').length, 0, 'input');
          assert.notOk($cell.hasClass('dx-focused'), 'cell has .dx-focused');
        });
        QUnit.testInActiveWindow('onFocusedRowChanged should fire after refresh() if empty dataSource, focusedRow=0 and row added (T743864)', function(assert) {
          var focusedRowChangedFiresCount = 0;
          this.options = {
            keyboardNavigation: {enabled: true},
            dataSource: [],
            keyExpr: 'name',
            editing: {
              mode: 'row',
              allowAdding: true
            },
            focusedRowEnabled: true,
            focusedRowIndex: 0,
            onFocusedRowChanged: function() {
              return ++focusedRowChangedFiresCount;
            }
          };
          this.setupModule();
          this.gridView.render($('#container'));
          this.clock.tick(10);
          this.addRow();
          this.cellValue(0, 0, 'Test0');
          this.cellValue(0, 1, 'Test1');
          this.cellValue(0, 2, '5');
          this.saveEditData();
          assert.equal(focusedRowChangedFiresCount, 1, 'onFocusedRowChanged fires count');
          this.refresh();
          assert.equal(focusedRowChangedFiresCount, 1, 'onFocusedRowChanged fires count');
        });
        QUnit.testInActiveWindow('onFocusedRowChanging should fire after click boolean column', function(assert) {
          var focusedRowChangingFiresCount = 0;
          this.options = {
            dataSource: [{
              id: 1,
              field: false
            }],
            keyExpr: 'id',
            focusedRowEnabled: true,
            columns: ['field'],
            onFocusedRowChanging: function() {
              return ++focusedRowChangingFiresCount;
            }
          };
          this.setupModule();
          this.gridView.render($('#container'));
          this.clock.tick(10);
          $(this.getCellElement(0, 0)).trigger(CLICK_EVENT);
          assert.equal(focusedRowChangingFiresCount, 1, 'onFocusedRowChanging fires count');
        });
        QUnit.testInActiveWindow('Focus should not be restored on dataSource change after click in another grid (T684122)', function(assert) {
          this.options = {keyboardNavigation: {enabled: true}};
          this.setupModule();
          this.gridView.render($('#container'));
          var $anotherGrid = $('<div>').addClass('dx-datagrid').insertAfter($('#container'));
          var $anotherRowsView = $('<div>').addClass('dx-datagrid-rowsview').appendTo($anotherGrid);
          $(this.getCellElement(0, 0)).trigger(CLICK_EVENT);
          this.clock.tick(10);
          assert.ok($(getActiveElement()).closest('#container').length, 'focus in grid');
          $anotherRowsView.trigger(pointerEvents.down);
          this.rowsView.render();
          this.clock.tick(10);
          assert.notOk($(getActiveElement()).closest('#container').length, 'focus is not in grid');
        });
        QUnit.testInActiveWindow('Focus must be after enter key pressed if \'cell\' edit mode (T653709)', function(assert) {
          this.$element = function() {
            return $('#container');
          };
          this.options = {
            keyboardNavigation: {enabled: true},
            editing: {mode: 'cell'}
          };
          this.setupModule();
          this.gridView.render($('#container'));
          var rowsView = this.gridView.getView('rowsView');
          this.editCell(0, 1);
          this.clock.tick(10);
          this.triggerKeyDown('enter', false, false, $(this.rowsView.element().find('.dx-data-row:nth-child(1) td:nth-child(2)')));
          this.gridView.component.editorFactoryController._$focusedElement = undefined;
          this.clock.tick(10);
          var $cell = $(this.rowsView.element().find('.dx-data-row:nth-child(1) td:nth-child(2)'));
          assert.ok($cell.hasClass('dx-focused'), 'cell is focused');
          assert.notOk($cell.hasClass('dx-editor-cell'), 'not editor cell');
          assert.equal(rowsView.element().find('.dx-datagrid-focus-overlay').css('visibility'), 'visible', 'contains overlay');
        });
        QUnit.testInActiveWindow('Focus must be after cell click if edit mode == \'batch\'', function(assert) {
          this.$element = function() {
            return $('#container');
          };
          this.options = {
            keyboardNavigation: {enabled: true},
            editing: {
              mode: 'batch',
              allowUpdating: true
            }
          };
          this.setupModule();
          this.gridView.render($('#container'));
          var keyboardNavigationController = this.gridView.component.keyboardNavigationController;
          var $cell = $(this.rowsView.element().find('.dx-row').eq(1).find('td').eq(1));
          $cell.trigger(CLICK_EVENT);
          assert.ok(!keyboardNavigationController._isHiddenFocus, 'not hidden focus');
          assert.notOk($cell.hasClass('dx-cell-focus-disabled'), 'cell has no .dx-cell-focus-disabled');
          assert.notOk($cell.hasClass('dx-focused'), 'cell has .dx-focused');
        });
        QUnit.testInActiveWindow('The first cell should not have focus after click if column allowEditing is false and edit mode is \'cell\' or \'batch\' (T657612)', function(assert) {
          this.$element = function() {
            return $('#container');
          };
          this.options = {
            keyboardNavigation: {enabled: true},
            editing: {
              allowUpdating: true,
              mode: 'cell'
            }
          };
          this.columns = [{
            dataField: 'name',
            allowEditing: false
          }, 'phone', 'room'];
          this.setupModule();
          this.gridView.render($('#container'));
          var keyboardNavigationController = this.gridView.component.keyboardNavigationController;
          var $cell = $(this.rowsView.element().find('.dx-row').eq(0).find('td').eq(0));
          $cell.trigger(CLICK_EVENT);
          assert.ok(keyboardNavigationController._isHiddenFocus, 'hidden focus');
          assert.ok($cell.hasClass('dx-cell-focus-disabled'), 'cell has .dx-cell-focus-disabled');
          assert.notOk($cell.hasClass('dx-focused'), 'cell has no .dx-focused');
        });
        QUnit.testInActiveWindow('Reset focused cell when click on expand column of master detail', function(assert) {
          this.$element = function() {
            return $('#container');
          };
          this.options = {
            keyboardNavigation: {enabled: true},
            masterDetail: {
              enabled: true,
              template: commonUtils.noop
            },
            paging: {
              pageSize: 2,
              enabled: true
            }
          };
          this.setupModule();
          this.gridView.render($('#container'));
          var keyboardNavigationController = this.gridView.component.keyboardNavigationController;
          this.clock.tick(10);
          var rowsView = this.gridView.getView('rowsView');
          var $expandCell = $(rowsView.element().find('td').first());
          $expandCell.trigger(CLICK_EVENT);
          this.clock.tick(10);
          assert.ok(!keyboardNavigationController._isNeedFocus, 'is key down');
          assert.ok(keyboardNavigationController._isHiddenFocus, 'is hidden focus');
          assert.deepEqual(keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 0
          }, 'focusedCellPosition is empty');
          assert.equal($(rowsView.getCellElement(0, 0)).attr('tabIndex'), 0, 'expand cell has tab index');
          assert.ok($(rowsView.getCellElement(0, 0)).hasClass('dx-cell-focus-disabled'), 'expand cell has disable focus class');
          assert.strictEqual(rowsView.element().attr('tabIndex'), undefined, 'rowsView has no tabIndex');
          assert.ok(!$(rowsView.getCellElement(0, 0)).hasClass('dx-focused'), 'expand cell is not focused');
          assert.ok(!this.gridView.component.editorFactoryController.focus(), 'no focus overlay');
        });
        QUnit.testInActiveWindow('Focus should be preserved after paging', function(assert) {
          var that = this;
          that.$element = function() {
            return $('#container');
          };
          that.data = [{
            name: 'Alex',
            phone: '555555',
            room: 0
          }, {
            name: 'Dan1',
            phone: '666666',
            room: 1
          }, {
            name: 'Dan2',
            phone: '777777',
            room: 2
          }, {
            name: 'Dan3',
            phone: '888888',
            room: 3
          }];
          that.options = {paging: {
              pageSize: 2,
              enabled: true
            }};
          that.setupModule();
          that.gridView.render($('#container'));
          var $cell = $(this.getCellElement(1, 1));
          $cell.trigger(CLICK_EVENT);
          assert.ok($cell.hasClass('dx-cell-focus-disabled'), 'cell has focus-disabled class');
          this.triggerKeyDown('pageDown', false, false, $(':focus').get(0));
          this.clock.tick(10);
          $cell = $(this.getCellElement(1, 1));
          assert.equal($cell.text(), '888888');
          assert.strictEqual($cell.attr('tabIndex'), '0');
          assert.ok($cell.is(':focus'), 'cell is focused');
          assert.ok($cell.hasClass('dx-cell-focus-disabled'), 'cell has focus-disabled class');
          assert.ok(this.keyboardNavigationController._focusedCellPosition, 'focusedCellPosition');
          assert.equal(this.keyboardNavigationController._focusedCellPosition.columnIndex, 1, 'cellIndex');
          assert.equal(this.keyboardNavigationController._focusedCellPosition.rowIndex, 1, 'rowIndex');
        });
        QUnit.testInActiveWindow('freespace cells should not have focus', function(assert) {
          var that = this;
          that.$element = function() {
            return $('#container');
          };
          that.data = [{
            name: 'Alex',
            phone: '555555',
            room: 0
          }, {
            name: 'Dan1',
            phone: '666666',
            room: 1
          }, {
            name: 'Dan2',
            phone: '777777',
            room: 2
          }, {
            name: 'Dan3',
            phone: '888888',
            room: 3
          }];
          that.options = {height: 300};
          that.setupModule();
          that.gridView.render($('#container'));
          var $cell = $(that.rowsView.element().find('.dx-freespace-row').eq(0).find('td').eq(1));
          $cell.trigger(CLICK_EVENT);
          this.clock.tick(10);
          $cell = $(that.rowsView.element().find('.dx-freespace-row').eq(0).find('td').eq(1));
          assert.equal($cell.attr('tabIndex'), undefined, 'freespace cell has no tabindex');
          assert.notOk($cell.is(':focus'), 'focus', 'freespace cell has no focus');
          assert.notOk($cell.hasClass('dx-cell-focus-disabled'), 'freespace cell has no .dx-cell-focus-disabled');
          assert.ok(this.keyboardNavigationController._focusedCellPosition, 'focusedCellPosition');
          assert.ok(that.rowsView.element().is(':focus'), 'rowsView has focus to work pageUp/pageDown');
        });
        QUnit.testInActiveWindow('Click by freespace cells should not generate exception if editing started and editing mode is cell', function(assert) {
          var that = this;
          that.$element = function() {
            return $('#container');
          };
          that.data = [{
            name: 'Alex',
            phone: '555555',
            room: 0
          }, {
            name: 'Dan1',
            phone: '666666',
            room: 1
          }, {
            name: 'Dan2',
            phone: '777777',
            room: 2
          }, {
            name: 'Dan3',
            phone: '888888',
            room: 3
          }];
          that.options = {
            height: 300,
            editing: {
              allowUpdating: true,
              mode: 'cell'
            }
          };
          that.setupModule();
          that.gridView.render($('#container'));
          this.editCell(1, 1);
          this.clock.tick(10);
          var $cell = $(that.rowsView.element().find('.dx-freespace-row').eq(0).find('td').eq(1));
          try {
            $cell.trigger(CLICK_EVENT);
            this.clock.tick(10);
            assert.ok(true, 'No exception');
          } catch (e) {
            assert.ok(false, e);
          }
        });
        QUnit.testInActiveWindow('virtual row cells should not have focus', function(assert) {
          var that = this;
          var $cell;
          that.$element = function() {
            return $('#container');
          };
          that.options = {
            height: 200,
            loadPanel: {enabled: false},
            scrolling: {mode: 'virtual'}
          };
          that.dataSource = {load: function(loadOptions) {
              var d = $.Deferred();
              if (loadOptions.skip === 0) {
                d.resolve([{
                  name: 'Alex',
                  phone: '555555',
                  room: 0
                }], {totalCount: 100});
              } else {
                d.resolve();
              }
              return d.promise();
            }};
          that.setupModule();
          that.gridView.render($('#container'));
          $cell = $(that.rowsView.element().find('.dx-virtual-row').eq(0).find('td').eq(1)).trigger(CLICK_EVENT);
          $cell.trigger(CLICK_EVENT);
          this.clock.tick(10);
          $cell = $(that.rowsView.element().find('.dx-virtual-row').eq(0).find('td').eq(1));
          assert.equal($cell.attr('tabIndex'), undefined, 'virtual row cell has no tabindex');
          assert.notOk($cell.is(':focus'), 'focus', 'virtual row cell has no focus');
          assert.notOk($cell.hasClass('dx-cell-focus-disabled'), 'virtual row cell has no .dx-cell-focus-disabled class');
          assert.ok(this.keyboardNavigationController._focusedCellPosition, 'focusedCellPosition');
        });
        QUnit.testInActiveWindow('Focus should be preserved after paging if the last row cell selected and rowCount of the last page < then of the previus page', function(assert) {
          var $cell;
          this.$element = function() {
            return $('#container');
          };
          this.data = [{
            name: 'Alex',
            phone: '555555',
            room: 0
          }, {
            name: 'Dan1',
            phone: '666666',
            room: 1
          }, {
            name: 'Dan2',
            phone: '777777',
            room: 2
          }];
          this.options = {paging: {
              pageSize: 2,
              enabled: true
            }};
          this.setupModule();
          this.gridView.render($('#container'));
          $cell = $(this.getCellElement(1, 1));
          $cell.trigger(CLICK_EVENT, false, false, $(':focus').get(0));
          this.triggerKeyDown('pageDown');
          this.clock.tick(10);
          $cell = $(this.getCellElement(0, 1));
          assert.equal($cell.text(), '777777');
          assert.strictEqual($cell.attr('tabIndex'), '0');
          assert.ok($cell.is(':focus'), 'focus');
          assert.ok($cell.hasClass('dx-cell-focus-disabled'));
          assert.ok(this.keyboardNavigationController._focusedCellPosition, 'focusedCellPosition');
          assert.equal(this.keyboardNavigationController._focusedCellPosition.columnIndex, 1, 'cellIndex');
          assert.equal(this.keyboardNavigationController._focusedCellPosition.rowIndex, 0, 'rowIndex');
        });
        QUnit.testInActiveWindow('First input is focused when row is edited from a cell template', function(assert) {
          var that = this;
          that.$element = function() {
            return $('#container');
          };
          that.options = {editing: {
              allowUpdating: true,
              mode: 'form',
              texts: {editRow: 'Edit'}
            }};
          that.columns = ['name', 'phone', {
            dataField: 'room',
            cellTemplate: function($element, options) {
              $('<div/>').appendTo($element).attr('id', 'editButton').text('edit').click(function() {
                that.editingController.editRow(options.row.rowIndex);
              });
            }
          }];
          this.setupModule();
          that.gridView.render($('#container'));
          $('#editButton').eq(0).trigger('dxpointerdown.dxDataGridKeyboardNavigation').click();
          this.clock.tick(10);
          assert.equal($(getActiveElement()).val(), 'Alex', 'value of first editor');
        });
        QUnit.test('Editor\'s input should be focused after mouse click (T650581)', function(assert) {
          var that = this;
          that.$element = function() {
            return $('#container');
          };
          that.options = {rowTemplate: function(container, item) {
              var data = item.data;
              var tbodyElement = $('<tbody>').addClass('dx-row template');
              var trElement = $('<tr>').addClass('dx-data-row');
              tbodyElement.append(trElement);
              var cellElement = $('<td>');
              trElement.append($(cellElement));
              $(cellElement).dxTextBox({value: data.name});
              $(container).append(tbodyElement);
            }};
          this.setupModule();
          that.gridView.render($('#container'));
          var $testElement = that.$element().find('.template td').eq(0);
          $testElement.find('input').focus();
          $testElement.trigger(CLICK_EVENT);
          this.clock.tick(10);
          assert.notOk($testElement.hasClass('dx-cell-focus-disabled'), 'no keyboard interaction with cell template element');
          assert.ok($testElement.find('input').is(':focus'), 'input has focus');
        });
        QUnit.test('After apply the edit value with the ENTER key do not display the revert button when the save process, if editing mode is cell (T657148)', function(assert) {
          var that = this;
          that.$element = function() {
            return $('#container');
          };
          that.options = {
            editing: {
              allowUpdating: true,
              mode: 'cell'
            },
            showColumnHeaders: false,
            dataSource: {
              load: function() {
                return [{name: 'name'}];
              },
              update: function() {
                var d = $.Deferred();
                return d.promise();
              }
            }
          };
          that.columns = ['name'];
          that.setupModule();
          that.gridView.render($('#container'));
          that.clock.tick(10);
          that.editCell(0, 0);
          that.clock.tick(10);
          var $input = $(that.getCellElement(0, 0)).find('input');
          $input.val('test').trigger('change');
          that.clock.tick(10);
          $input.trigger($.Event('keydown', {key: 'Enter'}));
          that.clock.tick(10);
          assert.equal($('.dx-revert-button').length, 0, 'has no revert button');
        });
        QUnit.test('After apply the edit value and focus the editor do not display the revert button when the save process, if editing mode is cell (T657148)', function(assert) {
          var that = this;
          that.$element = function() {
            return $('#container');
          };
          that.options = {
            editing: {
              allowUpdating: true,
              mode: 'cell'
            },
            dataSource: {
              load: function() {
                return that.data;
              },
              update: function() {
                var d = $.Deferred();
                setTimeout(function() {
                  d.resolve();
                }, 30);
                return d.promise();
              }
            }
          };
          that.columns = ['name', 'phone', 'room'];
          that.setupModule();
          that.gridView.render($('#container'));
          that.cellValue(0, 1, '');
          that.saveEditData();
          that.getController('keyboardNavigation').focus(that.getCellElement(0, 1));
          that.clock.tick(10);
          assert.equal($('.dx-revert-button').length, 0, 'has no revert button');
        });
        QUnit.test('The calculated column should be updated when Tab is pressed after editing', function(assert) {
          var that = this;
          var $inputElement;
          var countCallCalculateCellValue = 0;
          var $testElement = $('#container');
          that.$element = function() {
            return $testElement;
          };
          that.data = [{
            name: 'Alex',
            lastName: 'John'
          }, {
            name: 'Dan',
            lastName: 'Skip'
          }], that.options = {
            editing: {
              allowUpdating: true,
              mode: 'batch'
            },
            columns: [{
              dataField: 'name',
              showEditorAlways: true
            }, {
              dataField: 'lasName',
              allowEditing: false
            }, {
              caption: 'FullName',
              allowEditing: false,
              calculateCellValue: function(e) {
                countCallCalculateCellValue++;
                return e.name + ' ' + e.lastName;
              }
            }]
          };
          that.setupModule();
          that.gridView.render($testElement);
          assert.strictEqual($testElement.find('.dx-texteditor-input').length, 2, 'input count');
          that.editCell(0, 0);
          that.clock.tick(10);
          $inputElement = $testElement.find('.dx-texteditor-input').first();
          $inputElement.val('Bob');
          countCallCalculateCellValue = 0;
          $inputElement.change();
          that.clock.tick(10);
          $inputElement = $testElement.find('.dx-texteditor-input').first();
          $testElement.find('.dx-datagrid-rowsview').trigger($.Event('keydown', {
            key: 'Tab',
            target: $inputElement
          }));
          that.clock.tick(10);
          assert.ok(countCallCalculateCellValue, 'calculateCellValue is called');
          assert.strictEqual($testElement.find('.dx-datagrid-rowsview td').eq(2).text(), 'Bob John', 'text of the third column of the first row');
          assert.ok(that.editingController.isEditCell(1, 0), 'the first cell of the second row is editable');
        });
        QUnit.test('Previous navigation elements should not have "tabindex" if grouping and navigation action is click (T870120)', function(assert) {
          var $container = $('#container');
          this.data = [{
            name: 'Alex',
            phone: 'John'
          }, {
            name: 'Dan',
            phone: 'Skip'
          }];
          this.options = {
            grouping: {autoExpandAll: true},
            columns: ['name', {
              dataField: 'phone',
              groupIndex: 0
            }],
            tabIndex: 111
          };
          this.setupModule();
          this.gridView.render($container);
          this.clock.tick(10);
          var $rowsView = this.rowsView.element();
          $(this.getCellElement(0, 1)).trigger(CLICK_EVENT);
          $(this.getCellElement(1, 1)).trigger(CLICK_EVENT);
          assert.equal($rowsView.find('[tabindex]').length, 1, 'Only one element with tabindex');
          assert.equal($(this.getCellElement(1, 1)).attr('tabindex'), 111, 'Cell[1, 1] has tabindex');
          $(this.getCellElement(2, 1)).trigger(CLICK_EVENT);
          $(this.getCellElement(3, 1)).trigger(CLICK_EVENT);
          assert.equal($rowsView.find('[tabindex]').length, 1, 'Only one element with tabindex');
          assert.equal($(this.getCellElement(3, 1)).attr('tabindex'), 111, 'Cell[3, 1] has tabindex');
        });
        QUnit.test('Previous navigation elements should not have "tabindex" if grouping and navigation action is tab (T870120)', function(assert) {
          var $container = $('#container');
          this.data = [{
            name: 'Alex',
            phone: 'John'
          }, {
            name: 'Dan',
            phone: 'Skip'
          }];
          this.options = {
            grouping: {autoExpandAll: false},
            editing: {},
            columns: ['name', {
              dataField: 'phone',
              groupIndex: 0
            }],
            tabIndex: 111
          };
          this.setupModule();
          this.gridView.render($container);
          this.clock.tick(10);
          var $rowsView = this.rowsView.element();
          $(this.getCellElement(0, 1)).trigger(CLICK_EVENT);
          this.triggerKeyDown('tab', false, false, $(this.getRowElement(0)));
          assert.equal($rowsView.find('[tabindex]').length, 1, 'Only one element with tabindex');
          assert.equal($(this.getRowElement(1)).attr('tabindex'), 111, 'Row 1 has tabindex');
        });
        QUnit.test('Previous navigation elements should not have "tabindex" if grouping, focusedRowEnabled and navigation action is click (T870120)', function(assert) {
          var $container = $('#container');
          this.data = [{
            name: 'Alex',
            phone: 'John'
          }, {
            name: 'Dan',
            phone: 'Skip'
          }];
          this.options = {
            focusedRowEnabled: true,
            grouping: {autoExpandAll: true},
            columns: ['name', {
              dataField: 'phone',
              groupIndex: 0
            }],
            tabIndex: 111
          };
          this.setupModule();
          this.gridView.render($container);
          this.clock.tick(10);
          var $rowsView = this.rowsView.element();
          $(this.getCellElement(0, 1)).trigger(CLICK_EVENT);
          assert.equal($rowsView.find('[tabindex]').length, 1, 'Only one element with tabindex');
          assert.equal($(this.getRowElement(0)).attr('tabindex'), 111, 'Row[0] has tabindex');
          $(this.getCellElement(1, 1)).trigger(CLICK_EVENT);
          assert.equal($rowsView.find('[tabindex]').length, 1, 'Only one element with tabindex');
          assert.equal($(this.getRowElement(1)).attr('tabindex'), 111, 'Row[1] has tabindex');
          $(this.getCellElement(2, 1)).trigger(CLICK_EVENT);
          $(this.getCellElement(3, 1)).trigger(CLICK_EVENT);
          assert.equal($rowsView.find('[tabindex]').length, 1, 'Only one element with tabindex');
          assert.equal($(this.getRowElement(3)).attr('tabindex'), 111, 'Row[3] has tabindex');
        });
        ['click', 'dblClick'].forEach(function(startEditAction) {
          ['cell', 'batch'].forEach(function(editMode) {
            QUnit.test(("Focus overlay should not be hidden after click the save editor cell if editing.mode: " + editMode + ", editing.startEditAction is " + startEditAction), function(assert) {
              var $testElement = $('#container');
              this.data = [{
                name: 'Alex',
                lastName: 'John'
              }], this.options = {editing: {
                  allowUpdating: true,
                  mode: editMode,
                  startEditAction: startEditAction
                }};
              this.setupModule();
              this.gridView.render($testElement);
              var editingController = this.getController('editing');
              var startEditClickEventName = startEditAction === 'click' ? 'dxclick' : 'dxdblclick';
              $(this.getCellElement(0, 1)).trigger(startEditClickEventName);
              this.clock.tick(10);
              assert.ok(editingController.isEditCell(0, 1), 'Cell[0, 1] is in edit mode');
              $(this.getCellElement(0, 1)).trigger(CLICK_EVENT);
              assert.ok(editingController.isEditCell(0, 1), 'Cell[0, 1] is in edit mode');
              assert.notOk($(this.getCellElement(0, 1)).hasClass('dx-cell-focus-disabled'), 'Cell[0, 1] focus overlay is not disabled');
            });
            QUnit.test(("Click by command select cell should not highlight focus if editing.mode: " + editMode + ", editing.startEditAction is " + startEditAction), function(assert) {
              var rowsViewWrapper = dataGridWrapper.rowsView;
              var $testElement = $('#container');
              this.data = [{
                name: 'Alex',
                lastName: 'John'
              }], this.options = {
                loadingTimeout: null,
                selection: {
                  mode: 'multiple',
                  showCheckBoxesMode: 'always'
                },
                editing: {
                  allowUpdating: true,
                  mode: editMode,
                  startEditAction: startEditAction
                }
              };
              this.setupModule();
              this.gridView.render($testElement);
              var dataRow0 = rowsViewWrapper.getDataRow(0);
              var $selectCell = dataRow0.getCell(0).getElement();
              $selectCell.focus().removeClass('dx-cell-focus-disabled');
              this.getController('editorFactory')._updateFocusCore();
              this.clock.tick(10);
              $selectCell.trigger(pointerEvents.down).trigger(pointerEvents.up).trigger('dxclick');
              this.clock.tick(10);
              assert.notOk($selectCell.hasClass('dx-focused'), 'Cell has no .dx-focused');
              assert.ok($selectCell.hasClass('dx-cell-focus-disabled'), 'Cell has disable focus class');
              var $selectCheckBox = dataRow0.getSelectCheckBox(0).getElement();
              $selectCheckBox.focus().removeClass('dx-cell-focus-disabled');
              this.getController('editorFactory')._updateFocusCore();
              this.clock.tick(10);
              $selectCheckBox.trigger(pointerEvents.down).trigger(pointerEvents.up).trigger('dxclick');
              this.clock.tick(10);
              assert.notOk($selectCell.hasClass('dx-focused'), 'Cell has no .dx-focused');
              assert.ok($selectCell.hasClass('dx-cell-focus-disabled'), 'Cell has disable focus class');
            });
          });
        });
        QUnit.testInActiveWindow('The expand cell should restore focus on expanding a master row when the Enter key is pressed (T892203)', function(assert) {
          var $container = $('#container');
          this.data = [{id: 1}];
          this.columns = ['id'];
          this.options = {
            keyExpr: 'id',
            masterDetail: {
              enabled: true,
              template: commonUtils.noop
            }
          };
          this.setupModule();
          this.gridView.render($container);
          this.clock.tick(10);
          var $commandCell = $(this.getCellElement(0, 0));
          $commandCell.focus();
          this.clock.tick(10);
          assert.ok($commandCell.is(':focus'), 'command cell is focused');
          assert.equal($commandCell.find('.dx-datagrid-group-closed').length, 1, 'cell is rendered as collapsed');
          this.triggerKeyDown('enter', false, false, $commandCell);
          this.clock.tick(10);
          $commandCell = $(this.getCellElement(0, 0));
          assert.ok($commandCell.is(':focus'), 'command cell is still focused after expanding');
          assert.equal($commandCell.find('.dx-datagrid-group-opened').length, 1, 'cell is rendered as expanded');
        });
        QUnit.testInActiveWindow('Do not prevent default behavior on \'tab\' key press after expand and collapse last master detail row', function(assert) {
          this.options = {
            dataSource: {
              asyncLoadEnabled: false,
              store: {
                type: 'array',
                data: [{
                  name: 'Alex',
                  phone: '555555'
                }, {
                  name: 'Dan',
                  phone: '553355'
                }],
                key: 'name'
              },
              paginate: true
            },
            masterDetail: {
              enabled: true,
              template: commonUtils.noop
            },
            paging: {
              pageSize: 2,
              enabled: true
            }
          };
          this.setupModule();
          this.gridView.render($('#container'));
          this.clock.tick(10);
          assert.strictEqual(this.getVisibleRows().length, 2, 'count data row');
          this.expandRow('Dan');
          this.clock.tick(10);
          this.collapseRow('Dan');
          this.clock.tick(10);
          var rows = this.getVisibleRows();
          assert.strictEqual(this.getVisibleRows().length, 3, 'count data row + master detail');
          assert.strictEqual(rows[2].rowType, 'detail', 'last row is the master detail');
          assert.strictEqual(rows[2].visible, false, 'master detail is hidden');
          var result = this.triggerKeyDown('tab', false, false, $(this.getCellElement(1, 1)));
          this.clock.tick(10);
          assert.notOk(result.preventDefault, 'prevent default is not called');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["generic_light.css!","jquery","ui/data_grid","core/utils/common","events/pointer","../../helpers/dataGridMocks.js","../../helpers/shadowDom.js","../../helpers/grid/keyboardNavigationHelper.js","core/devices"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("generic_light.css!"), require("jquery"), require("ui/data_grid"), require("core/utils/common"), require("events/pointer"), require("../../helpers/dataGridMocks.js"), require("../../helpers/shadowDom.js"), require("../../helpers/grid/keyboardNavigationHelper.js"), require("core/devices"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=keyboardNavigation.realControllers.tests.js.map