import React from "react";
import styled from "styled-components";
import DateTimePicker from "react-datetime-picker"; // 220 kB
import { useFormikContext, useField } from "formik";
import * as _ from "lodash";
interface FormikDateTimeFieldProps {
  name: string;
  // see https://github.com/wojtekmaj/react-datetime-picker/blob/main/src/DateTimePicker.jsx
  // for all the properties that are accepted
}

const logDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  console.log(`${year}/${month + 1}/${day} ${hour}:${minute}:${second}`);
};

const Picker = styled(DateTimePicker)`
  display: flex;
  align-items: flex-start;

  .react-datetime-picker__wrapper {
    flex-grow: 0;
    border: 1px solid var(--color-gray-400);

    .react-datetime-picker__inputGroup {
      padding: var(--input-padding-y-lg) var(--input-padding-x-lg);
    }
  }

  .react-datetime-picker__calendar {
    z-index: 1000;
  }
`;

const FormikDateTimeField: React.FunctionComponent<FormikDateTimeFieldProps> = (
  props: FormikDateTimeFieldProps
) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props.name);
  // see https://github.com/jaredpalmer/formik/issues/2019#issuecomment-782164391
  // for why we are omitting onBlur
  return (
    <Picker
      {..._.omit(field, "onBlur")}
      {...props}
      value={field.value}
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
    />
  );
};

export default FormikDateTimeField;
