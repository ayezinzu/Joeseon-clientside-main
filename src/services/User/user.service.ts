import { User } from "../../models/user.model";
import { deserialize, serialize } from "serializr";
import axiosInstance from "../../interceptor/axiosInstance";
import { ApiRoutes } from "../../routes/routeConstants/apiRoutes";
import Notification from "../../shared/components/Notification";
import { NotificationTypes } from "../../enums/notificationTypes";
import { convertJSONToFormData } from "../../shared/utils/dataFormatConverter";
import { UserDocument } from "../../models/UserDocument/userDocument.model";

export class UserService {
  static fetchUsers(
    onSuccess: Function,
    onError: Function,
    onFinal: () => void
  ) {
    axiosInstance
      .get(ApiRoutes.USERS)
      .then((response) => {
        const users = deserialize(User, response.data);
        onSuccess(users);
      })
      .catch((error) => {
        Notification({
          message: error,
          type: NotificationTypes.ERROR,
        });
        onError();
      })
      .finally(() => {
        onFinal();
      });
  }

  static uploadIdentityDocuments(
    file: File,
    onSuccess: (userDocument: UserDocument) => void,
    onError: () => void,
    onFinal: () => void
  ) {
    const userJSON = { file };
    const userForm = convertJSONToFormData(userJSON);
    axiosInstance
      .post(ApiRoutes.MY_DOCUMENT, userForm)
      .then((response) => {
        Notification({
          message:
            "Identity document uploaded. The admin team will verify it in short while!",
          type: NotificationTypes.SUCCESS,
        });
        const userDocument = deserialize(UserDocument, response.data);
        onSuccess(userDocument);
      })
      .catch((error) => {
        onError();
      })
      .finally(() => {
        onFinal();
      });
  }

  static verifyUser(
    userId: number,
    status: string,
    onSuccess: () => void,
    onError: () => void,
    onFinal: () => void
  ) {
    const API_URL = ApiRoutes.VERIFY_USERS.replace(
      ":userId",
      userId.toString()
    );
    axiosInstance
      .post(API_URL, { status })
      .then((response) => {
        Notification({
          message: "User status updated",
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

  static getIdentityDocument(
    onSuccess: (userDocument: UserDocument) => void,
    onError: () => void,
    onFinal: () => void
  ) {
    axiosInstance
      .get(ApiRoutes.MY_DOCUMENT)
      .then((response) => {
        const userDocument = deserialize(UserDocument, response.data);
        onSuccess(userDocument);
      })
      .catch((error) => {
        onError();
      })
      .finally(() => {
        onFinal();
      });
  }

  static getUserIdentityDocument(
    userId: number,
    onSuccess: (url: string) => void,
    onError: () => void,
    onFinal: () => void
  ) {
    const API_URL = ApiRoutes.USER_DOCUMENT.replace(
      ":userId",
      userId.toString()
    );
    axiosInstance
      .get(API_URL)
      .then((response) => {
        onSuccess(response.data.url);
      })
      .catch((error) => {
        onError();
      })
      .finally(() => {
        onFinal();
      });
  }
}
