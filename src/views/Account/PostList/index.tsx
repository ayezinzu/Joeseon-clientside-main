import React, { useEffect, useState } from "react";
import { Row, Col, Pagination, Button, Drawer, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./postList.scss";
import { Post } from "../../../models/Post/post.model";
import newsBackground from "../../../assets/images/newsBackground.png";
import PostService from "../../../services/Post/post.service";
import AuthContainer from "../../../store/container/AuthContainer";
import { AuthReducerProps } from "../../../store/reducers/authReducer";
import PostForm from "../PostForm";
import { UserRoleEnum } from "../../../enums/userRole.enum";
import { PostPaginationDetail } from "../../../models/PostPaginationDetail/postPaginationDetail.model";
import AppLoader from "../../../shared/components/AppLoader";
import logoBlackBackground from "../../../assets/images/logoBlackBackground.png";
import { Link, generatePath } from "react-router-dom";
import { AppRoutes } from "../../../routes/routeConstants/appRoutes";
import { isAdminOrModerator } from "../../../shared/utils/authUtils";

interface PostListProps extends AuthReducerProps {}

function PostList({ user, authenticated }: PostListProps) {
  const [
    postPaginationDetail,
    setPostPaginationDetail,
  ] = useState<PostPaginationDetail>(new PostPaginationDetail());

  const [pageNumber, setPageNumber] = useState(1);

  const [activePost, setActivePost] = useState(new Post());

  const [showPostForm, setShowPostForm] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleTogglePostForm = () => setShowPostForm(!showPostForm);

  const handleAddPost = () => {
    setActivePost(new Post());
    handleTogglePostForm();
  };

  const handleEditPost = (post: Post) => () => {
    setActivePost(post);
    handleTogglePostForm();
  };

  const handleDeletePost = (post: Post) => () => {
    Modal.confirm({
      icon: null,
      content: <h5>Are you sure want to delete the post?</h5>,
      onOk() {
        if (post?.id) {
          PostService.deletePost(
            post.id,
            () => {
              setPageNumber(1);
              handleFetchPosts(1);
            },
            () => {},
            () => {}
          );
        }
      },
      onCancel() {},
    });
  };

  const handleChangePage = (page: number) => {
    setPageNumber(page);
    handleFetchPosts(page);
  };

  const handlePostFormSuccess = (post: Post) => {
    setPageNumber(1);
    handleFetchPosts(1);
    handleTogglePostForm();
  };

  const handleFetchPosts = (page: number) => {
    setLoading(true);
    PostService.fetchPosts(
      page,
      (postPaginationDetail: PostPaginationDetail) => {
        setPostPaginationDetail(postPaginationDetail);
      },
      () => {},
      () => {
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    handleFetchPosts(pageNumber);
  }, []);

  return (
    <div className="post-list">
      <img
        src={logoBlackBackground}
        alt="Black Background"
        className="post-list__background"
      />
      <h1>
        NEWS
        {isAdminOrModerator(user?.roles) && (
          <Button type="primary" onClick={handleAddPost}>
            <PlusOutlined />
            Add News
          </Button>
        )}
      </h1>
      {loading ? (
        <AppLoader loading={loading} />
      ) : (
        <div className="post-list__items">
          <Row gutter={[40, 20]}>
            {postPaginationDetail?.posts?.map((post) => (
              <Col span={8}>
                <div className="post-list__item">
                  <div className="post-list__item-header">
                    <img
                      src={newsBackground}
                      alt="News background"
                      className="post-list__background-img"
                    />
                  </div>
                  <div className="post-list__item-body">
                    <h2>{post?.title}</h2>
                    <p>{post?.content}</p>
                    <div className="post-list__read-more">
                      <Link
                        to={generatePath(AppRoutes.POST_DETAIL, {
                          postId: post.id,
                        })}
                      >
                        Read more
                      </Link>
                    </div>
                  </div>
                  {isAdminOrModerator(user?.roles) && (
                    <div className="post-list__item-footer">
                      <Button
                        type="primary"
                        className="mr-3"
                        onClick={handleEditPost(post)}
                      >
                        Edit
                      </Button>
                      <Button type="primary" onClick={handleDeletePost(post)}>
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              </Col>
            ))}
          </Row>
          {postPaginationDetail?.posts?.length > 0 ? (
            <Pagination
              className="post-list__pagination"
              current={pageNumber}
              defaultCurrent={1}
              total={postPaginationDetail?.count}
              pageSize={6}
              onChange={handleChangePage}
            />
          ) : (
            <h2 className="text-white text-center">No news available!</h2>
          )}
        </div>
      )}
      <Drawer
        title={<h1> {activePost?.id ? "Edit News" : "Add News"} </h1>}
        visible={showPostForm}
        width={"50%"}
        destroyOnClose
        onClose={handleTogglePostForm}
      >
        <PostForm post={activePost} onSuccess={handlePostFormSuccess} />
      </Drawer>
    </div>
  );
}

export default AuthContainer(PostList);
