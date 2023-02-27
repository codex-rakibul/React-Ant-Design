import { Avatar, Rate, Space, Table } from "antd";
import Typography from "antd/es/typography/Typography";
import React, { useEffect, useState } from "react";
import { getUsers } from "../../API";

const Customers = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getUsers().then((res) => {
      setDataSource(res.users);
      setLoading(false);
    });
  }, []);
  return (
    <div>
      <Space size={20}>
        <Typography.Title level={4}>Customer</Typography.Title>
        <Table
          columns={[
            {
              title: "Photo",
              dataIndex: "image",
              render: (link)=>{
                return <Avatar src={link}/>;
              }
            },
            {
              title: "First Name",
              dataIndex: "firstName",
              
            },
            {
              title: "Last Name",
              dataIndex: "lastName",
             
            },
            {
              title: "Email",
              dataIndex: "email",
            },
            {
              title: "Phone",
              dataIndex: "phone",
            },
          ]}
          rowKey="id"
          loading={loading}
          dataSource={dataSource}
          pagination={{
            pageSize: 6,
          }}
        ></Table>
      </Space>
    </div>
  );
};

export default Customers;
