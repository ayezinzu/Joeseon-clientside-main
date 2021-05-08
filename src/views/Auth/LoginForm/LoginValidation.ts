import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required!")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username should only contain [a-z][A-Z][0-9] and underscores"
    ),
  password: Yup.string().required("Password is required!"),
});
