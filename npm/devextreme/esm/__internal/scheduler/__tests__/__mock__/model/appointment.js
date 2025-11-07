/**
* DevExtreme (esm/__internal/scheduler/__tests__/__mock__/model/appointment.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
const EMPTY_POSITION = {
  top: 0,
  left: 0,
  width: 0,
  height: 0
};
const getColor = appointment => appointment.style.backgroundColor;
const getAgendaColor = appointment => {
  const marker = appointment.querySelector('.dx-scheduler-agenda-appointment-marker');
  return getColor(marker);
};
const getText = element => {
  var _element$querySelecto;
  return (element === null || element === void 0 || (_element$querySelecto = element.querySelector('.dx-scheduler-appointment-title')) === null || _element$querySelecto === void 0 ? void 0 : _element$querySelecto.textContent) ?? '';
};
const getDisplayDate = element => {
  var _element$querySelecto2;
  return (element === null || element === void 0 || (_element$querySelecto2 = element.querySelector('.dx-scheduler-appointment-content-date')) === null || _element$querySelecto2 === void 0 ? void 0 : _element$querySelecto2.textContent) ?? '';
};
const getGeometry = element => {
  if (!element) {
    return EMPTY_POSITION;
  }
  const match = /translate\(([0-9.]*)px, ([0-9.]*)px\)/.exec(element.style.transform);
  if (!match) {
    return EMPTY_POSITION;
  }
  return {
    top: parseInt(match[2], 10),
    left: parseInt(match[1], 10),
    width: parseInt(element.style.width, 10),
    height: parseInt(element.style.height, 10)
  };
};
export const createAppointmentModel = element => ({
  element,
  getText: () => getText(element),
  getDisplayDate: () => getDisplayDate(element),
  getAriaLabel: () => (element === null || element === void 0 ? void 0 : element.getAttribute('aria-label')) ?? '',
  getGeometry: () => getGeometry(element),
  getColor(view) {
    if (!element) {
      return undefined;
    }
    return view === 'agenda' ? getAgendaColor(element) : getColor(element);
  },
  getSnapshot: () => _extends({
    text: getText(element),
    date: getDisplayDate(element)
  }, getGeometry(element))
});
