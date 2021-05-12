import * as Yup from "yup";

export const verifyAccountFormValidation = Yup.object().shape({
  attachment: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password should contain atleast 8 characters, one letter, one number and one symbol"
    )
    .required("New Password is required!"),
});
