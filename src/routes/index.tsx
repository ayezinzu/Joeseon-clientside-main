import React, { useEffect, useState } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import { AppRoutes as appRoutes } from "./routeConstants/appRoutes";
import AuthWrapper from "../views/Auth/AuthWrapper";
import requiredAuth from "../shared/components/HOC/requireAuth";
import Home from "../views/Home";
import UserAccount from "../views/Account/UserAccount";
import AuthContainer from "../store/container/AuthContainer";
import { AuthReducerProps } from "../store/reducers/authReducer";
import AuthService from "../services/AuthService/auth.service";
import { User } from "../models/user.model";
import AppLoader from "../shared/components/AppLoader";
import AppHeader from "../shared/components/AppHeader";
import { UserRoleEnum } from "../enums/userRole.enum";
import AdminAccount from "../views/Account/AdminAccount";
import ModeratorAccount from "../views/Account/ModeratorAccount";
import ChangePasswordForm from "../views/Auth/ChangePasswordForm";
import VerifyAccountForm from "../views/Account/VerifyAccountForm";

export const appHistory = createBrowserHistory();
interface AppRoutesProps extends AuthReducerProps {}

const AppRoutes = ({ authenticated, user, setUser }: AppRoutesProps) => {
  const [loading, setLoading] = useState(false);

  const [showRoutes, setShowRoutes] = useState(false);

  const isAuthenticated = (component: any) => {
    return requiredAuth(component);
  };

  useEffect(() => {
    if (authenticated) {
      if (!user) {
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
      }
    } else {
      setShowRoutes(true);
    }
  }, [user, authenticated]);

  const routes = [
    {
      exact: true,
      path: appRoutes.ACCOUNT,
      component: isAuthenticated(
        user?.roles?.includes(UserRoleEnum.ADMIN)
          ? AdminAccount
          : user?.roles?.includes(UserRoleEnum.MODERATOR)
          ? ModeratorAccount
          : UserAccount
      ),
    },
    {
      exact: true,
      path: appRoutes.CHANGE_PASSWORD,
      component: isAuthenticated(ChangePasswordForm),
    },
    {
      exact: true,
      path: appRoutes.VERIFY_ACCOUNT,
      component: isAuthenticated(VerifyAccountForm),
    },
  ];

  return (
    <div>
      {showRoutes && (
        <Router history={appHistory}>
          <AppHeader />
          <Switch>
            {/*<Redirect exact from={appRoutes.HOME} to={appRoutes.ACCOUNT} />*/}
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
