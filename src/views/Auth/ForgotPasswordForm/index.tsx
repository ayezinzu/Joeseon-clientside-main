import React, { useState } from "react";
import "./forgotPasswordForm.scss";
import { Form, Formik, FormikValues } from "formik";
import InputField from "../../../shared/components/InputField";
import { Button } from "antd";
import { Link, useHistory } from "react-router-dom";
import { AppRoutes } from "../../../routes/routeConstants/appRoutes";
import { User } from "../../../models/user.model";
import { forgotPasswordFormValidation } from "./forgotPasswordFormValidation";
import AuthService from "../../../services/AuthService/auth.service";

interface ForgotPasswordFormProps {}

function ForgotPasswordForm(props: ForgotPasswordFormProps) {
  const history = useHistory();

  const [formLoading, setFormLoading] = useState(false);

  const [formValues, setFormValues] = useState(new User());

  const handleSubmit = (values: User) => {
    setFormValues(values);
    const user = Object.assign(new User(), values);
    setFormLoading(true);
    AuthService.forgotPassword(
      user,
      () => {
        setFormValues(new User());
      },
      () => {},
      () => {
        setFormLoading(false);
      }
    );
  };

  return (
    <div className="forgot-password-form">
      <Formik
        enableReinitialize
        initialValues={formValues}
        onSubmit={handleSubmit}
        validationSchema={forgotPasswordFormValidation}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          errors,
          isValid,
          dirty,
          setFieldValue,
          setValues,
        }) => {
          return (
            <Form>
              <InputField
                title="Email"
                type="email"
                name="email"
                placeholder="Enter email"
              />
              <Button
                htmlType="submit"
                className="submit-btn"
                disabled={!isValid || formLoading}
                loading={formLoading}
              >
                Forgot Password
              </Button>
              <div className="mt-4 text-center">
                <span className="text-bold">
                  <Link to={AppRoutes.LOGIN}>Login</Link>
                </span>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default ForgotPasswordForm;
