import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Table } from "antd";
import Typography from "antd/es/typography/Typography";
import React, { useEffect, useState } from "react";
import { getOrders, getRevinue } from "../../API";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  return (
    <div>
      <Space size={12} direction="vertical">
        <Typography.Title level={4}>Dashboard</Typography.Title>
        <Space direction="horizontal">
          <DashboardCard
            icon={
              <ShoppingCartOutlined
                style={{
                  color: "white",
                  backgroundColor: "rgba(0,255,0,0.5)",
                  borderRadius: 12,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Orders"}
            value={12345}
          />
          <DashboardCard
            icon={
              <ShoppingOutlined
                style={{
                  color: "white",
                  backgroundColor: "rgb(255, 99, 71)",
                  borderRadius: 12,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Inventory"}
            value={12345}
          />
          <DashboardCard
            icon={
              <UserOutlined
                style={{
                  color: "white",
                  backgroundColor: "teal",
                  borderRadius: 12,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Customer"}
            value={12345}
          />
          <DashboardCard
            icon={
              <DollarCircleOutlined
                style={{
                  color: "white",
                  backgroundColor: "darkgray",
                  borderRadius: 12,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Revenue"}
            value={12345}
          />
        </Space>
        <Space>
          <RecentOrders />
          <DashboardChart />
        </Space>
      </Space>
    </div>
  );
};

function DashboardCard({ title, value, icon }) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}
function RecentOrders() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getOrders().then((res) => {
      setDataSource(res.products.splice(0, 3));
      setLoading(false);
    });
  }, []);
  return (
    <>
      <Typography.Text>Recents Orders</Typography.Text>
      <Table
        columns={[
          {
            title: "Title",
            dataIndex: "title",
          },

          {
            title: "Quantity",
            dataIndex: "quantity",
          },
          {
            title: "Price",
            dataIndex: "discountedPrice",
          },
        ]}
        rowKey="id"
        loading={loading}
        dataSource={dataSource}
        pagination={false}
      ></Table>
    </>
  );
}
function DashboardChart() {
  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: [],
  });
  useEffect(() => {
    getRevinue().then((res) => {
      const labels = res.carts.map((cart) => {
        return `User-${cart.userId}`;

      });
      const data = res.carts.map((cart) => {
        return cart.discountedTotal;
      });
      const dataSource = {
        labels: labels,
        datasets: [
          {
            label: "Revenue",
            data: data,
            backgroundColor: "tomato",
          },
        ],
      };
      setRevenueData(dataSource);
    });
  }, []);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Order Revenue",
      },
    },
  };
 

  return <Card style={{width:500, height:250}}><Bar options={options} data={revenueData} /></Card>;
}
export default Dashboard;
