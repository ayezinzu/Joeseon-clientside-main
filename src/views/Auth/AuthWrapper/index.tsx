import React, { useEffect } from "react";
import AuthRouter from "../authRouters";
import { Row, Col } from "antd";
import "./authWrapper.scss";
import logo from "../../../assets/images/joseonlogo.png";
import authBanner from "../../../assets/images/authBanner.png";
import AuthContainer from "../../../store/container/AuthContainer";
import { AuthReducerProps } from "../../../store/reducers/authReducer";
import { useHistory } from "react-router-dom";
import { AppRoutes } from "../../../routes/routeConstants/appRoutes";

interface AuthWrapperProps extends AuthReducerProps {}

const AuthWrapper = ({ authenticated }: AuthWrapperProps) => {
  const history = useHistory();

  useEffect(() => {
    if (authenticated) history.push(AppRoutes.ACCOUNT);
  }, []);

  return (
    <div className="auth-wrapper">
      <Row>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          <div className="auth-wrapper__brand">
            <img
              src={authBanner}
              alt="Auth Banner"
              className="auth-wrapper__brand-img"
            />
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          <div className="auth-wrapper__form-wrapper">
            <div>
              <img
                src={logo}
                alt="Joeseon Logo"
                className="auth-wrapper__logo"
              />
              <AuthRouter />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AuthContainer(AuthWrapper);
