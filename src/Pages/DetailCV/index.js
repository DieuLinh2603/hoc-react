/* eslint-disable react/jsx-no-target-blank */
import { Card, Tag } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { changeStatusCV, getOneCV } from "../../services/cvService";
import TextArea from "antd/es/input/TextArea";
import { getOneJob } from "../../services/jobService";
import GoBack from "../../components/GoBack";

function DetailCV() {
  const params = useParams();
  const [data, setData] = useState();
  const [job, setJob] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const response1 = await getOneCV(params.id);
      if (response1) {
        const response2 = await getOneJob(response1.idJob);
        if (response2) {
        setData(response1);
        console.log(response1);
        
          setJob(response2);
        }
      }
      //để khi bấm vào xem CV thì hệ thống đã cập nhật lại là xem
      changeStatusCV(params.id, { statusRead: true });
    };
    fetchApi();
  }, []);

  console.log(data);

  return (
    <>
    <GoBack/>
      {data && (
        <>
          <Card title={`Ứng cử viên: ${data.name}`}>
            <div className="mt-20">
              Ngày gửi: <strong>{data.createAt}</strong>
            </div>

            <div className="mt-20">
              Số điện thoại: <strong>{data.phone}</strong>
            </div>

            <div className="mt-20">
              Email: <strong>{data.email}</strong>
            </div>

            <div className="mt-20">
              Thành phố ứng tuyển: <strong>{data.city}</strong>
            </div>

            <div className="mt-20">
              Giới thiệu bản thân:
              <br />
              <TextArea
                className="mt-20"
                disabled
                value={data.description}
                rows={4}
              />
            </div>

            <div className="mt-20">
              Thành phố ứng tuyển: <strong>{data.city}</strong>
            </div>

            <div className="mt-20">
              Link project :
              <a target="_blank" href={data.linkProject}>
                {data.linkProject}
              </a>
            </div>
          </Card>

          <Card title={`Thông tin job: ${job.name}`}>
            <div>
              Tags:
              {job.tags.map((item, index) => (
                <Tag key={index} color="blue">
                  {item}
                </Tag>
              ))}
            </div>

            <div className="mt-20">
              Mức lương: <strong>{job.salary}</strong>
            </div>

            <div className="mt-20">
              Mô tả
              <br />
              {job.description}
            </div>
          </Card>
        </>
      )}
    </>
  );
}
export default DetailCV;
