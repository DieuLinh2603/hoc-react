import {
  Button,
  Input,
  Modal,
  Tooltip,
  Form,
  Select,
  Row,
  Col,
  Switch,
  message,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { getTimeCurrent } from "../../helpers/getTimeCurrent";
import { updateJob } from "../../services/jobService";
import { getListCity } from "../../services/cityService";
import { getAllTag } from "../../services/tagService";

function EditJob(props) {
  const rules = [
    {
      required: true,
    },
  ];
  const [messageApi, contextHolder] = message.useMessage();
  const { recordFileEdit, onReload } = props;
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState();
  const [citys, setCitys] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListCity();
      setCitys(response);
    };

    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
        const response = await getAllTag()
        setTags(response);
    }
    fetchApi();
  },[])
  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const handleEdit = async (values) => {
    values.updateAt = getTimeCurrent();
    const response = await updateJob(recordFileEdit.id, values);
    console.log(values);

    if (response) {
      setOpen(false);
      //load lại trang ngay khi có thay đổi
      onReload();
      messageApi.open({
        type: "success",
        content: "Cập nhật dữ liệu thành công!",
      });
    } else {
      messageApi.open({
        type: "error",
        content: "Cập nhật dữ liệu thất bại!",
      });
    }
  };
  return (
    <>
      {contextHolder}
      <Tooltip title="Chỉnh sửa">
        <Button
          onClick={showModal}
         className="ml-5"
          type="primary"
          icon={<EditOutlined />}
        ></Button>
      </Tooltip>
      <Modal
        open={open}
        onCancel={handleCancel}
        title="Chỉnh sửa"
        footer={null}
      >
        <Form
          layout="vertical"
          initialValues={recordFileEdit}
          onFinish={handleEdit}
        >
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item label="Tên job" name="name" rules={rules}>
                <Input />
              </Form.Item>
            </Col>

            <Col span={16}>
              <Form.Item label="Tags" name="tags" rules={rules}>
                <Select mode="multiple" allowClear options={tags} />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Mức lương" name="salary" rules={rules}>
                <Input addonAfter="$"/>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Thành phố" name="city">
                <Select mode="multiple" allowClear options={citys}/>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Mô tả" name="description">
                <TextArea rows={8} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Trạng thái" name="status">
                <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Cập nhật
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
export default EditJob;
