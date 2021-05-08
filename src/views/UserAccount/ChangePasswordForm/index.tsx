import React, { useState } from "react";
import "./changePasswordForm.scss";
import { Form, Formik, FormikValues } from "formik";
import InputField from "../../../shared/components/InputField";
import { Button } from "antd";
import { changePasswordFormValidation } from "./changePasswordFormValidation";
import { User } from "../../../models/user.model";

interface ChangePasswordFormProps {}

function ChangePasswordForm(props: ChangePasswordFormProps) {
  const [formValues, setFormValues] = useState(new User());

  const [formLoading, setFormLoading] = useState(false);

  const handleSubmit = (values: FormikValues) => {};

  return (
    <div className="change-password-form">
      <Formik
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
              <h2 className="text-bold text-center text-white mb-4">
                Your Profile
              </h2>
              <InputField
                title="Old Password"
                type="password"
                name="oldPassword"
                placeholder="Enter your old password"
              />
              <InputField
                title="New Password"
                type="password"
                name="newPassword"
                placeholder="Enter your new password"
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
                Change Password
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default ChangePasswordForm;
