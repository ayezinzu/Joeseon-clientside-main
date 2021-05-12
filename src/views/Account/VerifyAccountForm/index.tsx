import React, { useCallback, useEffect, useState } from "react";
import "./verifyAccountForm.scss";
import { Button } from "antd";
import Dropzone from "react-dropzone";
import downloadIcon from "../../../assets/images/downloadIcon.png";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../../routes/routeConstants/appRoutes";
import { UserService } from "../../../services/User/user.service";
import { UserDocument } from "../../../models/UserDocument/userDocument.model";
import { VerificationStatusEnum } from "../../../enums/verificationStatus.enum";
import AppLoader from "../../../shared/components/AppLoader";

interface VerifyAccountFormProps {}

function VerifyAccountForm(props: VerifyAccountFormProps) {
  const [attachment, setAttachment] = useState<File>();

  const [loading, setLoading] = useState(false);

  const [formLoading, setFormLoading] = useState(false);

  const [userDocument, setUserDocument] = useState<UserDocument>();

  const [documentStatus, setDocumentStatus] = useState<string>();

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length > 0) {
      if (acceptedFiles.length > 1) {
        alert("Please select a single file!");
      } else {
        setAttachment(acceptedFiles[0]);
      }
    }
  }, []);

  const handleSubmit = () => {
    if (attachment) {
      setFormLoading(true);
      UserService.uploadIdentityDocuments(
        attachment,
        (docStatus: string, userDocument: UserDocument) => {
          handleGetIdentityDocument();
        },
        () => {},
        () => {
          setFormLoading(false);
        }
      );
    }
  };

  const handleGetIdentityDocument = () => {
    setLoading(true);
    UserService.getIdentityDocument(
      (docStatus: string, userDocument: UserDocument) => {
        setDocumentStatus(docStatus);
        setUserDocument(userDocument);
      },
      () => {},
      () => {
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    handleGetIdentityDocument();
  }, []);

  return (
    <div className="verify-account-form">
      {loading ? (
        <AppLoader loading={loading} />
      ) : (
        <div>
          <h1>ACCOUNT</h1>
          {!documentStatus ? null : documentStatus ===
            VerificationStatusEnum.NOT_UPLOADED ? (
            <React.Fragment>
              <h2> Complete your verification</h2>
              <p className="verify-account-form__form-title">
                Upload your image here
              </p>
              <p>PNG, JPG and JPF are allowed</p>
              <Dropzone
                onDrop={onDrop}
                accept={["image/png", "image/jpg", "application/pdf"]}
              >
                {({ getRootProps, getInputProps, isDragActive }) => (
                  <div
                    {...getRootProps()}
                    className="verify-account-form__drag-and-drop"
                  >
                    <input {...getInputProps()} />
                    <img
                      src={downloadIcon}
                      alt="Download Icon"
                      className="verify-account-form__download-icon"
                    />
                    <p>
                      {isDragActive
                        ? "Drop the files here"
                        : "Drag and drop or browse to choose files"}
                    </p>
                    <p>{attachment?.name}</p>
                  </div>
                )}
              </Dropzone>
              <Button
                onClick={handleSubmit}
                type="primary"
                className="submit-btn"
                disabled={!attachment || formLoading}
                loading={formLoading}
              >
                Submit
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <h2>
                Your identity document has been uploaded. Please wait till the
                admin team verifies it.
              </h2>
              <div className="mt-4 text-center">
                <span className="text-bold">
                  <a
                    href={userDocument?.url}
                    target="_blank"
                    className="text-white"
                  >
                    View your document
                  </a>
                </span>
              </div>
            </React.Fragment>
          )}
          <div className="mt-4 text-center">
            <span className="text-bold">
              <Link to={AppRoutes.CHANGE_PASSWORD}>Change Password</Link>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyAccountForm;
