import { ApiRoutes } from "../../routes/routeConstants/apiRoutes";
import axiosInstance from "../../interceptor/axiosInstance";
import { deserialize, serialize } from "serializr";
import Notification from "../../shared/components/Notification";
import { NotificationTypes } from "../../enums/notificationTypes";
import { User } from "../../models/user.model";

export default class ModeratorService {
  static fetchModerators(
    onSuccess: Function,
    onError: Function,
    onFinal: () => void
  ) {
    axiosInstance
      .get(ApiRoutes.MODERATORS)
      .then((response) => {
        const moderators = deserialize(User, response.data);
        onSuccess(moderators);
      })
      .catch((error) => {
        onError();
      })
      .finally(() => {
        onFinal();
      });
  }

  static showModerator(
    moderatorId: number,
    onSuccess: Function,
    onError: Function,
    onFinal: () => void
  ) {
    const API_URL = ApiRoutes.MODERATORS + "/" + moderatorId;
    axiosInstance
      .get(API_URL)
      .then((response) => {
        const moderator = deserialize(User, response);
        onSuccess(moderator);
      })
      .catch((error) => {
        onError();
      })
      .finally(() => {
        onFinal();
      });
  }

  static createModerator(
    moderator: User,
    onSuccess: Function,
    onError: Function,
    onFinal: () => void
  ) {
    const moderatorJSON = serialize(moderator);
    axiosInstance
      .post(ApiRoutes.MODERATORS, moderatorJSON)
      .then((response) => {
        Notification({
          message: "Moderator created",
          type: NotificationTypes.SUCCESS,
        });
        const moderator = deserialize(User, response.data);
        onSuccess(moderator);
      })
      .catch((error) => {
        onError();
      })
      .finally(() => {
        onFinal();
      });
  }

  static updateModerator(
    moderator: User,
    onSuccess: Function,
    onError: Function,
    onFinal: () => void
  ) {
    const API_URL = ApiRoutes.MODERATORS + "/" + moderator.id;
    const moderatorJSON = serialize(moderator);
    axiosInstance
      .put(API_URL, moderatorJSON)
      .then((response) => {
        Notification({
          message: "Moderator updated",
          type: NotificationTypes.SUCCESS,
        });
        const moderator = deserialize(User, response.data);
        onSuccess(moderator);
      })
      .catch((error) => {
        onError();
      })
      .finally(() => {
        onFinal();
      });
  }

  static deleteModerator(
    moderatorId: number,
    onSuccess: Function,
    onError: Function,
    onFinal: () => void
  ) {
    const API_URL = ApiRoutes.MODERATORS + "/" + moderatorId;
    axiosInstance
      .delete(API_URL)
      .then((response) => {
        Notification({
          message: "Moderator deleted",
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
