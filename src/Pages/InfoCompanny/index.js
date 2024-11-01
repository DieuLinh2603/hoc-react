import { Button, Card, Col, Form, Input, Row,message } from "antd";
import { useEffect, useState } from "react";
import { EditOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { editCompany, getDetailCompany } from "../../services/companyService";
import { getCookie } from "../../helpers/cookie";
const { TextArea } = Input;


function InfoCompany() {
  const rules = [
    {
      required: true,
    },
  ];

  const idCompany = getCookie("id");
  const [data, setData] = useState();
  const [edit, setEdit] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const fetchApi = async () => {
    const response = await getDetailCompany(idCompany);


    if (response) {
      setData(response);
    form.setFieldsValue(response); // Cập nhật form với dữ liệu từ API
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const handleFinish = async (values) => {
    try {
      const response = await editCompany(idCompany, values);
      if (response) {
        messageApi.success("Cập nhật thành công!");
        fetchApi(); // Reload data sau khi cập nhật
        setEdit(false);
      }
    } catch (error) {
      messageApi.error("Cập nhật thất bại, vui lòng thử lại!");
    }
  };


  const handleEdit = () => {
    setEdit(true);
  };

  const handleCancel = () => {
    setEdit(false);
  };
  return (
      <>
      {contextHolder}
    {data && (<Card
        style={{ height: "100%" }}
        title="Thông tin công ty"
        extra={
          !edit ? (
            <Button icon={<EditOutlined />} onClick={handleEdit}>
              Chỉnh sửa
            </Button>
          ) : (
            <Button icon={<CloseCircleOutlined />} onClick={handleCancel}>
              Hủy
            </Button>
          )
        }
      >
        <Form layout="vertical" initialValues={data} form={form} disabled={!edit} onFinish={handleFinish}>
          <Row gutter={20}>
            {/* tên công ty */}
            <Col span={24}>
              <Form.Item label="Tên công ty" name="companyName" rules={rules}>
                <Input />
              </Form.Item>
            </Col>

            {/* email */}
            <Col span={8}>
              <Form.Item label="Email" name="email" rules={rules}>
                <Input />
              </Form.Item>
            </Col>

            {/* Số điện thoại */}
            <Col span={8}>
              <Form.Item label="Số điện thoại" name="phone" rules={rules}>
                <Input />
              </Form.Item>
            </Col>

            {/* Địa chỉ */}
            <Col span={8}>
              <Form.Item label="Địa chỉ" name="address">
                <Input />
              </Form.Item>
            </Col>

            {/* Số lượng nhân sự */}
            <Col span={8}>
              <Form.Item label="Số lượng nhân sự" name="quantityPeople">
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Thời gian làm việc" name="workingTime">
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Link Website công ty" name="website">
                <Input />
              </Form.Item>
            </Col>

            {/* Mô tả ngắn */}
            <Col span={24}>
              <Form.Item label="Mô tả ngắn" name="detail">
                <TextArea rows={3} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item layout="vertical" label="Chi tiết" name="description">
                <TextArea rows={6} />
              </Form.Item>
            </Col>

            {edit && (
              <Col span={24}>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Cập nhật
                  </Button>
                  <Button className="ml-30">Hủy</Button>
                </Form.Item>
              </Col>
            )}
          </Row>
        </Form>
      </Card>)}
      
    </>
  );
}
export default InfoCompany;
