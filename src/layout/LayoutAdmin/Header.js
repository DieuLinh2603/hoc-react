import { Button } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  HomeOutlined
} from "@ant-design/icons";
import { Layout, theme } from "antd";
import { Link } from "react-router-dom";
import "./layoutAdmin.scss"

const { Header } = Layout;

function HeaderAdmin(prop) {
  const {collapsed, setCollapsed} = prop;
  const {
    token: { colorBgContainer},
  } = theme.useToken();
  return (
    <>
      <Header className="header" style={{ padding: 0, background: colorBgContainer }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />

        <span className="mr-50">
          <Button type="primary" className="layout-default-header__button--login" icon={<HomeOutlined />  }>
                                                                                                                                                
            <Link to="/">Trang chủ</Link>
          </Button>
          <Button className="layout-default-header__button--register" icon={ <LogoutOutlined />}>
           
            <Link to="/logout">Đăng xuất</Link>
          </Button>
        </span>
      </Header>
    </>
  );
}

export default HeaderAdmin;
