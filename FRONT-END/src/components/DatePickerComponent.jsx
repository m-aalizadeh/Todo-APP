import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function DatePickerComponent({
  label = "Date Picker",
  onChange,
  value,
  minDate,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        slotProps={{
          textField: {
            helperText: "YYYY-MM-DD",
          },
        }}
        value={value}
        minDate={minDate}
        onChange={(newValue) => onChange(newValue)}
      />
    </LocalizationProvider>
  );
}
