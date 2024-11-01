import { Button, Tag,Select, Card, Form, Input, Row, Col} from "antd";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOneJob } from "../../services/jobService";
import { getDetailCompany } from "../../services/companyService";
import { getTimeCurrent } from "../../helpers/getTimeCurrent";
import { createCV } from "../../services/cvService";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import '@sweetalert2/theme-minimal/minimal.scss';
const {Option} = Select;
const { TextArea } = Input;
function JobDetail() {
  const params = useParams();
  const [form] = Form.useForm();
  const [job, setJob] = useState();

  const rules =[
    {
      //tạo dấu chấm đỏ
      required: true,
      message: "Vui lòng nhập thông tin!",
    },
  ];

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getOneJob(params.id);
      console.log(params.id);

      const infoCompany = await getDetailCompany(response.id);

      const jobFinal = {
        infoCompany: infoCompany,
        ...response,
      };

      console.log(jobFinal);

      setJob(jobFinal);
    };
    fetchApi();
  }, []);

  const handelFinish = async (value) => {
    Swal.fire({
      title: "Bạn có chắc chắn ứng tuyển không?",
      text: "CV của bạn sẽ gửi đến công ty ngay!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý!",
      animation: true,
    }).then(async (result) => {  // Sửa lại cú pháp đúng
      if (result.isConfirmed) {  // Kiểm tra người dùng có xác nhận không
        value.idJob = job.id;
        value.idCompany = job.infoCompany.id;
        value.createAt = getTimeCurrent();
        
        const response = await createCV(value);
        if (response) {  // Kiểm tra phản hồi từ API
          Swal.fire({
            title: "Gửi yêu cầu thành công!",
            text: "Nhà tuyển dụng sẽ lên hệ với bạn trong thời gian sớm nhất!",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Thất bại",
            text: "Đã xảy ra lỗi trong quá trình nộp đơn!",
            icon: "error",
          });
        }
        form.resetFields();
      }
  });
  
  };
  


  return (
    <>
      <Button >Trở lại</Button>
      {job && (
        <>
          <h1>{job.name}</h1>
          <Button href="#formApply" type="primary">ỨNG TUYỂN NGAY</Button>

          <div className="mt-20">
            <span>Tags: </span>
            {(job.tags || []).map((item, index) => (
              <Tag key={index} color="blue">
                {item}
              </Tag>
            ))}
          </div>

          <div className="mt-20">
            <span>Thành phố: </span>
            {(job.city || []).map((item, index) => (
              <Tag key={index} color="orange">
                {item}
              </Tag>
            ))}
          </div>

          <div className="mt-20">
            <span>
              Mức lương: <strong>{job.salary}$</strong>
            </span>
          </div>

          <div className="mt-20">
            <span>
              Địa chỉ công ty: <strong>{job.infoCompany.address}</strong>
            </span>
          </div>

          <div className="mt-20">
            <span>
              Thời gian đăng bài: <strong>{job.createAt}</strong>
            </span>
          </div>

          <div className="mt-20">
            <p>Mô tả công việc</p>
            <p>{job.description}</p>
          </div>

          <Card title="Ứng tuyển ngay" id="formApply">
            <Form layout="vertical" onFinish={handelFinish} form={form}>
              <Row gutter={[20,20]}>
                {/* Họ tên */}
                <Col span={6}>
                  <Form.Item
                    label="Họ tên"
                    name="name"
                    rules={rules} 
                  >
                    <Input />
                  </Form.Item>
                </Col>

                 {/* Số điện thoại */}
                 <Col span={6}>
                  <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    rules={rules} 
                  >
                    <Input />
                  </Form.Item>
                </Col>

                 {/* Email*/}
                 <Col span={6}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={rules} 
                  >
                    <Input />
                  </Form.Item>
                </Col>

                 {/* Họ tên */}
                 <Col span={6}>
                  <Form.Item
                    label="Thành phố"
                    name="city"
                    rules={rules} 
                  >
                    <Select>
                      {job.city.map((item, index) => (
                        <Option value={item} label={item} key={index}></Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                {/* Giới thiệu bản thân */}
                <Col span={24}>
                  <Form.Item
                    label="Giới thiệu bản thân"
                    name="description"
                    rules={rules} 
                  >
                       <TextArea rows={6} />
                  </Form.Item>
                </Col>

                {/* Danh sách link project đã làm */}
                <Col span={24}>
                  <Form.Item
                    label="Danh sách link project đã làm"
                    name="linkProject"
                    rules={rules} 
                  >
                       <TextArea rows={6} />
                  </Form.Item>
                </Col>

                {/* Nút gửi yêu cầu */}
                <Col span={6}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">Gửi yêu cầu</Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </>
      )}
    </>
  );
}
export default JobDetail;
