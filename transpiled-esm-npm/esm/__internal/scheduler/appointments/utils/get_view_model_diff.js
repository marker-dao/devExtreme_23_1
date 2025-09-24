import { equalByValue } from '../../../../core/utils/common';
import { getArraysDiff } from './get_arrays_diff';
const getObjectToCompare = item => {
  if ('isAgendaModel' in item) {
    return {};
  }
  if ('items' in item) {
    return {
      allDay: item.allDay,
      groupIndex: item.groupIndex,
      top: item.top,
      left: item.left,
      items: item.items.length
    };
  }
  return {
    allDay: item.allDay,
    groupIndex: item.groupIndex,
    direction: item.direction,
    left: item.left,
    top: item.top,
    height: item.height,
    width: item.width,
    reduced: item.reduced,
    partIndex: item.partIndex,
    partTotalCount: item.partTotalCount,
    rowIndex: item.rowIndex,
    columnIndex: item.columnIndex
  };
};
const isDataChanged = (data, appointmentDataSource) => {
  const updatedData = appointmentDataSource.getUpdatedAppointment();
  return updatedData === data || appointmentDataSource.getUpdatedAppointmentKeys().some(item => data[item.key] === item.value);
};
const compareViewModel = appointmentDataSource => (viewModelOld, viewModelNext) => viewModelOld.itemData === viewModelNext.itemData && !isDataChanged(viewModelNext.itemData, appointmentDataSource) && equalByValue(getObjectToCompare(viewModelOld), getObjectToCompare(viewModelNext));
export const getViewModelDiff = (viewModelOld, viewModelNext, appointmentDataSource) => getArraysDiff(viewModelOld, viewModelNext, compareViewModel(appointmentDataSource));