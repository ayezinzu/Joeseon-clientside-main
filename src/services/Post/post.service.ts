import axiosInstance from "../../interceptor/axiosInstance";
import { Post } from "../../models/Post/post.model";
import { deserialize, serialize } from "serializr";
import Notification from "../../shared/components/Notification";
import { NotificationTypes } from "../../enums/notificationTypes";
import { ApiRoutes } from "../../routes/routeConstants/apiRoutes";
import { PostPaginationDetail } from "../../models/PostPaginationDetail/postPaginationDetail.model";

export default class PostService {
  static fetchPosts(
    page: number,
    onSuccess: Function,
    onError: Function,
    onFinal: () => void
  ) {
    axiosInstance
      .get(ApiRoutes.POSTS, {
        params: {
          page,
        },
      })
      .then((response) => {
        const postPaginationDetail = deserialize(
          PostPaginationDetail,
          response.data
        );
        onSuccess(postPaginationDetail);
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
    const API_URL = ApiRoutes.POSTS + "/" + postId;
    axiosInstance
      .get(API_URL)
      .then((response) => {
        const post = deserialize(Post, response.data);
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
        Notification({
          message: "News created",
          type: NotificationTypes.SUCCESS,
        });
        const post = deserialize(Post, response.data);
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
    const API_URL = ApiRoutes.POSTS + "/" + post.id;
    const postJSON = serialize(post);
    axiosInstance
      .put(API_URL, postJSON)
      .then((response) => {
        Notification({
          message: "News updated",
          type: NotificationTypes.SUCCESS,
        });
        const post = deserialize(Post, response.data);
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
    const API_URL = ApiRoutes.POSTS + "/" + postId;
    axiosInstance
      .delete(API_URL)
      .then((response) => {
        Notification({
          message: "News deleted",
          type: NotificationTypes.SUCCESS,
        });
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
