import axios from "axios";
import { store } from "../store";
import { REQUEST_LOGOUT } from "../store/definitions/authConstants";
import { ApiRoutes } from "../routes/routeConstants/apiRoutes";
import Notification from "../shared/components/Notification";
import { NotificationTypes } from "../enums/notificationTypes";
import AuthService from "../services/AuthService/auth.service";
import { appHistory } from "../routes";
import { AppRoutes } from "../routes/routeConstants/appRoutes";

export const getHeaders = (): any => {
  let headers;
  const accessToken = localStorage.getItem("accessToken");
  headers = {
    "Content-Type": "application/json",
    "x-access-token": accessToken,
  };
  return headers;
};

const axiosInstance = axios.create({
  baseURL: ApiRoutes.BASE_URL,
  timeout: 20000,
});

axiosInstance.interceptors.request.use(function (config) {
  config.headers = getHeaders();
  return config;
});

axiosInstance.interceptors.response.use(
  (response): any => {
    return {
      data: response.data,
      message: response.statusText,
      status: response.status,
    };
  },
  (error) => {
    const { response } = error;
    if (response.status === 401) {
      localStorage.clear();
      appHistory.push(AppRoutes.LOGIN);
    }
    const message = response?.data?.message
      ? response?.data?.message
      : response?.status === 502
      ? "Server is under maintenance. Please try after some time!"
      : "Something went wrong. Please try again";
    Notification({ message, type: NotificationTypes.ERROR });
    return Promise.reject(error);
  }
);

export default axiosInstance;
