import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./appLoader.scss";

interface AppLoaderProps {
  loading: boolean;
}

function AppLoader(props: AppLoaderProps) {
  const { loading } = props;

  return (
    <Spin
      className="app-loader"
      indicator={<LoadingOutlined spin />}
      size="large"
      spinning={loading}
    />
  );
}

export default AppLoader;
