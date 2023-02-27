import { AppstoreOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const SideMenu = () => {
  const navigate = useNavigate()
  return (
    <div className="SideMenu">
      <Menu
      onClick={(item)=>{
        navigate(item.key);

      }}
        items={[
          {
            label: "Dashboard",
            icon:<AppstoreOutlined/>,
            key: "/",
          },
          {
            label: "Inventory",
            icon:<ShopOutlined/>,
            key: "/inventory",
          },
          {
            label: "Orders",
            icon:<ShoppingCartOutlined/>,
            key: "/orders",
          },
          {
            label: "Customer",
            icon:<UserOutlined/>,
            key: "/customers",
          },
        ]}
      ></Menu>
    </div>
  );
};

export default SideMenu;
