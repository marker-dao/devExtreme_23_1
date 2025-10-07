/**
* DevExtreme (cjs/__internal/scheduler/appointments/utils/count_visible_appointments.js)
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
exports.countVisibleAppointments = void 0;
const countVisibleAppointments = items => {
  const alreadyCountedPartHash = new Map();
  const countPart = item => {
    if (!item.partTotalCount) {
      return true;
    }
    const key = `${item.info.appointment.startDate.getTime()}${item.info.appointment.endDate.getTime()}`;
    const savedItems = alreadyCountedPartHash.get(key) ?? [];
    if (savedItems.includes(item.itemData)) {
      return false;
    }
    alreadyCountedPartHash.set(key, [...savedItems, item.itemData]);
    return true;
  };
  return items.reduce((count, item) => {
    if ('items' in item) {
      return count + item.items.filter(countPart).length;
    }
    if ('isAgendaModel' in item) {
      return count + 1;
    }
    if ('info' in item && !countPart(item)) {
      return count;
    }
    return count + 1;
  }, 0);
};
exports.countVisibleAppointments = countVisibleAppointments;
