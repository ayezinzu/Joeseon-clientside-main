import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import RestrictAccess from "../RestrictedAccess";
import AuthContainer from "../../../store/container/AuthContainer";
import { AppRoutes } from "../../../routes/routeConstants/appRoutes";
import { UserRoleEnum } from "../../../enums/userRole.enum";

const requireAuth = (Component: any, allowedRoles: UserRoleEnum[] = []) => {
  const Authentication = (props: any) => {
    useEffect(() => {
      const { authenticated, history } = props;
      if (!authenticated && history.location.pathname !== AppRoutes.LOGIN) {
        return history.push(AppRoutes.LOGIN);
      }
    }, [props]);

    if (allowedRoles.length) {
      const { user } = props;
      return allowedRoles.includes(user.role) ? (
        <Component {...props} />
      ) : (
        <RestrictAccess />
      );
    }
    return <Component {...props} />;
  };
  return withRouter(AuthContainer(Authentication));
};

export default requireAuth;
