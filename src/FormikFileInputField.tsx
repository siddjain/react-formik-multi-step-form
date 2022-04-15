import React from "react";
import styled from "styled-components";
import { useFormikContext, useField } from "formik";
import FileInput, { FileInputProps } from "./FileInput";

interface FormikFileInputFieldProps extends FileInputProps {
  name: string;
}

const FormikFileInputField: React.FunctionComponent<FormikFileInputFieldProps> = (
  props: FormikFileInputFieldProps
) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props.name);

  return (
    <FileInput
      {...field}
      {...props}
      value={field.value}
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
    />
  );
};

export default FormikFileInputField;
