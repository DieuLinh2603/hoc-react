import {
  Button,
  Card,
  Checkbox,
  notification,
  Col,
  Flex,
  Form,
  Input,
  Row,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import * as company from "../../services/companyService";
import { useNavigate } from "react-router-dom";
import { createCookie, deleteAllCookie } from "../../helpers/cookie";
import { useDispatch } from "react-redux";
import { checkAuthen } from "../../actions/checkAuthen.js";
import { useEffect } from "react";
function Login() {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFinish = async (values) => {
    console.log(values);
    const data = await company.login(values.email, values.password);

    const time = 1;
    if (data.length > 0) {
      createCookie("id", data[0].id, time);
      createCookie("companyName", data[0].companyName, time);
      createCookie("email", data[0].email, time);
      createCookie("tooken", data[0].token, time);
      dispatch(checkAuthen(true));
      navigate("/");
    } else {
      api.error({
        message: "Lỗi",
        description: "Tài khoản hoặc mật khẩu không đúng. Vui lòng thử lại!",
        placement: "top",
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      deleteAllCookie();
      dispatch(checkAuthen(false));
      navigate("/login");
    },500000)
  },[])

  return (
    <>
      {contextHolder}
      <Row justify="center">
        <Col span={10}>
          <Card title="Đăng nhập">
            <Form
              onFinish={handleFinish}
              name="login"
              // Xử lý sau
              initialValues={{
                remember: true,
              }}
            >
              <Form.Item
                layout="horizontal"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập email!",
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Tài khoản" />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu!",
                  },
                ]}
                name="password"
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Mật khẩu"
                />
              </Form.Item>
              <Form.Item>
                <Flex justify="space-between" align="center">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Lưu mật khẩu</Checkbox>
                  </Form.Item>
                  {/* Làm sau */}
                  <a href="">Quên mật khẩu?</a>
                </Flex>
              </Form.Item>

              <Form.Item>
                <Button block type="primary" htmlType="submit">
                  Đăng nhập
                </Button>
                Hoặc <a href="/register">Đăng ký ngay bây giờ!</a>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
}
export default Login;
