import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import { getListJob } from "../../services/jobService";
import { Badge } from "antd";
function JobStatistic() {
  const idCompany = getCookie("id");
  const [data, setData] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListJob(idCompany);
      if (response) {
        let obj = {
          total: 0,
          statusTrue: 0,
          statusFalse: 0,
        };

        obj.total = response.length;
        response.forEach((item) => {
          item.status ? obj.statusTrue++ : obj.statusFalse++;
        });
        setData(obj);
      }
    };
    fetchApi();
  }, []);
  return (
    <>
      {data && (
        <>
          <div>
            <strong>Số lượng Jobs: </strong> 
            <strong>{data.total}</strong>
          </div>

          <div>
            <strong>Số job đang bật: </strong>
            <Badge
              count={data.statusTrue}
              style={{ backgroundColor: "#52c41a" }}
            />
          </div>

          <div>
            <strong>Số job đang tắt: </strong>
            <Badge showZero count={data.statusFalse} />
          </div>
        </>
      )}
    </>
  );
}

export default JobStatistic;
