import React from "react";
import { Menu } from "antd";
import "./appHeader.scss";
import AuthContainer from "../../../store/container/AuthContainer";
import logo from "../../../assets/images/joseonlogo.png";
import AuthService from "../../../services/AuthService/auth.service";
import { useHistory, Link } from "react-router-dom";
import { AppRoutes } from "../../../routes/routeConstants/appRoutes";
import { AuthReducerProps } from "../../../store/reducers/authReducer";

interface AppHeaderProps extends AuthReducerProps {}

function AppHeader({ authenticated }: AppHeaderProps) {
  const history = useHistory();

  const handleLogout = () => {
    AuthService.logoutUser(
      () => {
        history.push(AppRoutes.LOGIN);
      },
      () => {},
      () => {}
    );
  };

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
    <Menu mode="horizontal" className="app-header">
      <Menu.Item className="app-header__logo-item">
        <Link to={AppRoutes.HOME}>
          <img src={logo} alt="Joeseon Logo" className="app-header__logo" />
        </Link>
      </Menu.Item>
      <Menu.Item key="about" onClick={handleNavigate("about-us")}>
        ABOUT
      </Menu.Item>
      <Menu.Item key="charter" onClick={handleNavigate("charter")}>
        CHARTER
      </Menu.Item>
      <Menu.Item key="our-mission" onClick={handleNavigate("our-mission")}>
        MISSION
      </Menu.Item>
      <Menu.Item
        key="download-links"
        onClick={handleNavigate("download-links")}
      >
        DOWNLOAD
      </Menu.Item>
      {authenticated && (
        <React.Fragment>
          <Menu.Item key="news" onClick={handleNavigate("post-list")}>
            NEWS
          </Menu.Item>
          <Menu.Item key="account">
            <Link to={AppRoutes.ACCOUNT}>ACCOUNT</Link>
          </Menu.Item>
          <Menu.Item key="logout" onClick={handleLogout}>
            LOGOUT
          </Menu.Item>
        </React.Fragment>
      )}
    </Menu>
  );
}

export default AuthContainer(AppHeader);
