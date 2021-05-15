import React, { useEffect, useState } from "react";
import "./moderatorList.scss";
import { User } from "../../../models/user.model";
import ModeratorService from "../../../services/Moderator/moderator.service";
import AppLoader from "../../../shared/components/AppLoader";
import { Button, Col, Drawer, Modal, Row, Table } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ModeratorForm from "../ModeratorForm";
import { UserRoleEnum } from "../../../enums/userRole.enum";
import PostService from "../../../services/Post/post.service";

interface ModeratorListProps {}

function ModeratorList(props: ModeratorListProps) {
  const [loading, setLoading] = useState(false);

  const [moderators, setModerators] = useState<User[]>([]);

  const [showModeratorForm, setShowModeratorForm] = useState(false);

  const [activeModerator, setActiveModerator] = useState<User>(
    Object.assign(new User(), {
      ...new User(),
      roles: [UserRoleEnum.MODERATOR],
    })
  );

  const handleToggleModeratorForm = () =>
    setShowModeratorForm(!showModeratorForm);

  const handleAddModerator = () => {
    setActiveModerator(
      Object.assign(new User(), {
        ...new User(),
        roles: [UserRoleEnum.MODERATOR],
      })
    );
    setShowModeratorForm(true);
  };

  const handleEditModerator = (moderator: User) => () => {
    setActiveModerator(moderator);
    setShowModeratorForm(true);
  };

  const handleDeleteModerator = (moderator: User) => () => {
    Modal.confirm({
      icon: null,
      content: <h5>Are you sure want to delete the moderator?</h5>,
      onOk() {
        if (moderator?.id) {
          ModeratorService.deleteModerator(
            moderator.id,
            () => {
              const moderatorIndex = moderators.findIndex(
                (moderatorItem) => moderatorItem.id === moderator.id
              );
              if (moderatorIndex >= 0) {
                moderators.splice(moderatorIndex, 1);
              }
              setModerators([...moderators]);
            },
            () => {},
            () => {}
          );
        }
      },
      onCancel() {},
    });
  };

  const handleModeratorFormSuccess = (moderator: User) => {
    handleFetchModerators();
    handleToggleModeratorForm();
  };

  const handleFetchModerators = () => {
    setLoading(true);
    ModeratorService.fetchModerators(
      (moderators: User[]) => {
        setModerators(moderators);
      },
      () => {},
      () => {
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    handleFetchModerators();
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
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id: number, moderator: User) => (
        <div className="moderator-list__actions">
          <Button
            className="mr-2"
            icon={<EditOutlined />}
            onClick={handleEditModerator(moderator)}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={handleDeleteModerator(moderator)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="moderator-list">
      {loading ? (
        <AppLoader loading={loading} />
      ) : (
        <div className="moderator-list__table-wrapper">
          <Row className="mt-4 mb-4">
            <Col span={12}>
              <h1>MODERATORS</h1>
            </Col>
            <Col span={12} className="text-right">
              <Button type="primary" onClick={handleAddModerator}>
                <PlusOutlined /> Add Moderators
              </Button>
            </Col>
          </Row>
          <Row>
            <Table dataSource={moderators} columns={columns} />
          </Row>
          <Drawer
            title={
              <h1>
                {" "}
                {activeModerator?.id ? "Edit Moderator" : "Add Moderator"}{" "}
              </h1>
            }
            visible={showModeratorForm}
            width={"50%"}
            destroyOnClose
            onClose={handleToggleModeratorForm}
          >
            <ModeratorForm
              moderator={activeModerator}
              onSuccess={handleModeratorFormSuccess}
            />
          </Drawer>
        </div>
      )}
    </div>
  );
}

export default ModeratorList;
