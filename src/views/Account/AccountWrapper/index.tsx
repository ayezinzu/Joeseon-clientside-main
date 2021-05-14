import React from "react";
import AuthContainer from "../../../store/container/AuthContainer";
import { AuthReducerProps } from "../../../store/reducers/authReducer";
import { UserRoleEnum } from "../../../enums/userRole.enum";
import AdminAccount from "../AdminAccount";
import ModeratorAccount from "../ModeratorAccount";
import UserAccount from "../UserAccount";

interface AccountWrapperProps extends AuthReducerProps {}

function AccountWrapper({ user }: AccountWrapperProps) {
  return (
    <div className="account-wrapper">
      {user?.roles?.includes(UserRoleEnum.ADMIN) ? (
        <AdminAccount />
      ) : user?.roles?.includes(UserRoleEnum.MODERATOR) ? (
        <ModeratorAccount />
      ) : (
        <UserAccount />
      )}
    </div>
  );
}

export default AuthContainer(AccountWrapper);
