import * as React from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useComponentContext } from "../context/ComponentContext";
import { ActionTypes } from "../reducers/actionTypes";
import { TextField } from "@mui/material";

export const Calendar = () => {
  const {
    dispatch,
    state: { selectedDate },
  } = useComponentContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        openTo="day"
        value={selectedDate}
        onChange={(selectedDate) => {
          const date = new Date(selectedDate || '');
          dispatch({ type: ActionTypes.SET_DATE, payload: date })
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};
