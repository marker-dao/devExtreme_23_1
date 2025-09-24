const isString = str => Boolean(str);
export const daysFromByDayRule = rule => {
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