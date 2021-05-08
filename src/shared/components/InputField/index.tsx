import React, { FC } from "react";
import { Field, ErrorMessage } from "formik";
import { Input } from "antd";
import Error from "../Error";
import "./inputField.scss";

interface InputFieldProps {
  title?: string;
  type: string;
  name: string;
  placeholder?: string;
  mt?: string;
  rounded?: boolean;
  classes?: string;
  addonBefore?: any;
  value?: string;
  readOnly?: boolean;
  onChange?: Function;
  disabled?: boolean;
  prefix?: string;
  rows?: number;
}

const InputField: FC<InputFieldProps> = (props) => {
  const {
    name,
    type,
    title,
    mt,
    rounded,
    classes,
    addonBefore,
    readOnly,
    onChange,
    value,
    disabled,
    prefix,
    rows = 4,
  } = props;

  return (
    <div
      className={classes ? classes : "input-field-wrapper"}
      style={{ marginTop: `${mt}rem` }}
    >
      {title && <p className="input-field__title">{title}</p>}
      <Field
        className={`input-field`}
        as={type === "textarea" ? Input.TextArea : Input}
        {...props}
      />
      <ErrorMessage name={name}>
        {(message: string) => (
          <Error className={`${name}__error`} message={message} />
        )}
      </ErrorMessage>
    </div>
  );
};

export default InputField;
