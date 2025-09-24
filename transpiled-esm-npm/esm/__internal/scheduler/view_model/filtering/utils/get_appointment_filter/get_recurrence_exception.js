import dateSerialization from '../../../../../../core/utils/date_serialization';
import timeZoneUtils from '../../../../m_utils_time_zone';
const FULL_DATE_FORMAT = 'yyyyMMddTHHmmss';
const convertRecurrenceException = (rawExceptionString, startDate, timeZoneCalculator) => {
  const exceptionString = rawExceptionString.replace(/\s/g, '');
  const exceptionDate = dateSerialization.deserializeDate(exceptionString);
  const convertedStartDate = timeZoneCalculator.createDate(startDate, 'toGrid');
  let convertedExceptionDate = timeZoneCalculator.createDate(exceptionDate, 'toGrid');
  convertedExceptionDate = timeZoneUtils.correctRecurrenceExceptionByTimezone(convertedExceptionDate, convertedStartDate);
  return dateSerialization.serializeDate(convertedExceptionDate, FULL_DATE_FORMAT);
};
export const getRecurrenceException = (recurrenceException, startDate, timeZoneCalculator) => {
  if (recurrenceException) {
    const exceptions = recurrenceException.split(',');
    for (let i = 0; i < exceptions.length; i += 1) {
      exceptions[i] = convertRecurrenceException(exceptions[i], startDate, timeZoneCalculator);
    }
    return exceptions.join();
  }
  return recurrenceException;
};