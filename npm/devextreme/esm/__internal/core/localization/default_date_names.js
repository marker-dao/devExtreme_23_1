/**
* DevExtreme (esm/__internal/core/localization/default_date_names.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { map } from '../../core/utils/m_iterator';
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const PERIODS = ['AM', 'PM'];
const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4'];
// TODO: optimize
const cutCaptions = (captions, format) => {
  const lengthByFormat = {
    abbreviated: 3,
    short: 2,
    narrow: 1
  };
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return map(captions, caption => caption.substr(0, lengthByFormat[format]));
};
export default {
  getMonthNames(format) {
    return cutCaptions(MONTHS, format);
  },
  getDayNames(format) {
    return cutCaptions(DAYS, format);
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getQuarterNames(_format) {
    return QUARTERS;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getPeriodNames(_format) {
    return PERIODS;
  }
};
