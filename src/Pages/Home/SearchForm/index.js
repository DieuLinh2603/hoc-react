import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import { getListCity } from "../../../services/cityService";
import { Button, Form, Input, Select } from "antd";
import { Col, Row } from 'antd';

function SearchForm() {
  const [city, setCity] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getListCity();
      const option = {
        key: 0,
        value: "All",
      };
      setCity([option, ...result]);
    };
    fetchApi();
  }, []);
  // console.log(city);

  const handleFinish = (values) => {
    //Trả về 1 object là giá trị của các form item có name
    // console.log(values);

    let city = values.city || "";
    city = values.city === "All" ? "" : city;
    navigate(`/search?city=${city}&keyword=${values.keyword || ""}`)
    
  }
  return (
    <>
      <h1>1000+ IT Jobs For Developers</h1>
      {city && (
        <Form onFinish={handleFinish}>
          {/* ngang -dọc */}
          <Row gutter={[12,12]}>
            <Col xxl={5} xl={5} lg={5}>
              <Form.Item name="city" label="Địa điểm">
                <Select  options={city} placeholder="Chọn tỉnh/thành phố" allowClear></Select>
              </Form.Item>
            </Col>

            <Col xxl={6} xl={6} lg={6}>
              <Form.Item name="keyword" >
                <Input placeholder="Nhập từ khóa..."></Input>
              </Form.Item>
            </Col>

            <Col xxl={3} xl={3} lg={3}>
              <Form.Item >
                <Button type="primary" htmlType="submit">Tìm kiếm</Button>
              </Form.Item>
            </Col>
          </Row>

        </Form>
      )}
    </>
  );
}
export default SearchForm;
