import dayjs from 'dayjs';

export const isDateDisabled = (date, disabledDates = []) => {
  return disabledDates.some(disabledDate => 
    dayjs(date).isSame(dayjs(disabledDate), 'day')
  );
};

export const shouldHighlightDate = (day, startDate, endDate, hoveredDate) => {
  if (!startDate || !endDate) {
    if (startDate && hoveredDate && !endDate) {
      const date = dayjs(day);
      if (dayjs(hoveredDate).isBefore(startDate)) {
        return date.isBetween(hoveredDate, startDate, 'day', '[]');
      } else {
        return date.isBetween(startDate, hoveredDate, 'day', '[]');
      }
    }
    return false;
  }
  
  const date = dayjs(day);
  return date.isBetween(startDate, endDate, 'day', '[]');
};