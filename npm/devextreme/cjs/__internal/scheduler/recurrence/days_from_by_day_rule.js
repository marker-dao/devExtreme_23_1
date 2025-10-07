/**
* DevExtreme (cjs/__internal/scheduler/recurrence/days_from_by_day_rule.js)
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
exports.daysFromByDayRule = void 0;
const isString = str => Boolean(str);
const daysFromByDayRule = rule => {
  let result = [];
  if (rule.byday) {
    if (Array.isArray(rule.byday)) {
      result = rule.byday;
    } else {
      result = rule.byday.split(',');
    }
  }
  return result.map(item => {
    const match = /[A-Za-z]+/.exec(item);
    return match && String(match[0]);
  }).filter(isString);
};
exports.daysFromByDayRule = daysFromByDayRule;
