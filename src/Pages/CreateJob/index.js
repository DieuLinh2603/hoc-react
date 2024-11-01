import { Button, message, Col, Form, Input, Row, Select, Switch } from "antd";
import { useEffect, useState } from "react";
import { getAllTag } from "../../services/tagService";
import { getListCity } from "../../services/cityService";
import { getCookie } from "../../helpers/cookie";
import { getTimeCurrent } from "../../helpers/getTimeCurrent";
import { createJob } from "../../services/jobService";
import GoBack from "../../components/GoBack";
const { TextArea } = Input;
function CreateJob()
{
    const  rules = 
    [
        { 
            required: true, 
            message: 'Vui lòng nhập thông tin!' 
        }
    ]

    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const idCompany = getCookie("id");
    const [tags, setTags] = useState([]);
    const [citys, setCitys] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getAllTag();
            if(response)
            {
                setTags(response);
            }
        }
        fetchApi();
    },[])

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getListCity();
            if(response)
            {
                setCitys(response);
            }
        }
        fetchApi();
    },[])

    const handleSubmit = async (values) => {
        values.idCompany = parseInt(idCompany);
        values.createAt = getTimeCurrent();
        const response = await createJob(values);
        if(response)
        {
            form.resetFields();
            messageApi.open(
                {
                    type: 'success',
                    content: 'Tạo job mới thành công!',
                    // Thời gian hết thông báo
                    duration: 5
                }
            )
        } else{
            messageApi.open(
                {
                    type: 'error',
                    content: 'Tạo job mới không thành công!',
                }
            )
        }
        
    }
    return(
        <>
    <GoBack/>

         {contextHolder}
           <h2>Tạo job mới</h2>
           <Form layout="vertical" onFinish={handleSubmit} form={form}>
            <Row gutter={20}>
                <Col span={24}>
                <Form.Item label="Tên job" name="name"  rules={rules}>
                    <Input/>
                </Form.Item>
                </Col>

                <Col span={16}>
                <Form.Item label="Tags" name="tags"  rules={rules}>
                    <Select mode="multiple"  allowClear options={tags}/>
                </Form.Item>
                </Col>

                <Col span={8}>
                <Form.Item label="Mức lương" name="salary"  rules={rules}>
                    <Input addonAfter="$"/>
                </Form.Item>
                </Col>

                <Col span={24}>
                <Form.Item label="Thành phố" name="city"  rules={rules}>
                    <Select mode="multiple"  allowClear options={citys}/>
                </Form.Item>
                </Col>

                <Col span={24}>
                <Form.Item label="Mô tả" name="description" rules={rules}>
                    <TextArea rows={8}/>
                </Form.Item>
                </Col>

                <Col span={24}>
                <Form.Item label="Trạng thái" name="status">
                    <Switch checkedChildren="Bật" unCheckedChildren="Tắt"  />
                </Form.Item>
                </Col>

                <Col span={24}>
                <Form.Item >
                    <Button htmlType="submit" type="primary">Tạo mới</Button>
                </Form.Item>
                </Col>
            </Row>
                
           </Form>
        </>
    )
}
export default CreateJob;