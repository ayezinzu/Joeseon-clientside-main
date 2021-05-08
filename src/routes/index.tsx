import React, { useEffect, useState } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import { AppRoutes as appRoutes } from "./routeConstants/appRoutes";
import AuthWrapper from "../views/Auth/AuthWrapper";
import requiredAuth from "../shared/components/HOC/requireAuth";
import Home from "../views/Home";
import UserAccount from "../views/UserAccount";
import AuthContainer from "../store/container/AuthContainer";
import { AuthReducerProps } from "../store/reducers/authReducer";
import AuthService from "../services/AuthService/auth.service";
import { User } from "../models/user.model";
import AppLoader from "../shared/components/AppLoader";

export const appHistory = createBrowserHistory();
interface AppRoutesProps extends AuthReducerProps {}

const AppRoutes = ({ authenticated, user, setUser }: AppRoutesProps) => {
  const [loading, setLoading] = useState(false);

  const [showRoutes, setShowRoutes] = useState(false);

  const isAuthenticated = (component: any) => {
    return requiredAuth(component);
  };

  useEffect(() => {
    if (authenticated && !user) {
      setLoading(true);
      AuthService.getUser(
        (user: User) => {
          setUser(user);
          setShowRoutes(true);
        },
        () => {},
        () => {
          setLoading(false);
        }
      );
    } else {
      setShowRoutes(true);
    }
  }, [user, authenticated]);

  const routes = [
    {
      exact: true,
      path: appRoutes.ACCOUNT,
      component: isAuthenticated(UserAccount),
    },
  ];

  return (
    <div>
      {showRoutes && (
        <Router history={appHistory}>
          <Switch>
            <Redirect exact from={appRoutes.HOME} to={appRoutes.ACCOUNT} />
            <Route
              exact={false}
              path={appRoutes.AUTH}
              component={AuthWrapper}
            />
            {routes.map((route, index) => {
              return (
                <Route key={index} {...route} component={route.component} />
              );
            })}
            <Route path="*" render={() => <Redirect to={appRoutes.LOGIN} />} />
          </Switch>
        </Router>
      )}
      <AppLoader loading={loading} />
    </div>
  );
};

export default AuthContainer(AppRoutes);
