import { Avatar, Rate, Space, Table } from "antd";
import Typography from "antd/es/typography/Typography";
import React, { useEffect, useState } from "react";
import { getInventory, getOrders } from "../../API";

const Orders = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getOrders().then((res) => {
      setDataSource(res.products);
      setLoading(false);
    });
  }, []);
  return (
    <div>
      <Space size={20}>
        <Typography.Title level={4}>Orders</Typography.Title>
        <Table
          columns={[
            {
              title: "Title",
              dataIndex: "title",
            },
            {
              title: "price",
              dataIndex: "price",
              render: (value) => {
                return <span>${value}</span>;
              },
            },
            {
              title: "Discounted Price",
              dataIndex: "discountedPrice",
              render: (value) => {
                return <span>${value}</span>;
              },
            },
            {
              title: "Quantity",
              dataIndex: "quantity",
            },
            {
              title: "Total",
              dataIndex: "total",
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

export default Orders;
