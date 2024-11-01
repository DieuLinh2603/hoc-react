import { Card, Button, Form, notification, Input, Row, Col, Alert } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { generateToken } from "../../helpers/generateToken";
import * as company from "../../services/companyService"
import { useNavigate } from "react-router-dom"

function Register() {
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate();
    const rules = [
        {
            //tạo dấu chấm đỏ
            required: true,
            message: "Vui lòng nhập thông tin!",
        },
    ];

    const handleFinish = async (value) => {
        console.log(value);
        // Tạo ra token (thêm key Token vào values)
        value.token = generateToken();

        // Trả về 1 object
        const checkExitsEmail = await company.checkExist("email", value.email);
        const checkExitsPhone = await company.checkExist("phone", value.phone);

        if (checkExitsEmail.length > 0) {
            // api."Loại icon"
            api.error({
                message: "Lỗi",
                description:
                    'Email này đã tồn tại. Vui lòng thử lại!',
                placement: "top",
            });
        } else if (checkExitsPhone.length > 0) {
            api.error({
                message: "Lỗi",
                description: "Số điện thoại này đã được đăng ký trước đó. Vui lòng thử lại!",
                placement: "top"
            })
        } else {
            try {
                const result = await company.createCompany(value);
                
                if(result) {
                    
                    
                    // Điều hướng người dùng sau 3 giây
                    setTimeout(() => {
                        navigate("/login");
                    }, 3000); // Thời gian trì hoãn là 3000ms = 3 giây
                    api.success({
                        message: "Thành công",
                        description: "Bạn đã đăng ký tài khoản thành công!",
                        placement: "top" 
                    });
                }
            } catch (error) {
                api.error({
                    message: "Đăng ký thất bại",
                    description: "Có lỗi xảy ra trong quá trình đăng ký, vui lòng thử lại.",
                    placement: "top"
                });
            }
        }
        

    }

    return (
        // <>
        //     <div className="center">
        // <Card  title="Đăng ký tài khoản" style={{ width: "400px", background: ""}}>
        //     <Form layout="vertical">
        //         <Form.Item rules={rules} label="Tên công ty" name="companyName">
        //         <Input prefix={<UserOutlined />} placeholder="VD: ABC" />
        //         </Form.Item>

        //         <Form.Item rules={rules} label="Email" name="email">
        //             <Input></Input>
        //         </Form.Item>

        //         <Form.Item rules={rules} label="Số điện thoại" name="phone">
        //             <Input></Input>
        //         </Form.Item>

        //         <Form.Item rules={rules} label="Mật khẩu" name="password">
        //         <Input.Password  prefix={<LockOutlined />} type="password" placeholder="Password" />
        //         </Form.Item>

        //         <Form.Item>
        //             <Button type="primary" htmlType="submit">Đăng ký</Button>
        //         </Form.Item>
        //     </Form>
        // </Card>
        //     </div>

        // </>

        <>
            {contextHolder}
            <Row justify="center">
                <Col span={12}>
                    <Card title="Đăng ký tài khoản" >
                        <Form layout="vertical" onFinish={handleFinish}>
                            <Form.Item rules={rules} label="Tên công ty" name="companyName">
                                <Input prefix={<UserOutlined />} placeholder="VD: ABC" />
                            </Form.Item>

                            <Form.Item rules={rules} label="Email" name="email">
                                <Input></Input>
                            </Form.Item>

                            <Form.Item rules={rules} label="Số điện thoại" name="phone">
                                <Input></Input>
                            </Form.Item>

                            <Form.Item rules={rules} label="Mật khẩu" name="password">
                                <Input.Password prefix={<LockOutlined />} type="password" placeholder="Password" />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">Đăng ký</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
export default Register;
