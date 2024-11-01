import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneJob } from "../../services/jobService";
import { Tag } from "antd";
import GoBack from "../../components/GoBack";

function DetailJob() {
  const params = useParams();
  console.log(params);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getOneJob(params.id);
      if (response) {
        setData(response);
      }
    };
    fetchApi();
  }, []);

  return (
    <>
      <GoBack />

      {data && (
        <>
          <h2>Tên job: {data.name}</h2>
          <div>
            Trạng thái:{" "}
            {data.status ? (
              <Tag color="green">Đang bật</Tag>
            ) : (
              <Tag color="red">Đang tắt</Tag>
            )}
          </div>

          <div className="mt-20">
            Tags:{" "}
            {data.tags.map((item, index) => (
              <Tag key={index} color="blue">
                {item}
              </Tag>
            ))}
          </div>

          <div className="mt-20">
            Mức lương: <strong>{data.salary}$</strong>
          </div>

          <div className="mt-20">
            Ngày tạo: <strong>{data.createAt}</strong>
          </div>

          <div className="mt-20">
            Cập nhật: <strong>{data.updateAt ? data.updateAt : ""}</strong>
          </div>

          <div className="mt-20">
            Thành phố:{" "}
            {data.city.map((item, index) => (
              <Tag key={index} color="orange">
                {item}
              </Tag>
            ))}
          </div>

          <div className="mt-20" style={{ lineHeight: "1.8" }}>
            Mô tả:
            <br />
            {data.description}
          </div>
        </>
      )}
    </>
  );
}
export default DetailJob;
