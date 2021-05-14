import axiosInstance from "../../interceptor/axiosInstance";
import { deserialize, serialize } from "serializr";
import { User } from "../../models/user.model";
import { store } from "../../store";
import {
  AUTHENTICATED,
  SET_USER,
  UNAUTHENTICATED,
} from "../../store/definitions/authConstants";
import Notification from "../../shared/components/Notification";
import { NotificationTypes } from "../../enums/notificationTypes";
import { ApiRoutes } from "../../routes/routeConstants/apiRoutes";

export class AuthService {
  static loginUser(
    user: User,
    onSuccess: (user: User) => void,
    onError: () => void,
    onFinal: () => void
  ) {
    const userJSON = serialize(user);
    axiosInstance
      .post(ApiRoutes.SIGNIN, userJSON)
      .then((response) => {
        localStorage.setItem("accessToken", response.data.accessToken);
        const user = deserialize(User, response.data);
        store.dispatch({
          type: AUTHENTICATED,
          payload: {
            authenticated: true,
            user,
          },
        });
        store.dispatch({
          type: SET_USER,
          payload: {
            user,
          },
        });
        Notification({
          message: "Login",
          description: "Logged in successfully",
          type: NotificationTypes.SUCCESS,
        });
        onSuccess(user);
      })
      .catch((error) => {
        onError();
      })
      .finally(() => {
        onFinal();
      });
  }

  static logoutUser(
    onSuccess: () => void,
    onError: () => void,
    onFinal: () => void
  ) {
    axiosInstance
      .delete(ApiRoutes.SIGNOUT)
      .then((response) => {
        localStorage.clear();
        store.dispatch({
          type: UNAUTHENTICATED,
          payload: {
            authenticated: false,
          },
        });
        store.dispatch({
          type: SET_USER,
          payload: {
            user: undefined,
          },
        });
        onSuccess();
      })
      .catch((error) => {
        onError();
      })
      .finally(() => {
        onFinal();
      });
  }

  static signUpUser(
    user: User,
    onSuccess: () => void,
    onError: () => void,
    onFinal: () => void
  ) {
    const userJSON = serialize(user);
    axiosInstance
      .post(ApiRoutes.SIGNUP, userJSON)
      .then((response) => {
        Notification({
          message: "Registered successfully! Please login to continue!",
          type: NotificationTypes.SUCCESS,
        });
        onSuccess();
      })
      .catch((error) => {
        onError();
      })
      .finally(() => {
        onFinal();
      });
  }

  static getUser(
    onSuccess: (user: User) => void,
    onError: () => void,
    onFinal: () => void
  ) {
    axiosInstance
      .get(ApiRoutes.USER)
      .then((response) => {
        const user = deserialize(User, response.data);
        onSuccess(user);
      })
      .catch((error) => {
        onError();
      })
      .finally(() => {
        onFinal();
      });
  }

  static forgotPassword(
    user: User,
    onSuccess: (user: User) => void,
    onError: () => void,
    onFinal: () => void
  ) {
    const userJSON = serialize(user);
    axiosInstance
      .post(ApiRoutes.FORGOT_PASSWORD, userJSON)
      .then((response) => {
        Notification({
          message: "Reset password link has been sent to your email!",
          type: NotificationTypes.SUCCESS,
        });
        onSuccess(user);
      })
      .catch((error) => {
        onError();
      })
      .finally(() => {
        onFinal();
      });
  }

  static resetPassword(
    user: User,
    onSuccess: () => void,
    onError: () => void,
    onFinal: () => void
  ) {
    const userJSON = serialize(user);
    axiosInstance
      .post(ApiRoutes.RESET_PASSWORD, userJSON)
      .then((response) => {
        Notification({
          message: "Password updated! Please login to continue",
          type: NotificationTypes.SUCCESS,
        });
        onSuccess();
      })
      .catch((error) => {
        onError();
      })
      .finally(() => {
        onFinal();
      });
  }

  static changePassword(
    user: User,
    onSuccess: () => void,
    onError: () => void,
    onFinal: () => void
  ) {
    const userJSON = serialize(user);
    axiosInstance
      .put(ApiRoutes.CHANGE_PASSWORD, userJSON)
      .then((response) => {
        Notification({
          message: "Password updated!",
          type: NotificationTypes.SUCCESS,
        });
        onSuccess();
      })
      .catch((error) => {
        onError();
      })
      .finally(() => {
        onFinal();
      });
  }
}

export default AuthService;
