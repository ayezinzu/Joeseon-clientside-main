import React from "react";
import "./downloadLinks.scss";
import { Row, Col } from "antd";
import downloadIcon from "../../../assets/images/downloadIcon.png";

function DownloadLinks() {
  return (
    <div className="download-links" id="download-links">
      <h1>DOWNLOAD</h1>
      <Row>
        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
          <div className="download-links__item"></div>
          <img src={downloadIcon} alt="Download Icon" />
        </Col>
        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
          <div className="download-links__item"></div>
          <img src={downloadIcon} alt="Download Icon" />
        </Col>
        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
          <div className="download-links__item"></div>
          <img src={downloadIcon} alt="Download Icon" />
        </Col>
        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
          <div className="download-links__item"></div>
          <img src={downloadIcon} alt="Download Icon" />
        </Col>
      </Row>
    </div>
  );
}

export default DownloadLinks;
