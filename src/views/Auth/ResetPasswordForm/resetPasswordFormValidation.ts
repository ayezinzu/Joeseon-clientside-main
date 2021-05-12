import * as Yup from "yup";

export const resetPasswordFormValidation = Yup.object().shape({
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
