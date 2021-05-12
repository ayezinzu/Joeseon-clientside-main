import React, { useState } from "react";
import "./resetPasswordForm.scss";
import { Form, Formik, FormikValues } from "formik";
import InputField from "../../../shared/components/InputField";
import { Button } from "antd";
import { Link, useLocation, useHistory } from "react-router-dom";
import { AppRoutes } from "../../../routes/routeConstants/appRoutes";
import { resetPasswordFormValidation } from "./resetPasswordFormValidation";
import { User } from "../../../models/user.model";
import AuthService from "../../../services/AuthService/auth.service";

interface ResetPasswordFormProps {}

function ResetPasswordForm(props: ResetPasswordFormProps) {
  const query = new URLSearchParams(useLocation().search);

  const history = useHistory();

  const [formValues, setFormValues] = useState(new User());

  const [formLoading, setFormLoading] = useState(false);

  const handleSubmit = (values: FormikValues) => {
    const user = Object.assign(new User(), values);
    const token = query.get("token");
    const email = query.get("email");
    if (token && email) {
      user.token = token;
      user.email = email;
      setFormLoading(true);
      AuthService.resetPassword(
        user,
        () => {
          history.push(AppRoutes.LOGIN);
        },
        () => {},
        () => {}
      );
    }
  };

  return (
    <div className="reset-password-form">
      <Formik
        initialValues={formValues}
        onSubmit={handleSubmit}
        validationSchema={resetPasswordFormValidation}
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
                title="Password"
                type="password"
                name="password"
                placeholder="Enter password"
              />
              <InputField
                title="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
              />
              <Button
                htmlType="submit"
                className="submit-btn"
                disabled={!isValid || formLoading}
                loading={formLoading}
              >
                Reset Password
              </Button>
              <div className="text-center mt-4">
                <span className="text-bold">
                  <Link to={AppRoutes.LOGIN}> Login</Link>
                </span>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default ResetPasswordForm;
