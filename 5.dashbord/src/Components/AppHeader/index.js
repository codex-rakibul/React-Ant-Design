import { Badge, Image, Space, Typography } from "antd";
import { BellFilled, MailOutlined } from "@ant-design/icons";
import React from "react";

const AppHeader = () => {
  return (
    <div className="AppHeader">
      <Image
        width={40}
        src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Flogo%2F&psig=AOvVaw1kEcZSsc7SDYwKSbhgNuT5&ust=1676954474219000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCMiq0q-ko_0CFQAAAAAdAAAAABAE"
      ></Image>
      <Typography.Title style={{ color: "white", fontSize: "24px" }}>
        DashBoard
      </Typography.Title>
      <Space>
        <Badge count={1} dot>
          <MailOutlined style={{ fontSize: 20, marginRight: 10 }} />
        </Badge>
        <Badge count={1}>
          <BellFilled style={{ fontSize: 20, marginRight: 10 }} />
        </Badge>
      </Space>
    </div>
  );
};

export default AppHeader;
