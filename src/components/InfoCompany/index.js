import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import { getDetailCompany } from "../../services/companyService"

function InfoCompany() {
    const idCompany = getCookie("id");
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getDetailCompany(idCompany);
            setData(response);
        }
        fetchApi();
    }, [])
    return (
        <>
            {data && <>
                <div>
                    Tên công ty: <strong>{data.companyName}</strong>
                </div>

                <div>
                    Email: <strong>{data.email}</strong>
                </div>

                <div>
                    Số điện thoại: <strong>{data.phone}</strong>
                </div>

                <div>
                    Số nhân viên: <strong>{data.quantityPeople}</strong>
                </div>
            </>}
        </>

    )
}

export default InfoCompany;