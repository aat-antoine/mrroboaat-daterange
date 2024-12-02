import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Paper } from '@mui/material';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import minMax from 'dayjs/plugin/minMax';
import { useState } from 'react';
import { isDateDisabled, shouldHighlightDate } from '../utils/dateUtils';

dayjs.extend(isBetween);
dayjs.extend(minMax);

const DateRangeCalendar = ({ 
  value,
  onChange,
  startDate,
  endDate,
  disabledDates = []
}) => {
  const [hoveredDate, setHoveredDate] = useState(null);

  const handleDateChange = (date) => {
    if (!isDateDisabled(date, disabledDates)) {
      onChange(date);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <DateCalendar 
        value={value}
        onChange={handleDateChange}
        slotProps={{
          day: (ownerState) => {
            const isDisabled = isDateDisabled(ownerState.day, disabledDates);
            const highlighted = shouldHighlightDate(ownerState.day, startDate, endDate, hoveredDate);
            const isStartOrEnd = (startDate && dayjs(ownerState.day).isSame(startDate, 'day')) || 
                               (endDate && dayjs(ownerState.day).isSame(endDate, 'day'));
            const isInRange = startDate && endDate && highlighted;
            const isHoverPreview = startDate && hoveredDate && !endDate && highlighted;
            
            return {
              disabled: isDisabled,
              onPointerEnter: () => !isDisabled && setHoveredDate(ownerState.day),
              onPointerLeave: () => !isDisabled && setHoveredDate(null),
              sx: {
                backgroundColor: isDisabled ? '#f5f5f5 !important' :
                               isStartOrEnd ? '#1565c0 !important' : 
                               isInRange ? 'rgba(25, 118, 210, 0.12) !important' : 
                               'transparent',
                color: isDisabled ? '#9e9e9e !important' :
                       isStartOrEnd ? '#fff' : 
                       undefined,
                position: 'relative',
                borderRadius: '50% !important',
                borderTop: isHoverPreview ? '1px dashed #9e9e9e !important' : undefined,
                borderBottom: isHoverPreview ? '1px dashed #9e9e9e !important' : undefined,
                transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                cursor: isDisabled ? 'not-allowed !important' : 'pointer',
                '&:hover': {
                  backgroundColor: isDisabled ? '#f5f5f5 !important' :
                                 isStartOrEnd ? '#1565c0 !important' : 
                                 isInRange ? 'rgba(25, 118, 210, 0.12) !important' : 
                                 'transparent',
                  border: !isDisabled && !isInRange && !isStartOrEnd ? '1px solid #9e9e9e !important' : undefined
                },
                '&.Mui-selected': {
                  backgroundColor: isDisabled ? '#f5f5f5 !important' :
                                 isStartOrEnd ? '#1565c0 !important' : 
                                 isInRange ? 'rgba(25, 118, 210, 0.12) !important' : 
                                 'transparent',
                  color: isDisabled ? '#9e9e9e !important' :
                         isStartOrEnd ? '#fff !important' : 
                         undefined,
                },
                '&:focus': {
                  backgroundColor: isDisabled ? '#f5f5f5 !important' :
                                 isStartOrEnd ? '#1565c0 !important' : 
                                 isInRange ? 'rgba(25, 118, 210, 0.12) !important' : 
                                 'transparent',
                },
                '&.MuiPickersDay-today': {
                  border: '1px solid #1565c0',
                },
                '& .MuiPickersDay-dayWithMargin': {
                  borderRadius: '50%'
                },
                '& button': {
                  borderRadius: '50%'
                }
              }
            };
          },
          calendarHeader: {
            sx: {
              '& .MuiPickersCalendarHeader-label': {
                color: '#1565c0'
              }
            }
          }
        }}
        sx={{
          '& .MuiPickersDay-root': {
            margin: 0,
            width: 40,
            height: 40,
            borderRadius: '50%'
          },
          '& .MuiDayCalendar-weekContainer': {
            margin: 0
          },
          '& .MuiPickersDay-dayWithMargin': {
            borderRadius: '50%'
          },
          '& .MuiPickersDay-day': {
            borderRadius: '50%'
          }
        }}
      />
    </Paper>
  );
};

export default DateRangeCalendar;