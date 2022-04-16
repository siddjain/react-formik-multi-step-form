import React from "react";
import styled from "styled-components";
import { useFormikContext, useField } from "formik";
import { Form } from "react-bootstrap";

interface FormikSwitchProps {
  name: string;
  label?: string;
}

export const FormikSwitch: React.FunctionComponent<FormikSwitchProps> = (
  props: FormikSwitchProps
) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props.name);

  // https://react-bootstrap.github.io/forms/checks-radios/
  // https://stackoverflow.com/a/60037847/147530
  return (
    <Form.Switch
      {...field}
      {...props}
      checked={field.value}
      onChange={() => {
        // toggle the value between true and false
        setFieldValue(props.name, !field.value);
      }}
    />
  );
};
