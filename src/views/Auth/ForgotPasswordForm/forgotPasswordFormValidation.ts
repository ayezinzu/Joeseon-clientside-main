import * as Yup from "yup";

export const forgotPasswordFormValidation = Yup.object().shape({
  email: Yup.string()
    .email("Email is not valid!")
    .required("Email is required!"),
});
