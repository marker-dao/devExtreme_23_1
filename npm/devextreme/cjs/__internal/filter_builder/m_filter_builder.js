/**
* DevExtreme (cjs/__internal/filter_builder/m_filter_builder.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _events_engine = _interopRequireDefault(require("../../common/core/events/core/events_engine"));
var _index = require("../../common/core/events/utils/index");
var _message = _interopRequireDefault(require("../../common/core/localization/message"));
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _guid = _interopRequireDefault(require("../../core/guid"));
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _deferred = require("../../core/utils/deferred");
var _extend = require("../../core/utils/extend");
var _type = require("../../core/utils/type");
var _ui = _interopRequireDefault(require("../../ui/popup/ui.popup"));
var _ui2 = _interopRequireDefault(require("../../ui/shared/ui.editor_factory_mixin"));
var _tree_view = _interopRequireDefault(require("../../ui/tree_view"));
var _ui3 = _interopRequireDefault(require("../../ui/widget/ui.widget"));
var _m_utils = require("../ui/overlay/m_utils");
var _m_utils2 = require("./m_utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable max-classes-per-file */

const FILTER_BUILDER_CLASS = 'dx-filterbuilder';
const FILTER_BUILDER_GROUP_CLASS = `${FILTER_BUILDER_CLASS}-group`;
const FILTER_BUILDER_GROUP_ITEM_CLASS = `${FILTER_BUILDER_GROUP_CLASS}-item`;
const FILTER_BUILDER_GROUP_CONTENT_CLASS = `${FILTER_BUILDER_GROUP_CLASS}-content`;
const FILTER_BUILDER_GROUP_OPERATIONS_CLASS = `${FILTER_BUILDER_GROUP_CLASS}-operations`;
const FILTER_BUILDER_GROUP_OPERATION_CLASS = `${FILTER_BUILDER_GROUP_CLASS}-operation`;
const FILTER_BUILDER_ACTION_CLASS = `${FILTER_BUILDER_CLASS}-action`;
const FILTER_BUILDER_IMAGE_CLASS = `${FILTER_BUILDER_ACTION_CLASS}-icon`;
const FILTER_BUILDER_IMAGE_ADD_CLASS = 'dx-icon-plus';
const FILTER_BUILDER_IMAGE_REMOVE_CLASS = 'dx-icon-remove';
const FILTER_BUILDER_ITEM_TEXT_CLASS = `${FILTER_BUILDER_CLASS}-text`;
const FILTER_BUILDER_ITEM_FIELD_CLASS = `${FILTER_BUILDER_CLASS}-item-field`;
const FILTER_BUILDER_ITEM_OPERATION_CLASS = `${FILTER_BUILDER_CLASS}-item-operation`;
const FILTER_BUILDER_ITEM_VALUE_CLASS = `${FILTER_BUILDER_CLASS}-item-value`;
const FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS = `${FILTER_BUILDER_CLASS}-item-value-text`;
const FILTER_BUILDER_OVERLAY_CLASS = `${FILTER_BUILDER_CLASS}-overlay`;
const FILTER_BUILDER_FILTER_OPERATIONS_CLASS = `${FILTER_BUILDER_CLASS}-operations`;
const FILTER_BUILDER_FIELDS_CLASS = `${FILTER_BUILDER_CLASS}-fields`;
const FILTER_BUILDER_ADD_CONDITION_CLASS = `${FILTER_BUILDER_CLASS}-add-condition`;
const ACTIVE_CLASS = 'dx-state-active';
const FILTER_BUILDER_MENU_CUSTOM_OPERATION_CLASS = `${FILTER_BUILDER_CLASS}-menu-custom-operation`;
const SOURCE = 'filterBuilder';
const DISABLED_STATE_CLASS = 'dx-state-disabled';
const OVERLAY_CONTENT_CLASS = 'dx-overlay-content';
const TREEVIEW_NODE_CONTAINER = 'dx-treeview-node-container';
const TAB_KEY = 'tab';
const ENTER_KEY = 'enter';
const ESCAPE_KEY = 'escape';
const ACTIONS = [{
  name: 'onEditorPreparing',
  config: {
    excludeValidators: ['disabled', 'readOnly'],
    category: 'rendering'
  }
}, {
  name: 'onEditorPrepared',
  config: {
    excludeValidators: ['disabled', 'readOnly'],
    category: 'rendering'
  }
}, {
  name: 'onValueChanged',
  config: {
    excludeValidators: ['disabled', 'readOnly']
  }
}];
const OPERATORS = {
  and: 'and',
  or: 'or',
  notAnd: '!and',
  notOr: '!or'
};
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
const EditorFactory = (0, _ui2.default)(class {});
class FilterBuilder extends _ui3.default {
  _getDefaultOptions() {
    // @ts-expect-error
    return (0, _extend.extend)(super._getDefaultOptions(), {
      onEditorPreparing: null,
      onEditorPrepared: null,
      onValueChanged: null,
      fields: [],
      groupOperations: ['and', 'or', 'notAnd', 'notOr'],
      maxGroupLevel: undefined,
      value: null,
      allowHierarchicalFields: false,
      groupOperationDescriptions: {
        and: _message.default.format('dxFilterBuilder-and'),
        or: _message.default.format('dxFilterBuilder-or'),
        notAnd: _message.default.format('dxFilterBuilder-notAnd'),
        notOr: _message.default.format('dxFilterBuilder-notOr')
      },
      customOperations: [],
      closePopupOnTargetScroll: true,
      filterOperationDescriptions: {
        between: _message.default.format('dxFilterBuilder-filterOperationBetween'),
        equal: _message.default.format('dxFilterBuilder-filterOperationEquals'),
        notEqual: _message.default.format('dxFilterBuilder-filterOperationNotEquals'),
        lessThan: _message.default.format('dxFilterBuilder-filterOperationLess'),
        lessThanOrEqual: _message.default.format('dxFilterBuilder-filterOperationLessOrEquals'),
        greaterThan: _message.default.format('dxFilterBuilder-filterOperationGreater'),
        greaterThanOrEqual: _message.default.format('dxFilterBuilder-filterOperationGreaterOrEquals'),
        startsWith: _message.default.format('dxFilterBuilder-filterOperationStartsWith'),
        contains: _message.default.format('dxFilterBuilder-filterOperationContains'),
        notContains: _message.default.format('dxFilterBuilder-filterOperationNotContains'),
        endsWith: _message.default.format('dxFilterBuilder-filterOperationEndsWith'),
        isBlank: _message.default.format('dxFilterBuilder-filterOperationIsBlank'),
        isNotBlank: _message.default.format('dxFilterBuilder-filterOperationIsNotBlank')
      }
    });
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'closePopupOnTargetScroll':
        break;
      case 'onEditorPreparing':
      case 'onEditorPrepared':
      case 'onValueChanged':
        this._initActions();
        break;
      case 'customOperations':
        this._initCustomOperations();
        this._invalidate();
        break;
      case 'fields':
      case 'maxGroupLevel':
      case 'groupOperations':
      case 'allowHierarchicalFields':
      case 'groupOperationDescriptions':
      case 'filterOperationDescriptions':
        this._invalidate();
        break;
      case 'value':
        if (args.value !== args.previousValue) {
          const disableInvalidateForValue = this._disableInvalidateForValue;
          if (!disableInvalidateForValue) {
            this._initModel();
            this._invalidate();
          }
          this._disableInvalidateForValue = false;
          this.executeAction('onValueChanged', {
            value: args.value,
            previousValue: args.previousValue
          });
          this._disableInvalidateForValue = disableInvalidateForValue;
        }
        break;
      default:
        // @ts-expect-error
        super._optionChanged(args);
    }
  }
  getFilterExpression() {
    const fields = this._getNormalizedFields();
    const value = (0, _extend.extend)(true, [], this._model);
    return (0, _m_utils2.getFilterExpression)((0, _m_utils2.getNormalizedFilter)(value), fields, this._customOperations, SOURCE);
  }
  _getNormalizedFields() {
    return (0, _m_utils2.getNormalizedFields)(this.option('fields'));
  }
  _updateFilter() {
    this._disableInvalidateForValue = true;
    const value = (0, _extend.extend)(true, [], this._model);
    const normalizedValue = (0, _m_utils2.getNormalizedFilter)(value);
    const oldValue = (0, _m_utils2.getNormalizedFilter)(this._getModel(this.option('value')));
    if (JSON.stringify(oldValue) !== JSON.stringify(normalizedValue)) {
      this.option('value', normalizedValue);
    }
    this._disableInvalidateForValue = false;
    // @ts-expect-error
    this._fireContentReadyAction();
  }
  _init() {
    this._initCustomOperations();
    this._initModel();
    this._initEditorFactory();
    this._initActions();
    // @ts-expect-error
    super._init();
  }
  _initEditorFactory() {
    this._editorFactory = new EditorFactory();
  }
  _initCustomOperations() {
    this._customOperations = (0, _m_utils2.getMergedOperations)(this.option('customOperations'), this.option('filterOperationDescriptions.between'), this);
  }
  _getDefaultGroupOperation() {
    var _this$option;
    return ((_this$option = this.option('groupOperations')) === null || _this$option === void 0 ? void 0 : _this$option[0]) ?? OPERATORS.and;
  }
  _getModel(value) {
    return (0, _m_utils2.convertToInnerStructure)(value, this._customOperations, this._getDefaultGroupOperation());
  }
  _initModel() {
    this._model = this._getModel(this.option('value'));
  }
  _initActions() {
    const that = this;
    that._actions = {};
    ACTIONS.forEach(action => {
      const actionConfig = (0, _extend.extend)({}, action.config);
      // @ts-expect-error
      that._actions[action.name] = that._createActionByOption(action.name, actionConfig);
    });
  }
  executeAction(actionName, options) {
    const action = this._actions[actionName];
    return action && action(options);
  }
  _initMarkup() {
    this.$element().addClass(FILTER_BUILDER_CLASS);
    // @ts-expect-error
    super._initMarkup();
    this._addAriaAttributes(this.$element(), _message.default.format('dxFilterBuilder-filterAriaRootElement'), 'group');
    this._createGroupElementByCriteria(this._model).appendTo(this.$element());
  }
  _addAriaAttributes($element, ariaLabel, role, hasPopup, hasExpanded, ariaLevel) {
    if (!$element || !$element.length) return;
    const attributes = {
      role
    };
    if (ariaLabel) {
      if ($element.text().length > 0) {
        // @ts-expect-error title attr
        attributes.title = ariaLabel;
      } else {
        attributes['aria-label'] = ariaLabel;
      }
    }
    if ((0, _type.isDefined)(hasPopup)) {
      attributes['aria-haspopup'] = `${hasPopup}`;
    }
    if ((0, _type.isDefined)(hasExpanded)) {
      attributes['aria-expanded'] = `${hasExpanded}`;
    }
    if ((0, _type.isDefined)(ariaLevel)) {
      attributes['aria-level'] = `${ariaLevel}`;
    }
    $element.attr(attributes);
  }
  _createConditionElement(condition, parent, groupLevel) {
    return (0, _renderer.default)('<div>').addClass(FILTER_BUILDER_GROUP_CLASS).append(this._createConditionItem(condition, parent, groupLevel)).attr('role', 'group');
  }
  _createGroupElementByCriteria(criteria, parent) {
    let groupLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    const $group = this._createGroupElement(criteria, parent, groupLevel);
    const $groupContent = $group.find(`.${FILTER_BUILDER_GROUP_CONTENT_CLASS}`);
    const groupCriteria = (0, _m_utils2.getGroupCriteria)(criteria);
    for (let i = 0; i < groupCriteria.length; i++) {
      const innerCriteria = groupCriteria[i];
      if ((0, _m_utils2.isGroup)(innerCriteria)) {
        this._createGroupElementByCriteria(innerCriteria, criteria, groupLevel + 1).appendTo($groupContent);
      } else if ((0, _m_utils2.isCondition)(innerCriteria)) {
        this._createConditionElement(innerCriteria, criteria, `${groupLevel + 1}`).appendTo($groupContent);
      }
    }
    return $group;
  }
  _createGroupElement(criteria, parent, groupLevel) {
    const $guid = new _guid.default();
    const $groupItem = (0, _renderer.default)('<div>').addClass(FILTER_BUILDER_GROUP_ITEM_CLASS);
    const $groupContent = (0, _renderer.default)('<div>').addClass(FILTER_BUILDER_GROUP_CONTENT_CLASS).attr('id', `${$guid}`);
    const $group = (0, _renderer.default)('<div>').addClass(FILTER_BUILDER_GROUP_CLASS).append($groupItem).append($groupContent);
    if (parent != null) {
      this._createRemoveButton(() => {
        (0, _m_utils2.removeItem)(parent, criteria);
        $group.remove();
        this._updateFilter();
      }, 'group').appendTo($groupItem);
    }
    let groupItemLevel = groupLevel;
    if (groupLevel === 0) {
      this._addAriaAttributes($group, '', 'tree');
      groupItemLevel += 1;
    }
    this._addAriaAttributes($groupItem, _message.default.format('dxFilterBuilder-filterAriaGroupItem'), 'treeitem', null, null, groupItemLevel);
    $groupItem.attr('aria-owns', `${$guid}`);
    this._createGroupOperationButton(criteria).appendTo($groupItem);
    this._createAddButton(() => {
      const newGroup = (0, _m_utils2.createEmptyGroup)(this._getDefaultGroupOperation());
      (0, _m_utils2.addItem)(newGroup, criteria);
      this._createGroupElement(newGroup, criteria, groupLevel + 1).appendTo($groupContent);
      this._updateFilter();
    }, () => {
      const field = this.option('fields')[0];
      const newCondition = (0, _m_utils2.createCondition)(field, this._customOperations);
      (0, _m_utils2.addItem)(newCondition, criteria);
      this._createConditionElement(newCondition, criteria, groupLevel + 1).appendTo($groupContent);
      this._updateFilter();
    }, groupLevel).appendTo($groupItem);
    return $group;
  }
  _createButton(caption) {
    return (0, _renderer.default)('<div>').text(caption);
  }
  _createGroupOperationButton(criteria) {
    const groupOperations = this._getGroupOperations(criteria);
    let groupMenuItem = (0, _m_utils2.getGroupMenuItem)(criteria, groupOperations);
    const caption = groupMenuItem.text;
    const $operationButton = groupOperations && groupOperations.length < 2 ? this._createButton(caption).addClass(DISABLED_STATE_CLASS) : this._createButtonWithMenu({
      caption,
      menu: {
        items: groupOperations,
        displayExpr: 'text',
        keyExpr: 'value',
        onItemClick: e => {
          if (groupMenuItem !== e.itemData) {
            (0, _m_utils2.setGroupValue)(criteria, e.itemData.value);
            $operationButton.text(e.itemData.text);
            groupMenuItem = e.itemData;
            this._updateFilter();
          }
        },
        onContentReady(e) {
          e.component.selectItem(groupMenuItem);
        },
        cssClass: FILTER_BUILDER_GROUP_OPERATIONS_CLASS
      }
    });
    this._addAriaAttributes($operationButton, _message.default.format('dxFilterBuilder-filterAriaOperationButton'), 'combobox', true, false);
    return $operationButton.addClass(FILTER_BUILDER_ITEM_TEXT_CLASS).addClass(FILTER_BUILDER_GROUP_OPERATION_CLASS).attr('tabindex', 0);
  }
  _createButtonWithMenu(options) {
    const that = this;
    const removeMenu = function () {
      that.$element().find(`.${ACTIVE_CLASS}`).removeClass(ACTIVE_CLASS).attr('aria-expanded', 'false');
      that.$element().find('.dx-overlay .dx-treeview').remove();
      that.$element().find('.dx-overlay').remove();
    };
    const rtlEnabled = this.option('rtlEnabled');
    const menuOnItemClickWrapper = function (handler) {
      return function (e) {
        handler(e);
        if (e.event.type === 'dxclick') {
          removeMenu();
        }
      };
    };
    const position = rtlEnabled ? 'right' : 'left';
    const $button = this._createButton(options.caption);
    const $guid = new _guid.default();
    $button.attr('aria-controls', `${$guid}`);
    (0, _extend.extend)(options.menu, {
      id: $guid,
      focusStateEnabled: true,
      selectionMode: 'single',
      onItemClick: menuOnItemClickWrapper(options.menu.onItemClick),
      onHiding() {
        $button.removeClass(ACTIVE_CLASS).attr('aria-expanded', 'false');
      },
      position: {
        my: `${position} top`,
        at: `${position} bottom`,
        offset: '0 1',
        of: $button,
        collision: 'flip'
      },
      animation: null,
      onHidden() {
        removeMenu();
      },
      cssClass: `${FILTER_BUILDER_OVERLAY_CLASS} ${options.menu.cssClass}`,
      rtlEnabled
    });
    options.popup = {
      onShown(info) {
        const treeViewContentElement = (0, _renderer.default)(info.component.content());
        const treeViewElement = treeViewContentElement.find('.dx-treeview');
        if (treeViewElement.length) {
          that._applyAccessibilityAttributes(treeViewElement);
        }
        _events_engine.default.on(treeViewElement, 'keyup keydown', e => {
          const keyName = (0, _index.normalizeKeyName)(e);
          if (e.type === 'keydown' && keyName === TAB_KEY || e.type === 'keyup' && (keyName === ESCAPE_KEY || keyName === ENTER_KEY)) {
            info.component.hide();
            // @ts-expect-error eventsEngine is badly typed
            _events_engine.default.trigger(options.menu.position.of, 'focus');
          }
        });
        // @ts-expect-error dxElementWrapper doesn't contain widget creation methods types
        const treeView = treeViewElement.dxTreeView('instance');
        treeView.focus();
        treeView.option('focusedElement', null);
      }
    };
    this._subscribeOnClickAndEnterKey($button, () => {
      removeMenu();
      that._createPopupWithTreeView(options, that.$element());
      $button.addClass(ACTIVE_CLASS).attr('aria-expanded', 'true');
    });
    return $button;
  }
  _hasValueButton(condition) {
    const customOperation = (0, _m_utils2.getCustomOperation)(this._customOperations, condition[1]);
    return customOperation ? customOperation.hasValue !== false : condition[2] !== null;
  }
  _createOperationButtonWithMenu(condition, field) {
    const that = this;
    const availableOperations = (0, _m_utils2.getAvailableOperations)(field, this.option('filterOperationDescriptions'), this._customOperations);
    let currentOperation = (0, _m_utils2.getOperationFromAvailable)((0, _m_utils2.getOperationValue)(condition), availableOperations);
    const $operationButton = this._createButtonWithMenu({
      caption: currentOperation.text,
      menu: {
        items: availableOperations,
        displayExpr: 'text',
        onItemRendered(e) {
          e.itemData.isCustom && (0, _renderer.default)(e.itemElement).addClass(FILTER_BUILDER_MENU_CUSTOM_OPERATION_CLASS);
        },
        onContentReady(e) {
          e.component.selectItem(currentOperation);
        },
        onItemClick: e => {
          if (currentOperation !== e.itemData) {
            currentOperation = e.itemData;
            (0, _m_utils2.updateConditionByOperation)(condition, currentOperation.value, that._customOperations);
            const $valueButton = $operationButton.siblings().filter(`.${FILTER_BUILDER_ITEM_VALUE_CLASS}`);
            if (that._hasValueButton(condition)) {
              if ($valueButton.length !== 0) {
                $valueButton.remove();
              }
              that._createValueButton(condition, field).appendTo($operationButton.parent());
            } else {
              $valueButton.remove();
            }
            $operationButton.text(currentOperation.text);
            this._updateFilter();
          }
        },
        cssClass: FILTER_BUILDER_FILTER_OPERATIONS_CLASS
      }
    }).addClass(FILTER_BUILDER_ITEM_TEXT_CLASS).addClass(FILTER_BUILDER_ITEM_OPERATION_CLASS).attr('tabindex', 0);
    this._addAriaAttributes($operationButton, _message.default.format('dxFilterBuilder-filterAriaItemOperation'), 'combobox', true, false);
    return $operationButton;
  }
  _createOperationAndValueButtons(condition, field, $item) {
    this._createOperationButtonWithMenu(condition, field).appendTo($item);
    if (this._hasValueButton(condition)) {
      this._createValueButton(condition, field).appendTo($item);
    }
  }
  _createFieldButtonWithMenu(fields, condition, field) {
    const that = this;
    const allowHierarchicalFields = this.option('allowHierarchicalFields');
    const items = (0, _m_utils2.getItems)(fields, allowHierarchicalFields);
    let item = (0, _m_utils2.getField)(field.name || field.dataField, items);
    const getFullCaption = function (item, items) {
      return allowHierarchicalFields ? (0, _m_utils2.getCaptionWithParents)(item, items) : item.caption;
    };
    condition[0] = item.name || item.dataField;
    const $fieldButton = this._createButtonWithMenu({
      caption: getFullCaption(item, items),
      menu: {
        items,
        dataStructure: 'plain',
        keyExpr: 'id',
        parentId: 'parentId',
        displayExpr: 'caption',
        onItemClick: e => {
          if (item !== e.itemData) {
            item = e.itemData;
            condition[0] = item.name || item.dataField;
            condition[2] = item.dataType === 'object' ? null : '';
            (0, _m_utils2.updateConditionByOperation)(condition, (0, _m_utils2.getDefaultOperation)(item), that._customOperations);
            $fieldButton.siblings().filter(`.${FILTER_BUILDER_ITEM_TEXT_CLASS}`).remove();
            that._createOperationAndValueButtons(condition, item, $fieldButton.parent());
            const caption = getFullCaption(item, e.component.option('items'));
            $fieldButton.text(caption);
            this._updateFilter();
          }
        },
        onContentReady(e) {
          e.component.selectItem(item);
        },
        cssClass: FILTER_BUILDER_FIELDS_CLASS
      }
    }).addClass(FILTER_BUILDER_ITEM_TEXT_CLASS).addClass(FILTER_BUILDER_ITEM_FIELD_CLASS).attr('tabindex', 0);
    this._addAriaAttributes($fieldButton, _message.default.format('dxFilterBuilder-filterAriaItemField'), 'combobox', true, false);
    return $fieldButton;
  }
  _createConditionItem(condition, parent, groupLevel) {
    const $item = (0, _renderer.default)('<div>').addClass(FILTER_BUILDER_GROUP_ITEM_CLASS);
    const fields = this._getNormalizedFields();
    const field = (0, _m_utils2.getField)(condition[0], fields);
    this._addAriaAttributes($item, '', 'treeitem', null, null, groupLevel);
    this._createRemoveButton(() => {
      (0, _m_utils2.removeItem)(parent, condition);
      const isSingleChild = $item.parent().children().length === 1;
      if (isSingleChild) {
        $item.parent().remove();
      } else {
        $item.remove();
      }
      this._updateFilter();
    }, 'condition').appendTo($item);
    this._createFieldButtonWithMenu(fields, condition, field).appendTo($item);
    this._createOperationAndValueButtons(condition, field, $item);
    return $item;
  }
  _getGroupOperations(criteria) {
    let groupOperations = this.option('groupOperations');
    const groupOperationDescriptions = this.option('groupOperationDescriptions');
    if (!groupOperations || !groupOperations.length) {
      groupOperations = [(0, _m_utils2.getGroupValue)(criteria).replace('!', 'not')];
    }
    return groupOperations.map(operation => ({
      text: groupOperationDescriptions[operation],
      value: OPERATORS[operation]
    }));
  }
  _createRemoveButton(handler, type) {
    const $removeButton = (0, _renderer.default)('<div>').addClass(FILTER_BUILDER_IMAGE_CLASS).addClass(FILTER_BUILDER_IMAGE_REMOVE_CLASS).addClass(FILTER_BUILDER_ACTION_CLASS).attr('tabindex', 0);
    if (type) {
      const removeMessage = _message.default.format('dxFilterBuilder-filterAriaRemoveButton', type);
      this._addAriaAttributes($removeButton, removeMessage, 'button');
    }
    this._subscribeOnClickAndEnterKey($removeButton, handler);
    return $removeButton;
  }
  _createAddButton(addGroupHandler, addConditionHandler, groupLevel) {
    let $button;
    const maxGroupLevel = this.option('maxGroupLevel');
    if ((0, _type.isDefined)(maxGroupLevel) && groupLevel >= maxGroupLevel) {
      $button = this._createButton();
      this._subscribeOnClickAndEnterKey($button, addConditionHandler);
    } else {
      $button = this._createButtonWithMenu({
        menu: {
          items: [{
            caption: _message.default.format('dxFilterBuilder-addCondition'),
            click: addConditionHandler
          }, {
            caption: _message.default.format('dxFilterBuilder-addGroup'),
            click: addGroupHandler
          }],
          displayExpr: 'caption',
          onItemClick(e) {
            e.itemData.click();
          },
          cssClass: FILTER_BUILDER_ADD_CONDITION_CLASS
        }
      });
    }
    this._addAriaAttributes($button, _message.default.format('dxFilterBuilder-filterAriaAddButton'), 'combobox', true, false);
    return $button.addClass(FILTER_BUILDER_IMAGE_CLASS).addClass(FILTER_BUILDER_IMAGE_ADD_CLASS).addClass(FILTER_BUILDER_ACTION_CLASS).attr('tabindex', 0);
  }
  _createValueText(item, field, $container) {
    const that = this;
    const $text = (0, _renderer.default)('<div>').html('&nbsp;').addClass(FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS).attr('tabindex', 0).appendTo($container);
    this._addAriaAttributes($text, _message.default.format('dxFilterBuilder-filterAriaItemValue'), 'button', true);
    const value = item[2];
    const customOperation = (0, _m_utils2.getCustomOperation)(that._customOperations, item[1]);
    if (!customOperation && field.lookup) {
      (0, _m_utils2.getCurrentLookupValueText)(field, value, result => {
        (0, _m_utils2.renderValueText)($text, result);
      });
    } else {
      (0, _deferred.when)((0, _m_utils2.getCurrentValueText)(field, value, customOperation)).done(result => {
        (0, _m_utils2.renderValueText)($text, result, customOperation);
      });
    }
    that._subscribeOnClickAndEnterKey($text, e => {
      if (e.type === 'keyup') {
        e.stopPropagation();
      }
      that._createValueEditorWithEvents(item, field, $container);
    });
    return $text;
  }
  _updateConditionValue(item, value, callback) {
    const areValuesDifferent = item[2] !== value;
    if (areValuesDifferent) {
      item[2] = value;
    }
    callback();
    this._updateFilter();
  }
  _addDocumentKeyUp($editor, handler) {
    let isComposing = false; // IME Composing going on
    let hasCompositionJustEnded = false; // Used to swallow keyup event related to compositionend
    const document = _dom_adapter.default.getDocument();
    const documentKeyUpHandler = e => {
      if (isComposing || hasCompositionJustEnded) {
        // IME composing fires
        hasCompositionJustEnded = false;
        return;
      }
      handler(e);
    };
    _events_engine.default.on(document, 'keyup', documentKeyUpHandler);
    const input = $editor.find('input');
    _events_engine.default.on(input, 'compositionstart', () => {
      isComposing = true;
    });
    _events_engine.default.on(input, 'compositionend', () => {
      isComposing = false;
      // some browsers (IE, Firefox, Safari) send a keyup event after
      // compositionend, some (Chrome, Edge) don't. This is to swallow
      // the next keyup event, unless a keydown event happens first
      hasCompositionJustEnded = true;
    });
    // Safari on OS X may send a keydown of 229 after compositionend
    _events_engine.default.on(input, 'keydown', event => {
      if (event.which !== 229) {
        hasCompositionJustEnded = false;
      }
    });
    this._documentKeyUpHandler = documentKeyUpHandler;
  }
  _addDocumentClick($editor, closeEditorFunc) {
    const document = _dom_adapter.default.getDocument();
    const documentClickHandler = e => {
      if (!this._isFocusOnEditorParts($editor, e.target)) {
        // @ts-expect-error eventsEngine is badly typed
        _events_engine.default.trigger($editor.find('input'), 'change');
        closeEditorFunc();
      }
    };
    _events_engine.default.on(document, 'dxpointerdown', documentClickHandler);
    this._documentClickHandler = documentClickHandler;
  }
  _isFocusOnEditorParts($editor, target) {
    const activeElement = target || _dom_adapter.default.getActiveElement();
    return (0, _renderer.default)(activeElement).closest($editor.children()).length || (0, _renderer.default)(activeElement).closest('.dx-dropdowneditor-overlay').length;
  }
  _removeEvents() {
    const document = _dom_adapter.default.getDocument();
    (0, _type.isDefined)(this._documentKeyUpHandler) && _events_engine.default.off(document, 'keyup', this._documentKeyUpHandler);
    (0, _type.isDefined)(this._documentClickHandler) && _events_engine.default.off(document, 'dxpointerdown', this._documentClickHandler);
  }
  _dispose() {
    this._removeEvents();
    // @ts-expect-error
    super._dispose();
  }
  _createValueEditorWithEvents(item, field, $container) {
    let value = item[2];
    const createValueText = () => {
      $container.empty();
      this._removeEvents();
      return this._createValueText(item, field, $container);
    };
    const closeEditor = () => {
      this._updateConditionValue(item, value, () => {
        createValueText();
      });
    };
    const options = {
      value: value === '' ? null : value,
      filterOperation: (0, _m_utils2.getOperationValue)(item),
      setValue(data) {
        value = data === null ? '' : data;
      },
      closeEditor,
      text: $container.text()
    };
    $container.empty();
    const $editor = this._createValueEditor($container, field, options);
    // @ts-expect-error eventsEngine is badly typed
    _events_engine.default.trigger($editor.find('input').not(':hidden').eq(0), 'focus');
    this._removeEvents();
    this._addDocumentClick($editor, closeEditor);
    this._addDocumentKeyUp($editor, e => {
      const keyName = (0, _index.normalizeKeyName)(e);
      if (keyName === TAB_KEY) {
        if (this._isFocusOnEditorParts($editor)) {
          return;
        }
        this._updateConditionValue(item, value, () => {
          createValueText();
          if (e.shiftKey) {
            // @ts-expect-error eventsEngine is badly typed
            _events_engine.default.trigger($container.prev(), 'focus');
          }
        });
      }
      if (keyName === ESCAPE_KEY) {
        // @ts-expect-error eventsEngine is badly typed
        _events_engine.default.trigger(createValueText(), 'focus');
      }
      if (keyName === ENTER_KEY) {
        this._updateConditionValue(item, value, () => {
          // @ts-expect-error eventsEngine is badly typed
          _events_engine.default.trigger(createValueText(), 'focus');
        });
      }
    });
    // @ts-expect-error
    this._fireContentReadyAction();
  }
  _createValueButton(item, field) {
    const $valueButton = (0, _renderer.default)('<div>').addClass(FILTER_BUILDER_ITEM_TEXT_CLASS).addClass(FILTER_BUILDER_ITEM_VALUE_CLASS);
    this._createValueText(item, field, $valueButton);
    return $valueButton;
  }
  _createValueEditor($container, field, options) {
    const $editor = (0, _renderer.default)('<div>').attr('tabindex', 0).appendTo($container);
    const customOperation = (0, _m_utils2.getCustomOperation)(this._customOperations, options.filterOperation);
    const editorTemplate = customOperation && customOperation.editorTemplate ? customOperation.editorTemplate : field.editorTemplate;
    if (editorTemplate) {
      const template = this._getTemplate(editorTemplate);
      template.render({
        model: (0, _extend.extend)({
          field
        }, options),
        container: $editor
      });
    } else {
      this._editorFactory.createEditor.call(this, $editor, (0, _extend.extend)({}, field, options, {
        parentType: SOURCE
      }));
    }
    return $editor;
  }
  _createPopupWithTreeView(options, $container) {
    const that = this;
    const $popup = (0, _renderer.default)('<div>').addClass(options.menu.cssClass).appendTo($container);
    // @ts-expect-error
    this._createComponent($popup, _ui.default, {
      onHiding: options.menu.onHiding,
      onHidden: options.menu.onHidden,
      rtlEnabled: options.menu.rtlEnabled,
      position: options.menu.position,
      animation: options.menu.animation,
      contentTemplate(contentElement) {
        const $menuContainer = (0, _renderer.default)('<div>').appendTo(contentElement);
        // @ts-expect-error
        that._createComponent($menuContainer, _tree_view.default, options.menu);
        $menuContainer.attr('id', `${options.menu.id}`);
        // T852701
        this.repaint();
      },
      _ignoreFunctionValueDeprecation: true,
      maxHeight() {
        return (0, _m_utils.getElementMaxHeightByWindow)(options.menu.position.of);
      },
      visible: true,
      focusStateEnabled: false,
      preventScrollEvents: false,
      container: $popup,
      hideOnOutsideClick: true,
      onShown: options.popup.onShown,
      shading: false,
      width: 'auto',
      height: 'auto',
      showTitle: false,
      _wrapperClassExternal: options.menu.cssClass,
      _ignorePreventScrollEventsDeprecation: true
    });
  }
  _subscribeOnClickAndEnterKey($button, handler) {
    _events_engine.default.on($button, 'dxclick', handler);
    _events_engine.default.on($button, 'keyup', e => {
      if ((0, _index.normalizeKeyName)(e) === ENTER_KEY) {
        handler(e);
      }
    });
  }
  _applyAccessibilityAttributes($element) {
    var _treeViewPopup$find;
    const treeViewPopup = $element.closest(`.${OVERLAY_CONTENT_CLASS}`);
    treeViewPopup === null || treeViewPopup === void 0 || treeViewPopup.removeAttr('role');
    const treeViewNode = treeViewPopup === null || treeViewPopup === void 0 || (_treeViewPopup$find = treeViewPopup.find) === null || _treeViewPopup$find === void 0 ? void 0 : _treeViewPopup$find.call(treeViewPopup, `.${TREEVIEW_NODE_CONTAINER}`);
    treeViewNode === null || treeViewNode === void 0 || treeViewNode.attr('role', 'presentation');
  }
}
(0, _component_registrator.default)('dxFilterBuilder', FilterBuilder);
var _default = exports.default = FilterBuilder;
