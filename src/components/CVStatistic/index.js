import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import { getCVById } from "../../services/cvService";
import { Badge } from "antd";

function CVStatistic()
{
    const idCompany = getCookie("id");
    const [data, setData] = useState();

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getCVById(idCompany);

            if(response)
            {
                let obj = {
                    total: 0,
                    statusTrue: 0,
                    statusFalse: 0
                };

                obj.total = response.length;
                response.forEach(item => {
                    item.satusRead ? obj.statusTrue++ : obj.statusFalse++;
                });
                setData(obj);
            }
        }
        fetchApi();
    },[])
    return(
        <>
            {data && <>
            <div>
                <strong>
                    Số lượng CV: {data.total}
                </strong>
            </div>
            <div>
                <strong>Số CV chưa đọc: </strong>
            <Badge showZero
              count={data.statusTrue}
              style={{ backgroundColor: "#52c41a" }}
            />
            </div>

            <div>
            <strong>Số CV đã đọc: </strong>
            <Badge showZero count={data.statusFalse} />
          </div>
            </>}
        </>

    )
}

export default CVStatistic;