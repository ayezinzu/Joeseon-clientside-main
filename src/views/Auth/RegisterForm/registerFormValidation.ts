import * as Yup from "yup";

export const registerFormValidation = Yup.object().shape({
  email: Yup.string()
    .email("Email is not valid!")
    .required("Email is required!"),
  username: Yup.string()
    .required("Username is required!")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username should only contain [a-z][A-Z][0-9] and underscores"
    ),
  captchaResponse: Yup.string().required("Captcha response is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password should contain atleast 8 characters, one letter, one number and one symbol"
    )
    .required("Password is required!"),
  confirmPassword: Yup.string()
    .required("Password confirmation is required")
    .oneOf([Yup.ref("password"), ""], "Passwords must match"),
});
