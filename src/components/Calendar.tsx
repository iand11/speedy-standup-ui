import * as React from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import { useComponentContext } from "../context/ComponentContext";
import { ActionTypes } from "../reducers/actionTypes";
import { TextField } from "@mui/material";

export const Calendar = () => {
  const {
    dispatch,
    state: { selectedDate },
  } = useComponentContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
