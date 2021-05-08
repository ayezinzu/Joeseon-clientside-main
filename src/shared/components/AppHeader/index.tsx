import React from "react";
import { Menu } from "antd";
import "./appHeader.scss";
import AuthContainer from "../../../store/container/AuthContainer";
import logo from "../../../assets/images/joseonlogo.png";
import AuthService from "../../../services/AuthService/auth.service";
import { useHistory } from "react-router-dom";
import { AppRoutes } from "../../../routes/routeConstants/appRoutes";

const AppHeader = (props: any) => {
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
  return (
    <Menu mode="horizontal" className="app-header">
      <Menu.Item>
        <img src={logo} alt="Joeseon Logo" className="app-header__logo" />
      </Menu.Item>
      <Menu.Item
        key="logout"
        className="float-right ml-4"
        onClick={handleLogout}
      >
        LOGOUT
      </Menu.Item>
      <Menu.Item key="account" className="float-right ml-4">
        ACCOUNT
      </Menu.Item>
      <Menu.Item key="download" className="float-right ml-4">
        DOWNLOAD
      </Menu.Item>
      <Menu.Item key="charter" className="float-right ml-4">
        CHARTER
      </Menu.Item>
      <Menu.Item key="news" className="float-right ml-4">
        NEWS
      </Menu.Item>
      <Menu.Item key="about" className="float-right ml-4">
        ABOUT
      </Menu.Item>
    </Menu>
  );
};

export default AuthContainer(AppHeader);
