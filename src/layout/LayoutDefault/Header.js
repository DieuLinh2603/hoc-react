import { Link, useNavigate } from "react-router-dom"
import logo from "../../image/logo.jpg";
import { Button } from "antd";
import "./LayoutDefault.scss"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import { LogoutOutlined,UserOutlined  } from '@ant-design/icons';


function Header() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const token = getCookie("email");

  const isLogin = useSelector(state => state.loginReducer);
  console.log(isLogin);


  useEffect(() => {
    const handleSize = () => {
      if (window.innerWidth < 576) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    }
    window.addEventListener("resize", handleSize)
  }, [])

  const handleClick = () => {
    navigate("/")
  }

  return (
    <>
      <div className="layout-default-header">
        <div className="layout-default-header__logo" onClick={handleClick} style={{ cursor: "pointer" }}>
          <img src={logo} alt="" />
          <h3>{collapsed ? "" : "IT Jobs"}</h3>
        </div>

        {token ?
          <>
            <div>
              <Button className="layout-default-header__button--login">
              <UserOutlined />
                <Link to="/admin">Quản trị</Link>
              </Button>
              <Button className="layout-default-header__button--register" >
              <LogoutOutlined />
                <Link to="/logout">Đăng xuất</Link>
              </Button>
            </div>
          </>

          : <><div className="layout-default-header__button">
            <Button className="layout-default-header__button--login">
              <Link to="/login">Đăng nhập</Link>
            </Button>
            <Button className="layout-default-header__button--register" type="primary">
              <Link to="/register">Đăng ký</Link>
            </Button>
          </div>
          </>}
      </div>
    </>
  );
}
export default Header;
