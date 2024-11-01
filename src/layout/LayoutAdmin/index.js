import { Layout } from "antd";
import { getCookie } from "../../helpers/cookie";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./layoutAdmin.scss"
import MenuSider from "./MenuSider";
import HeaderAdmin from "./Header";
import GoBack from "../../components/GoBack";
const { Sider, Content } = Layout;


function LayoutAdmin(prop) {
  const token = getCookie("tooken");
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  if (!token) {
    navigate("/login");
  }
  return (
    <>
      {token && (
        <Layout className="layout__admin">
          <Sider style={{border: "1px solid #ddd"}} className={collapsed ? "slider__admin--collapsed " : ""} trigger={null} collapsible collapsed={collapsed}>
            <MenuSider collapsed={collapsed} />
          </Sider>

          <Layout >
            <HeaderAdmin collapsed={collapsed} setCollapsed={setCollapsed} />
            <Content className="layout__admin--content">
              <Outlet />
            </Content>
          </Layout>
        </Layout>


      )}
    </>
  );
}
export default LayoutAdmin;
