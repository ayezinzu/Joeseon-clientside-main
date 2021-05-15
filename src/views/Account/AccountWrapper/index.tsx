import React from "react";
import AuthContainer from "../../../store/container/AuthContainer";
import { AuthReducerProps } from "../../../store/reducers/authReducer";
import UserAccount from "../UserAccount";

interface AccountWrapperProps extends AuthReducerProps {}

function AccountWrapper({ user }: AccountWrapperProps) {
  return (
    <div className="account-wrapper">
      <UserAccount />
    </div>
  );
}

export default AuthContainer(AccountWrapper);
