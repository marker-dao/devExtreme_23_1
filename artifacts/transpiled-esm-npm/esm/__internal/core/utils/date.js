var addOffsets = (date, offsets) => {
  var newDateMs = offsets.reduce((result, offset) => result + offset, date.getTime());
  return new Date(newDateMs);
};
export var dateUtilsTs = {
  addOffsets
};