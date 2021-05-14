import * as Yup from "yup";

export const postFormValidation = Yup.object().shape({
  title: Yup.string().required("Title is required!"),
  content: Yup.string().required("Content is required!"),
});
