import ApiRoutes from "../../routes/routeConstants/apiRoutes";
import axiosInstance from "../../interceptor/axiosInstance";
import { Post } from "../../models/Post/post.model";
import { deserialize, serialize } from "serializr";
import Notification from "../../shared/components/Notification";
import { NotificationTypes } from "../../enums/notificationTypes";

export default class PostService {

    static fetchPosts(
        onSuccess: Function,
        onError: Function,
        onFinal: () => void
    ) {
        axiosInstance
            .get(ApiRoutes.POSTS)
            .then((response) => {
                const posts = deserialize(Post, response.data["post"]);
                onSuccess(posts);
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

    static showPost(
        postId: number,
        onSuccess: Function,
        onError: Function,
        onFinal: () => void
    ) {
        const API_URL = ApiRoutes.POSTS + '/' + postId;
        axiosInstance
            .get(API_URL)
            .then((response) => {
                const post = deserialize(Post, response.data["post"]);
                onSuccess(post);
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

    static createPost(
        post: Post,
        onSuccess: Function,
        onError: Function,
        onFinal: () => void
    ) {
        const postJSON = serialize(post);
        axiosInstance
            .post(ApiRoutes.POSTS, postJSON)
            .then((response) => {
                const post = deserialize(Post, response.data["post"]);
                onSuccess(post);
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

    static updatePost(
        post: Post,
        onSuccess: Function,
        onError: Function,
        onFinal: () => void
    ) {
        const API_URL = ApiRoutes.POSTS + '/' + post.id;
        const postJSON = serialize(post);
        axiosInstance
            .put(API_URL, postJSON)
            .then((response) => {
                const post = deserialize(Post, response.data["post"]);
                onSuccess(post);
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

    static deletePost(
        postId: number,
        onSuccess: Function,
        onError: Function,
        onFinal: () => void
    ) {
        const API_URL = ApiRoutes.POSTS + '/' + postId;
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
