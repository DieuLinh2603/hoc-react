import { Card, Tag } from "antd";
import {Link} from "react-router-dom"

function JobItem(props) {
    const { data  } = props;
    console.log(data);
    // console.log(data.infoCompany.companyName);
    

    return (
        <>
            <Card title={<Link to={`/jobs/${data.id}`}>{data.name}</Link>} style={{height: "300px"}}>
                <div className="mb-10">
                    <span>Ngôn ngữ: </span>
                    {data.tags.map((item, index) => (
                        <Tag key={index} color="blue">{item}</Tag>
                    ))}
                </div>

                <div className="mb-10">
                    <span>Tỉnh/Thành phố: </span>
                    {data.city.map((item, index) => (
                        <Tag key={index} color="orange">{item}</Tag>
                    ))}
                </div>

                <div className="mb-10">
                    <span>Lương: <strong>{data.salary}$</strong> </span>
                </div>
                <div className="mb-10">
                    <span>Công ty: <strong>{data?.infoCompany?.companyName}</strong> </span>
                </div>

                <div className="mb-10">
                    <span>Ngày tạo: <strong>{data.createAt}</strong> </span>
                </div>

            </Card>
        </>
    );
}
export default JobItem;
