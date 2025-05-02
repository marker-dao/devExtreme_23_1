import _extends from "@babel/runtime/helpers/esm/extends";
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable spellcheck/spell-checker */
import { applyChanges } from '../../../../../common/data';
import { isDefined } from '../../../../../core/utils/type';
import { confirm } from '../../../../../ui/dialog';
import { computed } from '@preact/signals-core';
import { generateNewRowTempKey } from '../../../../grids/grid_core/editing/m_editing_utils';
import { ColumnsController } from '../columns_controller/columns_controller';
import { DataController } from '../data_controller/data_controller';
import { ItemsController } from '../items_controller/items_controller';
import { KeyboardNavigationController } from '../keyboard_navigation/index';
import { OptionsController } from '../options_controller/options_controller';
export class EditingController {
  constructor(options, itemsController, columnController, dataController, kbn) {
    this.options = options;
    this.itemsController = itemsController;
    this.columnController = columnController;
    this.dataController = dataController;
    this.kbn = kbn;
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
    this.editingCard = computed(() => {
      const editCardKey = this.editCardKey.value;
      const items = this.itemsController.items.value;
      const changes = this.changes.value;
      if (!isDefined(editCardKey)) {
        return null;
      }
      const oldItem = this.itemsController.findItemByKey(items, editCardKey);
      const newData = applyChanges([oldItem.data], changes, {
        keyExpr: this.dataController.dataSource.peek().key(),
        immutable: true
      })[0];
      const newItem = this.itemsController.createCardInfo(newData, this.columnController.columns.peek(), oldItem.index);
      return newItem;
    });
  }
  editCard(key) {
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
  async addCard() {
    const eventArgs = {
      promise: undefined,
      data: {}
    };
    this.onInitNewCard.peek()(eventArgs);
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await eventArgs.promise;
    const newItemKey = this.dataController.getDataKey(eventArgs.data) ?? generateNewRowTempKey();
    this.itemsController.additionalItems.value = [...this.itemsController.additionalItems.peek(), this.itemsController.createCardInfo(eventArgs.data, this.columnController.columns.peek(), -1, [], newItemKey)];
    this.changes.value = [...this.changes.peek(), {
      type: 'insert',
      key: newItemKey,
      data: {}
    }];
    this.editCardKey.value = newItemKey;
  }
  async confirmDelete() {
    if (!this.needConfirmDelete.peek()) {
      return Promise.resolve(true);
    }
    const result = await confirm(
    // @ts-expect-error wrong typing in optionController
    this.texts.peek().confirmDeleteMessage,
    // @ts-expect-error wrong typing in optionController
    this.texts.peek().confirmDeleteTitle);
    return result;
  }
  async deleteCard(key) {
    const confirmStatus = await this.confirmDelete();
    if (!confirmStatus) {
      this.kbn.returnFocus();
      return;
    }
    // @ts-expect-error
    this.changes.update([...this.changes.peek(), {
      type: 'remove',
      key
    }]);
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
EditingController.dependencies = [OptionsController, ItemsController, ColumnsController, DataController, KeyboardNavigationController];