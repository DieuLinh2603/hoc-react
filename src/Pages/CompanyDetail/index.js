import { Button, Row, Col } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailCompany } from "../../services/companyService";
import { getListJob } from "../../services/jobService";
import JobItem from "../../components/JobItem";

function CompanyDetail() {
  const params = useParams();
  console.log(params);

  const [data, setData] = useState();
  const [jobs, setJobs] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const infoCompany = await getDetailCompany(params.id);
      const jobList = await getListJob(params.id);

      //Thêm infoCompany vào mỗi job
      const dataJobs = jobList.map((item) => ({
        ...item,
        infoCompany: infoCompany,
      }));

      setData(infoCompany);
      setJobs(dataJobs);
    };

    fetchApi();
  }, [params.id]);

  return (
    <>
      <Button>Trở lại</Button>
      {data && (
        <>
          <h1>{data.companyName}</h1>
          <Row span={16}>
            <Col>
              <div className="mb-10">
                Địa chỉ: <strong>{data.address}</strong>
              </div>

              <div className="mb-10">
                Số lượng nhân viên: <strong>{data.quantityPeople}</strong>
              </div>

              <div className="mb-10">
                Thời gian làm việc: <strong>{data.workingTime}</strong>
              </div>

              <div className="mb-10">
                Link website: <a href={data.website}>{data.website}</a>
              </div>

              <div className="mt-20">
                Mô tả ngắn: <br></br>
                {data.detail}
              </div>
            </Col>
            <Col span={8}> 
              <div style={{float: "right"}}>
                <img src={data.image} alt={data.companyName}/>
              </div>
            </Col>
          </Row>
          <div></div>

          <div className="mt-20">
            Mô tả chi tiết: <br></br>
            {data.description}
          </div>

          <div className="mt-20">
            <strong>Danh sách các Job</strong>
          </div>
          <Row gutter={[10, 10]} className="mt-20">
            {jobs.map((item, index) => (
              <Col span={8} key={index}>
                <JobItem data={item} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
}
export default CompanyDetail;
