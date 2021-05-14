import React, { useEffect, useState } from "react";
import "./userList.scss";
import { User } from "../../../models/user.model";
import { UserService } from "../../../services/User/user.service";
import AppLoader from "../../../shared/components/AppLoader";
import { Button, Modal, Table } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { VerificationStatusEnum } from "../../../enums/verificationStatus.enum";
import PostService from "../../../services/Post/post.service";

interface UserListProps {}

function UserList(props: UserListProps) {
  const [users, setUsers] = useState<User[]>([]);

  const [activeUserId, setActiveUserId] = useState<number>();

  const [documentLoading, setDocumentLoading] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);

  const handleUpdateUserStatus = (
    user: User,
    status: VerificationStatusEnum
  ) => () => {
    Modal.confirm({
      icon: null,
      content: (
        <h5>{`Are you sure want to ${
          status === VerificationStatusEnum.VERIFIED ? "approve" : "reject"
        } the user?`}</h5>
      ),
      onOk() {
        if (user?.id) {
          UserService.verifyUser(
            user.id,
            status,
            () => {
              handleFetchUsers();
            },
            () => {},
            () => {}
          );
        }
      },
      onCancel() {},
    });
  };

  const handleViewDocument = (user: User) => () => {
    if (user.id) {
      setActiveUserId(user.id);
      setDocumentLoading(true);
      UserService.getUserIdentityDocument(
        user.id,
        (url: string) => {
          window.open(url, "_blank");
        },
        () => {},
        () => {
          setActiveUserId(undefined);
          setDocumentLoading(false);
        }
      );
    }
  };

  const handleFetchUsers = () => {
    setLoading(true);
    UserService.fetchUsers(
      (users: User[]) => {
        setUsers(users);
      },
      () => {},
      () => {
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    handleFetchUsers();
  }, []);

  const columns = [
    {
      title: "User Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "View Document",
      dataIndex: "documentStatus",
      key: "documentStatus",
      render: (documentStatus: string, user: User) => (
        <div className="user-list__view-document text-pink">
          {documentStatus !== VerificationStatusEnum.NOT_UPLOADED ? (
            <Button
              loading={documentLoading && activeUserId === user.id}
              type="link"
              className="text-pink"
              onClick={handleViewDocument(user)}
            >
              View document
            </Button>
          ) : (
            "NA"
          )}
        </div>
      ),
    },
    {
      title: "Document Status",
      dataIndex: "documentStatus",
      key: "documentStatus",
      render: (status: string) => (
        <div className="user-list__status">
          <span>{status?.split("_").join(" ")}</span>
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "documentStatus",
      key: "username",
      render: (documentStatus: string, user: User) =>
        documentStatus === VerificationStatusEnum?.PENDING ? (
          <div className="user-list__actions">
            <Button
              type="primary"
              onClick={handleUpdateUserStatus(
                user,
                VerificationStatusEnum.VERIFIED
              )}
            >
              <CheckOutlined />
              Approve
            </Button>
            <Button
              type="primary"
              onClick={handleUpdateUserStatus(
                user,
                VerificationStatusEnum.REJECTED
              )}
            >
              <CloseOutlined />
              Reject
            </Button>
          </div>
        ) : (
          "NA"
        ),
    },
  ];

  return (
    <div className="user-list">
      {loading ? (
        <AppLoader loading={loading} />
      ) : (
        <Table dataSource={users} columns={columns} />
      )}
    </div>
  );
}

export default UserList;
