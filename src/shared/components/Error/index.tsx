import React, { FC } from "react";
import "./error.scss";

interface ErrorMessageProps {
	message: string;
	className?: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message, className }) => {
	return <div className={`input__error ${className}`}>{message}</div>;
};

export default ErrorMessage;
