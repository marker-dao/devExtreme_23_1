export const countVisibleAppointments = items => {
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