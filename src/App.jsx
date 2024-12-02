import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, Paper, Typography } from '@mui/material';
import dayjs from 'dayjs';
import DateRangeCalendar from './components/DateRangeCalendar';

const App = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isSelectingStart, setIsSelectingStart] = useState(true);

  // Test data: December 2nd and 3rd, 2024
  const disabledDates = [
    dayjs('2024-12-02'),
    dayjs('2024-12-03')
  ];

  const handleDateSelect = (date) => {
    if (isSelectingStart) {
      setStartDate(date);
      setEndDate(null);
    } else {
      if (dayjs(date).isBefore(startDate)) {
        setStartDate(date);
        setEndDate(startDate);
      } else {
        setEndDate(date);
      }
    }
    setIsSelectingStart(!isSelectingStart);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        gap: 4,
        p: 4,
        minHeight: '100vh',
        bgcolor: '#f5f5f5'
      }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Date Range Selection
        </Typography>
        
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {isSelectingStart ? 'Select start date' : 'Select end date'}
        </Typography>

        <DateRangeCalendar 
          value={startDate}
          onChange={handleDateSelect}
          startDate={startDate}
          endDate={endDate}
          disabledDates={disabledDates}
        />

        <Paper elevation={3} sx={{ p: 2, minWidth: 300 }}>
          <Typography variant="body1">
            Selected Range: {startDate ? dayjs(startDate).format('MMM D, YYYY') : 'Not selected'} 
            {' '} to {' '}
            {endDate ? dayjs(endDate).format('MMM D, YYYY') : 'Not selected'}
          </Typography>
        </Paper>
      </Box>
    </LocalizationProvider>
  );
};

export default App;