const addOffsets = function (date) {
  for (var _len = arguments.length, offsets = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    offsets[_key - 1] = arguments[_key];
  }
  const newDateMs = offsets.reduce((result, offset) => result + offset, date.getTime());
  return new Date(newDateMs);
};
const isValidDate = date => Boolean(date && !isNaN(new Date(date).valueOf()));
export const dateUtilsTs = {
  addOffsets,
  isValidDate
};