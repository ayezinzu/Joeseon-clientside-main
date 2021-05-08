import React, { useState } from "react";
import { Formik, Form, FormikValues } from "formik";
import InputField from "../../../shared/components/InputField";
import { validationSchema } from "./LoginValidation";
import { Button } from "antd";
import { useHistory, Link } from "react-router-dom";
import AuthService from "../../../services/AuthService/auth.service";
import { User } from "../../../models/user.model";
import "./loginForm.scss";
import { AppRoutes } from "../../../routes/routeConstants/appRoutes";

const LoginForm = () => {
  const history = useHistory();

  const [formValues, setFormValues] = useState(new User());

  const [formLoading, setFormLoading] = useState(false);

  const onSubmit = (values: FormikValues) => {
    const user = Object.assign(new User(), values);
    setFormLoading(true);
    AuthService.loginUser(
      user,
      (user: User) => {
        history.push(AppRoutes.ACCOUNT);
      },
      () => {},
      () => {
        setFormLoading(false);
      }
    );
  };

  return (
    <div className="login-form">
      <Formik
        initialValues={formValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <InputField
            title="Username"
            type="text"
            name="username"
            placeholder="Enter username"
          />
          <InputField
            title="Password"
            type="password"
            name="password"
            placeholder="Enter password"
          />
          <Button
            htmlType="submit"
            className="submit-btn"
            loading={formLoading}
          >
            Log In
          </Button>
          <div className="text-center mt-4">
            <span>Don't have an account ? </span>
            <span className="text-bold">
              <Link to={AppRoutes.REGISTER}> Sign up</Link>
            </span>
          </div>
          <div className="mt-4 text-center">
            <span className="text-bold">
              <Link to={AppRoutes.FORGOT_PASSWORD}>Forgot Password?</Link>
            </span>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
