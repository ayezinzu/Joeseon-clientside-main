import React, { useState } from "react";
import { Post } from "../../../models/Post/post.model";
import { Form, Formik } from "formik";
import InputField from "../../../shared/components/InputField";
import { Button } from "antd";
import { postFormValidation } from "./postFormValidation";
import PostService from "../../../services/Post/post.service";

interface PostFormProps {
  post: Post;
  onSuccess: (post: Post) => void;
}

function PostForm({ post, onSuccess }: PostFormProps) {
  const [formValues, setFormValues] = useState(post);

  const [formLoading, setFormLoading] = useState(false);

  const handleSubmit = (values: Post) => {
    const post = Object.assign(new Post(), values);
    setFormLoading(true);
    if (post.id) {
      PostService.updatePost(
        post,
        (post: Post) => {
          onSuccess(post);
        },
        () => {},
        () => {
          setFormLoading(false);
        }
      );
    } else {
      PostService.createPost(
        post,
        (post: Post) => {
          onSuccess(post);
        },
        () => {},
        () => {
          setFormLoading(false);
        }
      );
    }
  };

  return (
    <div className="post-form">
      <Formik
        initialValues={formValues}
        onSubmit={handleSubmit}
        validationSchema={postFormValidation}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          errors,
          isValid,
          dirty,
          setFieldValue,
          setValues,
        }) => {
          return (
            <Form>
              <InputField
                title="Title"
                type="text"
                name="title"
                placeholder="Enter title"
              />
              <InputField
                title="Content"
                type="textarea"
                name="content"
                placeholder="Enter content"
              />
              <div className="mt-4 mb-4 text-center">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="submit-btn"
                  disabled={!isValid || formLoading}
                  loading={formLoading}
                >
                  Save
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default PostForm;
