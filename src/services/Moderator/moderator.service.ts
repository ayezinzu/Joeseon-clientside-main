import ApiRoutes from "../../routes/routeConstants/apiRoutes";
import axiosInstance from "../../interceptor/axiosInstance";
import { Moderator } from "../../models/Moderator/moderator.model";
import { deserialize, serialize } from "serializr";
import Notification from "../../shared/components/Notification";
import { NotificationTypes } from "../../enums/notificationTypes";

export default class ModeratorService {

    static fetchModerators(
        onSuccess: Function,
        onError: Function,
        onFinal: () => void
    ) {
        axiosInstance
            .get(ApiRoutes.MODERATORS)
            .then((response) => {
                const moderators = deserialize(Moderator, response.data["moderator"]);
                onSuccess(moderators);
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

    static showModerator(
        moderatorId: number,
        onSuccess: Function,
        onError: Function,
        onFinal: () => void
    ) {
        const API_URL = ApiRoutes.MODERATORS + '/' + moderatorId;
        axiosInstance
            .get(API_URL)
            .then((response) => {
                const moderator = deserialize(Moderator, response.data["moderator"]);
                onSuccess(moderator);
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

    static createModerator(
        moderator: Moderator,
        onSuccess: Function,
        onError: Function,
        onFinal: () => void
    ) {
        const moderatorJSON = serialize(moderator);
        axiosInstance
            .post(ApiRoutes.MODERATORS, moderatorJSON)
            .then((response) => {
                const moderator = deserialize(Moderator, response.data["moderator"]);
                onSuccess(moderator);
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

    static updateModerator(
        moderator: Moderator,
        onSuccess: Function,
        onError: Function,
        onFinal: () => void
    ) {
        const API_URL = ApiRoutes.MODERATORS + '/' + moderator.id;
        const moderatorJSON = serialize(moderator);
        axiosInstance
            .put(API_URL, moderatorJSON)
            .then((response) => {
                const moderator = deserialize(Moderator, response.data["moderator"]);
                onSuccess(moderator);
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

    static deleteModerator(
        moderatorId: number,
        onSuccess: Function,
        onError: Function,
        onFinal: () => void
    ) {
        const API_URL = ApiRoutes.MODERATORS + '/' + moderatorId;
        axiosInstance
            .delete(API_URL)
            .then((response) => {
                onSuccess();
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

}
