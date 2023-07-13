import { Field, ErrorMessage, useFormikContext } from "formik/dist";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextError } from "./TextError";
function DatePickerViews(props) {
  const { label, name, ...rest } = props;
  const { setFieldValue } = useFormikContext();
  const handleDateChange = (date) => {
    if (date) {
      const formattedDate = dayjs(date).format("YYYY-MM-DD");
      setFieldValue(name, formattedDate);
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        views={["year", "month", "day"]}
        {...rest}
        onChange={handleDateChange}
      />
    </LocalizationProvider>
  );
}

DatePickerViews.propTypes = {
  label: PropTypes.string.isRequired,
};

const DateTimePicker = (props) => {
  const { name, label, ...rest } = props;

  return (
    <Grid container direction="column" gap={1}>
      <Field
        name={name}
        as={DatePickerViews}
        label={label}
        {...rest}
        type="date"
      />
      <ErrorMessage name={name} component={TextError} />
    </Grid>
  );
};

DateTimePicker.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
  placeholder: PropTypes.string,
};

export default DateTimePicker;
