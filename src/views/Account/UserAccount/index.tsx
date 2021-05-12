import React from "react";
import "./userAccount.scss";
import AppHeader from "../../../shared/components/AppHeader";
import AuthContainer from "../../../store/container/AuthContainer";
import { AuthReducerProps } from "../../../store/reducers/authReducer";
import { Row, Col } from "antd";
import "./userAccount.scss";
import ChangePasswordForm from "../../Auth/ChangePasswordForm";

interface UserAccountProps extends AuthReducerProps {}

function UserAccount({ user }: UserAccountProps) {
  return (
    <div className="user-account">
      <div>
        <Row align="top">
          <Col span={8}>
            <div className="news-wrapper">
              <h1>
                Hello {user?.username}{" "}
                <span className="text-capitalize">
                  ({user?.getUserRole()}){" "}
                </span>
              </h1>
            </div>
          </Col>
          <Col span={16}>
            <div className="user-account__form-wrapper">
              <div>
                <ChangePasswordForm />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default AuthContainer(UserAccount);
