import React, { useState } from "react";
import "./moderatorForm.scss";
import { User } from "../../../models/user.model";
import { Form, Formik } from "formik";
import InputField from "../../../shared/components/InputField";
import { Button } from "antd";
import { moderatorFormValidation } from "./moderatorFormValidation";
import { UserRoleEnum } from "../../../enums/userRole.enum";
import ModeratorService from "../../../services/Moderator/moderator.service";

interface ModeratorFormProps {
  moderator: User;
  onSuccess: (moderator: User) => void;
}

function ModeratorForm({ moderator, onSuccess }: ModeratorFormProps) {
  const [formValues, setFormValues] = useState<User>(moderator);

  const [formLoading, setFormLoading] = useState(false);

  const handleSubmit = (values: User) => {
    const moderator = Object.assign(new User(), {
      ...values,
      roles: [UserRoleEnum.MODERATOR],
    });
    setFormLoading(true);
    if (moderator.id) {
      ModeratorService.updateModerator(
        moderator,
        (moderator: User) => {
          onSuccess(moderator);
        },
        () => {},
        () => {
          setFormLoading(false);
        }
      );
    } else {
      ModeratorService.createModerator(
        moderator,
        (moderator: User) => {
          onSuccess(moderator);
        },
        () => {},
        () => {
          setFormLoading(false);
        }
      );
    }
  };

  return (
    <div className="moderator-form">
      <Formik
        initialValues={formValues}
        onSubmit={handleSubmit}
        validationSchema={moderatorFormValidation}
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
              {!values?.id && (
                <React.Fragment>
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
                </React.Fragment>
              )}
              <div className="text-center">
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

export default ModeratorForm;
