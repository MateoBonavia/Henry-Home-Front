import React, { useState } from "react";
import { Row, Col, Image, Modal } from "antd";
import { SearchOutlined, SolutionOutlined } from "@ant-design/icons";

import "../assets/css/NavBar/NavBar.css";
import "antd/dist/antd.css";

import Logo from "../assets/img/HenryHome.png";
import Button from "../pseudoComponents/Button.jsx";
import Input from "../pseudoComponents/Input.jsx";
import Formulario from "../pseudoComponents/Formulario.jsx";

const Style = {
  fontSize: 15,
};

export default function NavBar() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [typeLogIn, setTypeLogIn] = useState("");

  const showModalR = () => {
    setTypeLogIn("Register");
    setIsModalVisible(true);
  };

  const showModalS = () => {
    setTypeLogIn("SignIn");
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="allNav">
      <Row gutter={20}>
        {/* ---------------- Logo ---------------- */}

        <Col span={3}>
          <Image className="navLogo" preview={false} src={Logo} />
        </Col>

        {/* ---------------- Desktop Version ---------------- */}

        <Col className="navInput" span={0} sm={0} md={8} lg={8}>
          <Input />
        </Col>

        <Col className="navBtn" xs={0} sm={0} md={3} lg={3}>
          <Button
            styles={Style}
            click={showModalS}
            types="ghost"
            text="Sign In"
          />
        </Col>

        <Col className="navBtn" xs={0} sm={0} md={3} lg={3}>
          <Button
            styles={Style}
            click={showModalR}
            types="ghost"
            text="Register"
          />
        </Col>

        {/* ---------------- Mobile version ---------------- */}

        <Col
          xs={{ span: 6, offset: 9 }}
          sm={{ span: 3, offset: 15 }}
          md={0}
          lg={0}
        >
          <SearchOutlined className="navIcon" />
        </Col>

        <Col
          xs={{ span: 6, offset: 0 }}
          sm={{ span: 3, offset: 0 }}
          md={0}
          lg={0}
        >
          <SolutionOutlined className="navIcon" />
        </Col>
      </Row>

      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={closeModal}
        onCancel={closeModal}
      >
        {typeLogIn === "SignIn" ? (
          <Formulario nombre={typeLogIn} />
        ) : (
          <Formulario nombre={typeLogIn} />
        )}
      </Modal>
    </div>
  );
}
