import React from "react";
import styled from "styled-components";
import DateTimeRangePicker, {
  DateTimeRangePickerProps
} from "@wojtekmaj/react-datetimerange-picker"; // 113 kB
import { useFormikContext, useField } from "formik"; // 580 kB
import * as _ from "lodash";

const Picker = styled(DateTimeRangePicker)`
  display: flex;
  align-items: flex-start;

  .react-datetimerange-picker__wrapper {
    flex-grow: 0;
    border: 1px solid var(--color-gray-400);

    .react-datetimerange-picker__inputGroup {
      padding: var(--input-padding-y-lg) var(--input-padding-x-lg);
    }
  }

  .react-datetimerange-picker__calendar {
    z-index: 1000;
  }
`;

const DateRangePicker: React.FunctionComponent<DateTimeRangePickerProps> = (
  props: DateTimeRangePickerProps
) => {
  return <Picker {...props}></Picker>;
};

export const FormikDateTimeRangeField = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props.name);

  // see https://github.com/jaredpalmer/formik/issues/2019#issuecomment-782164391
  // for why we are omitting onBlur
  return (
    <DateRangePicker
      {..._.omit(field, "onBlur")}
      {...props}
      value={field.value}
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
    />
  );
};
