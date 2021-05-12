import React, { useState } from "react";
import "./changePasswordForm.scss";
import { Form, Formik, FormikValues } from "formik";
import InputField from "../../../shared/components/InputField";
import { Button } from "antd";
import { changePasswordFormValidation } from "./changePasswordFormValidation";
import { User } from "../../../models/user.model";
import AuthService from "../../../services/AuthService/auth.service";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../../routes/routeConstants/appRoutes";

interface ChangePasswordFormProps {}

function ChangePasswordForm(props: ChangePasswordFormProps) {
  const [formValues, setFormValues] = useState(new User());

  const [formLoading, setFormLoading] = useState(false);

  const handleSubmit = (values: User) => {
    setFormValues(values);
    const user = Object.assign(new User(), values);
    setFormLoading(true);
    AuthService.changePassword(
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
    <div className="change-password-form">
      <Formik
        enableReinitialize
        initialValues={formValues}
        onSubmit={handleSubmit}
        validationSchema={changePasswordFormValidation}
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
              <h1 className="text-white mb-4">ACCOUNT</h1>
              <h2> Reset your password</h2>
              <InputField
                title="Old Password"
                type="password"
                name="oldPassword"
                placeholder="Enter your old password"
              />
              <InputField
                title="New Password"
                type="password"
                name="password"
                placeholder="Enter your new password"
              />
              <InputField
                title="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
              />
              <Button
                type="primary"
                htmlType="submit"
                className="submit-btn"
                disabled={!isValid || formLoading}
                loading={formLoading}
              >
                Change Password
              </Button>
              <div className="mt-4 text-center">
                <span className="text-bold">
                  <Link to={AppRoutes.ACCOUNT}>Go to Profile</Link>
                </span>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default ChangePasswordForm;
