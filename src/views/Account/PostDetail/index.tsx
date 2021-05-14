import React, { useEffect, useState } from "react";
import "./postDetail.scss";
import { Post } from "../../../models/Post/post.model";
import PostService from "../../../services/Post/post.service";
import { useParams } from "react-router-dom";
import newsBackground from "../../../assets/images/newsBackground.png";
import AppLoader from "../../../shared/components/AppLoader";

interface PostDetailProps {}

interface PostDetailParams {
  postId: string;
}

function PostDetail(props: PostDetailProps) {
  const [post, setPost] = useState<Post>();

  const [loading, setLoading] = useState(false);

  const params: PostDetailParams = useParams();

  useEffect(() => {
    if (params.postId) {
      setLoading(true);
      PostService.showPost(
        Number(params.postId),
        (post: Post) => {
          setPost(post);
        },
        () => {},
        () => {
          setLoading(false);
        }
      );
    }
  }, []);
  return (
    <div className="post-detail">
      {loading ? (
        <AppLoader loading={loading} />
      ) : (
        <div className="post-detail__img">
          <img
            src={newsBackground}
            alt="News Background"
            className="post-detail__img"
          />
          <div>
            <h1>{post?.title}</h1>
            <p>
              <pre>{post?.content}</pre>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostDetail;
