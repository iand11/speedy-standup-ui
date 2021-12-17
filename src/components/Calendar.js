import * as React from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import { useComponentContext } from "../context/componentContext";
import { actionTypes } from "../reducers/actionTypes";

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
          dispatch({ type: actionTypes.SET_DATE, payload: selectedDate })
        }}
      />
    </LocalizationProvider>
  );
};
