"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _date = _interopRequireDefault(require("../../../../core/utils/date"));
var _extend = require("../../../../core/utils/extend");
var _math = require("../../../../core/utils/math");
var _type = require("../../../../core/utils/type");
var _index = require("../../../scheduler/r1/utils/index");
var _m_utils_time_zone = _interopRequireDefault(require("../../m_utils_time_zone"));
var _appointment_adapter = require("../../utils/appointment_adapter/appointment_adapter");
var _m_strategy_base = _interopRequireDefault(require("./m_strategy_base"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const ALLDAY_APPOINTMENT_MIN_VERTICAL_OFFSET = 5;
const ALLDAY_APPOINTMENT_MAX_VERTICAL_OFFSET = 20;
const toMs = _date.default.dateToMilliseconds;
class VerticalRenderingStrategy extends _m_strategy_base.default {
  getDeltaTime(args, initialSize, appointment) {
    let deltaTime = 0;
    if (this.isAllDay(appointment)) {
      deltaTime = this._getDeltaWidth(args, initialSize) * toMs('day');
    } else {
      const deltaHeight = args.height - initialSize.height;
      deltaTime = toMs('minute') * Math.round(deltaHeight / this.cellHeight * this.cellDurationInMinutes);
    }
    return deltaTime;
  }
  _correctCollectorCoordinatesInAdaptive(coordinates, isAllDay) {
    if (isAllDay) {
      super._correctCollectorCoordinatesInAdaptive(coordinates, isAllDay);
    } else if (this._getMaxAppointmentCountPerCellByType() === 0) {
      const {
        cellHeight
      } = this;
      const {
        cellWidth
      } = this;
      coordinates.top += (cellHeight - this.getDropDownButtonAdaptiveSize()) / 2;
      coordinates.left += (cellWidth - this.getDropDownButtonAdaptiveSize()) / 2;
    }
  }
  getAppointmentGeometry(coordinates) {
    let geometry = null;
    if (coordinates.allDay) {
      geometry = this._getAllDayAppointmentGeometry(coordinates);
    } else {
      geometry = this.isAdaptive && coordinates.isCompact ? this._getAdaptiveGeometry(coordinates) : this._getVerticalAppointmentGeometry(coordinates);
    }
    return super.getAppointmentGeometry(geometry);
  }
  _getAdaptiveGeometry(coordinates) {
    const config = this._calculateGeometryConfig(coordinates);
    return this._customizeCoordinates(coordinates, config.height, config.appointmentCountPerCell, config.offset);
  }
  _getItemPosition(initialAppointment) {
    const allDay = this.isAllDay(initialAppointment);
    if (allDay) {
      return super._getItemPosition(initialAppointment);
    }
    const appointment = super.shiftAppointmentByViewOffset(initialAppointment);
    const adapter = new _appointment_adapter.AppointmentAdapter(appointment, this.dataAccessors);
    const isRecurring = adapter.isRecurrent;
    const {
      startDate: appointmentStartDate,
      endDate: appointmentEndDate
    } = adapter.getCalculatedDates(this.timeZoneCalculator, 'toGrid');
    const appointmentDuration = appointmentEndDate.getTime() - appointmentStartDate.getTime();
    const appointmentBeginInCurrentView = this.options.startViewDate < appointmentStartDate;
    const isAppointmentTakesSeveralDays = !_m_utils_time_zone.default.isSameAppointmentDates(appointmentStartDate, appointmentEndDate);
    const settings = this.generateAppointmentSettings(appointment);
    let result = [];
    for (let j = 0; j < settings.length; j++) {
      const currentSetting = settings[j];
      const height = this.calculateAppointmentHeight(appointment, currentSetting);
      const width = this.calculateAppointmentWidth(appointment, currentSetting);
      let resultHeight = height;
      let appointmentReduced = null;
      let multiDaysAppointmentParts = [];
      const currentMaxAllowedPosition = currentSetting.vMax;
      if (this._isMultiViewAppointment(currentSetting, height) || isAppointmentTakesSeveralDays && !isRecurring) {
        const trimmedStartDate = _date.default.trimTime(appointmentStartDate);
        const trimmedSettingStartDate = _date.default.trimTime(currentSetting.info.appointment.startDate);
        const reduceHead = trimmedStartDate <= trimmedSettingStartDate || isRecurring;
        if (reduceHead) {
          resultHeight = this._reduceMultiDayAppointment(height, {
            top: currentSetting.top,
            bottom: currentMaxAllowedPosition
          });
          multiDaysAppointmentParts = this._getAppointmentParts({
            sourceAppointmentHeight: height,
            reducedHeight: resultHeight,
            width
          }, currentSetting);
        }
        const {
          startDate: currentSettingStartDate,
          normalizedEndDate: currentSettingNormalizedEndDate
        } = currentSetting.info.appointment;
        const currentSettingDuration = currentSettingNormalizedEndDate - currentSettingStartDate;
        const hasNextParts = currentSettingDuration < appointmentDuration;
        appointmentReduced = hasNextParts ? appointmentBeginInCurrentView ? 'head' : 'body' : appointmentBeginInCurrentView ? 'head' : 'tail';
      }
      (0, _extend.extend)(currentSetting, {
        height: resultHeight,
        width,
        allDay,
        appointmentReduced
      });
      result = this._getAppointmentPartsPosition(multiDaysAppointmentParts, currentSetting, result);
    }
    return result;
  }
  _isMultiViewAppointment(_ref, height) {
    let {
      vMax,
      top
    } = _ref;
    // NOTE: we round these numbers, because in js 100 - 33.3333 = 66.66669999
    const fullAppointmentHeight = (0, _math.roundFloatPart)(height, 2);
    const remainingHeight = (0, _math.roundFloatPart)(vMax - top, 2);
    return fullAppointmentHeight > remainingHeight;
  }
  _reduceMultiDayAppointment(sourceAppointmentHeight, bound) {
    return Math.min(sourceAppointmentHeight, bound.bottom - Math.floor(bound.top));
  }
  _getGroupHeight() {
    return this.cellHeight * this.rowCount;
  }
  _getGroupTopOffset(appointmentSettings) {
    const {
      groupIndex
    } = appointmentSettings;
    const groupTop = Math.max(0, this.positionHelper.getGroupTop({
      groupIndex,
      showAllDayPanel: this.showAllDayPanel,
      isGroupedAllDayPanel: this.isGroupedAllDayPanel
    }));
    const allDayPanelOffset = this.positionHelper.getOffsetByAllDayPanel({
      groupIndex,
      supportAllDayRow: this.allDaySupported(),
      showAllDayPanel: this.showAllDayPanel
    });
    const appointmentGroupTopOffset = appointmentSettings.top - groupTop - allDayPanelOffset;
    return appointmentGroupTopOffset;
  }
  _getTailHeight(appointmentGeometry, appointmentSettings) {
    if (!this.isVirtualScrolling) {
      return appointmentGeometry.sourceAppointmentHeight - appointmentGeometry.reducedHeight;
    }
    const appointmentGroupTopOffset = this._getGroupTopOffset(appointmentSettings);
    const {
      sourceAppointmentHeight
    } = appointmentGeometry;
    const groupHeight = this._getGroupHeight();
    const tailHeight = appointmentGroupTopOffset + sourceAppointmentHeight - groupHeight;
    return tailHeight;
  }
  _getAppointmentParts(appointmentGeometry, appointmentSettings) {
    const {
      width
    } = appointmentGeometry;
    const result = [];
    let currentPartTop = Math.max(0, this.positionHelper.getGroupTop({
      groupIndex: appointmentSettings.groupIndex,
      showAllDayPanel: this.showAllDayPanel,
      isGroupedAllDayPanel: this.isGroupedAllDayPanel
    }));
    const cellsDiff = this.isGroupedByDate ? this.groupCount : 1;
    const offset = this.cellWidth * cellsDiff;
    const allDayPanelOffset = this.positionHelper.getOffsetByAllDayPanel({
      groupIndex: appointmentSettings.groupIndex,
      supportAllDayRow: this.allDaySupported(),
      showAllDayPanel: this.showAllDayPanel
    });
    currentPartTop += allDayPanelOffset;
    const minHeight = this.getAppointmentMinSize();
    const {
      hMax,
      vMax,
      vMin
    } = appointmentSettings;
    const {
      bottomVirtualRowHeight = 0
    } = this.viewDataProvider.getViewOptions();
    const maxHeight = this.isVirtualScrolling ? vMax + bottomVirtualRowHeight : vMax - vMin;
    const hasTailPart = this.options.endViewDate > appointmentSettings.info.appointment.endDate;
    let left = Math.round(appointmentSettings.left + offset);
    let tailHeight = this._getTailHeight(appointmentGeometry, appointmentSettings);
    let {
      columnIndex
    } = appointmentSettings;
    while (tailHeight > 0 && left < hMax) {
      tailHeight = Math.max(minHeight, tailHeight);
      columnIndex += cellsDiff;
      const height = Math.min(tailHeight, maxHeight);
      result.push(_extends({}, appointmentSettings, {
        top: currentPartTop,
        left,
        height,
        width,
        appointmentReduced: 'body',
        rowIndex: 0,
        columnIndex
      }));
      left += offset;
      tailHeight -= maxHeight;
    }
    if (hasTailPart && result.length > 0) {
      result[result.length - 1].appointmentReduced = 'tail';
    }
    return result;
  }
  _getMinuteHeight() {
    return this.cellHeight / this.cellDurationInMinutes;
  }
  _getCompactLeftCoordinate(itemLeft, index) {
    const cellBorderSize = 1;
    const cellWidth = this.cellWidth || this.getAppointmentMinSize();
    return itemLeft + (cellBorderSize + cellWidth) * index;
  }
  _getVerticalAppointmentGeometry(coordinates) {
    const config = this._calculateVerticalGeometryConfig(coordinates);
    return this._customizeVerticalCoordinates(coordinates, config.width, config.appointmentCountPerCell, config.offset);
  }
  _customizeVerticalCoordinates(coordinates, width, appointmentCountPerCell, topOffset, isAllDay) {
    const appointmentWidth = Math.max(width / appointmentCountPerCell, width / coordinates.count);
    const {
      height
    } = coordinates;
    const appointmentLeft = coordinates.left + coordinates.index * appointmentWidth;
    const {
      top
    } = coordinates;
    if (coordinates.isCompact) {
      this._markAppointmentAsVirtual(coordinates, isAllDay);
    }
    return {
      height,
      width: appointmentWidth,
      top,
      left: appointmentLeft,
      empty: this._isAppointmentEmpty(height, width)
    };
  }
  _calculateVerticalGeometryConfig(coordinates) {
    const overlappingMode = this.maxAppointmentsPerCell;
    const offsets = this._getOffsets();
    const appointmentDefaultOffset = this._getAppointmentDefaultOffset();
    let appointmentCountPerCell = this._getAppointmentCount(overlappingMode, coordinates);
    let ratio = this._getDefaultRatio(coordinates, appointmentCountPerCell);
    let maxWidth = this._getMaxWidth();
    if (!appointmentCountPerCell) {
      appointmentCountPerCell = coordinates.count;
      ratio = (maxWidth - offsets.unlimited) / maxWidth;
    }
    let topOffset = (1 - ratio) * maxWidth;
    if (overlappingMode === 'auto' || (0, _type.isNumeric)(overlappingMode)) {
      ratio = 1;
      maxWidth -= appointmentDefaultOffset;
      topOffset = 0;
    }
    return {
      width: ratio * maxWidth,
      appointmentCountPerCell,
      offset: topOffset
    };
  }
  _getMaxWidth() {
    return this.cellWidth;
  }
  isAllDay(appointmentData) {
    return (0, _index.isAppointmentTakesAllDay)(new _appointment_adapter.AppointmentAdapter(appointmentData, this.dataAccessors), this.allDayPanelMode);
  }
  _getAppointmentMaxWidth() {
    return this.cellWidth - this._getAppointmentDefaultOffset();
  }
  calculateAppointmentWidth(appointment, position) {
    if (!this.isAllDay(appointment)) {
      return 0;
    }
    const {
      startDate: startDateWithTime,
      endDate,
      normalizedEndDate
    } = position.info.appointment;
    const startDate = _date.default.trimTime(startDateWithTime);
    const cellWidth = this.cellWidth || this.getAppointmentMinSize();
    const durationInHours = (normalizedEndDate.getTime() - startDate.getTime()) / toMs('hour');
    const skippedHours = (0, _index.getSkippedHoursInRange)(startDate, endDate, appointment.allDay, this.viewDataProvider);
    let width = Math.ceil((durationInHours - skippedHours) / 24) * cellWidth;
    width = this.cropAppointmentWidth(width, cellWidth);
    return width;
  }
  calculateAppointmentHeight(appointment, position) {
    if (this.isAllDay(appointment)) {
      return 0;
    }
    const {
      startDate,
      normalizedEndDate
    } = position.info.appointment;
    const allDay = this.dataAccessors.get('allDay', appointment);
    const duration = this.getAppointmentDurationInMs(startDate, normalizedEndDate, allDay);
    const skippedMinutes = (0, _index.getSkippedHoursInRange)(startDate, normalizedEndDate, appointment.allDay, this.viewDataProvider) * 60;
    const durationInMinutes = this._adjustDurationByDaylightDiff(duration, startDate, normalizedEndDate) / toMs('minute') - skippedMinutes;
    const height = durationInMinutes * this._getMinuteHeight();
    return height;
  }
  getDirection() {
    return 'vertical';
  }
  _sortCondition(a, b) {
    if (!!a.allDay !== !!b.allDay) {
      return a.allDay ? 1 : -1;
    }
    const isAllDay = a.allDay && b.allDay;
    return this.groupOrientation === 'vertical' && isAllDay ? this._columnCondition(a, b) : this._rowCondition(a, b);
  }
  allDaySupported() {
    return true;
  }
  _getAllDayAppointmentGeometry(coordinates) {
    const config = this._calculateGeometryConfig(coordinates);
    return this._customizeCoordinates(coordinates, config.height, config.appointmentCountPerCell, config.offset, true);
  }
  _calculateGeometryConfig(coordinates) {
    if (!this.allowResizing || !this.allowAllDayResizing) {
      coordinates.skipResizing = true;
    }
    const config = super._calculateGeometryConfig(coordinates);
    const minAppointmentCountPerCell = Math.min(config.appointmentCountPerCell, this._getDynamicAppointmentCountPerCell().allDay);
    if (coordinates.allDay && coordinates.count <= minAppointmentCountPerCell) {
      config.offset = 0;
    }
    return config;
  }
  _getAppointmentCount(overlappingMode, coordinates) {
    return overlappingMode !== 'auto' && coordinates.count === 1 && !(0, _type.isNumeric)(overlappingMode) ? coordinates.count : this._getMaxAppointmentCountPerCellByType(coordinates.allDay);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _getDefaultRatio(coordinates, appointmentCountPerCell) {
    return coordinates.count > this.appointmentCountPerCell ? 0.65 : 1;
  }
  _getOffsets() {
    return {
      unlimited: ALLDAY_APPOINTMENT_MIN_VERTICAL_OFFSET,
      auto: ALLDAY_APPOINTMENT_MAX_VERTICAL_OFFSET
    };
  }
  _getMaxHeight() {
    return this.allDayHeight || this.getAppointmentMinSize();
  }
  // eslint-disable-next-line class-methods-use-this
  _needVerticalGroupBounds(allDay) {
    return !allDay;
  }
  _needHorizontalGroupBounds() {
    return false;
  }
  getPositionShift(timeShift, isAllDay) {
    if (!isAllDay && this.isAdaptive && this._getMaxAppointmentCountPerCellByType(isAllDay) === 0) {
      return {
        top: 0,
        left: 0,
        cellPosition: 0
      };
    }
    return super.getPositionShift(timeShift, isAllDay);
  }
}
var _default = exports.default = VerticalRenderingStrategy;