/**
* DevExtreme (esm/__internal/scheduler/appointments/m_appointment_collection.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable spellcheck/spell-checker */
import { locate, move } from '../../../common/core/animation/translator';
import eventsEngine from '../../../common/core/events/core/events_engine';
import { name as dblclickEvent } from '../../../common/core/events/double_click';
import { addNamespace, isFakeClickEvent } from '../../../common/core/events/utils/index';
import registerComponent from '../../../core/component_registrator';
import domAdapter from '../../../core/dom_adapter';
import { getPublicElement } from '../../../core/element';
import { data as elementData } from '../../../core/element_data';
import $ from '../../../core/renderer';
// @ts-expect-error
import { grep, normalizeKey } from '../../../core/utils/common';
import dateUtils from '../../../core/utils/date';
import { isElementInDom } from '../../../core/utils/dom';
import { extend } from '../../../core/utils/extend';
import { each } from '../../../core/utils/iterator';
import { deepExtendArraySafe } from '../../../core/utils/object';
import { getBoundingRect } from '../../../core/utils/position';
import { setOuterHeight, setOuterWidth } from '../../../core/utils/size';
import { isDeferred, isDefined, isPlainObject, isString } from '../../../core/utils/type';
import CollectionWidget from '../../../ui/collection/ui.collection_widget.edit';
import { dateUtilsTs } from '../../core/utils/date';
import { APPOINTMENT_SETTINGS_KEY } from '../constants';
import { APPOINTMENT_CONTENT_CLASSES, APPOINTMENT_DRAG_SOURCE_CLASS, APPOINTMENT_ITEM_CLASS } from '../m_classes';
import { getRecurrenceProcessor } from '../m_recurrence';
import timeZoneUtils from '../m_utils_time_zone';
import { AppointmentAdapter } from '../utils/appointment_adapter/appointment_adapter';
import { getAppointmentGroupValues } from '../utils/resource_manager/appointment_groups_utils';
import { getGroupTexts } from '../utils/resource_manager/group_utils';
import { AgendaAppointment } from './appointment/agenda_appointment';
import { Appointment } from './appointment/m_appointment';
import { getAppointmentTakesSeveralDays, sortAppointmentsByStartDate } from './data_provider/m_utils';
import { createAgendaAppointmentLayout, createAppointmentLayout } from './m_appointment_layout';
import { getAppointmentDateRange } from './resizing/m_core';
import { countVisibleAppointments } from './utils/countVisibleAppointments';
const COMPONENT_CLASS = 'dx-scheduler-scrollable-appointments';
const DBLCLICK_EVENT_NAME = addNamespace(dblclickEvent, 'dxSchedulerAppointment');
const toMs = dateUtils.dateToMilliseconds;
const isAllDayAppointment = appointment => {
  var _appointment$settings;
  return Boolean((_appointment$settings = appointment.settings[0]) === null || _appointment$settings === void 0 ? void 0 : _appointment$settings.allDay);
};
// @ts-expect-error
class SchedulerAppointments extends CollectionWidget {
  get isAgendaView() {
    return this.invoke('isCurrentViewAgenda');
  }
  get isVirtualScrolling() {
    return this.invoke('isVirtualScrolling');
  }
  get appointmentDataProvider() {
    return this.option('getAppointmentDataProvider')();
  }
  get dataAccessors() {
    return this.option('dataAccessors');
  }
  get appointmentsCount() {
    return countVisibleAppointments(this.option('items') ?? []);
  }
  constructor(element, options) {
    super(element, options);
    this._virtualAppointments = {};
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  option(optionName, value) {
    return super.option(...arguments);
  }
  notifyObserver(subject, args) {
    const observer = this.option('observer');
    if (observer) {
      observer.fire(subject, args);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  invoke(funcName) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    const observer = this.option('observer');
    if (observer) {
      return observer.fire.apply(observer, arguments);
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
      let index = focusedItem.data(APPOINTMENT_SETTINGS_KEY).sortedIndex;
      const lastIndex = navigatableItems.length - 1;
      if (index > 0 && e.shiftKey || index < lastIndex && !e.shiftKey) {
        e.preventDefault();
        e.shiftKey ? index-- : index++;
        const $nextAppointment = this._getNavigatableItemByIndex(index);
        this._resetTabIndex($nextAppointment);
        // @ts-expect-error
        eventsEngine.trigger($nextAppointment, 'focus');
      }
    };
    const currentAppointment = this._$currentAppointment;
    return extend(parent, {
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
    (_, $item) => elementData($item, APPOINTMENT_SETTINGS_KEY).sortedIndex === sortedIndex).eq(0);
  }
  _getNavigatableItems() {
    // @ts-expect-error
    const appts = this._itemElements().filter(':visible').not('.dx-state-disabled');
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
    this._$currentAppointment = $(e.target);
    this.option('focusedElement', getPublicElement($(e.target)));
  }
  _focusOutHandler(e) {
    const $appointment = this._getNavigatableItemByIndex(0);
    this.option('focusedElement', getPublicElement($appointment));
    super._focusOutHandler(e);
  }
  _eventBindingTarget() {
    return this._itemContainer();
  }
  _getDefaultOptions() {
    return extend(super._getDefaultOptions(), {
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
      _collectorOffset: 0,
      groups: [],
      resources: []
    });
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'items':
        this._cleanFocusState();
        this._clearDropDownItems();
        this._clearDropDownItemsElements();
        this._repaintAppointments(args.value);
        this._renderDropDownAppointments();
        this._attachAppointmentsEvents();
        break;
      case 'fixedContainer':
      case 'allDayContainer':
      case 'onAppointmentDblClick':
        break;
      case 'allowDrag':
      case 'allowResize':
      case 'allowAllDayResize':
        this._invalidate();
        break;
      case 'focusedElement':
        this._resetTabIndex($(args.value));
        super._optionChanged(args);
        break;
      case 'allowDelete':
        break;
      case 'focusStateEnabled':
        this._clearDropDownItemsElements();
        this._renderDropDownAppointments();
        super._optionChanged(args);
        break;
      default:
        super._optionChanged(args);
    }
  }
  _isRepaintAll(appointments) {
    return this.isAgendaView || appointments.every(item => item.needRepaint);
  }
  _applyFragment(fragment, allDay) {
    if (fragment.children().length > 0) {
      this._getAppointmentContainer(allDay).append(fragment);
    }
  }
  _repaintAppointments(appointments) {
    this._renderByFragments(($commonFragment, $allDayFragment) => {
      const isRepaintAll = this._isRepaintAll(appointments);
      if (isRepaintAll) {
        this._getAppointmentContainer(true).html('');
        this._getAppointmentContainer(false).html('');
      }
      if (!appointments.length) {
        this._cleanItemContainer();
      }
      appointments.forEach((appointment, index) => {
        const container = isAllDayAppointment(appointment) ? $allDayFragment : $commonFragment;
        if (appointment.needRemove) {
          this._clearItem(appointment);
        } else if (isRepaintAll || appointment.needRepaint) {
          appointment.needRepaint = false;
          this._clearItem(appointment);
          this._renderItem(index, appointment, container);
        }
      });
    });
  }
  _renderByFragments(renderFunction) {
    if (this.isVirtualScrolling) {
      const $commonFragment = $(domAdapter.createDocumentFragment());
      const $allDayFragment = $(domAdapter.createDocumentFragment());
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
  _clearItem(item) {
    const $items = this._findItemElementByItem(item.itemData);
    if (!$items.length) {
      return;
    }
    each($items, (_, $item) => {
      $item.detach();
      $item.remove();
    });
  }
  _clearDropDownItems() {
    this._virtualAppointments = {};
  }
  _clearDropDownItemsElements() {
    this.invoke('clearCompactAppointments');
  }
  _findItemElementByItem(item) {
    const result = [];
    const that = this;
    this.itemElements().each(function () {
      const $item = $(this);
      if ($item.data(that._itemDataKey()) === item) {
        result.push($item);
      }
    });
    return result;
  }
  _itemClass() {
    return APPOINTMENT_ITEM_CLASS;
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
    this._virtualAppointments = {};
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
    var _this$_currentAppoint;
    const config = {
      isAllDay: appointment.allDay,
      isRecurrence: appointment.recurrenceRule,
      // TODO
      html: isPlainObject(appointment) && appointment.html ? appointment.html : undefined
    };
    const formatText = this.invoke('getTextAndFormatDate', model.appointmentData, ((_this$_currentAppoint = this._currentAppointmentSettings) === null || _this$_currentAppoint === void 0 ? void 0 : _this$_currentAppoint.agendaSettings) || model.targetedAppointmentData, 'TIME');
    $container.append(this.isAgendaView ? createAgendaAppointmentLayout(formatText, config) : createAppointmentLayout(formatText, config));
    if (!this.isAgendaView) {
      $container.parent().prepend($('<div>').addClass(APPOINTMENT_CONTENT_CLASSES.STRIP));
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
    const $target = $(e.currentTarget);
    const data = this._getItemData($target);
    if ($target.is('.dx-scheduler-appointment-collector')) {
      return;
    }
    if (e.type === 'keydown' || isFakeClickEvent(e)) {
      this.notifyObserver('showEditAppointmentPopup', {
        data,
        target: $target
      });
      return;
    }
    this._appointmentClickTimeout = setTimeout(() => {
      if (!this._preventSingleAppointmentClick && isElementInDom($target)) {
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
    eventsEngine.off(itemContainer, DBLCLICK_EVENT_NAME, itemSelector);
    eventsEngine.on(itemContainer, DBLCLICK_EVENT_NAME, itemSelector, e => {
      that._itemDXEventHandler(e, 'onAppointmentDblClick', {}, {
        afterExecute(e) {
          that._dblClickHandler(e.args[0].event);
        }
      });
    });
  }
  _dblClickHandler(e) {
    const $targetAppointment = $(e.currentTarget);
    const appointmentData = this._getItemData($targetAppointment);
    clearTimeout(this._appointmentClickTimeout);
    this._preventSingleAppointmentClick = true;
    this.notifyObserver('showEditAppointmentPopup', {
      data: appointmentData,
      target: $targetAppointment
    });
  }
  _renderItem(index, item, container) {
    const {
      itemData
    } = item;
    const $items = [];
    for (let i = 0; i < item.settings.length; i++) {
      const setting = item.settings[i];
      this._currentAppointmentSettings = setting;
      const $item = super._renderItem(index, itemData, container);
      $item.data(APPOINTMENT_SETTINGS_KEY, setting);
      $items.push($item);
    }
    return $items;
  }
  _getItemContent($itemFrame) {
    $itemFrame.data(APPOINTMENT_SETTINGS_KEY, this._currentAppointmentSettings);
    const $itemContent = super._getItemContent($itemFrame);
    return $itemContent;
  }
  _createItemByTemplate(itemTemplate, renderArgs) {
    const {
      itemData,
      container,
      index
    } = renderArgs;
    const parent = $(container).parent();
    parent.prepend($('<span>').addClass(APPOINTMENT_CONTENT_CLASSES.ARIA_DESCRIPTION).attr('hidden', true));
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
    this._renderAppointment(args.itemElement, this._currentAppointmentSettings);
  }
  _renderAppointment(element, settings) {
    element.data(APPOINTMENT_SETTINGS_KEY, settings);
    this._applyResourceDataAttr(element);
    const rawAppointment = this._getItemData(element);
    const geometry = this.invoke('getAppointmentGeometry', settings);
    const allowResize = this.option('allowResize') && (!isDefined(settings.skipResizing) || isString(settings.skipResizing));
    const allowDrag = this.option('allowDrag');
    const {
      allDay
    } = settings;
    if (settings.virtual) {
      const appointmentConfig = {
        itemData: rawAppointment,
        groupIndex: settings.groupIndex,
        groups: this.option('groups')
      };
      const deferredColor = this.option('getAppointmentColor')(appointmentConfig);
      this._processVirtualAppointment(settings, element, rawAppointment, deferredColor);
    } else {
      var _settings$info;
      const {
        groups,
        groupsLeafs,
        resourceById
      } = this.option('getResourceManager')();
      const config = {
        data: rawAppointment,
        groupIndex: settings.groupIndex,
        groupTexts: getGroupTexts(groups, groupsLeafs, resourceById, settings.groupIndex),
        observer: this.option('observer'),
        geometry,
        direction: settings.direction || 'vertical',
        allowResize,
        allowDrag,
        allDay,
        reduced: settings.appointmentReduced,
        isCompact: settings.isCompact,
        startDate: new Date((_settings$info = settings.info) === null || _settings$info === void 0 ? void 0 : _settings$info.appointment.startDate),
        cellWidth: this.invoke('getCellWidth'),
        cellHeight: this.invoke('getCellHeight'),
        resizableConfig: this._resizableConfig(rawAppointment, settings),
        groups: this.option('groups'),
        partIndex: settings.partIndex,
        partTotalCount: settings.partTotalCount,
        dataAccessors: this.dataAccessors,
        timeZoneCalculator: this.option('timeZoneCalculator'),
        getResizableStep: this.option('getResizableStep'),
        getResourceManager: this.option('getResourceManager')
      };
      this._createComponent(element, this.isAgendaView ? AgendaAppointment : Appointment, config);
    }
  }
  _applyResourceDataAttr($appointment) {
    const {
      resources
    } = this.option('getResourceManager')();
    const rawAppointment = this._getItemData($appointment);
    const appointmentGroups = getAppointmentGroupValues(rawAppointment, resources);
    Object.entries(appointmentGroups).forEach(_ref => {
      let [resourceIndex, resourceIds] = _ref;
      if (resourceIds.length) {
        const prefix = `data-${normalizeKey(resourceIndex.toLowerCase())}-`;
        resourceIds.forEach(value => $appointment.attr(prefix + normalizeKey(value), true));
      }
    });
  }
  _resizableConfig(appointmentData, itemSetting) {
    return {
      area: this._calculateResizableArea(itemSetting, appointmentData),
      onResizeStart: function (e) {
        this.resizeOccur = true;
        this._$currentAppointment = $(e.element);
        if (this.invoke('needRecalculateResizableArea')) {
          const updatedArea = this._calculateResizableArea(this._$currentAppointment.data(APPOINTMENT_SETTINGS_KEY), this._$currentAppointment.data('dxItemData'));
          e.component.option('area', updatedArea);
          e.component._renderDragOffsets(e.event);
        }
        this._initialSize = {
          width: e.width,
          height: e.height
        };
        this._initialCoordinates = locate(this._$currentAppointment);
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
    const $element = $(e.element);
    const {
      allDay,
      info
    } = $element.data(APPOINTMENT_SETTINGS_KEY);
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
      const shiftedStartDate = dateUtilsTs.addOffsets(startDate, [-viewOffset]);
      const shiftedEndDate = dateUtilsTs.addOffsets(endDate, [-viewOffset]);
      dateRange = this._getDateRange(e, shiftedStartDate, shiftedEndDate);
      dateRange.startDate = dateUtilsTs.addOffsets(dateRange.startDate, [viewOffset]);
      dateRange.endDate = dateUtilsTs.addOffsets(dateRange.endDate, [viewOffset]);
    }
    this.updateResizedAppointment($element, dateRange, this.dataAccessors, this.option('timeZoneCalculator'));
  }
  resizeAllDay(e) {
    const $element = $(e.element);
    const timeZoneCalculator = this.option('timeZoneCalculator');
    return getAppointmentDateRange({
      handles: e.handles,
      appointmentSettings: $element.data(APPOINTMENT_SETTINGS_KEY),
      isVerticalGroupedWorkSpace: this.option('isVerticalGroupedWorkSpace')(),
      appointmentRect: getBoundingRect($element[0]),
      parentAppointmentRect: getBoundingRect($element.parent()[0]),
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
    const gridAdapter = new AppointmentAdapter(sourceAppointment, dataAccessors).clone();
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
    gridAdapter.startDate = dateUtilsTs.addOffsets(gridAdapter.startDate, [startDateDelta]);
    gridAdapter.endDate = dateUtilsTs.addOffsets(gridAdapter.endDate, [endDateDelta]);
    const data = gridAdapter.calculateDates(timeZoneCalculator, 'fromGrid').source;
    this.notifyObserver('updateAppointmentAfterResize', {
      target: sourceAppointment,
      data,
      $appointment: $element
    });
  }
  _getEndResizeAppointmentStartDate(e, rawAppointment, appointmentInfo) {
    const timeZoneCalculator = this.option('timeZoneCalculator');
    const appointmentAdapter = new AppointmentAdapter(rawAppointment, this.dataAccessors);
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
      startTime += timeZoneUtils.getTimezoneOffsetChangeInMs(startDate, endDate, startTime, endDate);
      endTime = endDate.getTime();
    } else {
      startTime = startDate.getTime();
      endTime = needCorrectDates ? this._correctEndDateByDelta(endDate, deltaTime) : endDate.getTime() + deltaTime;
      endTime -= timeZoneUtils.getTimezoneOffsetChangeInMs(startDate, endDate, startDate, endTime);
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
  _processVirtualAppointment(appointmentSetting, $appointment, appointmentData, color) {
    const virtualAppointment = appointmentSetting.virtual;
    const virtualGroupIndex = virtualAppointment.index;
    if (!isDefined(this._virtualAppointments[virtualGroupIndex])) {
      this._virtualAppointments[virtualGroupIndex] = {
        coordinates: {
          top: virtualAppointment.top,
          left: virtualAppointment.left
        },
        items: {
          data: [],
          colors: [],
          settings: []
        },
        isAllDay: !!virtualAppointment.isAllDay,
        buttonColor: color,
        sortedIndex: appointmentSetting.sortedIndex
      };
    }
    appointmentSetting.targetedAppointmentData = this.invoke('getTargetedAppointmentData', appointmentData, $appointment);
    this._virtualAppointments[virtualGroupIndex].items.settings.push(appointmentSetting);
    this._virtualAppointments[virtualGroupIndex].items.data.push(appointmentData);
    this._virtualAppointments[virtualGroupIndex].items.colors.push(color);
    $appointment.remove();
  }
  _renderContentImpl() {
    super._renderContentImpl();
    this._renderDropDownAppointments();
  }
  _renderDropDownAppointments() {
    this._renderByFragments(($commonFragment, $allDayFragment) => {
      each(this._virtualAppointments, groupIndex => {
        const virtualGroup = this._virtualAppointments[groupIndex];
        const virtualItems = virtualGroup.items;
        const virtualCoordinates = virtualGroup.coordinates;
        const $fragment = virtualGroup.isAllDay ? $allDayFragment : $commonFragment;
        const {
          left
        } = virtualCoordinates;
        const buttonWidth = this.invoke('getDropDownAppointmentWidth', virtualGroup.isAllDay);
        const buttonHeight = this.invoke('getDropDownAppointmentHeight');
        const rtlOffset = this.option('rtlEnabled') ? buttonWidth : 0;
        this.notifyObserver('renderCompactAppointments', {
          $container: $fragment,
          coordinates: {
            top: virtualCoordinates.top,
            left: left + rtlOffset
          },
          items: virtualItems,
          buttonColor: virtualGroup.buttonColor,
          sortedIndex: virtualGroup.sortedIndex,
          width: buttonWidth - this.option('_collectorOffset'),
          height: buttonHeight,
          onAppointmentClick: this.option('onItemClick'),
          allowDrag: this.option('allowDrag'),
          cellWidth: this.invoke('getCellWidth'),
          isCompact: this.invoke('isAdaptive') || this._isGroupCompact(virtualGroup)
        });
      });
    });
  }
  _isGroupCompact(virtualGroup) {
    return !virtualGroup.isAllDay && this.invoke('supportCompactDropDownAppointments');
  }
  _sortAppointmentsByStartDate(appointments) {
    return sortAppointmentsByStartDate(appointments, this.dataAccessors);
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
      const recurrentDates = getRecurrenceProcessor().generateDates({
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
        const appointmentPart = extend({}, appointment, true);
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
      extend(appointment, parts[0]);
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
    each(recurrenceIndexes, (i, index) => {
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
      if (isDeferred(dragEvent.cancel)) {
        dragEvent.cancel.resolve(true);
      } else {
        dragEvent.cancel = true;
      }
    }
    if ($appointment && !dragEvent) {
      if (coords) {
        move($appointment, coords);
        delete this._initialSize;
      }
      if (size) {
        setOuterWidth($appointment, size.width);
        setOuterHeight($appointment, size.height);
        delete this._initialCoordinates;
      }
    }
  }
  focus() {
    if (this._$currentAppointment) {
      const focusedElement = getPublicElement(this._$currentAppointment);
      this.option('focusedElement', focusedElement);
      eventsEngine.trigger(focusedElement, 'focus');
    }
  }
  splitAppointmentByDay(appointment) {
    const dates = appointment.settings || appointment;
    const originalStartDate = this.dataAccessors.get('startDate', dates);
    let startDate = dateUtils.makeDate(originalStartDate);
    let endDate = dateUtils.makeDate(this.dataAccessors.get('endDate', dates));
    const maxAllowedDate = this.invoke('getEndViewDate');
    const startDayHour = this.invoke('getStartDayHour');
    const endDayHour = this.invoke('getEndDayHour');
    const timeZoneCalculator = this.option('timeZoneCalculator');
    const adapter = new AppointmentAdapter(appointment, this.dataAccessors);
    const appointmentIsLong = getAppointmentTakesSeveralDays(adapter);
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
      const appointmentData = deepExtendArraySafe({}, appointment, true);
      const appointmentSettings = {};
      this._applyStartDateToObj(currentStartDate, appointmentSettings);
      this._applyEndDateToObj(currentEndDate, appointmentSettings);
      appointmentData.settings = appointmentSettings;
      result.push(appointmentData);
      startDate = dateUtils.trimTime(startDate);
      startDate.setDate(startDate.getDate() + 1);
      startDate.setHours(startDayHour);
    }
    return result;
  }
  _checkStartDate(currentDate, originalDate, startDayHour) {
    if (!dateUtils.sameDate(currentDate, originalDate) || currentDate.getHours() <= startDayHour) {
      currentDate.setHours(startDayHour, 0, 0, 0);
    } else {
      currentDate.setHours(originalDate.getHours(), originalDate.getMinutes(), originalDate.getSeconds(), originalDate.getMilliseconds());
    }
  }
  _checkEndDate(currentDate, originalDate, endDayHour) {
    if (!dateUtils.sameDate(currentDate, originalDate) || currentDate.getHours() > endDayHour) {
      currentDate.setHours(endDayHour, 0, 0, 0);
    } else {
      currentDate.setHours(originalDate.getHours(), originalDate.getMinutes(), originalDate.getSeconds(), originalDate.getMilliseconds());
    }
  }
  _removeDragSourceClassFromDraggedAppointment() {
    const $appointments = this._itemElements().filter(`.${APPOINTMENT_DRAG_SOURCE_CLASS}`);
    $appointments.each((_, element) => {
      const appointmentInstance = $(element).dxSchedulerAppointment('instance');
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
      } = $item.data(APPOINTMENT_SETTINGS_KEY);
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
    const horizontalResizables = grep($allResizableElements, el => {
      const $el = $(el);
      const resizableInst = $el.dxResizable('instance');
      const {
        area,
        handles
      } = resizableInst.option();
      return (handles === 'right left' || handles === 'left right') && isPlainObject(area);
    });
    each(horizontalResizables, (_, el) => {
      const $el = $(el);
      const position = locate($el);
      const appointmentData = this._getItemData($el);
      const area = this._calculateResizableArea({
        left: position.left
      }, appointmentData);
      $el.dxResizable('instance').option('area', area);
    });
  }
}
registerComponent('dxSchedulerAppointments', SchedulerAppointments);
export default SchedulerAppointments;
