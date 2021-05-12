import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import RegisterForm from "../../views/Auth/RegisterForm";
import LoginForm from "../../views/Auth/LoginForm";
import { AppRoutes } from "../../routes/routeConstants/appRoutes";
import ForgotPassword from "./ForgotPasswordForm";
import ResetPassword from "./ResetPasswordForm";

const authRouter = () => {
  return (
    <Switch>
      <Redirect exact strict from={AppRoutes.AUTH} to={AppRoutes.LOGIN} />
      <Route
        exact
        path={AppRoutes.REGISTER}
        component={() => <RegisterForm />}
      />
      <Route exact path={AppRoutes.LOGIN} component={() => <LoginForm />} />
      <Route
        exact
        path={AppRoutes.FORGOT_PASSWORD}
        component={() => <ForgotPassword />}
      />
      <Route
        exact
        path={AppRoutes.RESET_PASSWORD}
        component={() => <ResetPassword />}
      />
    </Switch>
  );
};

export default authRouter;
