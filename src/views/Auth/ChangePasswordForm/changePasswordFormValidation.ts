import * as Yup from "yup";

export const changePasswordFormValidation = Yup.object().shape({
  oldPassword: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password should contain atleast 8 characters, one letter, one number and one symbol"
    )
    .required("Old Password is required!"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password should contain atleast 8 characters, one letter, one number and one symbol"
    )
    .required("New Password is required!"),
  confirmPassword: Yup.string()
    .required("Password confirmation is required")
    .oneOf([Yup.ref("password"), ""], "Passwords must match"),
});
