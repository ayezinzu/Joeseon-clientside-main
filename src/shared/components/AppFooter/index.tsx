import React from "react";
import "./appFooter.scss";
import { Row, Col } from "antd";
import joseonlogo from "../../../assets/images/joseonlogo.png";
import AuthContainer from "../../../store/container/AuthContainer";
import { AuthReducerProps } from "../../../store/reducers/authReducer";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../../routes/routeConstants/appRoutes";

interface AppFooterProps extends AuthReducerProps {}

function AppFooter({ authenticated }: AppFooterProps) {
  const handleNavigate = (id: string) => () => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="app-footer">
      <Row>
        <Col span={12} className="app-footer__logo-wrapper">
          <img src={joseonlogo} alt="Logo" className="app-footer__logo" />
        </Col>
        <Col span={4} className="app-footer__links">
          <div className="text-bold">Site Map</div>
          <div onClick={handleNavigate("about-us")}>ABOUT</div>
          {authenticated && (
            <div onClick={handleNavigate("post-list")}>NEWS</div>
          )}
          <div onClick={handleNavigate("our-mission")}>MISSION</div>
          <div onClick={handleNavigate("charter")}>CHARTER</div>
          <div onClick={handleNavigate("download-links")}>DOWNLOAD</div>
        </Col>
        <Col span={4} className="app-footer__links">
          <div className="text-bold">Socials</div>
          <div>INSTAGRAM</div>
          <div>FACEBOOK</div>
          <div>TWITTER</div>
        </Col>
        {!authenticated && (
          <Col span={4} className="app-footer__links">
            <div>
              <Link to={AppRoutes.LOGIN}>LOGIN</Link>
            </div>
            <div>
              <Link to={AppRoutes.REGISTER}>SIGN UP</Link>
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
}

export default AuthContainer(AppFooter);
