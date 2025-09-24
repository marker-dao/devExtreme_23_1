/**
* DevExtreme (cjs/__internal/grids/new/grid_core/editing/controller.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditingController = void 0;
var _data = require("../../../../../common/data");
var _type = require("../../../../../core/utils/type");
var _index = require("../../../../core/state_manager/index");
var _m_editing_utils = require("../../../../grids/grid_core/editing/m_editing_utils");
var _index2 = require("../../../../grids/new/grid_core/options_validation/index");
var _columns_controller = require("../columns_controller/columns_controller");
var _data_controller = require("../data_controller/data_controller");
var _items_controller = require("../items_controller/items_controller");
var _index3 = require("../keyboard_navigation/index");
var _options_controller = require("../options_controller/options_controller");
var _confirm_controller = require("./confirm_controller");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* eslint-disable @typescript-eslint/no-non-null-assertion */ /* eslint-disable spellcheck/spell-checker */
class EditingController {
  constructor(options, itemsController, columnController, dataController, kbn, optionsValidationController, confirmController) {
    this.options = options;
    this.itemsController = itemsController;
    this.columnController = columnController;
    this.dataController = dataController;
    this.kbn = kbn;
    this.optionsValidationController = optionsValidationController;
    this.confirmController = confirmController;
    // todo: fix typing, remove explicit type here
    this.changes = this.options.twoWay('editing.changes');
    this.editCardKey = this.options.twoWay('editing.editCardKey');
    this.allowDeleting = this.options.twoWay('editing.allowDeleting');
    this.allowUpdating = this.options.twoWay('editing.allowUpdating');
    this.allowAdding = this.options.twoWay('editing.allowAdding');
    this.needConfirmDelete = this.options.oneWay('editing.confirmDelete');
    this.texts = this.options.oneWay('editing.texts');
    this.onEditCanceling = this.options.action('onEditCanceling');
    this.onEditCanceled = this.options.action('onEditCanceled');
    this.onEditingStart = this.options.action('onEditingStart');
    this.onInitNewCard = this.options.action('onInitNewCard');
    this.onCardInserted = this.options.action('onCardInserted');
    this.onCardInserting = this.options.action('onCardInserting');
    this.onCardUpdated = this.options.action('onCardUpdated');
    this.onCardUpdating = this.options.action('onCardUpdating');
    this.onCardRemoved = this.options.action('onCardRemoved');
    this.onCardRemoving = this.options.action('onCardRemoving');
    this.onSaving = this.options.action('onSaving');
    this.onSaved = this.options.action('onSaved');
    this.editingCard = (0, _index.computed)(() => {
      const editCardKey = this.editCardKey.value;
      const items = this.itemsController.items.value;
      const changes = this.changes.value;
      if (!(0, _type.isDefined)(editCardKey)) {
        return null;
      }
      const oldItem = this.itemsController.findItemByKey(items, editCardKey);
      if (!oldItem) {
        return null;
      }
      const insertChange = changes.find(change => change.key === editCardKey && change.type === 'insert');
      const oldData = (insertChange === null || insertChange === void 0 ? void 0 : insertChange.data) ?? oldItem.data;
      const newData = insertChange ? _extends({}, oldData, changes) : (0, _data.applyChanges)([oldData], changes, {
        keyExpr: this.dataController.dataSource.peek().key(),
        immutable: true
      })[0];
      const newItem = this.itemsController.createCardInfo(newData, this.columnController.columns.peek(), oldItem.index, undefined, oldItem.key);
      return newItem;
    });
  }
  provideValidateMethod(validateMethod) {
    this.validateMethod = validateMethod;
  }
  editCard(key) {
    this.optionsValidationController.validateKeyExpr();
    const eventArgs = {
      cancel: false,
      key,
      data: this.itemsController.getCardByKey(key).data
    };
    this.onEditingStart.peek()(eventArgs);
    if (!eventArgs.cancel) {
      this.editCardKey.value = key;
    }
  }
  async validate() {
    var _this$validateMethod;
    return ((_this$validateMethod = this.validateMethod) === null || _this$validateMethod === void 0 ? void 0 : _this$validateMethod.call(this)) ?? true;
  }
  async addCard() {
    this.optionsValidationController.validateKeyExpr();
    const eventArgs = {
      promise: undefined,
      data: {}
    };
    this.onInitNewCard.peek()(eventArgs);
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await eventArgs.promise;
    const newItemKey = this.dataController.getDataKey(eventArgs.data) ?? (0, _m_editing_utils.generateNewRowTempKey)();
    this.itemsController.additionalItems.value = [...this.itemsController.additionalItems.peek(), this.itemsController.createCardInfo(eventArgs.data, this.columnController.columns.peek(), -1, [], newItemKey, false)];
    this.changes.value = [...this.changes.peek(), {
      type: 'insert',
      key: newItemKey,
      data: eventArgs.data
    }];
    this.editCardKey.value = newItemKey;
  }
  async confirmDelete() {
    if (!this.needConfirmDelete.peek()) {
      return Promise.resolve(true);
    }
    const {
      confirmDeleteMessage,
      confirmDeleteTitle
    } = this.texts.peek();
    const showDialogTitle = (0, _type.isDefined)(confirmDeleteTitle) && confirmDeleteTitle.length > 0;
    const result = await this.confirmController.confirm(confirmDeleteMessage ?? '',
    // TODO: bad typing
    confirmDeleteTitle ?? '',
    // TODO: bad typing
    showDialogTitle);
    return result;
  }
  async deleteCard(key) {
    this.optionsValidationController.validateKeyExpr();
    const confirmStatus = await this.confirmDelete();
    if (!confirmStatus) {
      this.kbn.returnFocus();
      return;
    }
    // @ts-expect-error
    this.changes.value = [...this.changes.peek(), {
      type: 'remove',
      key
    }];
    await this.save();
    this.kbn.returnFocus();
  }
  clear() {
    this.changes.value = [];
    this.editCardKey.value = null;
    this.itemsController.additionalItems.value = [];
  }
  async flushChanges() {
    await this.processChanges(this.changes.peek());
    this.clear();
  }
  cancel() {
    const changes = this.changes.peek();
    const eventArgs = {
      changes,
      cancel: false
    };
    this.onEditCanceling.peek()(eventArgs);
    if (eventArgs.cancel) {
      return false;
    }
    this.clear();
    this.onEditCanceled.peek()({
      changes
    });
    return true;
  }
  async save() {
    const validationSuccessful = await this.validate();
    if (!validationSuccessful) {
      return;
    }
    const changes = this.changes.peek();
    const eventArgs = {
      promise: undefined,
      cancel: false,
      changes
    };
    this.onSaving.peek()(eventArgs);
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await eventArgs.promise;
    if (eventArgs.cancel) {
      return;
    }
    await this.flushChanges();
    this.onSaved.peek()({
      changes
    });
  }
  async processChanges(changes) {
    const promises = [];
    for (const change of changes) {
      // eslint-disable-next-line default-case
      switch (change.type) {
        case 'update':
          {
            const updatingArgs = {
              oldData: this.itemsController.getCardByKey(change.key).data,
              newData: change.data,
              cancel: false,
              key: change.key
            };
            this.onCardUpdating.peek()(updatingArgs);
            // eslint-disable-next-line no-await-in-loop, @typescript-eslint/await-thenable
            if (await updatingArgs.cancel) {
              break;
            }
            promises.push(this.dataController.update(change.key, change.data));
            this.onCardUpdated.peek()({
              data: change.data,
              key: change.key
            });
            break;
          }
        case 'remove':
          {
            const {
              data
            } = this.itemsController.findItemByKey(this.itemsController.items.peek(), change.key);
            const removingArgs = {
              cancel: false,
              data,
              key: change.key
            };
            this.onCardRemoving.peek()(removingArgs);
            // eslint-disable-next-line no-await-in-loop, @typescript-eslint/await-thenable
            if (await removingArgs.cancel) {
              break;
            }
            promises.push(this.dataController.remove(change.key));
            this.onCardRemoved.peek()({
              data,
              key: change.key
            });
            break;
          }
        case 'insert':
          {
            const insertingArgs = {
              cancel: false,
              data: change.data
            };
            this.onCardInserting.peek()(insertingArgs);
            // eslint-disable-next-line no-await-in-loop, @typescript-eslint/await-thenable
            if (await insertingArgs.cancel) {
              break;
            }
            promises.push(this.dataController.insert(change.data));
            this.onCardInserted.peek()({
              data: change.data
            });
            break;
          }
      }
    }
    await Promise.all(promises);
    await this.dataController.reload();
  }
  addChange(key, newData) {
    const existingChange = this.changes.peek().find(change => change.key === key && ['insert', 'update'].includes(change.type));
    const newChange = existingChange ? _extends({}, existingChange, {
      data: _extends({}, existingChange.data, newData)
    }) : {
      key,
      type: 'update',
      data: newData
    };
    this.changes.value = [...this.changes.peek().filter(change => change !== existingChange), newChange];
  }
}
exports.EditingController = EditingController;
EditingController.dependencies = [_options_controller.OptionsController, _items_controller.ItemsController, _columns_controller.ColumnsController, _data_controller.DataController, _index3.KeyboardNavigationController, _index2.OptionsValidationController, _confirm_controller.ConfirmController];
