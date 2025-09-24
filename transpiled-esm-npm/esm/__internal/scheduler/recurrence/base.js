import dateUtils from '../../../core/utils/date';
const toMs = dateUtils.dateToMilliseconds;
export const getAsciiStringByDate = date => {
  const currentOffset = date.getTimezoneOffset() * toMs('minute');
  const offsetDate = new Date(date.getTime() + currentOffset);
  return `${offsetDate.getFullYear() + `0${offsetDate.getMonth() + 1}`.slice(-2) + `0${offsetDate.getDate()}`.slice(-2)}T${`0${offsetDate.getHours()}`.slice(-2)}${`0${offsetDate.getMinutes()}`.slice(-2)}${`0${offsetDate.getSeconds()}`.slice(-2)}Z`;
};
export const getRecurrenceString = rule => {
  if (!(rule !== null && rule !== void 0 && rule.freq)) {
    return undefined;
  }
  const result = Object.entries(rule).reduce((acc, _ref) => {
    let [field, value] = _ref;
    if (field === 'freq' || field === 'interval' && value < 2) {
      return acc;
    }
    if (field === 'until') {
      return `${acc}${field}=${getAsciiStringByDate(value)};`;
    }
    return `${acc}${field}=${value};`;
  }, `freq=${rule.freq};`);
  return result.substring(0, result.length - 1).toUpperCase();
};
const createDateTuple = parseResult => {
  const isUtc = parseResult[8] !== undefined;
  parseResult.shift();
  if (parseResult[3] === undefined) {
    parseResult.splice(3);
  } else {
    parseResult.splice(3, 1);
    parseResult.splice(6);
  }
  parseResult.unshift('');
  return [parseInt(parseResult[1], 10), parseInt(parseResult[2], 10) - 1, parseInt(parseResult[3], 10), parseInt(parseResult[4], 10) || 0, parseInt(parseResult[5], 10) || 0, parseInt(parseResult[6], 10) || 0, isUtc];
};
const parseExceptionToRawArray = value => /(\d{4})(\d{2})(\d{2})(T(\d{2})(\d{2})(\d{2}))?(Z)?/.exec(value);
export const getDateByAsciiString = exceptionText => {
  if (typeof exceptionText !== 'string') {
    return exceptionText;
  }
  const result = parseExceptionToRawArray(exceptionText);
  if (!result) {
    return null;
  }
  const [year, month, date, hours, minutes, seconds, isUtc] = createDateTuple(result);
  if (isUtc) {
    return new Date(Date.UTC(year, month, date, hours, minutes, seconds));
  }
  return new Date(year, month, date, hours, minutes, seconds);
};
export const parseRecurrenceRule = recurrenceRule => {
  const emptyRule = {
    interval: 1
  };
  if (!recurrenceRule) {
    return emptyRule;
  }
  const ruleParts = recurrenceRule.split(';');
  const ruleObject = ruleParts.reduce((result, part) => {
    const rule = part.split('=');
    const ruleName = rule[0].toLowerCase();
    const ruleValue = rule[1];
    switch (ruleName) {
      case 'count':
      case 'interval':
        {
          const value = parseInt(ruleValue, 10);
          if (!isNaN(value)) {
            result[ruleName] = value;
          }
          break;
        }
      default:
        result[ruleName] = ruleValue;
    }
    return result;
  }, emptyRule);
  if (ruleObject.freq && ruleObject.until) {
    ruleObject.until = getDateByAsciiString(ruleObject.until);
  }
  return ruleObject;
};