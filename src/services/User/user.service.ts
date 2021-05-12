import { User } from "../../models/user.model";
import { deserialize, serialize } from "serializr";
import axiosInstance from "../../interceptor/axiosInstance";
import { ApiRoutes } from "../../routes/routeConstants/apiRoutes";
import Notification from "../../shared/components/Notification";
import { NotificationTypes } from "../../enums/notificationTypes";
import { convertJSONToFormData } from "../../shared/utils/dataFormatConverter";
import { UserDocument } from "../../models/UserDocument/userDocument.model";

export class UserService {
  static uploadIdentityDocuments(
    file: File,
    onSuccess: (docStatus: string, userDocument: UserDocument) => void,
    onError: () => void,
    onFinal: () => void
  ) {
    const userJSON = { file };
    const userForm = convertJSONToFormData(userJSON);
    axiosInstance
      .post(ApiRoutes.USER_DOCUMENT, userForm)
      .then((response) => {
        Notification({
          message:
            "Identity document uploaded. The admin team will verify it in short while!",
          type: NotificationTypes.SUCCESS,
        });
        const docStatus = response.data["status"];
        const userDocument = deserialize(UserDocument, response.data);
        onSuccess(docStatus, userDocument);
      })
      .catch((error) => {
        onError();
      })
      .finally(() => {
        onFinal();
      });
  }

  static getIdentityDocument(
    onSuccess: (docStatus: string, userDocument: UserDocument) => void,
    onError: () => void,
    onFinal: () => void
  ) {
    axiosInstance
      .get(ApiRoutes.USER_DOCUMENT)
      .then((response) => {
        const docStatus = response.data["status"];
        const userDocument = deserialize(UserDocument, response.data);
        onSuccess(docStatus, userDocument);
      })
      .catch((error) => {
        onError();
      })
      .finally(() => {
        onFinal();
      });
  }
}
