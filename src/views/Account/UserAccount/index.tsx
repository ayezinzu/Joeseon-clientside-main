import React from "react";
import "./userAccount.scss";
import AuthContainer from "../../../store/container/AuthContainer";
import { AuthReducerProps } from "../../../store/reducers/authReducer";
import "./userAccount.scss";
import userAvatar from "../../../assets/images/userAvatar.png";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../../routes/routeConstants/appRoutes";

interface UserAccountProps extends AuthReducerProps {}

function UserAccount({ user }: UserAccountProps) {
  return (
    <div className="user-account">
      <div className="user-account__account-wrapper">
        <h1>ACCOUNT</h1>
        <img
          src={userAvatar}
          alt="User Avatar"
          className="user-account__avatar"
        />
        <h2>{user?.username}</h2>
        <h2 className="text-pink">UNVERIFIED</h2>
        <Link to={AppRoutes.VERIFY_ACCOUNT}>
          <Button type="primary">VERIFY</Button>
        </Link>
        <div className="mt-4 text-center">
          <span className="text-bold">
            <Link to={AppRoutes.CHANGE_PASSWORD}>Change Password</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default AuthContainer(UserAccount);
