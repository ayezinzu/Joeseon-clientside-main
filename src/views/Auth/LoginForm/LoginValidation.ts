import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required!")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username should only contain [a-z][A-Z][0-9] and underscores"
    ),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password should contain atleast 8 characters, one letter, one number and one symbol"
    )
    .required("Password is required!"),
});
