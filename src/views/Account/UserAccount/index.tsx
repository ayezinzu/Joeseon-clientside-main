import React, { useEffect, useState } from "react";
import "./userAccount.scss";
import AuthContainer from "../../../store/container/AuthContainer";
import { AuthReducerProps } from "../../../store/reducers/authReducer";
import "./userAccount.scss";
import userAvatar from "../../../assets/images/userAvatar.png";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../../routes/routeConstants/appRoutes";
import { UserRoleEnum } from "../../../enums/userRole.enum";
import { UserService } from "../../../services/User/user.service";
import { UserDocument } from "../../../models/UserDocument/userDocument.model";
import { VerificationStatusEnum } from "../../../enums/verificationStatus.enum";

interface UserAccountProps extends AuthReducerProps {}

function UserAccount({ user }: UserAccountProps) {
  const [userDocument, setUserDocument] = useState<UserDocument>();

  useEffect(() => {
    UserService.getIdentityDocument(
      (userDocument: UserDocument) => {
        setUserDocument(userDocument);
      },
      () => {},
      () => {}
    );
  }, []);

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
        {user?.roles?.includes(UserRoleEnum.USER) && (
          <React.Fragment>
            <h2 className="text-pink user-account__verification-status">
              {userDocument?.status === VerificationStatusEnum.NOT_UPLOADED
                ? "UNVERIFIED"
                : userDocument?.status}
            </h2>
            {(userDocument?.status === VerificationStatusEnum?.NOT_UPLOADED ||
              userDocument?.status === VerificationStatusEnum.REJECTED) && (
              <Link to={AppRoutes.VERIFY_ACCOUNT}>
                <Button type="primary">VERIFY</Button>
              </Link>
            )}
          </React.Fragment>
        )}
        {user?.roles?.includes(UserRoleEnum.MODERATOR) && (
          <div>
            <Link to={AppRoutes.VERIFY_USERS}>
              <Button type="primary">Verify Users</Button>
            </Link>
          </div>
        )}
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
