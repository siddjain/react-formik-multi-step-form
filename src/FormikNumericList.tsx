import React from "react";
import styled from "styled-components";
import { useFormikContext, useField } from "formik";
import NumericList, { ListProps } from "./NumericList";

interface FormikNumericListProps extends ListProps {
  name: string;
}

const FormikNumericList: React.FunctionComponent<FormikNumericListProps> = (
  props: FormikNumericListProps
) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props.name);

  return (
    <NumericList
      {...field}
      {...props}
      value={field.value}
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
    />
  );
};

export default FormikNumericList;
