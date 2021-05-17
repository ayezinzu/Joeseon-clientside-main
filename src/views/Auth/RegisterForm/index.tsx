import React, { useEffect, useState } from "react";
import "./registerForm.scss";
import { Form, Formik, FormikValues } from "formik";
import InputField from "../../../shared/components/InputField";
import { Button } from "antd";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AppRoutes } from "../../../routes/routeConstants/appRoutes";
import { User } from "../../../models/user.model";
import "./registerForm.scss";
import { registerFormValidation } from "./registerFormValidation";
import ReCAPTCHA from "react-google-recaptcha";
import AuthService from "../../../services/AuthService/auth.service";
import DropdownField from "../../../shared/components/DropdownField";
import {
  IDropdownOption,
  MetaService,
} from "../../../services/Meta/meta.service";

function RegisterForm() {
  const history = useHistory();

  const recaptchaRef: any = React.useRef();

  const [formValues, setFormValues] = useState(new User());

  const [factionOptions, setFactionOptions] = useState<IDropdownOption[]>([]);

  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    MetaService.fetchFactions(
      (factions: string[]) => {
        setFactionOptions(
          factions.map((faction) => ({
            label: faction,
            value: faction,
          }))
        );
      },
      () => {},
      () => {}
    );
  }, []);

  const handleSubmit = (values: FormikValues) => {
    const user = Object.assign(new User(), values);
    setFormLoading(true);
    AuthService.signUpUser(
      user,
      () => {
        history.push(AppRoutes.LOGIN);
      },
      () => {},
      () => {
        setFormLoading(false);
      }
    );
  };

  return (
    <Formik
      initialValues={formValues}
      onSubmit={handleSubmit}
      validationSchema={registerFormValidation}
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
              title="Username"
              type="text"
              name="username"
              placeholder="Enter username"
            />
            <InputField
              title="Email"
              type="email"
              name="email"
              placeholder="Enter email"
            />
            <InputField
              title="Password"
              type="password"
              name="password"
              placeholder="Enter password"
            />
            <InputField
              title="Confirm Password"
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
            />
            <DropdownField
              title="Faction"
              placeHolder="Select Faction"
              name="faction"
              setFieldValue={setFieldValue}
              options={factionOptions}
              value={values.faction}
            />
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.REACT_APP_SITE_KEY_BASE_URL || ""}
              onChange={(token) => {
                setFieldValue("captchaResponse", token);
              }}
            />
            <Button
              htmlType="submit"
              className="submit-btn"
              disabled={!isValid || formLoading}
              loading={formLoading}
            >
              Sign Up
            </Button>
            <div className="text-center mt-4">
              <span>Already have an account ? </span>
              <span className="text-bold">
                <Link to={AppRoutes.LOGIN}> Login</Link>
              </span>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default RegisterForm;
