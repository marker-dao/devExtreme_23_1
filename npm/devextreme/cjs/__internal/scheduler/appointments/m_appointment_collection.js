/**
* DevExtreme (cjs/__internal/scheduler/appointments/m_appointment_collection.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _translator = require("../../../common/core/animation/translator");
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _double_click = require("../../../common/core/events/double_click");
var _index = require("../../../common/core/events/utils/index");
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));
var _element = require("../../../core/element");
var _element_data = require("../../../core/element_data");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _common = require("../../../core/utils/common");
var _date = _interopRequireDefault(require("../../../core/utils/date"));
var _dom = require("../../../core/utils/dom");
var _extend = require("../../../core/utils/extend");
var _iterator = require("../../../core/utils/iterator");
var _object = require("../../../core/utils/object");
var _position = require("../../../core/utils/position");
var _size = require("../../../core/utils/size");
var _type = require("../../../core/utils/type");
var _uiCollection_widget = _interopRequireDefault(require("../../../ui/collection/ui.collection_widget.edit"));
var _date2 = require("../../core/utils/date");
var _constants = require("../constants");
var _m_classes = require("../m_classes");
var _m_utils_time_zone = _interopRequireDefault(require("../m_utils_time_zone"));
var _generate_dates = require("../recurrence/generate_dates");
var _appointment_adapter = require("../utils/appointment_adapter/appointment_adapter");
var _get_targeted_appointment = require("../utils/get_targeted_appointment");
var _appointment_groups_utils = require("../utils/resource_manager/appointment_groups_utils");
var _group_utils = require("../utils/resource_manager/group_utils");
var _agenda_appointment = require("./appointment/agenda_appointment");
var _m_appointment = require("./appointment/m_appointment");
var _m_appointment_layout = require("./m_appointment_layout");
var _m_text_utils = require("./m_text_utils");
var _m_core = require("./resizing/m_core");
var _count_visible_appointments = require("./utils/count_visible_appointments");
var _get_arrays_diff = require("./utils/get_arrays_diff");
var _get_view_model_diff = require("./utils/get_view_model_diff");
var _m_utils = require("./utils/m_utils");
var _sorted_index_utils = require("./utils/sorted_index_utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable spellcheck/spell-checker */

// @ts-expect-error

const COMPONENT_CLASS = 'dx-scheduler-scrollable-appointments';
const DBLCLICK_EVENT_NAME = (0, _index.addNamespace)(_double_click.name, 'dxSchedulerAppointment');
const toMs = _date.default.dateToMilliseconds;
// @ts-expect-error
class SchedulerAppointments extends _uiCollection_widget.default {
  constructor() {
    super(...arguments);
    // NOTE: The key of this array is `sortedIndex` of appointment rendered in Element
    this.renderedElementsBySortedIndex = [];
  }
  get isAgendaView() {
    return this.invoke('isCurrentViewAgenda');
  }
  get isVirtualScrolling() {
    return this.invoke('isVirtualScrolling');
  }
  get appointmentDataSource() {
    return this.option('getAppointmentDataSource')();
  }
  get dataAccessors() {
    return this.option('dataAccessors');
  }
  get appointmentsCount() {
    return (0, _count_visible_appointments.countVisibleAppointments)(this.option('items') ?? []);
  }
  getResourceManager() {
    return this.option('getResourceManager')();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  option(optionName, value) {
    return super.option(...arguments);
  }
  notifyObserver(subject, args) {
    const notifyScheduler = this.option('notifyScheduler');
    if (notifyScheduler) {
      notifyScheduler.invoke(subject, args);
    }
  }
  invoke(funcName) {
    const notifyScheduler = this.option('notifyScheduler');
    if (notifyScheduler) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      return notifyScheduler.invoke(funcName, ...args);
    }
  }
  _dispose() {
    clearTimeout(this._appointmentClickTimeout);
    super._dispose();
  }
  _supportedKeys() {
    const parent = super._supportedKeys();
    const tabHandler = function (e) {
      const navigatableItems = this._getNavigatableItems();
      const focusedItem = navigatableItems.filter('.dx-state-focused');
      let index = focusedItem.data(_constants.APPOINTMENT_SETTINGS_KEY).sortedIndex;
      let $nextAppointment = e.shiftKey ? (0, _sorted_index_utils.getPrevElement)(index, this.renderedElementsBySortedIndex) : (0, _sorted_index_utils.getNextElement)(index, this.renderedElementsBySortedIndex);
      const lastIndex = navigatableItems.length - 1;
      if ($nextAppointment || index > 0 && e.shiftKey || index < lastIndex && !e.shiftKey) {
        e.preventDefault();
        if (!$nextAppointment) {
          e.shiftKey ? index-- : index++;
          $nextAppointment = this._getNavigatableItemByIndex(index);
        }
        this._resetTabIndex($nextAppointment);
        // @ts-expect-error
        _events_engine.default.trigger($nextAppointment, 'focus');
      }
    };
    const currentAppointment = this._$currentAppointment;
    return (0, _extend.extend)(parent, {
      escape: function () {
        if (this.resizeOccur) {
          var _currentAppointment$d, _currentAppointment$d2, _currentAppointment$d3;
          this.moveAppointmentBack();
          this.resizeOccur = false;
          (_currentAppointment$d = currentAppointment.dxResizable('instance')) === null || _currentAppointment$d === void 0 || _currentAppointment$d._detachEventHandlers();
          (_currentAppointment$d2 = currentAppointment.dxResizable('instance')) === null || _currentAppointment$d2 === void 0 || _currentAppointment$d2._attachEventHandlers();
          (_currentAppointment$d3 = currentAppointment.dxResizable('instance')) === null || _currentAppointment$d3 === void 0 || _currentAppointment$d3._toggleResizingClass(false);
        }
      }.bind(this),
      del: function (e) {
        if (this.option('allowDelete')) {
          e.preventDefault();
          const data = this._getItemData(e.target);
          this.notifyObserver('onDeleteButtonPress', {
            data,
            target: e.target
          });
        }
      }.bind(this),
      tab: tabHandler
    });
  }
  _getNavigatableItemByIndex(sortedIndex) {
    const appointments = this._getNavigatableItems();
    return appointments.filter(
    // @ts-expect-error
    (_, $item) => (0, _element_data.data)($item, _constants.APPOINTMENT_SETTINGS_KEY).sortedIndex === sortedIndex).eq(0);
  }
  _getNavigatableItems() {
    // @ts-expect-error
    const appts = this._itemElements().not('.dx-state-disabled');
    // @ts-expect-error
    const apptCollectors = this.$element().find('.dx-scheduler-appointment-collector');
    return appts.add(apptCollectors);
  }
  _resetTabIndex($appointment) {
    this._focusTarget().attr('tabIndex', -1);
    $appointment.attr('tabIndex', this.option('tabIndex'));
  }
  _moveFocus() {}
  _focusTarget() {
    return this._getNavigatableItems();
  }
  _renderFocusTarget() {
    const $appointment = this._getNavigatableItemByIndex(0);
    this._resetTabIndex($appointment);
  }
  _focusInHandler(e) {
    super._focusInHandler(e);
    this._$currentAppointment = (0, _renderer.default)(e.target);
    this.option('focusedElement', (0, _element.getPublicElement)((0, _renderer.default)(e.target)));
  }
  _focusOutHandler(e) {
    const $appointment = this._getNavigatableItemByIndex(0);
    this.option('focusedElement', (0, _element.getPublicElement)($appointment));
    super._focusOutHandler(e);
  }
  _eventBindingTarget() {
    return this._itemContainer();
  }
  _getDefaultOptions() {
    return (0, _extend.extend)(super._getDefaultOptions(), {
      noDataText: null,
      activeStateEnabled: true,
      hoverStateEnabled: true,
      tabIndex: 0,
      fixedContainer: null,
      allDayContainer: null,
      allowDrag: true,
      allowResize: true,
      allowAllDayResize: true,
      onAppointmentDblClick: null,
      groups: [],
      resources: []
    });
  }
  getItemsDiff() {
    let previousValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    const elementsInRenderOrder = previousValue.map(_ref => {
      let {
        sortedIndex
      } = _ref;
      return this.renderedElementsBySortedIndex[sortedIndex];
    });
    const diff = (0, _get_view_model_diff.getViewModelDiff)(previousValue, value, this.appointmentDataSource);
    diff.filter(item => !(0, _get_arrays_diff.isNeedToAdd)(item)).forEach((item, index) => {
      item.element = elementsInRenderOrder[index];
    });
    return diff;
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'items':
        this._cleanFocusState();
        if (this.isAgendaView) {
          this.forceRepaintAllAppointments(args.value || []);
        } else {
          const diff = this.getItemsDiff(args.previousValue, args.value);
          this.repaintAppointments(diff);
        }
        this._attachAppointmentsEvents();
        break;
      case 'fixedContainer':
      case 'allDayContainer':
      case 'onAppointmentDblClick':
        break;
      case 'allowDrag':
      case 'allowResize':
      case 'allowAllDayResize':
        this._cleanFocusState();
        this.forceRepaintAllAppointments(this.option('items') || []);
        this._attachAppointmentsEvents();
        break;
      case 'focusedElement':
        this._resetTabIndex((0, _renderer.default)(args.value));
        super._optionChanged(args);
        break;
      case 'allowDelete':
        break;
      case 'focusStateEnabled':
        this._clearDropDownItemsElements();
        this.renderDropDownAppointments();
        super._optionChanged(args);
        break;
      default:
        super._optionChanged(args);
    }
  }
  _applyFragment(fragment, allDay) {
    if (fragment.children().length > 0) {
      this._getAppointmentContainer(allDay).append(fragment);
    }
  }
  forceRepaintAllAppointments(items) {
    this.renderedElementsBySortedIndex = [];
    this._renderByFragments(($commonFragment, $allDayFragment) => {
      this._getAppointmentContainer(true).html('');
      this._getAppointmentContainer(false).html('');
      if (items.length === 0) {
        this._cleanItemContainer();
      }
      items.forEach((item, index) => {
        const container = item.allDay ? $allDayFragment : $commonFragment;
        this._renderItem(index, item, container);
      });
    });
  }
  repaintAppointments(diff) {
    this.renderedElementsBySortedIndex = [];
    this._renderByFragments(($commonFragment, $allDayFragment) => {
      const isRepaintAll = this.isAgendaView || !diff.some(item => item.needToAdd === undefined && item.needToRemove === undefined);
      if (isRepaintAll) {
        this._getAppointmentContainer(true).html('');
        this._getAppointmentContainer(false).html('');
      }
      if (diff.length === 0) {
        this._cleanItemContainer();
      }
      diff.forEach((item, index) => {
        if (isRepaintAll && item.needToRemove) {
          return;
        }
        if (item.needToRemove) {
          var _item$element, _item$element2;
          (_item$element = item.element) === null || _item$element === void 0 || _item$element.detach();
          (_item$element2 = item.element) === null || _item$element2 === void 0 || _item$element2.remove();
          return;
        }
        if (item.needToAdd) {
          const container = item.item.allDay ? $allDayFragment : $commonFragment;
          this._renderItem(index, item.item, container);
          return;
        }
        if (item.element) {
          item.element.data(_constants.APPOINTMENT_SETTINGS_KEY, item.item);
          this.renderedElementsBySortedIndex[item.item.sortedIndex] = item.element;
        }
      });
    });
  }
  _renderByFragments(renderFunction) {
    if (this.isVirtualScrolling) {
      const $commonFragment = (0, _renderer.default)(_dom_adapter.default.createDocumentFragment());
      const $allDayFragment = (0, _renderer.default)(_dom_adapter.default.createDocumentFragment());
      renderFunction($commonFragment, $allDayFragment);
      this._applyFragment($commonFragment, false);
      this._applyFragment($allDayFragment, true);
    } else {
      renderFunction(this._getAppointmentContainer(false), this._getAppointmentContainer(true));
    }
  }
  _refreshActiveDescendant() {
    // override to do nothing
  }
  _attachAppointmentsEvents() {
    this._attachClickEvent();
    this._attachHoldEvent();
    this._attachContextMenuEvent();
    this._attachAppointmentDblClick();
    this._renderFocusState();
    this._attachFeedbackEvents();
    this._attachHoverEvents();
  }
  _clearDropDownItemsElements() {
    this.invoke('clearCompactAppointments');
  }
  _findItemElementByItem(item) {
    const result = [];
    const that = this;
    this.itemElements().each(function () {
      const $item = (0, _renderer.default)(this);
      if ($item.data(that._itemDataKey()) === item) {
        result.push($item);
      }
    });
    return result;
  }
  _itemClass() {
    return _m_classes.APPOINTMENT_ITEM_CLASS;
  }
  _itemContainer() {
    const $container = super._itemContainer();
    let $result = $container;
    const $allDayContainer = this.option('allDayContainer');
    if ($allDayContainer) {
      $result = $container.add($allDayContainer);
    }
    return $result;
  }
  _cleanItemContainer() {
    super._cleanItemContainer();
    const $allDayContainer = this.option('allDayContainer');
    if ($allDayContainer) {
      $allDayContainer.empty();
    }
  }
  _clean() {
    super._clean();
    delete this._$currentAppointment;
    delete this._initialSize;
    delete this._initialCoordinates;
  }
  _init() {
    super._init();
    this.$element().addClass(COMPONENT_CLASS);
    this._preventSingleAppointmentClick = false;
  }
  _renderAppointmentTemplate($container, appointment, model) {
    const config = {
      isAllDay: appointment.allDay,
      isRecurrence: appointment.recurrenceRule,
      // TODO
      html: (0, _type.isPlainObject)(appointment) && appointment.html ? appointment.html : undefined
    };
    let {
      targetedAppointmentData
    } = model;
    if (this._currentAppointmentSettings && 'isAgendaModel' in this._currentAppointmentSettings) {
      targetedAppointmentData = (0, _get_targeted_appointment.getTargetedAppointmentFromInfo)(this._currentAppointmentSettings.itemData, this._currentAppointmentSettings, this.dataAccessors, this.getResourceManager());
    }
    const formatText = this.invoke('createFormattedDateText', appointment, targetedAppointmentData, appointment.allDay ? _m_text_utils.DateFormatType.DATE : _m_text_utils.DateFormatType.TIME);
    $container.append(this.isAgendaView ? (0, _m_appointment_layout.createAgendaAppointmentLayout)(formatText, config) : (0, _m_appointment_layout.createAppointmentLayout)(formatText, config));
    if (!this.isAgendaView) {
      $container.parent().prepend((0, _renderer.default)('<div>').addClass(_m_classes.APPOINTMENT_CONTENT_CLASSES.STRIP));
    }
  }
  _executeItemRenderAction(index, itemData, itemElement) {
    const action = this._getItemRenderAction();
    if (action) {
      action(this.invoke('mapAppointmentFields', {
        itemData,
        itemElement
      }));
    }
    delete this._currentAppointmentSettings;
  }
  _itemClickHandler(e) {
    super._itemClickHandler(e, {}, {
      afterExecute: function (e) {
        this._processItemClick(e.args[0].event);
      }.bind(this)
    });
  }
  _processItemClick(e) {
    const $target = (0, _renderer.default)(e.currentTarget);
    const data = this._getItemData($target);
    if ($target.is('.dx-scheduler-appointment-collector')) {
      return;
    }
    if (e.type === 'keydown' || (0, _index.isFakeClickEvent)(e)) {
      this.notifyObserver('showEditAppointmentPopup', {
        data,
        target: $target
      });
      return;
    }
    this._appointmentClickTimeout = setTimeout(() => {
      if (!this._preventSingleAppointmentClick && (0, _dom.isElementInDom)($target)) {
        this.notifyObserver('showAppointmentTooltip', {
          data,
          target: $target
        });
      }
      this._preventSingleAppointmentClick = false;
    }, 300);
  }
  _extendActionArgs($itemElement) {
    const args = super._extendActionArgs($itemElement);
    return this.invoke('mapAppointmentFields', args);
  }
  _render() {
    super._render();
    this._attachAppointmentDblClick();
  }
  _attachAppointmentDblClick() {
    const that = this;
    const itemSelector = that._itemSelector();
    const itemContainer = this._itemContainer();
    _events_engine.default.off(itemContainer, DBLCLICK_EVENT_NAME, itemSelector);
    _events_engine.default.on(itemContainer, DBLCLICK_EVENT_NAME, itemSelector, e => {
      that._itemDXEventHandler(e, 'onAppointmentDblClick', {}, {
        afterExecute(e) {
          that._dblClickHandler(e.args[0].event);
        }
      });
    });
  }
  _dblClickHandler(e) {
    const $targetAppointment = (0, _renderer.default)(e.currentTarget);
    const appointmentData = this._getItemData($targetAppointment);
    clearTimeout(this._appointmentClickTimeout);
    this._preventSingleAppointmentClick = true;
    this.notifyObserver('showEditAppointmentPopup', {
      data: appointmentData,
      target: $targetAppointment
    });
  }
  _renderItem(index, item, container) {
    if ('items' in item) {
      return this.renderDropDownAppointment(container, item);
    }
    this._currentAppointmentSettings = item;
    const $item = super._renderItem(index, item.itemData, container);
    $item.data(_constants.APPOINTMENT_SETTINGS_KEY, item);
    if (item.sortedIndex !== -1) {
      // NOTE: fallback for integration testing
      if (!this.renderedElementsBySortedIndex) {
        this.renderedElementsBySortedIndex = [];
      }
      this.renderedElementsBySortedIndex[item.sortedIndex] = $item;
    }
    return $item;
  }
  _getItemContent($itemFrame) {
    $itemFrame.data(_constants.APPOINTMENT_SETTINGS_KEY, this._currentAppointmentSettings);
    const $itemContent = super._getItemContent($itemFrame);
    return $itemContent;
  }
  _createItemByTemplate(itemTemplate, renderArgs) {
    const {
      itemData,
      container,
      index
    } = renderArgs;
    const parent = (0, _renderer.default)(container).parent();
    parent.prepend((0, _renderer.default)('<span>').addClass(_m_classes.APPOINTMENT_CONTENT_CLASSES.ARIA_DESCRIPTION).attr('hidden', true));
    return itemTemplate.render({
      model: {
        appointmentData: itemData,
        targetedAppointmentData: this.invoke('getTargetedAppointmentData', itemData, parent)
      },
      container,
      index
    });
  }
  _getAppointmentContainer(allDay) {
    const $allDayContainer = this.option('allDayContainer');
    const $container = this.itemsContainer().not($allDayContainer);
    return allDay && $allDayContainer ? $allDayContainer : $container;
  }
  _postprocessRenderItem(args) {
    this.renderAppointment(args.itemElement, this._currentAppointmentSettings);
  }
  renderAppointment(element, settings) {
    element.data(_constants.APPOINTMENT_SETTINGS_KEY, settings);
    this._applyResourceDataAttr(element);
    if (this.isAgendaView) {
      this.renderAgendaAppointment(element, settings);
      return;
    }
    this.renderGeneralAppointment(element, settings);
  }
  renderAgendaAppointment(element, settings) {
    const {
      groups,
      groupsLeafs,
      resourceById
    } = this.getResourceManager();
    const config = {
      data: settings.itemData,
      groupIndex: settings.groupIndex,
      groupTexts: (0, _group_utils.getGroupTexts)(groups, groupsLeafs, resourceById, settings.groupIndex),
      notifyScheduler: this.option('notifyScheduler'),
      geometry: settings,
      allowResize: false,
      allowDrag: false,
      groups: this.option('groups'),
      dataAccessors: this.option('dataAccessors'),
      timeZoneCalculator: this.option('timeZoneCalculator'),
      getResourceManager: this.option('getResourceManager')
    };
    this._createComponent(element, _agenda_appointment.AgendaAppointment, config);
  }
  renderGeneralAppointment(element, settings) {
    var _settings$info;
    const allowResize = this.option('allowResize') && (!(0, _type.isDefined)(settings.skipResizing) || (0, _type.isString)(settings.skipResizing));
    const allowDrag = this.option('allowDrag');
    const {
      allDay
    } = settings;
    const {
      groups,
      groupsLeafs,
      resourceById
    } = this.getResourceManager();
    const config = {
      data: settings.itemData,
      groupIndex: settings.groupIndex,
      groupTexts: (0, _group_utils.getGroupTexts)(groups, groupsLeafs, resourceById, settings.groupIndex),
      notifyScheduler: this.option('notifyScheduler'),
      geometry: settings,
      direction: settings.direction || 'vertical',
      allowResize,
      allowDrag,
      allDay,
      reduced: settings.reduced,
      isCompact: settings.isCompact,
      startDate: new Date((_settings$info = settings.info) === null || _settings$info === void 0 ? void 0 : _settings$info.appointment.startDate),
      cellWidth: this.invoke('getCellWidth'),
      cellHeight: this.invoke('getCellHeight'),
      resizableConfig: this._resizableConfig(settings.itemData, settings),
      groups: this.option('groups'),
      partIndex: settings.partIndex,
      partTotalCount: settings.partTotalCount,
      dataAccessors: this.option('dataAccessors'),
      timeZoneCalculator: this.option('timeZoneCalculator'),
      getResizableStep: this.option('getResizableStep'),
      getResourceManager: this.option('getResourceManager')
    };
    this._createComponent(element, _m_appointment.Appointment, config);
  }
  _applyResourceDataAttr($appointment) {
    const {
      resources
    } = this.getResourceManager();
    const rawAppointment = this._getItemData($appointment);
    const appointmentGroups = (0, _appointment_groups_utils.getAppointmentGroupValues)(rawAppointment, resources);
    Object.entries(appointmentGroups).forEach(_ref2 => {
      let [resourceIndex, resourceIds] = _ref2;
      if (resourceIds.length) {
        const prefix = `data-${(0, _common.normalizeKey)(resourceIndex.toLowerCase())}-`;
        resourceIds.forEach(value => $appointment.attr(prefix + (0, _common.normalizeKey)(value), true));
      }
    });
  }
  _resizableConfig(appointmentData, itemSetting) {
    return {
      area: this._calculateResizableArea(itemSetting, appointmentData),
      onResizeStart: function (e) {
        this.resizeOccur = true;
        this._$currentAppointment = (0, _renderer.default)(e.element);
        if (this.invoke('needRecalculateResizableArea')) {
          const updatedArea = this._calculateResizableArea(this._$currentAppointment.data(_constants.APPOINTMENT_SETTINGS_KEY), this._$currentAppointment.data('dxItemData'));
          e.component.option('area', updatedArea);
          e.component._renderDragOffsets(e.event);
        }
        this._initialSize = {
          width: e.width,
          height: e.height
        };
        this._initialCoordinates = (0, _translator.locate)(this._$currentAppointment);
      }.bind(this),
      onResizeEnd: function (e) {
        this.resizeOccur = false;
        this._resizeEndHandler(e);
      }.bind(this)
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _calculateResizableArea(itemSetting, appointmentData) {
    const area = this.$element().closest('.dx-scrollable-content');
    return this.invoke('getResizableAppointmentArea', {
      coordinates: {
        left: itemSetting.left,
        top: 0,
        groupIndex: itemSetting.groupIndex
      },
      allDay: itemSetting.allDay
    }) || area;
  }
  _resizeEndHandler(e) {
    const $element = (0, _renderer.default)(e.element);
    const {
      allDay,
      info
    } = $element.data(_constants.APPOINTMENT_SETTINGS_KEY);
    const sourceAppointment = this._getItemData($element);
    const viewOffset = this.invoke('getViewOffsetMs');
    let dateRange;
    if (allDay) {
      dateRange = this.resizeAllDay(e);
    } else {
      const startDate = this._getEndResizeAppointmentStartDate(e, sourceAppointment, info.appointment);
      const {
        endDate
      } = info.appointment;
      const shiftedStartDate = _date2.dateUtilsTs.addOffsets(startDate, -viewOffset);
      const shiftedEndDate = _date2.dateUtilsTs.addOffsets(endDate, -viewOffset);
      dateRange = this._getDateRange(e, shiftedStartDate, shiftedEndDate);
      dateRange.startDate = _date2.dateUtilsTs.addOffsets(dateRange.startDate, viewOffset);
      dateRange.endDate = _date2.dateUtilsTs.addOffsets(dateRange.endDate, viewOffset);
    }
    this.updateResizedAppointment($element, dateRange, this.dataAccessors, this.option('timeZoneCalculator'));
  }
  resizeAllDay(e) {
    const $element = (0, _renderer.default)(e.element);
    const timeZoneCalculator = this.option('timeZoneCalculator');
    return (0, _m_core.getAppointmentDateRange)({
      handles: e.handles,
      appointmentSettings: $element.data(_constants.APPOINTMENT_SETTINGS_KEY),
      isVerticalGroupedWorkSpace: this.option('isVerticalGroupedWorkSpace')(),
      appointmentRect: (0, _position.getBoundingRect)($element[0]),
      parentAppointmentRect: (0, _position.getBoundingRect)($element.parent()[0]),
      viewDataProvider: this.option('getViewDataProvider')(),
      isDateAndTimeView: this.option('isDateAndTimeView')(),
      startDayHour: this.invoke('getStartDayHour'),
      endDayHour: this.invoke('getEndDayHour'),
      timeZoneCalculator,
      dataAccessors: this.dataAccessors,
      rtlEnabled: this.option('rtlEnabled'),
      DOMMetaData: this.option('getDOMElementsMetaData')(),
      viewOffset: this.invoke('getViewOffsetMs')
    });
  }
  updateResizedAppointment($element, dateRange, dataAccessors, timeZoneCalculator) {
    const sourceAppointment = this._getItemData($element);
    const gridAdapter = new _appointment_adapter.AppointmentAdapter(sourceAppointment, dataAccessors).clone();
    gridAdapter.startDate = new Date(dateRange.startDate);
    gridAdapter.endDate = new Date(dateRange.endDate);
    /*
     * T1255474. `dateRange` has dates with 00:00 local time.
     * If we transform dates fromGrid and back through DST then we'll lose one hour.
     * TODO(1): refactor computation around DST globally
     */
    const convertedBackAdapter = gridAdapter.clone().calculateDates(timeZoneCalculator, 'fromGrid').calculateDates(timeZoneCalculator, 'toGrid');
    const startDateDelta = gridAdapter.startDate.getTime() - convertedBackAdapter.startDate.getTime();
    const endDateDelta = gridAdapter.endDate.getTime() - convertedBackAdapter.endDate.getTime();
    gridAdapter.startDate = _date2.dateUtilsTs.addOffsets(gridAdapter.startDate, startDateDelta);
    gridAdapter.endDate = _date2.dateUtilsTs.addOffsets(gridAdapter.endDate, endDateDelta);
    const data = gridAdapter.calculateDates(timeZoneCalculator, 'fromGrid').source;
    this.notifyObserver('updateAppointmentAfterResize', {
      target: sourceAppointment,
      data,
      $appointment: $element
    });
  }
  _getEndResizeAppointmentStartDate(e, rawAppointment, appointmentInfo) {
    const timeZoneCalculator = this.option('timeZoneCalculator');
    const appointmentAdapter = new _appointment_adapter.AppointmentAdapter(rawAppointment, this.dataAccessors);
    let {
      startDate
    } = appointmentInfo;
    const {
      startDateTimeZone,
      isRecurrent
    } = appointmentAdapter;
    const isAllDay = this.invoke('isAllDay', rawAppointment);
    if (!e.handles.top && !isRecurrent && !isAllDay) {
      startDate = timeZoneCalculator.createDate(appointmentAdapter.startDate, 'toGrid', startDateTimeZone);
    }
    return startDate;
  }
  _getDateRange(e, startDate, endDate) {
    const itemData = this._getItemData(e.element);
    const deltaTime = this.invoke('getDeltaTime', e, this._initialSize, itemData);
    const renderingStrategyDirection = this.invoke('getRenderingStrategyDirection');
    let isStartDateChanged = false;
    const isAllDay = this.invoke('isAllDay', itemData);
    const needCorrectDates = this.invoke('needCorrectAppointmentDates') && !isAllDay;
    let startTime;
    let endTime;
    if (renderingStrategyDirection !== 'vertical' || isAllDay) {
      isStartDateChanged = this.option('rtlEnabled') ? e.handles.right : e.handles.left;
    } else {
      isStartDateChanged = e.handles.top;
    }
    if (isStartDateChanged) {
      startTime = needCorrectDates ? this._correctStartDateByDelta(startDate, deltaTime) : startDate.getTime() - deltaTime;
      startTime += _m_utils_time_zone.default.getTimezoneOffsetChangeInMs(startDate, endDate, startTime, endDate);
      endTime = endDate.getTime();
    } else {
      startTime = startDate.getTime();
      endTime = needCorrectDates ? this._correctEndDateByDelta(endDate, deltaTime) : endDate.getTime() + deltaTime;
      endTime -= _m_utils_time_zone.default.getTimezoneOffsetChangeInMs(startDate, endDate, startDate, endTime);
    }
    return {
      startDate: new Date(startTime),
      endDate: new Date(endTime)
    };
  }
  _correctEndDateByDelta(endDate, deltaTime) {
    const endDayHour = this.invoke('getEndDayHour');
    const startDayHour = this.invoke('getStartDayHour');
    const maxDate = new Date(endDate);
    const minDate = new Date(endDate);
    const correctEndDate = new Date(endDate);
    minDate.setHours(startDayHour, 0, 0, 0);
    maxDate.setHours(endDayHour, 0, 0, 0);
    if (correctEndDate > maxDate) {
      correctEndDate.setHours(endDayHour, 0, 0, 0);
    }
    let result = correctEndDate.getTime() + deltaTime;
    const visibleDayDuration = (endDayHour - startDayHour) * toMs('hour');
    const daysCount = deltaTime > 0 ? Math.ceil(deltaTime / visibleDayDuration) : Math.floor(deltaTime / visibleDayDuration);
    if (result > maxDate.getTime() || result <= minDate.getTime()) {
      const tailOfCurrentDay = maxDate.getTime() - correctEndDate.getTime();
      const tailOfPrevDays = deltaTime - tailOfCurrentDay;
      const correctedEndDate = new Date(correctEndDate).setDate(correctEndDate.getDate() + daysCount);
      const lastDay = new Date(correctedEndDate);
      lastDay.setHours(startDayHour, 0, 0, 0);
      result = lastDay.getTime() + tailOfPrevDays - visibleDayDuration * (daysCount - 1);
    }
    return result;
  }
  _correctStartDateByDelta(startDate, deltaTime) {
    const endDayHour = this.invoke('getEndDayHour');
    const startDayHour = this.invoke('getStartDayHour');
    const maxDate = new Date(startDate);
    const minDate = new Date(startDate);
    const correctStartDate = new Date(startDate);
    minDate.setHours(startDayHour, 0, 0, 0);
    maxDate.setHours(endDayHour, 0, 0, 0);
    if (correctStartDate < minDate) {
      correctStartDate.setHours(startDayHour, 0, 0, 0);
    }
    let result = correctStartDate.getTime() - deltaTime;
    const visibleDayDuration = (endDayHour - startDayHour) * toMs('hour');
    const daysCount = deltaTime > 0 ? Math.ceil(deltaTime / visibleDayDuration) : Math.floor(deltaTime / visibleDayDuration);
    if (result < minDate.getTime() || result >= maxDate.getTime()) {
      const tailOfCurrentDay = correctStartDate.getTime() - minDate.getTime();
      const tailOfPrevDays = deltaTime - tailOfCurrentDay;
      const firstDay = new Date(correctStartDate.setDate(correctStartDate.getDate() - daysCount));
      firstDay.setHours(endDayHour, 0, 0, 0);
      result = firstDay.getTime() - tailOfPrevDays + visibleDayDuration * (daysCount - 1);
    }
    return result;
  }
  renderDropDownAppointments() {
    this._renderByFragments(($commonFragment, $allDayFragment) => {
      const items = this.option('items') || [];
      items.forEach(item => {
        if ('items' in item) {
          const $fragment = item.allDay ? $allDayFragment : $commonFragment;
          this.renderDropDownAppointment($fragment, item);
        }
      });
    });
  }
  renderDropDownAppointment($fragment, appointment) {
    const virtualItems = appointment.items;
    const items = [];
    virtualItems.forEach(item => {
      const appointmentConfig = {
        itemData: item.itemData,
        groupIndex: appointment.groupIndex,
        groups: this.option('groups')
      };
      const resourceManager = this.getResourceManager();
      items.push({
        appointment: item.itemData,
        targetedAppointment: (0, _get_targeted_appointment.getTargetedAppointment)(item.itemData, item, this.dataAccessors, this.option('timeZoneCalculator'), resourceManager),
        color: resourceManager.getAppointmentColor(appointmentConfig),
        settings: item
      });
    });
    const $item = this.invoke('renderCompactAppointments', {
      $container: $fragment,
      coordinates: {
        top: appointment.top,
        left: appointment.left
      },
      items,
      buttonColor: items[0].color,
      sortedIndex: appointment.sortedIndex,
      width: appointment.width,
      height: appointment.height,
      onAppointmentClick: this.option('onItemClick'),
      allowDrag: this.option('allowDrag'),
      isCompact: appointment.isCompact
    });
    this.renderedElementsBySortedIndex[appointment.sortedIndex] = $item;
    return $item;
  }
  _sortAppointmentsByStartDate(appointments) {
    return (0, _m_utils.sortAppointmentsByStartDate)(appointments, this.dataAccessors);
  }
  _processRecurrenceAppointment(appointment, index, skipLongAppointments) {
    // NOTE: this method is actual only for agenda
    const recurrenceRule = this.dataAccessors.get('recurrenceRule', appointment);
    const result = {
      parts: [],
      indexes: []
    };
    if (recurrenceRule) {
      const dates = appointment.settings || appointment;
      const startDate = this.dataAccessors.get('startDate', dates);
      const startDateTimeZone = this.dataAccessors.get('startDateTimeZone', appointment);
      const endDate = this.dataAccessors.get('endDate', dates);
      const appointmentDuration = endDate.getTime() - startDate.getTime();
      const recurrenceException = this.dataAccessors.get('recurrenceException', appointment);
      const startViewDate = this.invoke('getStartViewDate');
      const endViewDate = this.invoke('getEndViewDate');
      const timezoneCalculator = this.option('timeZoneCalculator');
      const recurrentDates = (0, _generate_dates.generateDates)({
        rule: recurrenceRule,
        exception: recurrenceException,
        start: startDate,
        end: endDate,
        min: startViewDate,
        max: endViewDate,
        appointmentTimezoneOffset: timezoneCalculator.getOriginStartDateOffsetInMs(startDate, startDateTimeZone, false)
      });
      const recurrentDateCount = appointment.settings ? 1 : recurrentDates.length;
      for (let i = 0; i < recurrentDateCount; i++) {
        const appointmentPart = (0, _extend.extend)({}, appointment, true);
        if (recurrentDates[i]) {
          const appointmentSettings = this._applyStartDateToObj(recurrentDates[i], {});
          this._applyEndDateToObj(new Date(recurrentDates[i].getTime() + appointmentDuration), appointmentSettings);
          appointmentPart.settings = appointmentSettings;
        } else {
          appointmentPart.settings = dates;
        }
        result.parts.push(appointmentPart);
        if (!skipLongAppointments) {
          this._processLongAppointment(appointmentPart, result);
        }
      }
      result.indexes.push(index);
    }
    return result;
  }
  _processLongAppointment(appointment, result) {
    const parts = this.splitAppointmentByDay(appointment);
    const partCount = parts.length;
    const endViewDate = this.invoke('getEndViewDate').getTime();
    const startViewDate = this.invoke('getStartViewDate').getTime();
    const timeZoneCalculator = this.option('timeZoneCalculator');
    result = result || {
      parts: []
    };
    if (partCount > 1) {
      (0, _extend.extend)(appointment, parts[0]);
      for (let i = 1; i < partCount; i++) {
        let startDate = this.dataAccessors.get('startDate', parts[i].settings);
        startDate = timeZoneCalculator.createDate(startDate.getTime(), 'toGrid');
        if (startDate < endViewDate && startDate > startViewDate) {
          result.parts.push(parts[i]);
        }
      }
    }
    return result;
  }
  _reduceRecurrenceAppointments(recurrenceIndexes, appointments) {
    (0, _iterator.each)(recurrenceIndexes, (i, index) => {
      appointments.splice(index - i, 1);
    });
  }
  _combineAppointments(appointments, additionalAppointments) {
    if (additionalAppointments.length) {
      appointments.push(...additionalAppointments);
    }
    this._sortAppointmentsByStartDate(appointments);
  }
  _applyStartDateToObj(startDate, obj) {
    this.dataAccessors.set('startDate', obj, startDate);
    return obj;
  }
  _applyEndDateToObj(endDate, obj) {
    this.dataAccessors.set('endDate', obj, endDate);
    return obj;
  }
  moveAppointmentBack(dragEvent) {
    const $appointment = this._$currentAppointment;
    const size = this._initialSize;
    const coords = this._initialCoordinates;
    if (dragEvent) {
      this._removeDragSourceClassFromDraggedAppointment();
      if ((0, _type.isDeferred)(dragEvent.cancel)) {
        dragEvent.cancel.resolve(true);
      } else {
        dragEvent.cancel = true;
      }
    }
    if ($appointment && !dragEvent) {
      if (coords) {
        (0, _translator.move)($appointment, coords);
        delete this._initialSize;
      }
      if (size) {
        (0, _size.setOuterWidth)($appointment, size.width);
        (0, _size.setOuterHeight)($appointment, size.height);
        delete this._initialCoordinates;
      }
    }
  }
  focus() {
    if (this._$currentAppointment) {
      const focusedElement = (0, _element.getPublicElement)(this._$currentAppointment);
      this.option('focusedElement', focusedElement);
      _events_engine.default.trigger(focusedElement, 'focus');
    }
  }
  splitAppointmentByDay(appointment) {
    const dates = appointment.settings || appointment;
    const originalStartDate = this.dataAccessors.get('startDate', dates);
    let startDate = _date.default.makeDate(originalStartDate);
    let endDate = _date.default.makeDate(this.dataAccessors.get('endDate', dates));
    const maxAllowedDate = this.invoke('getEndViewDate');
    const startDayHour = this.invoke('getStartDayHour');
    const endDayHour = this.invoke('getEndDayHour');
    const timeZoneCalculator = this.option('timeZoneCalculator');
    const adapter = new _appointment_adapter.AppointmentAdapter(appointment, this.dataAccessors);
    const appointmentIsLong = (0, _m_utils.getAppointmentTakesSeveralDays)(adapter);
    const result = [];
    startDate = timeZoneCalculator.createDate(startDate, 'toGrid');
    endDate = timeZoneCalculator.createDate(endDate, 'toGrid');
    if (startDate.getHours() <= endDayHour && startDate.getHours() >= startDayHour && !appointmentIsLong) {
      result.push(this._applyStartDateToObj(new Date(startDate), {
        appointmentData: appointment
      }));
      startDate.setDate(startDate.getDate() + 1);
    }
    while (appointmentIsLong && startDate.getTime() < endDate.getTime() && startDate < maxAllowedDate) {
      const currentStartDate = new Date(startDate);
      const currentEndDate = new Date(startDate);
      this._checkStartDate(currentStartDate, originalStartDate, startDayHour);
      this._checkEndDate(currentEndDate, endDate, endDayHour);
      const appointmentData = (0, _object.deepExtendArraySafe)({}, appointment, true);
      const appointmentSettings = {};
      this._applyStartDateToObj(currentStartDate, appointmentSettings);
      this._applyEndDateToObj(currentEndDate, appointmentSettings);
      appointmentData.settings = appointmentSettings;
      result.push(appointmentData);
      startDate = _date.default.trimTime(startDate);
      startDate.setDate(startDate.getDate() + 1);
      startDate.setHours(startDayHour);
    }
    return result;
  }
  _checkStartDate(currentDate, originalDate, startDayHour) {
    if (!_date.default.sameDate(currentDate, originalDate) || currentDate.getHours() <= startDayHour) {
      currentDate.setHours(startDayHour, 0, 0, 0);
    } else {
      currentDate.setHours(originalDate.getHours(), originalDate.getMinutes(), originalDate.getSeconds(), originalDate.getMilliseconds());
    }
  }
  _checkEndDate(currentDate, originalDate, endDayHour) {
    if (!_date.default.sameDate(currentDate, originalDate) || currentDate.getHours() > endDayHour) {
      currentDate.setHours(endDayHour, 0, 0, 0);
    } else {
      currentDate.setHours(originalDate.getHours(), originalDate.getMinutes(), originalDate.getSeconds(), originalDate.getMilliseconds());
    }
  }
  _removeDragSourceClassFromDraggedAppointment() {
    const $appointments = this._itemElements().filter(`.${_m_classes.APPOINTMENT_DRAG_SOURCE_CLASS}`);
    $appointments.each((_, element) => {
      const appointmentInstance = (0, _renderer.default)(element).dxSchedulerAppointment('instance');
      appointmentInstance.option('isDragSource', false);
    });
  }
  _setDragSourceAppointment(appointment, settings) {
    const $appointments = this._findItemElementByItem(appointment);
    const {
      startDate,
      endDate
    } = settings.info.sourceAppointment;
    const {
      groupIndex
    } = settings;
    $appointments.forEach($item => {
      const {
        info: itemInfo,
        groupIndex: itemGroupIndex
      } = $item.data(_constants.APPOINTMENT_SETTINGS_KEY);
      const {
        startDate: itemStartDate,
        endDate: itemEndDate
      } = itemInfo.sourceAppointment;
      const appointmentInstance = $item.dxSchedulerAppointment('instance');
      const isDragSource = startDate.getTime() === itemStartDate.getTime() && endDate.getTime() === itemEndDate.getTime() && groupIndex === itemGroupIndex;
      appointmentInstance.option('isDragSource', isDragSource);
    });
  }
  updateResizableArea() {
    const $allResizableElements = this.$element().find('.dx-scheduler-appointment.dx-resizable');
    const horizontalResizables = (0, _common.grep)($allResizableElements, el => {
      const $el = (0, _renderer.default)(el);
      const resizableInst = $el.dxResizable('instance');
      const {
        area,
        handles
      } = resizableInst.option();
      return (handles === 'right left' || handles === 'left right') && (0, _type.isPlainObject)(area);
    });
    (0, _iterator.each)(horizontalResizables, (_, el) => {
      const $el = (0, _renderer.default)(el);
      const position = (0, _translator.locate)($el);
      const appointmentData = this._getItemData($el);
      const area = this._calculateResizableArea({
        left: position.left
      }, appointmentData);
      $el.dxResizable('instance').option('area', area);
    });
  }
}
(0, _component_registrator.default)('dxSchedulerAppointments', SchedulerAppointments);
var _default = exports.default = SchedulerAppointments;
