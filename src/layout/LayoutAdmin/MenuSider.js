import { Menu } from "antd";
import { DashboardOutlined, UserOutlined,BarsOutlined,FileDoneOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./layoutAdmin.scss"

function MenuSider(prop) {
  const{collapsed} = prop;

  const items = [
    {
      key: "key1",
      label: <Link to="/admin">Tổng quan</Link>,
      icon: <DashboardOutlined />,
    },
    {
      key: "key2",
      label: <Link to="/info-company">Thông tin công ty</Link>,
      icon: <UserOutlined />,
    },
    {
      key: "key3",
      label: <Link to="/job-manage">Quản lý việc làm</Link>,
      icon: <BarsOutlined />
    },
    {
      key: "key4",
      label: <Link to="/cv-manage">Quản lý CV</Link>,
      icon: <FileDoneOutlined />
    },
  ];
  return (
    <>
      <div className="header__logo" style={{background: "#ffff", margin: "0px"}}>
        <h3>{collapsed ? "ITA" : "IT Admin"}</h3>
      </div>
      <Menu style={{ height: "100%"}} items={items} mode="inline"  defaultSelectedKeys={["key1"]}  />
    </>
  );
}

export default MenuSider;
