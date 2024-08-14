import * as React from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from '@mui/material';

export default function CommonlyUsedComponents({ label, value, onChange, width = '100%', justifyContent = 'center', alignItems = 'center'}) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Box sx={{
        paddingTop: 1,
        display: 'flex',
        justifyContent,
        alignItems,
      }}>
        <DatePicker sx={{ width }} label={label} value={value._d} onChange={onChange} />
      </Box>
    </LocalizationProvider>
  );
}