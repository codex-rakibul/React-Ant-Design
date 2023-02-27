import { Avatar, Rate, Space, Table } from "antd";
import Typography from "antd/es/typography/Typography";
import React, { useEffect, useState } from "react";
import { getInventory } from "../../API";

const Inventory = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getInventory().then((res) => {
      setDataSource(res.products);
      setLoading(false);
    });
  },[]);
  return (
    <div>
      <Space size={20}>
        <Typography.Title level={4}>Inventory</Typography.Title>
        <Table
          columns={[
            {
              title: "Thumbnail",
              dataIndex: "thumbnail",
              render:(link=>{
                return <Avatar src={link}/>
              })
            },
            {
              title: "Title",
              dataIndex: "title",
            },
            {
              title: "price",
              dataIndex: "price",
              render:(value)=>{
                return <span>${value}</span>
              }
            },
            {
              title: "Rating",
              dataIndex: "rating",
              render:(raking)=>{
                return <Rate value={raking} allowHalf={true} disabled/>
              }
            },
            {
              title: "Stock",
              dataIndex: "stock",
            },
            {
              title: "Brand",
              dataIndex: "brand",
            },
            {
              title: "Category",
              dataIndex: "category",
            },
          ]}
          loading={loading}
          dataSource={dataSource}
          pagination={{}}
        ></Table>
      </Space>
    </div>
  );
};

export default Inventory;
