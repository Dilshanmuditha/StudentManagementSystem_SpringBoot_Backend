import { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment, { Moment } from "moment";

// First Component
export const CustomDateSelect = ({
  DateValue,
}: {
  DateValue: string | null;
}) => {
  const [value, setValue] = useState<number>(Date.now());
  console.log(value);

  const handleDateChange = (date: Moment | null) => {
    if (date) {
      console.log(moment(date).format("YYYY-M-D"));
      setValue(date.valueOf());
    }
  };

  useEffect(() => {
    if (DateValue != null) {
      const dateObject = moment(DateValue, "YYYY-M-D");
      setValue(dateObject.valueOf());
    }
  }, []);

  return (
    <>
      <LocalizationProvider
        dateAdapter={AdapterMoment}
        dateLibInstance={moment}
      >
        <DatePicker
          label="Controlled picker"
          value={moment(value)}
          onChange={handleDateChange}
        />
      </LocalizationProvider>
    </>
  );
};

// Second Component
export const CustomCalendarView = ({
  DateValue,
}: {
  DateValue: string | null;
}) => {
  const [value, setValue] = useState<number>(Date.now());

  const handleDateChange = (date: Moment | null) => {
    if (date) {
      console.log(moment(date).format("YYYY-M-D"));
      setValue(date.valueOf());
    }
  };

  useEffect(() => {
    if (DateValue != null) {
      const dateObject = moment(DateValue, "YYYY-M-D");
      setValue(dateObject.valueOf());
    }
  }, []);

  return (
    <>
      <LocalizationProvider
        dateAdapter={AdapterMoment}
        dateLibInstance={moment}
      >
        <StaticDatePicker
          value={moment(value)}
          onChange={handleDateChange}
        />
      </LocalizationProvider>
    </>
  );
};
