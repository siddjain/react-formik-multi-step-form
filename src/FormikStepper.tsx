/**
  MIT License

  Copyright (c) Siddharth Jain.

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
 */

import { Field, Form, Formik, FormikConfig, FormikValues } from "formik";
import React, { useState } from "react";
import Stepper from "./Stepper";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";

// https://github.com/jaredpalmer/formik/issues/431
// only validate or validationSchema should be used at a time
// if you use both results are undefined
export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
  label: string;
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

interface IStep {
  title?: string;
  href?: string;
  onClick?: () => void;
  icon?: object;
}

const generateStep = (e: React.ReactElement<FormikStepProps>): IStep => {
  return {
    title: e.props.label
  };
};

export function FormikStepper({
  children,
  ...props
}: FormikConfig<FormikValues>) {
  const childrenArray = React.Children.toArray(children) as React.ReactElement<
    FormikStepProps
  >[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          setCompleted(true);
        } else {
          setStep((s) => s + 1);

          // the next line was not covered in the youtube video
          //
          // If you have multiple fields on the same step
          // we will see they show the validation error all at the same time after the first step!
          //
          // If you want to keep that behaviour, then, comment the next line :)
          // If you want the second/third/fourth/etc steps with the same behaviour
          //    as the first step regarding validation errors, then the next line is for you! =)
          //
          // In the example of the video, it doesn't make any difference, because we only
          //    have one field with validation in the second step :)
          helpers.setTouched({});
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Stepper
            activeStep={step}
            steps={childrenArray.map((child, index) => generateStep(child))}
          />

          {currentChild}

          <Container>
            <Row>
              {step > 0 ? (
                <Col>
                  <Button
                    disabled={isSubmitting}
                    variant="primary"
                    onClick={() => setStep((s) => s - 1)}
                  >
                    Back
                  </Button>
                </Col>
              ) : null}

              <Col>
                {isSubmitting ? (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  <Button variant="primary" type="submit">
                    {isLastStep() ? "Submit" : "Next"}
                  </Button>
                )}
              </Col>
            </Row>
          </Container>
        </Form>
      )}
    </Formik>
  );
}
